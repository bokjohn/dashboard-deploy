// Quick Win Enhancements for Dashboard
// This script adds: DO NOW section, one-click complete, blocker alerts, mobile optimization, progress bars

// Inject enhanced CSS
const enhancedCSS = `
/* Quick Win #1: DO NOW Section */
.do-now-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.do-now-section h2 {
    color: white;
    font-size: 20px;
    margin-bottom: 16px;
    font-weight: 700;
}

.do-now-task {
    background: white;
    color: #333;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.do-now-task:hover {
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.do-now-task:last-child {
    margin-bottom: 0;
}

.do-now-meta {
    font-size: 14px;
    font-weight: normal;
    margin-top: 4px;
    opacity: 0.7;
}

.do-now-complete-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
}

.do-now-complete-btn:hover {
    background: #059669;
}

/* Quick Win #2: One-Click Complete */
.todo-complete-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    margin-left: auto;
    transition: background 0.2s;
}

.todo-complete-btn:hover {
    background: #059669;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

/* Quick Win #3: Blocker Alert */
.blocker-alert {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
}

.blocker-alert h2 {
    color: white;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}

.blocker-item {
    background: rgba(255, 255, 255, 0.15);
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 8px;
    backdrop-filter: blur(10px);
}

.blocker-item:last-child {
    margin-bottom: 0;
}

/* Quick Win #4: Mobile Optimization */
@media (max-width: 768px) {
    .do-now-section {
        padding: 16px;
    }
    
    .do-now-task {
        font-size: 16px;
        padding: 14px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
    
    .do-now-complete-btn {
        width: 100%;
        padding: 10px;
    }
    
    .todo-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
    }
    
    .todo-complete-btn {
        width: 100%;
        padding: 10px;
    }
    
    .command-grid {
        grid-template-columns: 1fr !important;
    }
}

/* Quick Win #5: Enhanced Progress Bars */
.enhanced-progress {
    margin-top: 12px;
}

.progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 6px;
    color: var(--text-secondary);
}

.progress-bar-enhanced {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.progress-fill-enhanced {
    height: 100%;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    border-radius: 4px;
    transition: width 0.3s ease;
    position: relative;
}

.progress-fill-enhanced.warning {
    background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}

.progress-fill-enhanced.danger {
    background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}
`;

// Inject CSS
const styleElement = document.createElement('style');
styleElement.textContent = enhancedCSS;
document.head.appendChild(styleElement);

console.log('✅ Dashboard enhancements loaded!');
