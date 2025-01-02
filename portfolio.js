// Cache DOM elements for better performance
const contactForm = document.querySelector('#contact-form');
const messageList = document.querySelector('#message-list');
const clearStorageBtn = document.querySelector('#clear-storage');
const formFields = {
  name: document.querySelector('#name'),
  email: document.querySelector('#email'),
  message: document.querySelector('#message'),
};

// Initialize EmailJS (Replace with your actual keys)
emailjs.init('YOUR_PUBLIC_KEY');

// Utility function to fetch and parse localStorage data
function getStoredMessages() {
  try {
    return JSON.parse(localStorage.getItem('contactMessages')) || [];
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return [];
  }
}

// Utility function to save messages to localStorage
function saveMessage(message) {
  const entries = getStoredMessages();
  entries.push(message);
  localStorage.setItem('contactMessages', JSON.stringify(entries));
}

// Function to display messages in the DOM
function displayMessages() {
  const entries = getStoredMessages();
  messageList.innerHTML = '';

  if (entries.length === 0) {
    messageList.innerHTML = '<li>No messages found.</li>';
  } else {
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

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Extract and validate form data
  const name = formFields.name.value.trim();
  const email = formFields.email.value.trim();
  const message = formFields.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Prepare email data
  const emailData = { name, email, message };

  // Disable form submission button for feedback
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    // Send email using EmailJS
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData);
    alert('Your message has been sent!');
    
    // Save the message locally with a timestamp
    saveMessage({ ...emailData, timestamp: new Date().toLocaleString() });

    // Refresh the message list
    displayMessages();
    contactForm.reset();
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to send your message. Please try again.');
  } finally {
    // Re-enable form submission button
    submitButton.disabled = false;
  }
}

// Function to clear messages from localStorage
function clearMessages() {
  localStorage.removeItem('contactMessages');
  displayMessages();
}

// Add event listeners
contactForm.addEventListener('submit', handleFormSubmit);
clearStorageBtn.addEventListener('click', clearMessages);

// Load messages on page load
window.addEventListener('load', displayMessages);
