# /api/contact.py

import os
import smtplib
from email.message import EmailMessage

def handler(request):
    # Process POST request data
    if request.method == 'POST':
        # Extract form data
        data = request.form
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message_content = data.get('message')

        # Compose email
        msg = EmailMessage()
        msg.set_content(f"From: {name} <{email}>\n\nSubject: {subject}\n\nMessage:\n{message_content}")
        msg['Subject'] = "New Contact Form Submission"
        msg['From'] = os.getenv("EMAIL_ADDRESS")
        msg['To'] = os.getenv("EMAIL_ADDRESS")

        # Send email
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(os.getenv("EMAIL_ADDRESS"), os.getenv("EMAIL_PASSWORD"))
                smtp.send_message(msg)

            # Response after successful email
            return {
                "statusCode": 200,
                "body": "Thank you! I will contact you soon."
            }
        except Exception as e:
            return {
                "statusCode": 500,
                "body": f"Error sending message: {str(e)}"
            }
    else:
        return {
            "statusCode": 405,
            "body": "Method Not Allowed"
        }
