// Week in Review Page Logic

let currentDays = 7;
let timeline = [];

function initWeekReview() {
    loadTimeline();
    setupFilters();
    updateWeekRange();
    renderAll();
}

function loadTimeline() {
    timeline = DB.get(DB.KEYS.TIMELINE) || [];
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentDays = parseInt(btn.dataset.days);
            updateWeekRange();
            renderAll();
        });
    });
}

function updateWeekRange() {
    const now = new Date();
    const startDate = new Date(now.getTime() - currentDays * 24 * 60 * 60 * 1000);
    
    const rangeText = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    document.getElementById('week-range').textContent = rangeText;
}

function filterTimelineByDays() {
    const cutoffDate = new Date(Date.now() - currentDays * 24 * 60 * 60 * 1000);
    return timeline.filter(item => new Date(item.date) >= cutoffDate);
}

function renderAll() {
    renderStats();
    renderProgressSummary();
    renderTimeline();
    renderNextActions();
}

function renderStats() {
    const filtered = filterTimelineByDays();
    
    const conversations = filtered.filter(t => t.type === 'conversation').length;
    const decisions = filtered.filter(t => t.type === 'decision').length;
    const actions = filtered.reduce((sum, t) => {
        return sum + (t.actions ? t.actions.length : 0) + (t.completed ? t.completed.length : 0);
    }, 0);

    document.getElementById('conversations').textContent = conversations;
    document.getElementById('decisions-made').textContent = decisions;
    document.getElementById('actions-taken').textContent = actions;
}

function renderProgressSummary() {
    const filtered = filterTimelineByDays();
    const container = document.getElementById('progress-summary');

    // Group by category
    const categories = {};
    filtered.forEach(item => {
        const cat = item.category || 'general';
        if (!categories[cat]) {
            categories[cat] = [];
        }
        categories[cat].push(item);
    });

    const summaryCards = Object.entries(categories).map(([category, items]) => {
        const actionCount = items.reduce((sum, t) => {
            return sum + (t.actions ? t.actions.length : 0) + (t.completed ? t.completed.length : 0);
        }, 0);

        const icon = getCategoryIcon(category);
        const cardClass = items.some(i => i.type === 'decision') ? 'success' : '';

        return `
            <div class="summary-card ${cardClass}">
                <h3>${icon} ${capitalize(category)}</h3>
                <p>${items.length} activities • ${actionCount} actions</p>
            </div>
        `;
    }).join('');

    container.innerHTML = summaryCards || '<p style="color: var(--text-muted);">No activity in this period</p>';
}

function renderTimeline() {
    const container = document.getElementById('timeline');
    const filtered = filterTimelineByDays().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3>No activity found</h3>
                <p>Try selecting a longer time period</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => renderTimelineItem(item)).join('');
}

function renderTimelineItem(item) {
    const icon = getTypeIcon(item.type);
    
    const actionsHTML = item.actions ? `
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
            <strong>Actions:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.25rem;">
                ${item.actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const completedHTML = item.completed ? `
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
            <strong>Completed:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.25rem;">
                ${item.completed.map(c => `<li>✅ ${c}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const keyPointsHTML = item.keyPoints ? `
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
            <ul style="margin-left: 1.25rem;">
                ${item.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const decisionHTML = item.decision ? `
        <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(16,185,129,0.1); border-radius: 0.25rem; font-size: 0.85rem;">
            <strong>Decision:</strong> ${item.decision}
        </div>
    ` : '';

    return `
        <div class="timeline-item">
            <div class="timeline-date">${icon} ${formatDate(item.date)}</div>
            <div class="timeline-content">
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-description">${item.description}</div>
                ${actionsHTML}
                ${completedHTML}
                ${keyPointsHTML}
                ${decisionHTML}
            </div>
        </div>
    `;
}

function renderNextActions() {
    const container = document.getElementById('next-actions');
    
    // Extract all pending actions from recent timeline items
    const recentItems = filterTimelineByDays();
    const actions = [];
    
    recentItems.forEach(item => {
        if (item.actions) {
            item.actions.forEach(action => {
                actions.push({
                    text: action,
                    priority: item.type === 'decision' ? 'high' : 'medium',
                    category: item.category
                });
            });
        }
    });

    // Add some default next actions if none exist
    if (actions.length === 0) {
        actions.push(
            { text: 'Review this week\'s progress', priority: 'medium', category: 'review' },
            { text: 'Plan next week\'s priorities', priority: 'high', category: 'planning' },
            { text: 'Update knowledge base', priority: 'low', category: 'maintenance' }
        );
    }

    container.innerHTML = actions.map(action => `
        <div class="action-item">
            <div class="action-checkbox"></div>
            <div class="action-text">${action.text}</div>
            <span class="action-priority ${action.priority}">${action.priority}</span>
        </div>
    `).join('');

    // Add click handlers for checkboxes
    container.querySelectorAll('.action-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.style.background = 'var(--success)';
            this.innerHTML = '✓';
            this.style.color = 'white';
            this.parentElement.style.opacity = '0.5';
        });
    });
}

function getTypeIcon(type) {
    const icons = {
        conversation: '💬',
        decision: '⚖️',
        research: '📚',
        progress: '✅',
        development: '⚙️',
        learning: '🎓'
    };
    return icons[type] || '📌';
}

function getCategoryIcon(category) {
    const icons = {
        development: '⚙️',
        architecture: '🏗️',
        research: '🔬',
        learning: '🎓',
        planning: '📋',
        general: '📌'
    };
    return icons[category] || '📌';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initWeekReview);
