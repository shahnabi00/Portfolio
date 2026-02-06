# 📧 EmailJS Setup Guide (Beginner Friendly)

This guide will help you connect your contact form to your email so you receive messages directly in your inbox.

## Step 1: Create an Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**.
3. Fill in your details and create the account.

## Step 2: Add an Email Service
1. Once logged in, go to the **"Email Services"** tab (on the left sidebar).
2. Click **"Add New Service"**.
3. Select **"Gmail"** (or whichever email provider you use).
4. Click **"Connect Account"** and log in with your email.
5. Click **"Create Service"**.
6. **IMPORTANT:** Copy the **Service ID** (e.g., `service_z3p8q9s`). You will need this later.

## Step 3: Create an Email Template
1. Go to the **"Email Templates"** tab (on the left).
2. Click **"Create New Template"**.
3. You will see a design editor.
4. **Subject Line:** Change it to `New Portfolio Contact from {{name}}`.
5. **Content:** You can design it how you like, but make sure to include these variables inside double curly braces:
   ```text
   Name: {{name}}
   Email: {{email}}
   Phone: {{phone}}
   Type: {{meetingType}}
   Message: {{message}}
   ```
   *Note: These `{{names}}` must match what is in your code exactly.*
   
6. Click **"Save"**.
7. **IMPORTANT:** Click the **"Settings"** tab (top right of template editor) and copy the **Template ID** (e.g., `template_8a2b3c4`).

## Step 4: Get Your Public Key
1. Click on your **Name/Avatar** in the top-right corner.
2. Click **"Account"** or **"Settings"**.
3. Look for **"API Keys"** or **"Public Key"**.
4. **IMPORTANT:** Copy your **Public Key** (e.g., `user_A1b2C3d4E5`).

## Step 5: Connect It To Your Code
1. Open the file `src/components/ContactForm.jsx`.
2. Look at the top for these lines:
   ```javascript
   const SERVICE_ID = "YOUR_SERVICE_ID_HERE"
   const TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE"
   const PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE"
   ```
3. Replace the text inside the quotes with the keys you copied in Steps 2, 3, and 4.
4. Save the file.

## 🎉 Done!
Go to your website, fill out the contact form, and hit send. Check your email inbox—it should appear instantly!
