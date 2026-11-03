# TourBuddy Web (HTML + CSS + JavaScript + Python email)

```
tourbuddy-web/
├── server.py          Flask server: serves the site + /api/contact (sends email)
├── requirements.txt
├── .env.example       SMTP settings for automatic email
└── public/
    ├── index.html     page structure
    ├── style.css      design
    ├── script.js      map, photos, filters, guides, contact form
    └── data.js        famous places + guides (edit/add yours here)
```

## Run
1. `pip install -r requirements.txt`
2. Copy `.env.example` to `.env` and fill in your email settings (see below).
3. `python server.py` then open http://localhost:5000
   (needs internet for the map tiles and Wikipedia photos)

## Automatic email
- Gmail: turn on 2-step verification, create an App Password at myaccount.google.com/apppasswords, then use it as `SMTP_PASS`.
- Each form submission arrives in your inbox (`MAIL_TO`) with the visitor's address as Reply-To.
- Until `.env` is filled in, messages are saved to `messages.log` instead.

## Add a place
Add one line to `PLACES` in `public/data.js`:
`P("Name", "Wikipedia_Page_Title", "Country", "Continent", lat, lng, "Best months", "Tip")`
The photo and summary load automatically from the Wikipedia page.
