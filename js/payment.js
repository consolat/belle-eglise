// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the pay button
    const payBtn = document.querySelector('.pay-btn');
    
    // Add click event listener
    if (payBtn) {
        payBtn.addEventListener('click', makePayment);
    }
});

function makePayment(){
  const email = document.getElementById('email').value;
  const amountGHS = document.getElementById('amount').value * 100; // convert to pesewas
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  if (!email || !amountGHS) {
    alert("Please enter required fields.");
    return;
  }

  let handler = PaystackPop.setup({
    key: "pk_test_522fc54fd11c927a983912d4ba8002c9bc60f138",  // Replace with your public key
    email: email,
    amount: amountGHS,
    metadata: {
      custom_fields: [
        { display_name: "First name", variable_name: "first_name", value: firstName },
        { display_name: "Last name", variable_name: "last_name", value: lastName }
      ]
    },
    currency: "GHS",
    onClose: function(){
      alert('Transaction cancelled.');
    },
    callback: function(response){
      alert('Payment complete! Reference: ' + response.reference);
      // Optionally redirect to thank you page
    }
  });

  handler.openIframe();
}