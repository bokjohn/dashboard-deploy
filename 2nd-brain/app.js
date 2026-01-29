// 2nd Brain Dashboard - Core App Logic
// Local storage utilities and shared functions

const DB = {
    // Storage keys
    KEYS: {
        DECISIONS: 'brain_decisions',
        RESEARCH: 'brain_research',
        TIMELINE: 'brain_timeline',
        SETTINGS: 'brain_settings'
    },

    // Get data from localStorage
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading from storage:', e);
            return null;
        }
    },

    // Save data to localStorage
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error writing to storage:', e);
            return false;
        }
    },

    // Initialize with sample data if empty
    init() {
        if (!this.get(this.KEYS.DECISIONS)) {
            this.set(this.KEYS.DECISIONS, getSampleDecisions());
        }
        if (!this.get(this.KEYS.RESEARCH)) {
            this.set(this.KEYS.RESEARCH, getSampleResearch());
        }
        if (!this.get(this.KEYS.TIMELINE)) {
            this.set(this.KEYS.TIMELINE, getSampleTimeline());
        }
    }
};

// Sample data generators
function getSampleDecisions() {
    return [
        {
            id: 'd1',
            title: 'Choose mobile framework for dashboard',
            description: 'Need to decide between React Native, Flutter, or Progressive Web App',
            status: 'pending',
            createdAt: new Date('2025-01-26').toISOString(),
            options: [
                {
                    name: 'Progressive Web App (PWA)',
                    pros: ['Works on all platforms', 'No app store approval', 'Easy updates', 'Web technologies'],
                    cons: ['Limited offline features', 'No native notifications', 'Less native feel']
                },
                {
                    name: 'React Native',
                    pros: ['True native apps', 'Rich ecosystem', 'Hot reload', 'JavaScript/React'],
                    cons: ['Separate iOS/Android builds', 'More complex setup', 'Platform-specific bugs']
                }
            ],
            recommendation: 'PWA for rapid iteration and universal access. Can always wrap in native later.',
            priority: 'high'
        },
        {
            id: 'd2',
            title: 'Data storage strategy',
            description: 'Where to store user data - local, cloud, or hybrid?',
            status: 'pending',
            createdAt: new Date('2025-01-27').toISOString(),
            options: [
                {
                    name: 'Local Storage Only',
                    pros: ['Fast', 'Private', 'No backend needed', 'Works offline'],
                    cons: ['No sync across devices', 'Data loss risk', 'Limited capacity']
                },
                {
                    name: 'Cloud Sync (Firebase/Supabase)',
                    pros: ['Multi-device sync', 'Backup', 'Scalable', 'Real-time updates'],
                    cons: ['Privacy concerns', 'Costs', 'Network dependency', 'Complexity']
                },
                {
                    name: 'Hybrid (Local + Optional Sync)',
                    pros: ['Best of both', 'User choice', 'Offline-first', 'Flexible'],
                    cons: ['Most complex', 'Sync conflicts', 'More development']
                }
            ],
            recommendation: 'Start with local storage, add optional cloud sync in v2.',
            priority: 'medium'
        },
        {
            id: 'd3',
            title: 'Upgrade to Claude Sonnet 4.5',
            description: 'Evaluate if the new model is worth the upgrade',
            status: 'decided',
            createdAt: new Date('2025-01-20').toISOString(),
            decidedAt: new Date('2025-01-22').toISOString(),
            decision: 'Upgraded to Sonnet 4.5 - better reasoning and coding capabilities',
            options: [
                {
                    name: 'Upgrade Now',
                    pros: ['Better performance', 'Improved reasoning', 'Latest features'],
                    cons: ['Higher cost', 'Potential breaking changes']
                },
                {
                    name: 'Wait and See',
                    pros: ['Stable current version', 'Lower cost', 'Known behavior'],
                    cons: ['Missing improvements', 'Fall behind']
                }
            ],
            priority: 'high'
        }
    ];
}

function getSampleResearch() {
    return [
        {
            id: 'r1',
            title: 'Mobile-First Dashboard Design',
            topic: 'tech',
            createdAt: new Date('2025-01-25').toISOString(),
            keyFindings: [
                'Touch targets should be minimum 44x44px for good UX',
                'Card-based layouts work better on mobile than tables',
                'Dark mode reduces eye strain and saves battery',
                'Progressive disclosure keeps interfaces clean'
            ],
            details: 'Research into best practices for mobile dashboard interfaces. Focus on touch-friendly interactions and information density.',
            sources: [
                { name: 'Material Design Guidelines', url: 'https://material.io' },
                { name: 'iOS Human Interface Guidelines', url: 'https://developer.apple.com/design' }
            ],
            tags: ['mobile', 'ui/ux', 'dashboard']
        },
        {
            id: 'r2',
            title: 'Decision-Making Frameworks',
            topic: 'personal',
            createdAt: new Date('2025-01-24').toISOString(),
            keyFindings: [
                'Pros/cons lists are most effective when weighted by importance',
                'Time-boxing decisions prevents analysis paralysis',
                'Reversible decisions should be made quickly',
                'Document reasoning to learn from past choices'
            ],
            details: 'Study of various decision-making methodologies including weighted scoring, decision matrices, and mental models.',
            sources: [
                { name: 'Farnam Street - Mental Models', url: 'https://fs.blog' },
                { name: 'The Decision Book', url: '#' }
            ],
            tags: ['decision-making', 'productivity', 'frameworks']
        },
        {
            id: 'r3',
            title: 'Knowledge Management Systems',
            topic: 'business',
            createdAt: new Date('2025-01-23').toISOString(),
            keyFindings: [
                'Zettelkasten method: atomic notes with connections',
                'PARA method: Projects, Areas, Resources, Archive',
                'Regular review cycles essential (daily, weekly, monthly)',
                'Capture -> Organize -> Distill -> Express workflow'
            ],
            details: 'Overview of popular personal knowledge management (PKM) systems and how to implement them effectively.',
            sources: [
                { name: 'Building a Second Brain', url: '#' },
                { name: 'How to Take Smart Notes', url: '#' }
            ],
            tags: ['pkm', 'note-taking', 'productivity']
        }
    ];
}

function getSampleTimeline() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return [
        {
            id: 't1',
            date: new Date(today.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'conversation',
            title: 'Dashboard Development Planning',
            description: 'Discussed requirements for Decision Center, Research Library, and Week in Review pages',
            category: 'development',
            actions: ['Create mobile-first design', 'Implement local storage', 'Add filtering']
        },
        {
            id: 't2',
            date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'decision',
            title: 'Chose PWA Architecture',
            description: 'Decided on Progressive Web App approach for maximum accessibility',
            category: 'architecture',
            decision: 'PWA with local-first storage'
        },
        {
            id: 't3',
            date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'research',
            title: 'Mobile UI Best Practices',
            description: 'Researched touch-friendly interfaces and card-based layouts',
            category: 'research',
            keyPoints: ['44px touch targets', 'Dark mode support', 'Responsive design']
        },
        {
            id: 't4',
            date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'conversation',
            title: 'Knowledge Management Discussion',
            description: 'Explored different PKM systems and note-taking methods',
            category: 'learning',
            actions: ['Try Zettelkasten', 'Implement PARA', 'Set up review cycles']
        },
        {
            id: 't5',
            date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'progress',
            title: 'Completed Agent Framework Setup',
            description: 'Set up workspace structure and core agent files',
            category: 'development',
            completed: ['SOUL.md', 'AGENTS.md', 'TOOLS.md']
        },
        {
            id: 't6',
            date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'conversation',
            title: 'System Architecture Review',
            description: 'Discussed data flow and component structure',
            category: 'architecture',
            actions: ['Define data schema', 'Plan API structure']
        }
    ];
}

// Utility functions
function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

function getWeekRange() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return `${weekAgo.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

// Update dashboard statistics
function updateDashboardStats() {
    const decisions = DB.get(DB.KEYS.DECISIONS) || [];
    const research = DB.get(DB.KEYS.RESEARCH) || [];
    const timeline = DB.get(DB.KEYS.TIMELINE) || [];

    const pendingDecisions = decisions.filter(d => d.status === 'pending').length;
    const researchTopics = research.length;
    const weekActions = timeline.filter(t => {
        const date = new Date(t.date);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo;
    }).length;

    // Update badges if elements exist
    const pendingBadge = document.getElementById('pending-decisions');
    const topicsBadge = document.getElementById('research-topics');
    const actionsBadge = document.getElementById('week-actions');

    if (pendingBadge) pendingBadge.textContent = pendingDecisions;
    if (topicsBadge) topicsBadge.textContent = researchTopics;
    if (actionsBadge) actionsBadge.textContent = weekActions;
}

// Initialize DB on page load
DB.init();
