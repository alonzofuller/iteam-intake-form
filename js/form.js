// ===================================
// iTeam Legal Solutions - Intake Form JavaScript
// Form Validation and Submission Logic
// ===================================

// US States List
const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico', 'Guam', 'American Samoa',
    'U.S. Virgin Islands', 'Northern Mariana Islands'
];

// DOM Elements
const form = document.getElementById('intakeForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');
const sponsorStateSelect = document.getElementById('sponsorState');
const facilityStateSelect = document.getElementById('facilityState');
const serviceOtherCheckbox = document.getElementById('serviceOther');
const otherServiceGroup = document.getElementById('otherServiceGroup');
const otherServiceInput = document.getElementById('otherService');

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    populateStateDropdowns();
    attachEventListeners();
    setupFormValidation();
});

// Populate state dropdowns
function populateStateDropdowns() {
    states.forEach(state => {
        const option1 = document.createElement('option');
        option1.value = state;
        option1.textContent = state;
        sponsorStateSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = state;
        option2.textContent = state;
        facilityStateSelect.appendChild(option2);
    });
}

// Attach event listeners
function attachEventListeners() {
    // Show/hide other service input
    serviceOtherCheckbox.addEventListener('change', function() {
        if (this.checked) {
            otherServiceGroup.style.display = 'block';
            otherServiceInput.required = true;
        } else {
            otherServiceGroup.style.display = 'none';
            otherServiceInput.required = false;
            otherServiceInput.value = '';
        }
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });

    // ZIP code validation
    const zipInput = document.getElementById('sponsorZip');
    zipInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 5);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Phone number formatting
function formatPhoneNumber(e) {
    let input = e.target.value.replace(/\D/g, '');

    if (input.length > 10) {
        input = input.slice(0, 10);
    }

    let formatted = '';
    if (input.length > 0) {
        formatted = '(' + input.substring(0, 3);
    }
    if (input.length >= 4) {
        formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
        formatted += '-' + input.substring(6, 10);
    }

    e.target.value = formatted;
}

// Setup form validation
function setupFormValidation() {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        if (!phonePattern.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // ZIP code validation
    if (field.id === 'sponsorZip' && field.value.trim()) {
        if (field.value.length !== 5) {
            isValid = false;
            errorMessage = 'ZIP code must be 5 digits';
        }
    }

    // Display error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('small');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontWeight = '500';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    // Check if at least one service is selected
    const serviceCheckboxes = form.querySelectorAll('input[name="SERVICES REQUESTED"]');
    const isServiceSelected = Array.from(serviceCheckboxes).some(cb => cb.checked);

    if (!isServiceSelected) {
        isValid = false;
        showStatusMessage('Please select at least one service requested', 'error');
        // Scroll to services section
        document.querySelector('.checkbox-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}

// Format email body for better readability
function formatEmailBody(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (!key.startsWith('_')) {
            data[key] = value;
        }
    }

    const services = formData.getAll('services[]').join(', ') || 'None selected';

    return `
════════════════════════════════════════════════════════════
iTEAM LEGAL SOLUTIONS - CLIENT INTAKE FORM
════════════════════════════════════════════════════════════
Submission Date: ${new Date().toLocaleString()}

╔══════════════════════════════════════════════════════════╗
║                  SPONSOR INFORMATION                      ║
╚══════════════════════════════════════════════════════════╝

Name: ${data.sponsor_first_name || ''} ${data.sponsor_last_name || ''}
Email: ${data.sponsor_email || ''}
Phone: ${data.sponsor_phone || ''}

Mailing Address:
${data.sponsor_address || ''}
${data.sponsor_city || ''}, ${data.sponsor_state || ''} ${data.sponsor_zip || ''}

How They Heard About Us: ${data.how_heard || ''}
Payment Ability: ${data.payment_ability || ''}

╔══════════════════════════════════════════════════════════╗
║                   CLIENT INFORMATION                      ║
╚══════════════════════════════════════════════════════════╝

Client Name: ${data.client_first_name || ''} ${data.client_last_name || ''}
Identification Number: ${data.client_id || 'Not provided'}

Facility Information:
  Name: ${data.facility_name || ''}
  Address: ${data.facility_address || 'Not provided'}
  City: ${data.facility_city || 'Not provided'}
  State: ${data.facility_state || ''}
  County: ${data.county || ''}

Case Details:
  Case Number: ${data.case_number || 'Not provided'}
  Nature of Charges: ${data.charges || ''}

Case Description:
${data.case_description || ''}

╔══════════════════════════════════════════════════════════╗
║                  SERVICES REQUESTED                       ║
╚══════════════════════════════════════════════════════════╝

Services: ${services}
${data.other_service ? 'Other Service: ' + data.other_service : ''}

Additional Comments:
${data.additional_comments || 'None provided'}

════════════════════════════════════════════════════════════
Terms Accepted: ${data.terms_agreement ? 'Yes' : 'No'}
════════════════════════════════════════════════════════════

This intake form was submitted through the iTeam Legal Solutions
online intake system.

Contact Information:
iTeam Legal Solutions
1207 Coggin Ave., Brownwood, Texas
Phone: (325) 284-3747
Email: info@iteamlegalsolutions.net
`;
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    // Hide any previous status messages
    hideStatusMessage();

    // Validate form
    if (!validateForm()) {
        showStatusMessage('Please correct the errors in the form before submitting', 'error');
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    // FormSubmit handles the submission - just submit the form normally
    form.submit();
}

// Show status message
function showStatusMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message ' + type;
    statusMessage.style.display = 'block';

    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(hideStatusMessage, 10000);
    }
}

// Hide status message
function hideStatusMessage() {
    statusMessage.style.display = 'none';
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
}

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    input.error,
    select.error,
    textarea.error {
        border-color: #ef4444 !important;
        background-color: #fef2f2;
    }

    input.error:focus,
    select.error:focus,
    textarea.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
