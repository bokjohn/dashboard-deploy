# Dashboard Update Guide

Quick reference for common dashboard updates. **Always validate before pushing!**

## 🚀 Quick Workflow

1. Edit `data.json`
2. Run `node validate.js`
3. If ✅ passes → commit & push
4. If ❌ fails → fix errors, repeat step 2

---

## 📝 Common Updates

### Update a Todo's Status

**Mark as done:** No need to edit data.json! The dashboard uses localStorage. Just click the checkbox in the browser.

**Change priority:**
```json
{
  "id": "sean-1",
  "priority": "urgent"  // Change to: urgent, normal, or low
}
```

### Add a New Todo

Copy this template:
```json
{
  "id": "sean-4",  // Increment number
  "title": "Your Task Title",
  "summary": "One-line description",
  "priority": "normal",
  "steps": [
    "Step 1",
    "Step 2"
  ],
  "impact": "Why this matters (optional)"
}
```

Add to `todos.sean` or `todos.jon` array.

### Remove a Todo

Just delete the entire todo object from the array. Don't forget to remove the trailing comma if it's the last item!

### Update Project Status

```json
{
  "id": "proj-1",
  "status": "yellow",  // green, yellow, or red
  "completion": 65,    // 0-100
  "nextStep": "What needs to happen next"
}
```

### Mark Milestone Complete

```json
{
  "name": "Milestone name",
  "done": true,      // Change false → true
  "progress": 100    // Update progress
}
```

### Add a Blocker

```json
{
  "projects": [
    {
      "blockers": [
        "Existing blocker",
        "New blocker you're adding"
      ]
    }
  ]
}
```

### Update Stats

```json
{
  "stats": {
    "activeProjects": 4,        // Update count
    "monthlyTarget": "$10,000"  // Update target
  }
}
```

### Update Last Modified Time

```json
{
  "lastUpdate": "2026-01-27T10:30:00-08:00"
}
```

Get current timestamp:
```bash
date -u +"%Y-%m-%dT%H:%M:%S%z" | sed 's/\([0-9][0-9]\)$/:\1/'
```

Or just use: `2026-01-27T10:30:00-08:00` format

---

## ⚠️ Common Mistakes & Fixes

### Trailing Commas
❌ **Wrong:**
```json
{
  "steps": [
    "Step 1",
    "Step 2",  // ← Extra comma before closing bracket
  ]
}
```

✅ **Correct:**
```json
{
  "steps": [
    "Step 1",
    "Step 2"
  ]
}
```

### Missing Commas
❌ **Wrong:**
```json
{
  "id": "sean-1"
  "title": "Task"  // ← Missing comma between fields
}
```

✅ **Correct:**
```json
{
  "id": "sean-1",
  "title": "Task"
}
```

### Quote Types
❌ **Wrong:**
```json
{
  "title": "Task's name"  // ← Unescaped quote
}
```

✅ **Correct:**
```json
{
  "title": "Task's name"  // Use smart quotes or escape
}
```

Or:
```json
{
  "title": "Task\\'s name"  // Escape with backslash
}
```

---

## 🧪 Testing Your Changes

### Test locally first:
```bash
node validate.js data.json
```

### If you want to test invalid data:
```bash
node validate.js test-data-invalid.json
```
This should fail with multiple errors (it's a test file showing what NOT to do).

### Preview in browser:
1. Open `index.html` in a browser
2. Hard refresh to clear cache: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Open console (F12) to check for JavaScript errors

---

## 🎯 Pro Tips

### Use a JSON editor
- VS Code has built-in JSON validation
- Enable "Format on Save" to auto-fix indentation

### Validate before committing
Create a git hook (see SCHEMA.md) to auto-validate

### Keep a backup
Before major changes:
```bash
cp data.json data.json.backup
```

### Small changes first
Make one change at a time, validate after each change. Easier to find errors!

---

## 🆘 Troubleshooting

### "JSON Syntax Error"
- Use https://jsonlint.com to find the exact syntax issue
- Common causes: missing/extra commas, unmatched brackets, unescaped quotes

### "Validation failed but I don't see the error"
- Read the error path carefully: `root.todos.sean[0].title` means:
  - In the `todos` object
  - In the `sean` array
  - First item (index 0)
  - The `title` field

### "Dashboard shows old data"
- Hard refresh: `Cmd+Shift+R` or `Ctrl+Shift+R`
- Clear cache completely
- Check that you pushed changes to GitHub (if using GitHub Pages)

### "Changes pushed but dashboard still broken"
- Run `node validate.js` - did it actually pass?
- Check browser console (F12) for JavaScript errors
- Verify the file was actually updated (check on GitHub)

---

## 📋 Checklist for Updates

- [ ] Made changes to `data.json`
- [ ] Ran `node validate.js data.json`
- [ ] Validation passed ✅
- [ ] Updated `lastUpdate` timestamp
- [ ] Tested in browser locally
- [ ] Committed with descriptive message
- [ ] Pushed to repository
- [ ] Verified live dashboard updated

---

## 🔗 Related Files

- **SCHEMA.md** - Full documentation of the data structure
- **schema.json** - The formal schema definition
- **validate.js** - The validation script
- **data.json** - Your data (edit this!)
