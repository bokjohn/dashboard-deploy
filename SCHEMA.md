# Mission Control Dashboard - Data Schema Documentation

This document explains the **exact structure** that `data.json` must follow. Following this schema ensures the dashboard won't break.

## 🔧 Quick Validation

**Before pushing updates**, always run:
```bash
node validate.js data.json
```

If validation fails, the script will tell you exactly what's wrong.

---

## 📋 Complete Schema

### Root Structure

```json
{
  "lastUpdate": "2026-01-26T19:14:00-08:00",
  "stats": { ... },
  "todos": { ... },
  "projects": [ ... ]
}
```

**Required fields:**
- `lastUpdate` (string, ISO 8601 format)
- `stats` (object)
- `todos` (object)
- `projects` (array)

---

## 📊 Stats Object

```json
{
  "stats": {
    "activeProjects": 3,
    "monthlyTarget": "$5,000"
  }
}
```

**Required fields:**
- `activeProjects` (number, >= 0)
- `monthlyTarget` (string, format: `$X,XXX`)

---

## ✅ Todos Object

```json
{
  "todos": {
    "sean": [ ... ],
    "jon": [ ... ]
  }
}
```

**Required fields:**
- `sean` (array of todo objects)
- `jon` (array of todo objects)

### Todo Object Structure

```json
{
  "id": "sean-1",
  "title": "Task Title",
  "summary": "One-line description",
  "priority": "urgent",
  "steps": [
    "Step 1",
    "Step 2"
  ],
  "why": "Optional: Why this matters",
  "blocksWhat": "Optional: What this blocks",
  "alternatives": "Optional: Other approaches",
  "impact": "Optional: Expected impact"
}
```

**Required fields:**
- `id` (string, format: `sean-X` or `jon-X`)
- `title` (string, non-empty)
- `summary` (string, non-empty)
- `priority` (string, must be: `urgent`, `normal`, or `low`)
- `steps` (array of strings, at least 1 step)

**Optional fields:**
- `why` (string)
- `blocksWhat` (string)
- `alternatives` (string)
- `impact` (string)

---

## 🎯 Projects Array

```json
{
  "projects": [
    {
      "id": "proj-1",
      "name": "Project Name",
      "status": "yellow",
      "completion": 45,
      "nextStep": "What's next",
      "details": "Full description",
      "milestones": [ ... ],
      "blockers": [ ... ],
      "timeline": "Target deadline"
    }
  ]
}
```

### Project Object Structure

**Required fields:**
- `id` (string, format: `proj-X`)
- `name` (string, non-empty)
- `status` (string, must be: `green`, `yellow`, or `red`)
- `completion` (number, 0-100)
- `nextStep` (string, non-empty)
- `details` (string, non-empty)
- `milestones` (array of milestone objects)
- `blockers` (array of strings)
- `timeline` (string, non-empty)

### Milestone Object Structure

```json
{
  "name": "Milestone name",
  "done": true,
  "progress": 100,
  "blocker": "Optional: What's blocking this"
}
```

**Required fields:**
- `name` (string, non-empty)
- `done` (boolean)

**Optional fields:**
- `progress` (number, 0-100)
- `blocker` (string)

---

## 🎨 Visual Guide: Status Colors

Projects use color-coded status:

- **🟢 Green** (`"status": "green"`) - On track, no issues
- **🟡 Yellow** (`"status": "yellow"`) - Minor blockers, needs attention
- **🔴 Red** (`"status": "red"`) - Blocked or critical issues

Todos use priority levels:

- **🔥 Urgent** (`"priority": "urgent"`) - Animated, needs immediate attention
- **📌 Normal** (`"priority": "normal"`) - Standard priority
- **💤 Low** (`"priority": "low"`) - Can wait

---

## ✏️ How to Update Safely

### 1. Make your changes to data.json

### 2. Validate before committing
```bash
node validate.js data.json
```

### 3. If validation passes:
```bash
git add data.json
git commit -m "Update dashboard: [your changes]"
git push
```

### 4. If validation fails:
- Read the error messages carefully
- Fix the issues listed
- Run `node validate.js` again
- Repeat until validation passes

---

## 🚨 Common Mistakes

### ❌ Wrong ID format
```json
{"id": "task-1"}  // WRONG - should be sean-1 or jon-1
```
✅ Correct:
```json
{"id": "sean-1"}
```

### ❌ Invalid status/priority
```json
{"status": "ok"}  // WRONG - must be green/yellow/red
{"priority": "high"}  // WRONG - must be urgent/normal/low
```
✅ Correct:
```json
{"status": "green"}
{"priority": "urgent"}
```

### ❌ Missing required fields
```json
{
  "id": "sean-1",
  "title": "Do thing"
  // MISSING: summary, priority, steps
}
```

### ❌ Empty arrays where items required
```json
{"steps": []}  // WRONG - must have at least 1 step
```
✅ Correct:
```json
{"steps": ["Step 1"]}
```

### ❌ Wrong data types
```json
{"completion": "50%"}  // WRONG - must be number 50
{"done": "true"}  // WRONG - must be boolean true
```
✅ Correct:
```json
{"completion": 50}
{"done": true}
```

---

## 📝 Example: Adding a New Todo

```json
{
  "id": "sean-4",
  "title": "New Task",
  "summary": "Brief description of what needs doing",
  "priority": "normal",
  "steps": [
    "1. First step",
    "2. Second step",
    "3. Third step"
  ],
  "impact": "Why this matters"
}
```

Add to the appropriate array (`todos.sean` or `todos.jon`), then validate!

---

## 📝 Example: Adding a New Project

```json
{
  "id": "proj-4",
  "name": "New Project",
  "status": "green",
  "completion": 0,
  "nextStep": "Get started",
  "details": "Detailed description of the project goals and scope.",
  "milestones": [
    {
      "name": "Initial setup",
      "done": false,
      "progress": 0
    }
  ],
  "blockers": [],
  "timeline": "Target: Complete by Feb 15"
}
```

Add to the `projects` array, update `stats.activeProjects` if needed, then validate!

---

## 🔄 Automation Tips

### Auto-validate on commit (optional)

Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
node validate.js data.json
if [ $? -ne 0 ]; then
  echo "❌ Validation failed! Fix errors before committing."
  exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

Now git will automatically validate before every commit!

---

## 🆘 Still Having Issues?

1. **JSON syntax error?** Use a JSON validator like https://jsonlint.com
2. **Validation failing?** Read error messages carefully - they tell you exactly what's wrong
3. **Dashboard not updating?** Clear browser cache (Cmd+Shift+R on Mac)
4. **Data correct but still breaking?** Check browser console (F12) for JavaScript errors

---

## 📚 Additional Resources

- **schema.json** - The formal JSON Schema definition
- **validate.js** - The validation script
- **data.json** - Your actual data (edit this)
- **index.html** - The dashboard (don't edit unless you know what you're doing)

**Rule of thumb:** Only edit `data.json`, and always validate before pushing!
