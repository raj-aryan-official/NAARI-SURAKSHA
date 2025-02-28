// filepath: /C:/Users/rajar/OneDrive/Desktop/new project/forgot.js
document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('resetForm');
    const successModal = document.getElementById('successModal');

    resetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;

        // Simulate sending email and saving detail
        sendResetEmail(email).then(response => {
            if (response.success) {
                saveDetail(email, 'Password reset email sent').then(() => {
                    successModal.style.display = 'block';
                }).catch(error => {
                    console.error('Error saving detail:', error);
                    alert('An error occurred. Please try again.');
                });
            } else {
                alert('Failed to send reset email. Please try again.');
            }
        }).catch(error => {
            console.error('Error sending reset email:', error);
            alert('An error occurred. Please try again.');
        });
    });

    function sendResetEmail(email) {
        // Simulate an API call to send the reset email
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success response
                resolve({ success: true });
            }, 1000);
        });
    }

    function saveDetail(email, detail) {
        return fetch('http://localhost:3000/saveDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, detail })
        }).then(response => response.json());
    }
});