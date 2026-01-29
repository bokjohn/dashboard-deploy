# 🧠 2nd Brain Dashboard

A mobile-first personal knowledge management dashboard with three core sections for organizing decisions, research, and weekly progress.

## Features

### 📊 Main Dashboard
- Quick access to all three sections
- Live statistics badges
- Clean, card-based navigation
- Dark mode optimized

### ⚖️ Decision Center
- Track pending decisions with structured analysis
- Pros/cons lists for each option
- AI recommendations
- Status tracking (pending/decided/archived)
- Priority levels
- Filter by status

### 📚 Research Library
- Organize research by topic (tech/business/personal)
- Key findings highlighted
- Source tracking with links
- Tag-based organization
- Real-time search
- Topic filtering

### 📅 Week in Review
- Timeline of conversations and activities
- Progress tracking by category
- Decisions made this week
- Actions taken
- Next actions list with priorities
- Flexible time periods (7/14/30 days)

## Tech Stack

- **Pure HTML/CSS/JavaScript** - No framework dependencies
- **LocalStorage** - All data stored locally in browser
- **Mobile-First Design** - Optimized for touch interfaces
- **Progressive Web App** - Works offline, can be installed
- **Dark Mode** - Reduces eye strain, saves battery

## Getting Started

### Option 1: Simple File Server (Python)
```bash
cd dashboard
python3 -m http.server 8000
```
Open http://localhost:8000

### Option 2: Node.js Server
```bash
cd dashboard
npx serve
```

### Option 3: VS Code Live Server
Right-click `index.html` → "Open with Live Server"

## Project Structure

```
dashboard/
├── index.html              # Main dashboard/navigation
├── decision-center.html    # Decision tracking page
├── research-library.html   # Research organization page
├── week-review.html        # Weekly review timeline
├── styles.css              # Shared styles
├── app.js                  # Core utilities & data
├── decision-center.js      # Decision page logic
├── research-library.js     # Research page logic
├── week-review.js          # Review page logic
└── README.md               # This file
```

## Data Storage

All data is stored in browser LocalStorage under these keys:
- `brain_decisions` - Decision tracking data
- `brain_research` - Research & findings
- `brain_timeline` - Activity timeline
- `brain_settings` - User preferences

### Sample Data
The app includes sample data on first load to demonstrate features. You can:
- Add new items using the + button
- Edit/delete by modifying localStorage
- Clear all: `localStorage.clear()`

## Mobile Optimization

- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Responsive Design**: Adapts from 320px to 800px+ screens
- **Smooth Animations**: CSS transitions for better UX
- **Swipe-Friendly**: Horizontal scrolling filter bars
- **Dark Theme**: Reduces eye strain on mobile

## Keyboard Shortcuts

- **Enter** in search: Execute search
- **Click badge numbers**: Quick filter
- **+ FAB button**: Add new item

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Safari (iOS 12+)
- ✅ Firefox (latest)
- ✅ Mobile browsers

## Future Enhancements

### Planned Features
- [ ] Cloud sync (optional Firebase/Supabase integration)
- [ ] Export to JSON/Markdown
- [ ] Calendar integration
- [ ] Voice notes
- [ ] Rich text editor
- [ ] Image attachments
- [ ] Collaboration features
- [ ] AI-powered insights

### Potential Integrations
- Telegram bot for quick capture
- Email parsing for automatic entries
- Calendar events → timeline
- GitHub activity tracking
- Reading list import

## Development

### Adding New Decision
```javascript
const newDecision = {
    id: 'd' + Date.now(),
    title: 'Your decision title',
    description: 'Description...',
    status: 'pending',
    createdAt: new Date().toISOString(),
    options: [
        {
            name: 'Option A',
            pros: ['Pro 1', 'Pro 2'],
            cons: ['Con 1', 'Con 2']
        }
    ],
    recommendation: 'Your recommendation',
    priority: 'high'
};
```

### Adding New Research
```javascript
const newResearch = {
    id: 'r' + Date.now(),
    title: 'Research topic',
    topic: 'tech',
    details: 'Overview...',
    createdAt: new Date().toISOString(),
    keyFindings: ['Finding 1', 'Finding 2'],
    sources: [
        { name: 'Source', url: 'https://...' }
    ],
    tags: ['tag1', 'tag2']
};
```

### Adding Timeline Event
```javascript
const newEvent = {
    id: 't' + Date.now(),
    date: new Date().toISOString(),
    type: 'conversation',
    title: 'Event title',
    description: 'What happened...',
    category: 'development',
    actions: ['Action 1', 'Action 2']
};
```

## Customization

### Colors (styles.css)
Edit CSS variables in `:root`:
```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --success: #10b981;      /* Success/complete */
    --warning: #f59e0b;      /* Warnings/pending */
    --danger: #ef4444;       /* Errors/critical */
    --bg: #0f172a;           /* Background */
    --text: #f1f5f9;         /* Text color */
}
```

### Add New Category
1. Add to filter bar in HTML
2. Update filter logic in JS
3. Add icon mapping in helper functions

## Tips & Best Practices

### Decision Making
- Add decisions as soon as you face them
- Document all options, even "do nothing"
- Weight pros/cons by importance
- Set deadlines for pending decisions
- Review decided items monthly

### Research Organization
- One topic per entry
- Highlight 3-5 key findings max
- Always cite sources
- Tag liberally for easy discovery
- Link related topics

### Weekly Review
- Review every Friday/Sunday
- Archive completed actions
- Identify patterns in timeline
- Update next actions
- Celebrate progress!

## License

MIT License - Use freely for personal or commercial projects

## Credits

Built with ❤️ for personal knowledge management enthusiasts
