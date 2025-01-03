// Select the form and other DOM elements
const contactForm = document.querySelector('#contact-form');
const messageList = document.querySelector('#message-list');
const clearStorageBtn = document.querySelector('#clear-storage');

// Function to load and display messages from localStorage
function loadMessages() {
  const entries = JSON.parse(localStorage.getItem('contactMessages')) || [];
  messageList.innerHTML = ''; // Clear the list first

  if (entries.length === 0) {
    messageList.innerHTML = '<li>No messages found.</li>'; // Display a message if no contact entries exist
  } else {
    // Loop through each saved message and display it
    entries.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${entry.name}</strong> (<em>${entry.email}</em>) said:
        <p>${entry.message}</p>
        <small>Submitted on: ${entry.timestamp}</small>
      `;
      messageList.appendChild(listItem);
    });
  }
}

// Event Listener for Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

  // Retrieve existing entries or initialize an empty array
  const entries = JSON.parse(localStorage.getItem('contactMessages')) || [];

  // Add the new message to the entries array
  entries.push({
    name,
    email,
    message,
    timestamp: new Date().toLocaleString() // Add the current timestamp
  });

  // Save the updated entries back to localStorage
  localStorage.setItem('contactMessages', JSON.stringify(entries));

  // Clear the form and refresh the message list
  contactForm.reset();
  loadMessages(); // Reload saved messages
  alert('Message saved locally!');
});

// Event Listener for Clear Storage Button
clearStorageBtn.addEventListener('click', () => {
  // Remove messages from localStorage
  localStorage.removeItem('contactMessages');
  loadMessages(); // Refresh the message list
});

// Load saved messages on page load
window.addEventListener('load', loadMessages);

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('visible');
  navMenu.classList.toggle('hidden');
  menuToggle.querySelector('.menu-icon').classList.toggle('active');
});
