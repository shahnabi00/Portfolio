# 📋 Google Sheets Contact Form Setup Guide

## ✅ What You'll Get:
- Free contact form submissions
- All data saved to Google Sheets automatically
- No database needed
- No monthly costs

---

## 🚀 Setup Steps (5 minutes):

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: **"Portfolio Contact Submissions"**
4. Add these headers in **Row 1** (columns A-G):
   ```
   Timestamp | Name | Email | Phone | Inquiry Type | Message | Source
   ```

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. **Paste this code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Format timestamp
    var timestamp = new Date(data.timestamp);
    
    // Append row to sheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone || 'N/A',
      data.meetingType,
      data.message,
      data.source || 'Website'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **💾 Save** (or Ctrl+S)
5. Name your project: **"Contact Form Handler"**

### Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Fill in:
   - **Description:** Portfolio Contact Form
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Authorize the app** (click your Google account, then "Advanced" → "Go to Contact Form Handler")
6. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 4: Add URL to Your Website

1. Open **`src/components/ContactForm.jsx`**
2. Find **Line 9** where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE"
   ```
3. Replace with your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec"
   ```
4. **Save the file**

---

## ✅ Testing:

1. Visit your website: http://localhost:3001
2. Open the chat assistant
3. Type "contact" or "schedule call"
4. Fill out the form and submit
5. Check your Google Sheet - you should see the submission!

---

## 🎨 Customization:

### Add Email Notifications (Optional):

Add this to your Apps Script (after line 20):

```javascript
// Send email notification
MailApp.sendEmail({
  to: "your.email@example.com",
  subject: "New Portfolio Contact: " + data.name,
  body: "Name: " + data.name + "\n" +
        "Email: " + data.email + "\n" +
        "Phone: " + (data.phone || 'N/A') + "\n" +
        "Type: " + data.meetingType + "\n" +
        "Message: " + data.message
});
```

### Format Your Sheet:

1. **Freeze Row 1:** View → Freeze → 1 row
2. **Bold headers:** Select Row 1 → Make bold
3. **Auto-resize columns:** Select all → Format → Resize columns → Fit to data
4. **Add filters:** Select Row 1 → Data → Create a filter

---

## 🔧 Troubleshooting:

**Form doesn't submit?**
- Check that the URL in ContactForm.jsx is correct
- Make sure deployment is set to "Anyone" can access
- Check browser console for errors

**Not receiving data in Sheet?**
- Verify column headers match exactly
- Check Apps Script execution logs: Apps Script editor → Executions

**Need to update the script?**
- Edit the code in Apps Script
- Click Deploy → Manage deployments
- Click ✏️ Edit → New version → Deploy

---

## 📊 View Your Data:

Your submissions will appear in Google Sheets with:
- ✅ Timestamp (when submitted)
- ✅ Name, Email, Phone
- ✅ Inquiry Type (meeting, freelance, etc.)
- ✅ Message
- ✅ Source (Portfolio Website)

You can:
- Export to Excel/CSV
- Create charts and analytics
- Filter and sort submissions
- Share with team members

---

## 🎉 That's it! You're all set!

Now visitors can submit contact forms and all data saves to your Google Sheet automatically - **100% FREE!**
