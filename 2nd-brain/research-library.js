// Research Library Page Logic

let currentFilter = 'all';
let research = [];
let searchQuery = '';

function initResearchLibrary() {
    loadResearch();
    setupFilters();
    setupSearch();
    setupFAB();
    updateStats();
}

function loadResearch() {
    research = DB.get(DB.KEYS.RESEARCH) || [];
    renderResearch();
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            renderResearch();
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const performSearch = () => {
        searchQuery = searchInput.value.toLowerCase();
        renderResearch();
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search
    searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase();
        renderResearch();
    });
}

function setupFAB() {
    const fab = document.getElementById('add-research');
    fab.addEventListener('click', () => {
        addNewResearch();
    });
}

function filterResearch() {
    let filtered = research;

    // Apply topic filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(r => r.topic === currentFilter);
    }

    // Apply search
    if (searchQuery) {
        filtered = filtered.filter(r => {
            const searchable = `${r.title} ${r.details} ${r.keyFindings.join(' ')} ${r.tags.join(' ')}`.toLowerCase();
            return searchable.includes(searchQuery);
        });
    }

    return filtered;
}

function renderResearch() {
    const container = document.getElementById('research-list');
    const filtered = filterResearch();

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>No research found</h3>
                <p>${searchQuery ? 'Try a different search term' : 'Click the + button to add research'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => renderResearchCard(item)).join('');
}

function renderResearchCard(item) {
    const keyFindingsHTML = item.keyFindings.length > 0 ? `
        <div class="key-findings">
            <h4>🎯 Key Findings</h4>
            <ul>
                ${item.keyFindings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    const sourcesHTML = item.sources && item.sources.length > 0 ? `
        <div class="sources">
            <div class="sources-title">📎 Sources:</div>
            ${item.sources.map(source => 
                `<a href="${source.url}" class="source-link" target="_blank">${source.name}</a>`
            ).join('')}
        </div>
    ` : '';

    const tagsHTML = item.tags && item.tags.length > 0 ? `
        <div style="margin-top: 1rem;">
            ${item.tags.map(tag => `<span style="background: rgba(99,102,241,0.2); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; margin-right: 0.5rem;">${tag}</span>`).join('')}
        </div>
    ` : '';

    return `
        <div class="research-card" data-id="${item.id}">
            <div class="research-header">
                <div>
                    <div class="research-title">${item.title}</div>
                    <div class="decision-meta">
                        ${formatDate(item.createdAt)}
                    </div>
                </div>
                <span class="topic-tag">${item.topic}</span>
            </div>
            
            <p style="color: var(--text-muted); margin-bottom: 1rem;">${item.details}</p>
            
            ${keyFindingsHTML}
            ${sourcesHTML}
            ${tagsHTML}
        </div>
    `;
}

function updateStats() {
    const totalTopics = research.length;
    const totalFindings = research.reduce((sum, r) => sum + r.keyFindings.length, 0);
    const totalSources = research.reduce((sum, r) => sum + (r.sources ? r.sources.length : 0), 0);

    document.getElementById('total-topics').textContent = totalTopics;
    document.getElementById('key-findings').textContent = totalFindings;
    document.getElementById('total-sources').textContent = totalSources;
}

function addNewResearch() {
    const title = prompt('Research topic:');
    if (!title) return;

    const details = prompt('Details:');
    if (!details) return;

    const topic = prompt('Category (tech/business/personal):') || 'personal';

    const newResearch = {
        id: 'r' + Date.now(),
        title,
        topic: topic.toLowerCase(),
        details,
        createdAt: new Date().toISOString(),
        keyFindings: [],
        sources: [],
        tags: []
    };

    research.push(newResearch);
    DB.set(DB.KEYS.RESEARCH, research);
    
    loadResearch();
    updateStats();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initResearchLibrary);
