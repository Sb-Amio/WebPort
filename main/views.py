# views.py

from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings # Make sure this is imported
from django.contrib import messages
from django.urls import reverse
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # ... (your existing code to get name, email, message)
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message_body = form.cleaned_data['message']

            subject = f"New Message from Portfolio Website"
            full_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_body}"

            try:
                send_mail(
                    subject,
                    full_message,
                    settings.DEFAULT_FROM_EMAIL,
                    # === THIS IS THE KEY CHANGE ===
                    # Use the list from your settings file
                    settings.ADMIN_EMAIL_RECIPIENTS, 
                    fail_silently=False,
                )
                messages.success(request, 'Your message has been sent successfully!')
            except Exception as e:
                # ... (your existing error handling)
                print(e)
                messages.error(request, 'Sorry, something went wrong and your message could not be sent.')
                
            redirect_url = reverse('index') + '#contact'
            return redirect(redirect_url)

    # ... (rest of the view)
    else:
        form = ContactForm()
    return render(request, 'index.html', {'form': form})