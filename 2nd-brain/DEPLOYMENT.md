# 🚀 Deployment Guide

Quick guide to deploy your 2nd Brain Dashboard to various platforms.

## Local Development

### Python (Quickest)
```bash
cd dashboard
python3 -m http.server 8000
# Open http://localhost:8000
```

### Node.js
```bash
cd dashboard
npx serve -p 8000
# Open http://localhost:8000
```

### PHP
```bash
cd dashboard
php -S localhost:8000
```

## Static Hosting (Free Options)

### 1. GitHub Pages (Free)
```bash
# Create repo and push
git init
git add .
git commit -m "Initial dashboard"
git branch -M main
git remote add origin https://github.com/username/2nd-brain
git push -u origin main

# Enable GitHub Pages
# Settings → Pages → Source: main branch
# Your site: https://username.github.io/2nd-brain
```

### 2. Netlify (Free)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd dashboard
netlify deploy --prod
```

Or use drag-and-drop: https://app.netlify.com/drop

### 3. Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd dashboard
vercel --prod
```

### 4. Cloudflare Pages (Free)
1. Push to GitHub
2. Go to https://pages.cloudflare.com
3. Connect repository
4. Deploy!

### 5. Firebase Hosting (Free)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init hosting

# Deploy
firebase deploy
```

## Mobile Access

### iOS (PWA)
1. Open dashboard in Safari
2. Tap Share button
3. "Add to Home Screen"
4. Done! Acts like a native app

### Android (PWA)
1. Open dashboard in Chrome
2. Tap menu (⋮)
3. "Install app" or "Add to Home Screen"
4. Done!

## Custom Domain

### Netlify
```bash
# netlify.toml
[build]
  publish = "."

# Add custom domain in Netlify dashboard
# Settings → Domain management → Add custom domain
```

### Vercel
```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Environment-Specific Configs

### Production Optimizations
```html
<!-- Add to <head> for production -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'">
<link rel="preload" as="style" href="styles.css">
<link rel="preload" as="script" href="app.js">
```

### Service Worker (Offline Support)
Create `sw.js`:
```javascript
const CACHE_NAME = 'brain-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/decision-center.html',
  '/research-library.html',
  '/week-review.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register in `index.html`:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## Backup & Export

### Export Data
Add this to app.js:
```javascript
function exportData() {
  const data = {
    decisions: DB.get(DB.KEYS.DECISIONS),
    research: DB.get(DB.KEYS.RESEARCH),
    timeline: DB.get(DB.KEYS.TIMELINE),
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `brain-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}
```

### Import Data
```javascript
function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    DB.set(DB.KEYS.DECISIONS, data.decisions);
    DB.set(DB.KEYS.RESEARCH, data.research);
    DB.set(DB.KEYS.TIMELINE, data.timeline);
    location.reload();
  };
  reader.readAsText(file);
}
```

## Security Considerations

### LocalStorage Only (Current)
- ✅ Private - stays on device
- ✅ Fast - no network calls
- ❌ No sync across devices
- ❌ Lost if browser data cleared

### Future: Add Cloud Sync
- Use Firebase/Supabase for backend
- Encrypt sensitive data client-side
- Implement user authentication
- Add conflict resolution

## Performance Tips

1. **Minimize animations** on slower devices
2. **Lazy load** timeline items (paginate)
3. **Debounce search** input (300ms)
4. **Use CSS containment** for better scrolling
5. **Compress images** if adding media support

## Monitoring

### Simple Analytics (Privacy-Friendly)
```html
<!-- Add to <head> -->
<script async defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

### Error Tracking
```javascript
window.addEventListener('error', (e) => {
  console.error('Error:', e.error);
  // Send to error tracking service
});
```

## Updates & Versioning

Use semantic versioning in manifest.json:
```json
{
  "version": "1.0.0",
  "name": "2nd Brain Dashboard"
}
```

Check for updates:
```javascript
const APP_VERSION = '1.0.0';
const storedVersion = localStorage.getItem('app_version');

if (storedVersion !== APP_VERSION) {
  // Show update notification
  localStorage.setItem('app_version', APP_VERSION);
}
```

## Troubleshooting

### Styles not loading
- Check file paths are relative
- Verify CSS file exists
- Clear browser cache (Cmd+Shift+R)

### LocalStorage not saving
- Check browser privacy settings
- Ensure not in incognito mode
- Verify storage quota not exceeded

### PWA not installable
- Must be served over HTTPS
- Requires manifest.json
- Need service worker (optional but recommended)

## Next Steps

1. ✅ Deploy to GitHub Pages or Netlify
2. ✅ Add to home screen on mobile
3. ⬜ Set up automated backups
4. ⬜ Add cloud sync (optional)
5. ⬜ Customize colors/branding
6. ⬜ Integrate with other tools

---

**Need help?** Check README.md for detailed documentation.
