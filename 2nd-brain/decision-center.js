// Decision Center Page Logic

let currentFilter = 'all';
let decisions = [];

function initDecisionCenter() {
    loadDecisions();
    setupFilters();
    setupFAB();
    updateStats();
}

function loadDecisions() {
    decisions = DB.get(DB.KEYS.DECISIONS) || [];
    renderDecisions();
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            currentFilter = btn.dataset.filter;
            renderDecisions();
        });
    });
}

function setupFAB() {
    const fab = document.getElementById('add-decision');
    fab.addEventListener('click', () => {
        addNewDecision();
    });
}

function filterDecisions() {
    if (currentFilter === 'all') {
        return decisions;
    }
    return decisions.filter(d => d.status === currentFilter);
}

function renderDecisions() {
    const container = document.getElementById('decisions-list');
    const filtered = filterDecisions();

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚖️</div>
                <h3>No ${currentFilter === 'all' ? '' : currentFilter} decisions</h3>
                <p>Click the + button to add a new decision</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(decision => renderDecisionCard(decision)).join('');
}

function renderDecisionCard(decision) {
    const optionsHTML = decision.options.map(option => `
        <div class="option">
            <div class="option-title">${option.name}</div>
            <div class="pros-cons">
                <div class="pros">
                    <strong>✅ Pros:</strong>
                    <ul>
                        ${option.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons">
                    <strong>❌ Cons:</strong>
                    <ul>
                        ${option.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');

    const recommendationHTML = decision.recommendation ? `
        <div class="recommendation">
            <strong>💡 Recommendation:</strong> ${decision.recommendation}
        </div>
    ` : '';

    const decisionHTML = decision.decision ? `
        <div class="recommendation">
            <strong>✅ Decision:</strong> ${decision.decision}
            <br><small>Decided ${formatDate(decision.decidedAt)}</small>
        </div>
    ` : '';

    return `
        <div class="decision-card" data-id="${decision.id}">
            <div class="decision-header">
                <div>
                    <div class="decision-title">${decision.title}</div>
                    <div class="decision-meta">
                        Created ${formatDate(decision.createdAt)} • Priority: ${decision.priority || 'medium'}
                    </div>
                </div>
                <span class="decision-status ${decision.status}">${decision.status}</span>
            </div>
            
            <p style="color: var(--text-muted); margin-bottom: 1rem;">${decision.description}</p>
            
            <div class="options-grid">
                ${optionsHTML}
            </div>
            
            ${recommendationHTML}
            ${decisionHTML}
        </div>
    `;
}

function updateStats() {
    const total = decisions.length;
    const pending = decisions.filter(d => d.status === 'pending').length;
    const decided = decisions.filter(d => d.status === 'decided').length;

    document.getElementById('total-decisions').textContent = total;
    document.getElementById('pending-count').textContent = pending;
    document.getElementById('decided-count').textContent = decided;
}

function addNewDecision() {
    const title = prompt('Decision title:');
    if (!title) return;

    const description = prompt('Description:');
    if (!description) return;

    const newDecision = {
        id: 'd' + Date.now(),
        title,
        description,
        status: 'pending',
        createdAt: new Date().toISOString(),
        options: [],
        priority: 'medium'
    };

    decisions.push(newDecision);
    DB.set(DB.KEYS.DECISIONS, decisions);
    
    loadDecisions();
    updateStats();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDecisionCenter);
