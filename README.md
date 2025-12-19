[README.md](https://github.com/user-attachments/files/24251885/README.md)
# iTeam Legal Solutions - Sponsor Intake Form

A professional, responsive web-based intake form for collecting information from sponsors on behalf of clients who need legal services.

## Features

- **Professional Design**: Beautiful gradient color scheme with modern, clean aesthetics
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side validation for email, phone numbers, required fields, and more
- **Easy to Share**: Can be sent via email link or text message
- **Secure Submission**: Uses Formspree to securely send form data to your email
- **Accessibility**: ARIA labels and keyboard navigation support
- **User-Friendly**: Clear sections, helpful tooltips, and error messages

## Project Structure

```
sponsor-intake-form/
├── index.html          # Main form page
├── css/
│   └── styles.css      # Professional gradient styling
├── js/
│   └── form.js         # Validation and submission logic
├── package.json        # Project configuration
└── README.md          # This file
```

## Setup Instructions

### Step 1: Set Up Formspree (Free Email Service)

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Get Started" and create a free account
3. After signing in, click "New Form" or "Create a Form"
4. Name your form (e.g., "iTeam Legal Intake Form")
5. You'll receive a form endpoint that looks like: `https://formspree.io/f/xyzabc123`
6. Copy this endpoint URL

### Step 2: Configure the Form

1. Open the `index.html` file in a text editor
2. Find line 25 that says:
   ```html
   <form id="intakeForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
4. Save the file

### Step 3: Configure Formspree Email Settings

1. In your Formspree dashboard, click on your form
2. Go to "Settings"
3. Under "Email Notifications", enter: `info@iteamlegalsolutions.net`
4. Enable email notifications
5. Optionally, customize the email template and add a custom thank you page

### Step 4: Test the Form Locally

1. Open `index.html` in your web browser (double-click the file)
2. Fill out the form with test data
3. Click "Submit Intake Form"
4. Check your email (info@iteamlegalsolutions.net) for the submission

**Note**: The first submission to a new Formspree form requires email confirmation. Check your inbox and confirm the email address.

## Deployment Options

Once tested, you can deploy your form using any of these methods:

### Option 1: GitHub Pages (Free)

1. Create a GitHub account at [https://github.com](https://github.com)
2. Create a new repository
3. Upload all project files
4. Go to repository Settings > Pages
5. Select "main" branch and click Save
6. Your form will be available at: `https://yourusername.github.io/repository-name/`

### Option 2: Netlify (Free)

1. Create account at [https://www.netlify.com](https://www.netlify.com)
2. Click "Add new site" > "Deploy manually"
3. Drag and drop your `sponsor-intake-form` folder
4. Your form will be live with a custom URL

### Option 3: Vercel (Free)

1. Create account at [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your project or drag and drop the folder
4. Deploy and get your live URL

### Option 4: Your Own Web Hosting

Upload all files to your web server using FTP or your hosting control panel.

## How to Share the Form

Once deployed, you can share your form in several ways:

1. **Email**: Send the URL in an email to sponsors
2. **Text Message**: Send the shortened URL via SMS
3. **QR Code**: Generate a QR code linking to the form (use a free QR generator)
4. **Website**: Embed the form or link to it from your website

## Form Sections

### 1. Sponsor Information
- Name, email, phone number
- Mailing address
- How they heard about your firm
- Financial capability for legal services

### 2. Client Information
- Client name and identification number
- Facility name and location
- County and case details
- Case description

### 3. Services Requested
- Multiple service options (checkboxes)
- Additional comments field

## Customization

### Changing Colors

Edit `css/styles.css` and modify the color variables at the top:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #1e3a8a 0%, #6b21a8 100%);
    --accent-gradient: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
    /* ... more colors ... */
}
```

### Adding/Removing Fields

Edit `index.html` to add or remove form fields. Make sure to:
1. Add appropriate labels
2. Use proper input types
3. Add validation in `js/form.js` if needed

### Changing Firm Information

Edit the header section in `index.html` (lines 18-23) to update your contact details.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security & Privacy

- All form data is transmitted securely via HTTPS (when deployed)
- Formspree is GDPR compliant
- No data is stored on the client side
- Privacy notice is displayed to users

## Troubleshooting

### Form not submitting?
- Check that you replaced `YOUR_FORM_ID` with your actual Formspree ID
- Verify email confirmation in Formspree (first submission only)
- Check browser console for errors (F12 > Console tab)

### Styling looks broken?
- Make sure the `css/styles.css` file is in the correct location
- Check file paths are correct in `index.html`

### Validation not working?
- Ensure `js/form.js` is loaded correctly
- Check browser console for JavaScript errors

## Support

For questions or issues with:
- **The form itself**: Check this README or contact your web developer
- **Formspree service**: Visit [https://help.formspree.io](https://help.formspree.io)
- **Deployment platforms**: Check their respective documentation

## License

This form is created for iTeam Legal Solutions. All rights reserved.

---

**iTeam Legal Solutions**
1207 Coggin Ave., Brownwood, Texas
Phone: (325) 284-3747
Email: info@iteamlegalsolutions.net
