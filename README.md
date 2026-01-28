# 📊 Sean's Business Dashboard

A single-page HTML dashboard for tracking business research and operations. Fully offline-ready with dynamic data loading from JSON.

## 🚀 Quick Start

1. **Open the dashboard:**
   ```bash
   open /Users/clawd/clawd/dashboard/index.html
   ```
   Or simply double-click `index.html` in Finder.

2. **The dashboard will automatically load data from `data.json`**

That's it! No server, no installation, no dependencies.

---

## 📁 File Structure

```
dashboard/
├── index.html      # Main dashboard (all-in-one file)
├── data.json       # Your business data (edit this!)
└── README.md       # This file
```

---

## ✏️ Updating Your Data

All dashboard content comes from `data.json`. Edit this file to update:
- Business model research
- Active projects
- Todo items
- Recent completions
- Next actions

### Data Structure Overview

```json
{
  "businessModels": [ ... ],      // Research hub cards
  "commandCenter": {
    "activeProjects": [ ... ],    // Projects with progress
    "todos": [ ... ],             // Todo list items
    "recentCompletions": [ ... ], // Recent wins
    "nextActions": [ ... ]        // Highlighted next steps
  }
}
```

---

## 📝 Editing Business Models

Each business model card has this structure:

```json
{
  "id": 1,
  "title": "AI Automation Agency",
  "summary": "Short 2-3 sentence description",
  "revenueScore": 8,          // 1-10 scale
  "profitMargin": 75,         // Percentage (0-100)
  "automationPercent": 40,    // Percentage (0-100)
  "timeToProfit": 2,          // Months
  "capitalNeeded": "low",     // "low", "medium", or "high"
  "details": {
    "caseStudy": "Real-world example with numbers...",
    "cac": "Customer acquisition cost details...",
    "marketingPlan": "How to market this business..."
  }
}
```

### To Add a New Business Model:

1. Open `data.json`
2. Copy an existing business model object
3. Paste it into the `businessModels` array
4. Update all fields with your new data
5. Make sure `id` is unique
6. Save the file
7. Refresh the dashboard

**Example:**

```json
{
  "id": 11,
  "title": "Freelance Consulting",
  "summary": "Leverage expertise to consult. Low overhead, immediate income.",
  "revenueScore": 7,
  "profitMargin": 95,
  "automationPercent": 20,
  "timeToProfit": 1,
  "capitalNeeded": "low",
  "details": {
    "caseStudy": "Consultant earning $10k/mo with 5 clients at $2k each.",
    "cac": "$0 via referrals and LinkedIn",
    "marketingPlan": "Position as expert → Write LinkedIn posts → Get referrals."
  }
}
```

---

## 📋 Editing Projects

Projects appear in the Command Center's "Active Projects" section.

```json
{
  "id": 1,
  "name": "AI Chatbot MVP",
  "progress": 65,              // 0-100
  "dueDate": "2025-02-15",     // YYYY-MM-DD format
  "status": "on-track"         // "on-track", "ahead", or "behind"
}
```

**Status affects the visual badge color:**
- `on-track` → Green
- `ahead` → Blue
- `behind` → Red

---

## ✅ Editing Todos

Todo items with priority indicators:

```json
{
  "id": 1,
  "task": "Finish chatbot demo for first client pitch",
  "priority": "high",          // "high", "medium", or "low"
  "dueDate": "2025-01-18"      // YYYY-MM-DD format
}
```

**Priority affects the left border color:**
- `high` → Red
- `medium` → Yellow
- `low` → Green

---

## 🎯 Editing Next Actions

Simple string array for highlighted action items:

```json
"nextActions": [
  "Schedule client demo call for Friday",
  "Batch-write newsletter content for next 4 weeks",
  "Test Facebook ads for POD store ($50 budget)"
]
```

These appear with a gradient background and lightning bolt icon.

---

## ✨ Editing Recent Completions

Track your wins:

```json
{
  "id": 1,
  "task": "Domain + hosting setup for lead gen site",
  "completedDate": "2025-01-14"  // YYYY-MM-DD format
}
```

---

## 🎨 Features

### Research Hub
- **10 expandable business cards** (click to expand)
- **Sortable** by revenue, profit, automation, or speed
- **Filterable** by capital requirements (low/medium/high)
- **Search** across titles and summaries
- **Visual metrics** with progress bars

### Command Center
- **Active projects** with progress tracking
- **Todo list** with priority indicators
- **Recent wins** for motivation
- **Next actions** prominently highlighted

### UI Features
- **Dark/light mode toggle** (saves preference)
- **Fully responsive** (mobile, tablet, desktop)
- **Smooth animations** and transitions
- **Offline-ready** (no internet required)
- **Tab navigation** between sections

---

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `index.html` (lines ~20-35):

```css
:root {
    --accent: #4a9eff;        /* Main accent color */
    --success: #34a853;       /* Green for success */
    --warning: #fbbc04;       /* Yellow for warnings */
    --danger: #ea4335;        /* Red for alerts */
}
```

### Adding More Business Models

No limit! Add as many as you want to the `businessModels` array.

### Removing Sections

To hide sections (e.g., "Recent Wins"), remove the corresponding HTML block in `index.html` or simply empty the data array in `data.json`.

---

## 💡 Tips

1. **Keep summaries concise** (2-3 sentences max)
2. **Use realistic metrics** for better decision-making
3. **Update regularly** to track progress
4. **Archive old projects** by removing them from `data.json`
5. **Back up your `data.json`** before major edits

---

## 🐛 Troubleshooting

**Dashboard is blank or shows an error:**
- Make sure `data.json` is in the same folder as `index.html`
- Check that `data.json` is valid JSON (use a validator like jsonlint.com)
- Open browser console (F12) to see error messages

**Changes not showing:**
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache

**Cards not expanding:**
- Make sure you're clicking on the card itself (not just hovering)

---

## 📱 Mobile Access

To access on your phone:
1. Sync the `dashboard/` folder to cloud storage (iCloud, Dropbox, etc.)
2. Open `index.html` from your phone's cloud app
3. Or host it locally and access via your local network IP

---

## 🔄 Updating the Dashboard

The dashboard file (`index.html`) is self-contained. To update:
1. Keep `data.json` in the same folder
2. Replace `index.html` with a new version
3. Your data persists!

---

## 📊 Example Workflow

**Morning:**
1. Check Command Center → Review todos
2. Update project progress in `data.json`
3. Add any new completions from yesterday

**Research Session:**
1. Switch to Research Hub tab
2. Use filters to narrow down by capital/speed
3. Click cards to read full details
4. Add new business models as you research

**End of Day:**
1. Mark todos complete → Move to recent completions
2. Update project progress percentages
3. Add tomorrow's next actions

---

## 🚀 Next Steps

Ideas for enhancement:
- Add your own business model categories
- Track revenue projections
- Add notes or journal entries
- Export data to CSV
- Integrate with your actual project management tools

---

**Made for Sean by Clawdbot** 🤖

Questions? Check the code comments in `index.html` or ask Clawdbot to modify anything!
