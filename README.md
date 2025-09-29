# Updated System Design for Charity Website

## 1. Frontend (User Interface)

**Pages:** Home, About, News, Campaigns/Funding, Donate, Contact.

**Tech Stack:** HTML, CSS, JS, Tailwind CSS, Vite.

**Features:**

- Display campaign goals and progress.
- 'Donate' button integrated with NOWPayments for crypto donations.
- Static or manually updated news section.

---

## 2. Payment Handling

**Crypto Payments:** NOWPayments.

**Integration:**

- Embed donation button or use custom links.
- Optional automation via n8n for post-donation tasks.

---

## 3. Email System

**Manual Receipts:** Send styled email after confirming payment.

**Automated Receipts (Future):** n8n integration.

---

## 4. Hosting & Privacy

**Hosting:** Netlify, Vercel, GitHub Pages.

**Privacy Measures:**

- WHOIS/domain privacy enabled.
- Optional CDN/proxy (Cloudflare) to hide origin server.
- No personal info in public records.

---

## 5. Storage / Tracking

**Manual/Temporary:** Google Sheets or JSON file.

**Future DB:** Supabase, Firebase, or PostgreSQL for campaign & donation records.

---

## 6. System Flow

1. User visits site → sees campaigns & news.
2. Clicks 'Donate' → redirected to NOWPayments.
3. Payment confirmed → receipt sent manually or via n8n.
4. Campaign progress updated manually.

---

## 7. Tech Stack Summary

| Component          | Tools/Services                    |
| ------------------ | --------------------------------- |
| Frontend           | HTML, CSS, JS, Tailwind CSS, Vite |
| Payment Gateway    | NOWPayments                       |
| Automation         | n8n (optional)                    |
| Email System       | Manual or n8n integration         |
| Hosting            | Netlify, Vercel, GitHub Pages     |
| Privacy/Protection | WHOIS privacy, CDN/Proxy          |

---

## 8. How to Hide Hosting Service IP from Being Public

### Quick Setup (Use Cloudflare)

1. Sign up at Cloudflare and add your domain.
2. Scan DNS — Cloudflare will import your DNS records.
3. Enable proxy: for the site's A/AAAA/CNAME records, click the cloud to make it orange (proxied).
4. Change nameservers at your domain registrar to the ones Cloudflare gives you.
5. Wait for propagation (a few minutes → hours). Cloudflare now sits between users and your server.
6. Turn on SSL (Full or Full (strict)) in Cloudflare's SSL/TLS settings.
7. Enable security features — Firewall rules, Bot management, and Rate limiting if needed.

### Stop Leaking Your Origin IP

- Don't put the real server IP in other DNS records or public places.
- Lock your origin server so it only accepts traffic from Cloudflare IPs (use firewall rules).
- If you already published the IP, change it (get a new server IP or use a different host) and reapply the CDN.

### Extra Privacy Steps

- Enable WHOIS/domain privacy at your registrar.
- Use a business email (not your personal) or masking email for domain contact.
- Don't upload server banners, README files, or screenshots showing server/provider.

### If You Mean a Browser Proxy (For Browsing)

1. Get a proxy (paid or free) or use a VPN.
2. In browser settings → Network / Proxy → enter proxy host and port.
3. Test that your IP changed on a check site.

---

## 9. Suggested Enhancements for Charity Website

### **A. Transparency & Trust Section**

**Why:** Donors need to see their money is being used properly.

**What to add:**

- **Impact Dashboard:** Show real-time or updated metrics (e.g., "500 meals provided," "20 families helped")
- **Financial Transparency:** Breakdown of how donations are allocated (e.g., 85% program costs, 10% operations, 5% fundraising)
- **Blockchain Transaction Links:** Since you're using crypto, link to blockchain explorers so donors can verify transactions
- **Annual Reports:** Even simple PDFs showing what was accomplished each year
- **Testimonials/Stories:** Real stories from beneficiaries (with photos if possible, with consent)

---

### **B. Legal & Compliance**

**Why:** Protect yourself and give donors confidence.

**What to add:**

- **Terms of Service & Privacy Policy:** Required for GDPR/data protection
- **Charity Registration Info:** Display your charity registration number, tax-exempt status (if applicable)
- **Tax Receipt System:** Automated or semi-automated receipts that meet legal requirements for tax deductions
- **Refund Policy:** Clear policy on how refunds work (especially important for crypto)
- **Cookie Consent Banner:** If you use analytics/tracking

---

### **C. Donor Engagement Features**

**Why:** Keep donors connected and encourage repeat donations.

**What to add:**

- **Email Newsletter Signup:** Build a donor list for updates (use Mailchimp, ConvertKit, or n8n automation)
- **Donor Wall/Recognition:** Public thank you to donors (anonymous or named, their choice)
- **Recurring Donation Option:** Monthly giving increases lifetime value
- **Social Proof:** "X people donated this month" or "We're 80% to our goal"
- **Social Media Integration:** Links to your channels, embedded feeds showing impact

---

### **D. Analytics & Optimization**

**Why:** Understand what's working and improve conversion.

**What to add:**

- **Privacy-Friendly Analytics:** Plausible or Fathom (GDPR-compliant, no cookies)
- **Donation Funnel Tracking:** See where people drop off in the donation process
- **A/B Testing:** Test different campaign messaging or donate button placement
- **Heatmaps (optional):** Tools like Hotjar to see how users interact with your site

---

### **E. Security Enhancements**

**Why:** Protect donor data and build trust.

**What to add:**

- **SSL Certificate:** (You mentioned this, but emphasize it's mandatory)
- **Security Headers:** CSP, X-Frame-Options, HSTS via Cloudflare
- **DDoS Protection:** Cloudflare's free tier covers basics
- **Regular Backups:** Automated backups of your site and data
- **Incident Response Plan:** What you'll do if there's a breach or issue

---

### **F. Payment & Donation UX**

**Why:** Remove friction in the donation process.

**What to add:**

- **Multiple Payment Options:** Add Stripe/PayPal for non-crypto users (even if crypto is primary)
- **Preset Donation Amounts:** "$25, $50, $100, Custom" makes decisions easier
- **Mobile-Optimized Donation Flow:** Most traffic is mobile
- **Progress Indicators:** "Step 1 of 3" during checkout
- **Immediate Confirmation:** Thank you page + instant email confirmation

---

### **G. Content & Storytelling**

**Why:** Emotional connection drives donations.

**What to add:**

- **Video Content:** Short clips showing your work (YouTube embeds are free)
- **Photo Galleries:** Before/after, day-in-the-life of beneficiaries
- **Blog/Updates Section:** Regular posts about campaigns, success stories, challenges
- **FAQ Page:** Answer common donor questions upfront

---

### **H. Volunteer/Get Involved Section**

**Why:** Not everyone can donate money, but they can help other ways.

**What to add:**

- **Volunteer Sign-up Form:** Let people offer skills or time
- **Ambassador Program:** Let supporters fundraise on your behalf
- **Share Campaign Tools:** Easy buttons to share on social media
- **Partner With Us:** Corporate sponsorship opportunities

---

## 10. Priority Ranking

### **Must-Have (Add to Phase 1):**

1. Privacy Policy & Terms
2. SSL & Security Headers
3. Email Newsletter Signup
4. Basic Analytics
5. Mobile-Optimized Donation Flow

### **Should-Have (Add Soon After Launch):**

1. Impact Dashboard/Metrics
2. Testimonials/Stories
3. Tax Receipt System
4. Financial Transparency Page
5. FAQ Section

### **Nice-to-Have (Future Phases):**

1. Video Content
2. Recurring Donations
3. Volunteer Portal
4. A/B Testing
5. Donor Wall

---

## 11. Typography System

### **Font Roles**

- **Montserrat** — Headings, CTAs, buttons
- **Lato** — Body text, descriptions, paragraphs
- **Raleway** — Quotes, testimonials, accent text, pull quotes

### **Font Hierarchy**

- **Hero Titles:** Montserrat 800 (Extrabold) — Super bold, attention-grabbing
- **Main Headings:** Montserrat 700 (Bold) — Strong, clear hierarchy
- **Subheadings:** Montserrat 600 (Semibold) — Balanced weight
- **Body Text:** Lato 400 (Regular) — Readable, warm
- **Quotes:** Raleway 400 Italic — Elegant, distinctive
- **Accent Labels:** Raleway 500 (Medium) — Refined, sophisticated

### **Best Use Cases for Raleway**

- Testimonials and donor quotes
- Impact statements and statistics callouts
- Section labels/eyebrows (small, uppercase, tracked)
- Inspirational pull quotes
- Donor wall names (elegant touch)

### **Typography Guidelines**

- Keep body text at least 16px on mobile
- Maintain good contrast ratios (WCAG AA minimum)
- Don't go below 400 weight for body text
- Use Montserrat for buttons with uppercase and letter spacing
- Use Raleway italic for emotional quotes and testimonials
- Slightly tighter letter-spacing for Montserrat headings
- Slightly open letter-spacing for Lato body text

---

**Note:** No admin dashboard yet; updates done directly via server or database.
