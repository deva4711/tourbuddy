import os, re, smtplib, datetime
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory

load_dotenv()
app = Flask(__name__, static_folder="public", static_url_path="")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@app.get("/")
def home():
    return send_from_directory("public", "index.html")


@app.post("/api/contact")
def contact():
    d = request.get_json(silent=True) or {}
    if d.get("website"):                       # honeypot: bots fill this hidden field
        return jsonify(ok=True)
    name, email = str(d.get("name", "")).strip()[:100], str(d.get("email", "")).strip()[:150]
    topic, msg = str(d.get("topic", "General")).strip()[:80], str(d.get("message", "")).strip()[:3000]
    if not name or not msg or not EMAIL_RE.match(email):
        return jsonify(error="Please enter your name, a valid email and a message."), 400

    host, user, pwd, to = (os.getenv(k, "") for k in ("SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_TO"))
    if not (host and user and pwd and to):     # no SMTP set up yet: keep the message on disk
        with open("messages.log", "a", encoding="utf-8") as f:
            f.write(f"{datetime.datetime.now()} | {name} <{email}> | {topic}\n{msg}\n\n")
        return jsonify(ok=True, note="Saved to messages.log (email is not configured yet).")

    m = EmailMessage()
    m["Subject"] = re.sub(r"[\r\n]+", " ", f"TourBuddy enquiry: {topic} from {name}")
    m["From"], m["To"], m["Reply-To"] = user, to, email
    m.set_content(f"Name: {name}\nEmail: {email}\nTopic: {topic}\n\n{msg}")
    try:
        with smtplib.SMTP(host, int(os.getenv("SMTP_PORT", 587)), timeout=15) as s:
            s.starttls(); s.login(user, pwd); s.send_message(m)
    except Exception as e:
        return jsonify(error=f"Email could not be sent: {e}"), 502
    return jsonify(ok=True)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
