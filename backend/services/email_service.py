import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))


def send_email_alert(product, stock_level, camera_id):

    sender_email = os.getenv("EMAIL_SENDER")
    sender_password = os.getenv("EMAIL_PASSWORD")
    receiver_email = os.getenv("EMAIL_RECEIVER") or os.getenv("EMAIL_RECIEVER")

    if not sender_email or not sender_password or not receiver_email:
        print("⚠️  Email not configured (EMAIL_SENDER/EMAIL_PASSWORD/EMAIL_RECEIVER). Skipping email.")
        return

    subject = f"Stock Alert: {product}"

    body = f"""
    Product: {product}
    Stock Level: {stock_level}
    Camera ID: {camera_id}

    Please restock immediately.
    """

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587, timeout=15)

        server.starttls()

        server.login(sender_email, sender_password)

        server.send_message(msg)

        server.quit()

        print("📧 Email alert sent successfully")

    except Exception as e:

        print("❌ Email error:", e)
