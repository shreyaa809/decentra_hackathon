// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
    
    // Clear input fields when navigating
    clearInputs();
}

// Clear all input fields
function clearInputs() {
    document.getElementById('signupAadhar').value = '';
    document.getElementById('loginAadhar').value = '';
    document.getElementById('verifyAadhar').value = '';
    document.getElementById('khasraNumber').value = '';
}

// Handle Enter key press
function handleEnter(event, action) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (action === 'register') {
            handleRegister();
        } else if (action === 'login') {
            handleLogin();
        } else if (action === 'verify') {
            handleVerifyLand();
        }
    }
}

// Validate Aadhar number (must be 12 digits)
function validateAadhar(aadharNumber) {
    const cleanAadhar = aadharNumber.replace(/\D/g, '');
    return cleanAadhar.length === 12;
}

// Handle Registration
function handleRegister() {
    const aadharInput = document.getElementById('signupAadhar');
    const aadharNumber = aadharInput.value.trim();
    
    if (validateAadhar(aadharNumber)) {
        // Store aadhar for verification page
        document.getElementById('verifyAadhar').value = aadharNumber;
        
        // Show success message
        alert('Registration initiated! Redirecting to land verification...');
        
        // Navigate to verify land page
        showPage('verifyLandPage');
    } else {
        alert('Please enter a valid 12-digit Aadhar number');
        aadharInput.focus();
    }
}

// Handle Login
function handleLogin() {
    const aadharInput = document.getElementById('loginAadhar');
    const aadharNumber = aadharInput.value.trim();
    
    if (validateAadhar(aadharNumber)) {
        // Store aadhar for verification page
        document.getElementById('verifyAadhar').value = aadharNumber;
        
        // Show success message
        alert('Login successful! Redirecting to land verification...');
        
        // Navigate to verify land page
        showPage('verifyLandPage');
    } else {
        alert('Please enter a valid 12-digit Aadhar number');
        aadharInput.focus();
    }
}

// Handle Land Verification
function handleVerifyLand() {
    const aadharInput = document.getElementById('verifyAadhar');
    const khasraInput = document.getElementById('khasraNumber');
    
    const aadharNumber = aadharInput.value.trim();
    const khasraNumber = khasraInput.value.trim();
    
    if (!validateAadhar(aadharNumber)) {
        alert('Please enter a valid 12-digit Aadhar number');
        aadharInput.focus();
        return;
    }
    
    if (!khasraNumber) {
        alert('Please enter your Khasra/Survey number');
        khasraInput.focus();
        return;
    }
    
    // Success message
    alert(`Land verification initiated!

Aadhar: ${aadharNumber}
Khasra Number: ${khasraNumber}

Your land records are being verified on the blockchain. This creates an immutable record linking your identity to your land ownership.

Benefits unlocked:
✓ Access to credit facilities
✓ Government subsidies
✓ Global market access
✓ Supply chain traceability`);
    
    // Clear fields after verification
    aadharInput.value = '';
    khasraInput.value = '';
}

// Only allow numbers in Aadhar input fields
document.addEventListener('DOMContentLoaded', function() {
    const aadharInputs = ['signupAadhar', 'loginAadhar', 'verifyAadhar'];
    
    aadharInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', function(e) {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
        });
    });
});