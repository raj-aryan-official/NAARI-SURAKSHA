// add.js
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const contactList = document.getElementById("contact-list");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        if (name && phone) {
            const listItem = document.createElement("li");
            listItem.textContent = `Name: ${name}, Phone: ${phone}`;
            contactList.appendChild(listItem);

            // Clear form inputs after submission
            contactForm.reset();
        } else {
            console.log("Please fill out all fields.");
        }
    });
});