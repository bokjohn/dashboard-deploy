# ⚡ Quick Start Guide

Get your 2nd Brain Dashboard running in 60 seconds!

## 1️⃣ Launch (Pick One)

### Option A: Python (Easiest)
```bash
cd dashboard
python3 -m http.server 3000
```

### Option B: Node.js
```bash
cd dashboard
npx serve -p 3000
```

### Option C: Just Open It
```bash
cd dashboard
open index.html
```
*(Works but no service worker/PWA features)*

## 2️⃣ Open in Browser

Navigate to: **http://localhost:3000**

You should see:
```
🧠 2nd Brain
Your Personal Knowledge Hub

[⚖️ Decision Center]  [📚 Research Library]  [📅 Week in Review]
```

## 3️⃣ Explore the Pages

### Decision Center ⚖️
- View 3 sample decisions
- Filter by status (All/Pending/Decided)
- See pros/cons analysis
- Check AI recommendations
- Click **+** to add new decision

### Research Library 📚
- Browse 3 research topics
- Search across all content
- Filter by category (Tech/Business/Personal)
- View key findings highlighted
- Click **+** to add new research

### Week in Review 📅
- See 6 timeline events
- View progress summary
- Check next actions
- Toggle time periods (7/14/30 days)
- Mark actions complete

## 4️⃣ Add to Mobile

### iOS (Safari)
1. Open http://localhost:3000 on iPhone
2. Tap **Share** button (square with arrow)
3. Scroll down, tap **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon appears on home screen!

### Android (Chrome)
1. Open http://localhost:3000 on Android
2. Tap **menu** (three dots)
3. Tap **"Install app"** or **"Add to Home Screen"**
4. Tap **"Install"**
5. App appears in app drawer!

## 5️⃣ Customize

### Change Colors
Edit `styles.css` line 1-10:
```css
:root {
    --primary: #6366f1;    /* Change to your color */
    --success: #10b981;    /* Green */
    --warning: #f59e0b;    /* Orange */
    --bg: #0f172a;         /* Background */
}
```

### Add Your Data

Click the **+** button on each page, or edit localStorage:

**Browser Console** (F12):
```javascript
// View current data
console.log(localStorage);

// Clear all data and reload
localStorage.clear();
location.reload();

// Export data
const data = {
  decisions: JSON.parse(localStorage.brain_decisions),
  research: JSON.parse(localStorage.brain_research),
  timeline: JSON.parse(localStorage.brain_timeline)
};
console.log(JSON.stringify(data, null, 2));
```

## 6️⃣ Deploy Online (Optional)

### GitHub Pages (Free)
```bash
# In dashboard directory
git init
git add .
git commit -m "My 2nd Brain"
git branch -M main

# Create repo at github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/2nd-brain
git push -u origin main

# Enable Pages: Settings → Pages → Source: main
# Visit: https://YOUR-USERNAME.github.io/2nd-brain
```

### Netlify (Drag & Drop)
1. Go to https://app.netlify.com/drop
2. Drag the `dashboard` folder
3. Done! Get instant URL

## 🎯 Usage Tips

### Decision Making
- Add decisions when you face choices
- Document all options (even "do nothing")
- Review pending decisions weekly
- Archive old decisions monthly

### Research Organization
- One topic per entry
- Highlight 3-5 key findings
- Always add sources
- Tag liberally for search

### Weekly Review
- Do every Friday or Sunday
- Review timeline for patterns
- Update next actions
- Celebrate progress!

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Try different port
python3 -m http.server 8000
```

### Styles not loading?
```bash
# Check you're in the dashboard directory
pwd  # Should end with /dashboard

# Verify files exist
ls *.css *.js *.html
```

### Data not saving?
- Check browser isn't in incognito/private mode
- Verify localStorage isn't disabled
- Try different browser

### Mobile app not installing?
- Must use HTTPS (deploy online first)
- Or use local IP: http://192.168.1.X:3000
- Check manifest.json is accessible

## 📚 Next Steps

- ✅ **Read** `README.md` for full documentation
- ✅ **Check** `DEPLOYMENT.md` for hosting options  
- ✅ **Review** `SUMMARY.md` for project details
- ✅ **Explore** the code to customize
- ✅ **Share** feedback and improvements!

## 💡 Pro Tips

1. **Backup regularly** - Export localStorage to JSON
2. **Use search** - Faster than scrolling
3. **Review weekly** - Keep system current
4. **Tag everything** - Makes finding easier
5. **Archive old items** - Keep dashboard clean
6. **Add on mobile** - Capture thoughts immediately

## 🚀 You're Ready!

Your 2nd Brain is now running. Start by:
1. Exploring the sample data
2. Adding your first real decision
3. Logging some research
4. Reviewing this week

**Have fun organizing your thoughts!** 🧠✨

---

**Need help?** Check README.md or open an issue.
**Found a bug?** Edit the code and fix it!
**Want more features?** Contributions welcome!
