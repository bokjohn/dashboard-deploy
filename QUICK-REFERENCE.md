# Dashboard Quick Reference Card

Keep this handy! ⭐

## ⚡ 3-Step Update Process

```bash
1. Edit data.json
2. ./validate.sh
3. git commit && git push
```

**Never skip step 2!**

---

## 📝 Required Fields

### Todo
- `id` (sean-X or jon-X)
- `title` (string)
- `summary` (string)
- `priority` (urgent/normal/low)
- `steps` (array, ≥1 item)

### Project
- `id` (proj-X)
- `name` (string)
- `status` (green/yellow/red)
- `completion` (0-100)
- `nextStep` (string)
- `details` (string)
- `milestones` (array)
- `blockers` (array)
- `timeline` (string)

### Milestone
- `name` (string)
- `done` (boolean)

---

## 🎨 Valid Values

| Field | Valid Values |
|-------|-------------|
| `priority` | urgent, normal, low |
| `status` | green, yellow, red |
| `completion` | 0-100 |
| `done` | true, false |

---

## 🚨 Common Errors

| Error | Fix |
|-------|-----|
| Missing comma | Add `,` between fields |
| Trailing comma | Remove last `,` before `]` or `}` |
| Wrong ID format | Use: sean-1, jon-2, proj-3 |
| Invalid enum | Check spelling: urgent not URGENT |
| Empty array | Must have ≥1 item: `["item"]` |
| Wrong type | "50" → 50, true → "true", etc. |

---

## 📖 Documentation

| File | Use For |
|------|---------|
| **UPDATE-GUIDE.md** | Common updates |
| **TEMPLATES.md** | Copy-paste templates |
| **SCHEMA.md** | Full field docs |
| **README.md** | Getting started |

---

## 🧪 Testing

```bash
# Validate current data
./validate.sh

# View in browser
open index.html

# Hard refresh
Cmd+Shift+R
```

---

## 💾 Safety

```bash
# Backup before major changes
cp data.json data.json.backup

# Restore if needed
cp data.json.backup data.json
```

---

## 🆘 Help

1. Run `./validate.sh` - read errors carefully
2. Check **UPDATE-GUIDE.md** for examples
3. Use https://jsonlint.com for syntax errors
4. Look at current data.json for working examples

---

## ✨ Pro Tips

- Make one change at a time
- Validate after each change
- Use VS Code for JSON editing
- Keep this card visible while editing!

---

**Remember:** The validator is your friend! It prevents broken dashboards. Always validate before committing. 🛡️
