# Deploying sprawdz.app

## Recommended: GitHub Pages (Free, zero maintenance)

### One-time setup (~5 minutes)

1. **Create a GitHub repo** for the website:
   ```
   cd website/
   git init
   git add .
   git commit -m "Initial sprawdz.app website"
   git remote add origin https://github.com/YOUR_USERNAME/sprawdz-app.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repo Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `main`, folder: `/ (root)`
   - Save

3. **Point GoDaddy DNS to GitHub Pages:**
   - In GoDaddy DNS settings for `sprawdz.app`:
     - Add **A records** pointing to GitHub's IPs:
       ```
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```
     - Add **CNAME** record: `www` -> `YOUR_USERNAME.github.io`
   - In GitHub repo Settings > Pages > Custom domain:
     - Enter `sprawdz.app`
     - Check "Enforce HTTPS" (may take up to 24h for SSL cert)

4. **Add CNAME file** to the repo root:
   ```
   echo "sprawdz.app" > CNAME
   git add CNAME && git commit -m "Add custom domain" && git push
   ```

5. **Wait for DNS propagation** (usually 10-30 minutes, max 48 hours).

### Updating the site
```
# Make changes to HTML/CSS/JS
git add . && git commit -m "Update" && git push
# Changes go live in ~1 minute
```

---

## Alternative: Cloudflare Pages (Also free, faster CDN)

1. Push code to GitHub (same as above)
2. Go to https://dash.cloudflare.com > Pages > Create project
3. Connect GitHub repo
4. Build settings: leave blank (static site, no build needed)
5. Deploy
6. In Cloudflare DNS, add the `sprawdz.app` domain
7. Transfer nameservers from GoDaddy to Cloudflare (Cloudflare will guide you)

---

## Alternative: Netlify (Free tier, drag-and-drop)

1. Go to https://app.netlify.com
2. Drag the `website/` folder onto the deploy area
3. Site goes live instantly at a random netlify.app URL
4. Go to Domain settings > Add custom domain > `sprawdz.app`
5. Update GoDaddy DNS: CNAME `@` -> your-site.netlify.app

---

## File structure

```
website/
  index.html    — Single-page landing (bilingual PL/EN)
  style.css     — Responsive styles
  script.js     — Language toggle + scroll animations
  CNAME         — GitHub Pages custom domain (add after setup)
  DEPLOY.md     — This file
```

## Notes

- The site is 100% static — no server, no database, no build step
- All three hosting options are free with custom domain support
- HTTPS is automatic on all three platforms
- The site auto-detects browser language (Polish vs English)
- Replace `og-image.png` meta tag with a real image when you have one
- Update the App Store link when the app is published
