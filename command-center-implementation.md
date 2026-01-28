# Command Center Implementation Plan

**Version:** 2.0  
**Target:** Sean's productivity dashboard (offline, single HTML, vanilla JS)  
**Timeline:** Phase 1 (MVP) = 1-2 days | Phase 2 = 1 week

---

## Architecture Overview

### Tech Stack
- **HTML5** (single file)
- **Vanilla JavaScript** (ES6+)
- **CSS3** (inline, with CSS Grid & Flexbox)
- **LocalStorage API** (persistence)
- **No dependencies** (no jQuery, no frameworks)

### File Structure
```
command-center.html (all-in-one)
├─ <style> (CSS)
├─ <body> (HTML structure)
└─ <script> (JavaScript logic)
```

---

## Visual Mockup Description

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚡ Command Center                    🎯 Focus | ⚙️ Settings  │ ← Header
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🚨 BLOCKERS (1)                                           │  │
│  │ ┌─────────────────────────────────────────────────────┐   │  │
│  │ │ ⚠️ Get API key from vendor                        │   │  │
│  │ │ 📦 SaaS Product Launch • ⏱ 30m • Blocks 2 tasks   │   │  │
│  │ │ [Resolve] [Delegate]                              │   │  │
│  │ └─────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔥 DO NOW (Top 3)                                         │  │
│  │                                                             │  │
│  │ ┌───────────────────────────────────────────────────────┐ │  │
│  │ │ 1. Review marketing copy                              │ │  │
│  │ │    📦 Marketing Campaign • ⚡45m • Due today         │ │  │
│  │ │    [✅ Complete] [⏰ Snooze] [📝 Edit]                │ │  │
│  │ └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │ ┌───────────────────────────────────────────────────────┐ │  │
│  │ │ 2. Post job on LinkedIn                               │ │  │
│  │ │    📦 Hiring • ⚡20m • Quick win                      │ │  │
│  │ │    [✅] [⏰] [📝]                                      │ │  │
│  │ └───────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────┬─────────────────────────────────────┐   │
│  │ 📋 UP NEXT (5)     │  📊 PROJECTS                        │   │
│  │                    │                                      │   │
│  │ • Integrate        │  ┌────────────────────────────────┐ │   │
│  │   payment flow     │  │ ○ SaaS Product Launch          │ │   │
│  │   🔸2h             │  │ [████████░░] 75% • 🟢 On track│ │   │
│  │                    │  │ Due in 18 days                 │ │   │
│  │ • Test checkout    │  └────────────────────────────────┘ │   │
│  │   🔸1.5h           │                                      │   │
│  │                    │  ┌────────────────────────────────┐ │   │
│  │ • Write blog post  │  │ ○ Marketing Campaign           │ │   │
│  │   🔶3h             │  │ [████░░░░░░] 45% • 🟡 At risk │ │   │
│  │                    │  │ Due in 4 days                  │ │   │
│  │ • Set up analytics │  └────────────────────────────────┘ │   │
│  │   🔸1.5h           │                                      │   │
│  │                    │  ┌────────────────────────────────┐ │   │
│  │ • Schedule email   │  │ ○ Hiring                       │ │   │
│  │   ⚡30m            │  │ [███░░░░░░░] 30% • 🟢 On track│ │   │
│  │                    │  │ Due in 32 days                 │ │   │
│  └────────────────────┤  └────────────────────────────────┘ │   │
│  [Show More]         │  [View All Projects →]              │   │
│                      └─────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🎉 RECENT WINS (Last 48h)                          [Hide] │  │
│  │                                                             │  │
│  │ ✅ Design landing page mockup • 2 hours ago               │  │
│  │ ✅ Set up hosting infrastructure • Yesterday              │  │
│  │ ✅ Write product description • Yesterday                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│  [+ Quick Add Task]                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌─────────────────────┐
│ ☰  Command Center   │ ← Hamburger menu
│                 (+) │ ← Quick add
├─────────────────────┤
│                     │
│ 🚨 BLOCKERS (1)     │
│ ┌─────────────────┐ │
│ │ Get API key     │ │
│ │ 📦 SaaS • 30m   │ │
│ │ Blocks 2 tasks  │ │
│ │                 │ │
│ │ [Resolve] [...]  │ │
│ └─────────────────┘ │
│                     │
│ 🔥 DO NOW (3)       │
│                     │
│ ┌─────────────────┐ │
│ │ 1. Review copy  │ │
│ │ 📦 Marketing    │ │
│ │ ⚡45m • Today   │ │
│ │                 │ │
│ │ [✅] [⏰] [📝] │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 2. Post LinkedIn│ │
│ │ 📦 Hiring       │ │
│ │ ⚡20m • Quick   │ │
│ │ [✅] [⏰]       │ │
│ └─────────────────┘ │
│                     │
│ 📋 UP NEXT (5) [↓]  │ ← Expandable
│                     │
│ 📊 PROJECTS (3) [→] │ ← Swipeable
│                     │
│ 🎉 WINS (3)    [↓]  │ ← Expandable
│                     │
├─────────────────────┤
│ [Home] [🎯] [Done]  │ ← Bottom nav
└─────────────────────┘
```

---

## Phase 1: MVP (Must-Have Features)

### 1.1 Core HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>⚡ Command Center</title>
  <style>
    /* Inline CSS here */
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <h1>⚡ Command Center</h1>
    <div class="header-actions">
      <button id="focusMode" class="btn-icon" title="Focus Mode (F)">🎯</button>
      <button id="settings" class="btn-icon" title="Settings">⚙️</button>
    </div>
  </header>

  <!-- Main Container -->
  <main class="container">
    <!-- Blockers Section -->
    <section id="blockers" class="section section-blockers">
      <!-- Populated by JS -->
    </section>

    <!-- Do Now Section -->
    <section id="doNow" class="section section-priority">
      <h2>🔥 DO NOW (Top 3)</h2>
      <div id="doNowList" class="task-list">
        <!-- Populated by JS -->
      </div>
    </section>

    <!-- Two Column Layout -->
    <div class="two-column">
      <!-- Up Next Section -->
      <section id="upNext" class="section">
        <h2>📋 UP NEXT</h2>
        <div id="upNextList" class="task-list">
          <!-- Populated by JS -->
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="section">
        <h2>📊 PROJECTS</h2>
        <div id="projectsList" class="projects-list">
          <!-- Populated by JS -->
        </div>
      </section>
    </div>

    <!-- Recent Wins -->
    <section id="recentWins" class="section section-wins">
      <h2>🎉 RECENT WINS</h2>
      <div id="winsList" class="wins-list">
        <!-- Populated by JS -->
      </div>
    </section>
  </main>

  <!-- Quick Add Bar -->
  <div class="quick-add">
    <input type="text" id="quickAddInput" placeholder="+ Quick add task (press Enter)">
  </div>

  <!-- Modals -->
  <div id="modalOverlay" class="modal-overlay hidden">
    <div class="modal">
      <!-- Modal content populated by JS -->
    </div>
  </div>

  <script>
    /* JavaScript here */
  </script>
</body>
</html>
```

### 1.2 CSS Styling

```css
/* ============================================
   RESET & BASE STYLES
   ============================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #6c757d;
  --color-border: #dee2e6;
  
  --color-primary: #007bff;
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-danger: #dc3545;
  
  --color-blocker: #ff4444;
  --color-priority: #ff8800;
  --color-on-track: #00c851;
  --color-at-risk: #ffbb33;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-size-sm: 12px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  
  /* Borders */
  --border-radius: 8px;
  --border-width: 1px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 20px rgba(0,0,0,0.15);
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-bg);
  padding-bottom: 80px; /* Space for quick add bar */
}

/* ============================================
   HEADER
   ============================================ */
.header {
  background: var(--color-surface);
  border-bottom: var(--border-width) solid var(--color-border);
  padding: var(--space-md) var(--space-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header h1 {
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: var(--space-sm);
}

/* ============================================
   CONTAINER & SECTIONS
   ============================================ */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
}

.section {
  background: var(--color-surface);
  border-radius: var(--border-radius);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.section h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-md);
  font-weight: 600;
}

.section-blockers {
  border-left: 4px solid var(--color-blocker);
  background: #fff5f5;
}

.section-priority {
  border-left: 4px solid var(--color-priority);
}

.section-wins {
  border-left: 4px solid var(--color-success);
}

/* ============================================
   TWO COLUMN LAYOUT (Desktop)
   ============================================ */
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   TASK CARDS
   ============================================ */
.task-card {
  background: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.task-card.status-blocked {
  border-left: 4px solid var(--color-blocker);
  background: #fff5f5;
}

.task-card.status-in-progress {
  border-left: 4px solid var(--color-primary);
}

.task-title {
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.task-actions {
  display: flex;
  gap: var(--space-sm);
}

/* ============================================
   BADGES
   ============================================ */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.badge-project {
  background: #e7f3ff;
  color: #0066cc;
}

.badge-effort-small {
  background: #d4edda;
  color: #155724;
}

.badge-effort-medium {
  background: #fff3cd;
  color: #856404;
}

.badge-effort-large {
  background: #f8d7da;
  color: #721c24;
}

.badge-blocker {
  background: #f8d7da;
  color: #721c24;
}

/* ============================================
   BUTTONS
   ============================================ */
button {
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  cursor: pointer;
  border: none;
  background: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  font-weight: 500;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-success {
  background: var(--color-success);
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-icon {
  font-size: var(--font-size-xl);
  padding: var(--space-sm);
  background: transparent;
  border: none;
}

.btn-icon:hover {
  background: var(--color-bg);
}

/* ============================================
   PROJECT CARDS
   ============================================ */
.project-card {
  padding: var(--space-md);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  margin-bottom: var(--space-md);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.project-name {
  font-weight: 600;
  font-size: var(--font-size-md);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin: var(--space-sm) 0;
}

.progress-fill {
  height: 100%;
  background: var(--color-success);
  transition: width 0.3s ease;
}

.progress-fill.at-risk {
  background: var(--color-warning);
}

.progress-fill.blocked {
  background: var(--color-danger);
}

/* ============================================
   WINS LIST
   ============================================ */
.win-item {
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.win-item:last-child {
  border-bottom: none;
}

.win-item-title {
  flex: 1;
  color: var(--color-text);
}

.win-item-time {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ============================================
   QUICK ADD BAR
   ============================================ */
.quick-add {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-top: var(--border-width) solid var(--color-border);
  padding: var(--space-md) var(--space-lg);
  box-shadow: var(--shadow-lg);
  z-index: 90;
}

.quick-add input {
  width: 100%;
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  padding: var(--space-md);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  outline: none;
}

.quick-add input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

/* ============================================
   MODAL
   ============================================ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal-overlay.hidden {
  display: none;
}

.modal {
  background: var(--color-surface);
  border-radius: var(--border-radius);
  padding: var(--space-xl);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

/* ============================================
   UTILITIES
   ============================================ */
.hidden {
  display: none !important;
}

.text-muted {
  color: var(--color-text-muted);
}

.text-success {
  color: var(--color-success);
}

.text-danger {
  color: var(--color-danger);
}

.text-warning {
  color: var(--color-warning);
}

/* ============================================
   MOBILE OPTIMIZATIONS
   ============================================ */
@media (max-width: 768px) {
  .container {
    padding: var(--space-md);
  }
  
  .section {
    padding: var(--space-md);
  }
  
  .task-card {
    padding: var(--space-sm) var(--space-md);
  }
  
  .header h1 {
    font-size: var(--font-size-lg);
  }
}
```

### 1.3 Core JavaScript Logic

```javascript
/* ============================================
   STATE MANAGEMENT
   ============================================ */
const State = {
  tasks: [],
  projects: [],
  completions: [],
  settings: {
    focusMode: false,
    autoArchiveDays: 7
  }
};

// Load from localStorage
function loadState() {
  const saved = localStorage.getItem('commandCenterState');
  if (saved) {
    const parsed = JSON.parse(saved);
    State.tasks = parsed.tasks || [];
    State.projects = parsed.projects || [];
    State.completions = parsed.completions || [];
    State.settings = { ...State.settings, ...(parsed.settings || {}) };
  }
}

// Save to localStorage
function saveState() {
  localStorage.setItem('commandCenterState', JSON.stringify(State));
}

/* ============================================
   PRIORITY CALCULATION
   ============================================ */
function calculatePriority(task) {
  if (task.manualPriorityOverride) {
    return task.manualPriorityOverride;
  }
  
  let score = 0;
  
  // Blocked status = highest priority
  if (task.status === 'blocked') {
    score += 100;
  }
  
  // Urgency (due date)
  if (task.dueDate) {
    const daysUntilDue = getDaysUntil(task.dueDate);
    if (daysUntilDue < 0) score += 100; // Overdue
    else if (daysUntilDue === 0) score += 80; // Due today
    else if (daysUntilDue === 1) score += 60; // Due tomorrow
    else if (daysUntilDue <= 7) score += 40; // Due this week
    else if (daysUntilDue <= 14) score += 20; // Due in 2 weeks
  }
  
  // Importance (blocks other tasks)
  if (task.blocks && task.blocks.length > 0) {
    score += task.blocks.length * 15;
  }
  
  // Quick wins (small effort)
  if (task.effortEstimate === 'small') {
    score += 10;
  }
  
  return score;
}

function getDaysUntil(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diffTime = date - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/* ============================================
   RENDERING
   ============================================ */
function render() {
  renderBlockers();
  renderDoNow();
  renderUpNext();
  renderProjects();
  renderRecentWins();
}

function renderBlockers() {
  const blockers = State.tasks.filter(t => t.status === 'blocked');
  const container = document.getElementById('blockers');
  
  if (blockers.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'block';
  container.innerHTML = `
    <h2>🚨 BLOCKERS (${blockers.length})</h2>
    <div class="task-list">
      ${blockers.map(task => renderTaskCard(task, 'blocker')).join('')}
    </div>
  `;
}

function renderDoNow() {
  // Get top 3 priority tasks (excluding blocked)
  const sorted = State.tasks
    .filter(t => t.status !== 'completed' && t.status !== 'blocked')
    .map(t => ({ ...t, priority: calculatePriority(t) }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
  
  const container = document.getElementById('doNowList');
  container.innerHTML = sorted.map((task, index) => 
    renderTaskCard(task, 'priority', index + 1)
  ).join('');
}

function renderUpNext() {
  // Get next 5-7 tasks
  const sorted = State.tasks
    .filter(t => t.status !== 'completed' && t.status !== 'blocked')
    .map(t => ({ ...t, priority: calculatePriority(t) }))
    .sort((a, b) => b.priority - a.priority)
    .slice(3, 10);
  
  const container = document.getElementById('upNextList');
  container.innerHTML = sorted.length > 0 
    ? sorted.map(task => renderTaskCard(task, 'next')).join('')
    : '<p class="text-muted">No upcoming tasks</p>';
}

function renderTaskCard(task, variant = 'default', number = null) {
  const effortBadge = {
    'small': '⚡',
    'medium': '🔸',
    'large': '🔶'
  }[task.effortEstimate] || '';
  
  const dueText = task.dueDate ? formatDueDate(task.dueDate) : '';
  const blocksText = task.blocks && task.blocks.length > 0 
    ? `Blocks ${task.blocks.length} task${task.blocks.length > 1 ? 's' : ''}`
    : '';
  
  const numberBadge = number ? `<span class="task-number">${number}.</span>` : '';
  
  return `
    <div class="task-card status-${task.status}" data-id="${task.id}">
      <div class="task-title">
        ${numberBadge} ${task.title}
      </div>
      <div class="task-meta">
        <span class="badge badge-project">📦 ${task.projectName}</span>
        ${task.estimatedMinutes ? `<span class="badge badge-effort-${task.effortEstimate}">${effortBadge}${task.estimatedMinutes}m</span>` : ''}
        ${dueText ? `<span class="badge">${dueText}</span>` : ''}
        ${blocksText ? `<span class="badge badge-blocker">🚨 ${blocksText}</span>` : ''}
      </div>
      <div class="task-actions">
        <button class="btn-success" onclick="completeTask('${task.id}')">✅ Complete</button>
        <button class="btn-primary" onclick="snoozeTask('${task.id}')">⏰ Snooze</button>
        <button class="btn-icon" onclick="editTask('${task.id}')">📝</button>
      </div>
    </div>
  `;
}

function formatDueDate(dateString) {
  const days = getDaysUntil(dateString);
  if (days < 0) return `⚠️ Overdue by ${Math.abs(days)} day${Math.abs(days) > 1 ? 's' : ''}`;
  if (days === 0) return '🔥 Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `Due in ${days} days`;
  return `Due ${new Date(dateString).toLocaleDateString()}`;
}

function renderProjects() {
  const container = document.getElementById('projectsList');
  const active = State.projects.filter(p => p.status === 'active');
  
  container.innerHTML = active.map(project => `
    <div class="project-card">
      <div class="project-header">
        <span class="project-name">○ ${project.name}</span>
        <span class="project-health ${project.health}">${getHealthEmoji(project.health)}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${project.health}" style="width: ${project.progress}%"></div>
      </div>
      <div class="project-meta text-muted">
        <span>${project.progress}% complete</span>
        <span> • ${formatDueDate(project.dueDate)}</span>
      </div>
    </div>
  `).join('');
}

function getHealthEmoji(health) {
  return {
    'on-track': '🟢',
    'at-risk': '🟡',
    'blocked': '🔴'
  }[health] || '⚪';
}

function renderRecentWins() {
  const recent = State.completions
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    .slice(0, 5);
  
  const container = document.getElementById('winsList');
  container.innerHTML = recent.length > 0
    ? recent.map(win => `
        <div class="win-item">
          <span>✅</span>
          <span class="win-item-title">${win.title}</span>
          <span class="win-item-time">${formatRelativeTime(win.completedDate)}</span>
        </div>
      `).join('')
    : '<p class="text-muted">No recent wins yet. Complete a task!</p>';
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

/* ============================================
   ACTIONS
   ============================================ */
function completeTask(taskId) {
  const task = State.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  // Move to completions
  State.completions.push({
    id: `comp_${Date.now()}`,
    taskId: task.id,
    title: task.title,
    projectId: task.projectId,
    projectName: task.projectName,
    completedDate: new Date().toISOString(),
    effortEstimate: task.effortEstimate,
    tags: task.tags
  });
  
  // Remove from tasks
  State.tasks = State.tasks.filter(t => t.id !== taskId);
  
  saveState();
  render();
  
  // Show celebration (optional)
  showToast('✅ Task completed! Great work!');
}

function snoozeTask(taskId) {
  // Show snooze options modal
  showModal(`
    <h3>Snooze Task</h3>
    <p>When should we remind you?</p>
    <button onclick="applySnooze('${taskId}', 1)">1 hour</button>
    <button onclick="applySnooze('${taskId}', 4)">4 hours</button>
    <button onclick="applySnooze('${taskId}', 24)">Tomorrow</button>
    <button onclick="applySnooze('${taskId}', 168)">Next week</button>
    <button onclick="closeModal()">Cancel</button>
  `);
}

function applySnooze(taskId, hours) {
  const task = State.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const newDueDate = new Date();
  newDueDate.setHours(newDueDate.getHours() + hours);
  task.dueDate = newDueDate.toISOString();
  
  saveState();
  render();
  closeModal();
  showToast(`⏰ Task snoozed for ${hours > 24 ? Math.floor(hours/24) + ' days' : hours + ' hours'}`);
}

function quickAddTask() {
  const input = document.getElementById('quickAddInput');
  const title = input.value.trim();
  
  if (!title) return;
  
  const newTask = {
    id: `task_${Date.now()}`,
    title: title,
    description: '',
    projectId: null,
    projectName: 'Inbox',
    status: 'not-started',
    priority: 50,
    dueDate: null,
    createdDate: new Date().toISOString(),
    effortEstimate: 'medium',
    estimatedMinutes: 60,
    tags: [],
    context: 'work',
    blockedBy: [],
    blocks: []
  };
  
  State.tasks.push(newTask);
  saveState();
  render();
  
  input.value = '';
  showToast('✅ Task added!');
}

/* ============================================
   UI HELPERS
   ============================================ */
function showToast(message) {
  // Simple toast notification
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showModal(content) {
  const modal = document.getElementById('modalOverlay');
  modal.querySelector('.modal').innerHTML = content;
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
  
  // Quick add on Enter
  document.getElementById('quickAddInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') quickAddTask();
  });
  
  // Close modal on overlay click
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' && !e.target.matches('input, textarea')) {
      toggleFocusMode();
    }
  });
});
```

---

## Phase 2: Nice-to-Have Features

### 2.1 Focus Mode
- Hide everything except top 3 tasks
- Keyboard shortcut: `F`
- Minimal distractions

### 2.2 Subtasks
- Expandable checklist within tasks
- Progress indicator (3/5 complete)

### 2.3 Search & Filter
- Quick search bar
- Filter by project, tag, effort

### 2.4 Keyboard Shortcuts
- `N` - New task
- `F` - Focus mode
- `/` - Search
- `1-9` - Select task
- `Enter` - Complete selected
- `E` - Edit selected

### 2.5 Tags & Contexts
- Add multiple tags per task
- Filter by context (work, deep-work, etc.)

---

## Responsive Design Strategy

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) {
  /* Single column */
  /* Larger touch targets (44px min) */
  /* Hide secondary info */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2 column where appropriate */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full layout */
}
```

### Mobile Gestures
```javascript
// Swipe to complete
let touchStartX = 0;
taskCard.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

taskCard.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;
  
  if (diff > 100) {
    completeTask(taskId); // Swipe right = complete
  } else if (diff < -100) {
    showTaskMenu(taskId); // Swipe left = menu
  }
});
```

---

## Performance Optimizations

### 1. Lazy Rendering
```javascript
// Only render visible items
function renderLazy(items, container, renderFn) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const elem = document.createElement('div');
    elem.innerHTML = renderFn(item);
    fragment.appendChild(elem.firstChild);
  });
  container.innerHTML = '';
  container.appendChild(fragment);
}
```

### 2. Debounced Save
```javascript
let saveTimeout;
function debouncedSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveState, 500);
}
```

### 3. CSS Animations (GPU)
```css
.task-card {
  transform: translateZ(0); /* Force GPU */
  will-change: transform; /* Hint to browser */
}
```

---

## Testing Checklist

### Functionality
- [ ] Tasks load from localStorage
- [ ] Tasks save on changes
- [ ] Complete task moves to wins
- [ ] Priority calculation works
- [ ] Due dates display correctly
- [ ] Quick add works
- [ ] Projects show correct progress

### Mobile
- [ ] Touch targets ≥ 44px
- [ ] Swipe gestures work
- [ ] Responsive layout adapts
- [ ] No horizontal scroll
- [ ] Fast loading (< 100ms)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus visible on all elements
- [ ] ARIA labels on icons
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader friendly

---

## Deployment

### Single HTML File
1. Inline all CSS in `<style>` tags
2. Inline all JS in `<script>` tags
3. Minify (optional, but keeps it fast)
4. Test offline (disable network)
5. Add to home screen (mobile)

### Distribution
- Host on GitHub Pages
- Email to Sean
- Save to Dropbox/iCloud
- Works anywhere (no server needed)

---

## Future Enhancements (v2+)

1. **Cloud Sync** (optional, for multi-device)
2. **Team Collaboration** (assign tasks)
3. **Time Tracking** (actual vs estimated)
4. **Recurring Tasks**
5. **File Attachments**
6. **Comments/Notes**
7. **AI Suggestions** (priority recommendations)
8. **Calendar Integration**

---

## Summary

**What we're building:**
- Offline-first command center
- Action-focused (not project-focused)
- Mobile-optimized
- Fast (<100ms load)
- No dependencies

**Key differentiators:**
- Auto-prioritization (smart sorting)
- Blocker spotlight (prevent stalls)
- Recent wins (motivation)
- Focus mode (minimize distractions)
- Quick interactions (1-click complete)

**Timeline:**
- Phase 1 MVP: 1-2 days
- Phase 2 Nice-to-haves: 1 week
- Testing & polish: Ongoing

**Next step:** Start with HTML structure, add CSS, then wire up JavaScript with sample data from `command-center-enhanced-structure.json`.
