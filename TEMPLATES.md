# Quick Templates for Dashboard Updates

Copy-paste templates for common updates. Remember to validate after changes!

## 📝 New Todo Template

### Minimal (required fields only)
```json
{
  "id": "sean-X",
  "title": "Task Title",
  "summary": "Brief description",
  "priority": "normal",
  "steps": [
    "Step 1",
    "Step 2"
  ]
}
```

### Complete (with all optional fields)
```json
{
  "id": "sean-X",
  "title": "Task Title",
  "summary": "Brief description of what needs to be done",
  "priority": "urgent",
  "steps": [
    "1. First step",
    "2. Second step",
    "3. Third step"
  ],
  "why": "Explanation of why this matters",
  "blocksWhat": "What this task is blocking",
  "alternatives": "Alternative approaches if blocked",
  "impact": "Expected impact of completing this"
}
```

**Remember:**
- ID format: `sean-X` or `jon-X` (X = number)
- Priority: `urgent`, `normal`, or `low`
- At least 1 step required

---

## 🎯 New Project Template

### Minimal
```json
{
  "id": "proj-X",
  "name": "Project Name",
  "status": "green",
  "completion": 0,
  "nextStep": "Get started",
  "details": "Project description",
  "milestones": [],
  "blockers": [],
  "timeline": "Target deadline"
}
```

### Complete
```json
{
  "id": "proj-X",
  "name": "Project Name",
  "status": "green",
  "completion": 25,
  "nextStep": "Complete initial setup phase",
  "details": "Detailed description of project goals, scope, and expected outcomes.",
  "milestones": [
    {
      "name": "Phase 1: Setup",
      "done": true,
      "progress": 100
    },
    {
      "name": "Phase 2: Development",
      "done": false,
      "progress": 50,
      "blocker": "Waiting for dependencies"
    },
    {
      "name": "Phase 3: Testing",
      "done": false,
      "progress": 0
    }
  ],
  "blockers": [
    "Blocker description 1",
    "Blocker description 2"
  ],
  "timeline": "Target: Complete by March 1, 2026"
}
```

**Remember:**
- ID format: `proj-X` (X = number)
- Status: `green`, `yellow`, or `red`
- Completion: 0-100
- Milestones can be empty array but must exist

---

## 🏁 New Milestone Template

```json
{
  "name": "Milestone name",
  "done": false,
  "progress": 0,
  "blocker": "Optional blocker description"
}
```

**Without blocker:**
```json
{
  "name": "Milestone name",
  "done": false,
  "progress": 0
}
```

**Completed:**
```json
{
  "name": "Milestone name",
  "done": true,
  "progress": 100
}
```

---

## 📊 Full data.json Skeleton

```json
{
  "lastUpdate": "2026-01-27T10:00:00-08:00",
  "stats": {
    "activeProjects": 3,
    "monthlyTarget": "$5,000"
  },
  "todos": {
    "sean": [
      {
        "id": "sean-1",
        "title": "Task",
        "summary": "Summary",
        "priority": "normal",
        "steps": ["Step 1"]
      }
    ],
    "jon": [
      {
        "id": "jon-1",
        "title": "Task",
        "summary": "Summary",
        "priority": "normal",
        "steps": ["Step 1"]
      }
    ]
  },
  "projects": [
    {
      "id": "proj-1",
      "name": "Project",
      "status": "green",
      "completion": 0,
      "nextStep": "Start",
      "details": "Description",
      "milestones": [],
      "blockers": [],
      "timeline": "Deadline"
    }
  ]
}
```

---

## 🔄 Update Examples

### Update completion percentage
```json
{
  "id": "proj-1",
  "completion": 75  // Update this number (0-100)
}
```

### Change project status
```json
{
  "id": "proj-1",
  "status": "yellow"  // green → yellow → red
}
```

### Add a blocker
```json
{
  "id": "proj-1",
  "blockers": [
    "Existing blocker",
    "New blocker"  // Add here
  ]
}
```

### Mark milestone done
```json
{
  "name": "Setup complete",
  "done": true,      // false → true
  "progress": 100    // Update progress too
}
```

### Update todo priority
```json
{
  "id": "sean-1",
  "priority": "urgent"  // normal → urgent
}
```

---

## 💡 Tips

1. **Copy the template** that matches your needs
2. **Fill in the values** 
3. **Increment IDs** (sean-3, sean-4, etc.)
4. **Validate** with `./validate.sh`
5. **Commit** if validation passes

---

## 🎨 Visual Reference

### Priority Levels
- 🔥 **urgent** - Red border, animated pulse
- 📌 **normal** - Standard styling
- 💤 **low** - De-emphasized

### Project Status
- 🟢 **green** - On track, no issues
- 🟡 **yellow** - Some blockers, needs attention
- 🔴 **red** - Critical issues, blocked

### Completion Ranges
- **0-25%** - Just started
- **26-50%** - Making progress
- **51-75%** - More than halfway
- **76-99%** - Almost done
- **100%** - Complete (consider archiving)

---

## ⚠️ Common Mistakes

❌ Forgetting commas between items
❌ Using wrong ID format (task-1 instead of sean-1)
❌ Using wrong enum values (high instead of urgent)
❌ Empty steps array
❌ Completion > 100 or < 0
❌ Forgetting to update lastUpdate timestamp

✅ Always validate!
✅ Check examples in current data.json
✅ Read error messages carefully
