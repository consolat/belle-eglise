// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the pay button
    const payBtn = document.querySelector('.pay-btn');
    
    // Add click event listener
    if (payBtn) {
        payBtn.addEventListener('click', function() {
            // Disable button to prevent multiple clicks
            this.disabled = true;
            makePayment();
            // Re-enable button after 3 seconds in case of error
            setTimeout(() => {
                this.disabled = false;
            }, 3000);
        });
    }
});

function makePayment() {
    // Check if Paystack library is loaded
    if (typeof PaystackPop === 'undefined') {
        alert('Payment system unavailable. Please refresh the page and try again.');
        // Re-enable button if needed
        const payBtn = document.querySelector('.pay-btn');
        if (payBtn) payBtn.disabled = false;
        return;
    }

    // Get form values with null checks
    const emailInput = document.getElementById('email');
    const amountInput = document.getElementById('amount');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    // Check if all form elements exist
    if (!emailInput || !amountInput || !firstNameInput || !lastNameInput) {
        alert('Form elements not found. Please check your HTML.');
        return;
    }

    // Get and trim values
    const email = emailInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const amountValue = amountInput.value.trim();

    // Validate email
    if (!email) {
        alert("Please enter your email address.");
        reenableButton();
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        reenableButton();
        return;
    }

    // Validate amount
    if (!amountValue) {
        alert("Please enter an amount.");
        reenableButton();
        return;
    }

    const amount = parseFloat(amountValue);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount (greater than 0).");
        reenableButton();
        return;
    }

    // Validate name fields
    if (!firstName) {
        alert("Please enter your first name.");
        reenableButton();
        return;
    }

    if (!lastName) {
        alert("Please enter your last name.");
        reenableButton();
        return;
    }

    const amountGHS = Math.round(amount * 100); // convert to pesewas and ensure integer

    // Initialize Paystack
    try {
        let handler = PaystackPop.setup({
            key: "pk_test_522fc54fd11c927a983912d4ba8002c9bc60f138",
            email: email,
            amount: amountGHS,
            metadata: {
                custom_fields: [
                    { 
                        display_name: "First name", 
                        variable_name: "first_name", 
                        value: firstName 
                    },
                    { 
                        display_name: "Last name", 
                        variable_name: "last_name", 
                        value: lastName 
                    }
                ]
            },
            currency: "GHS",
            onClose: function() {
                alert('Transaction cancelled.');
                reenableButton();
            },
            callback: function(response) {
                alert('Payment complete! Reference: ' + response.reference);
                // Optionally redirect to thank you page
                // window.location.href = 'thank-you.html?reference=' + response.reference;
                reenableButton();
            }
        });

        handler.openIframe();
    } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred while processing your payment. Please try again.');
        reenableButton();
    }
}

// Helper function to re-enable the pay button
function reenableButton() {
    const payBtn = document.querySelector('.pay-btn');
    if (payBtn) {
        payBtn.disabled = false;
    }
}