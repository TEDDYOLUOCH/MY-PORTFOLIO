contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = sanitize(document.querySelector('#name').value);
  const email = sanitize(document.querySelector('#email').value);
  const message = sanitize(document.querySelector('#message').value);

  if (!name || !email || !message) {
    alert('All fields are required!');
    return;
  }

  // Save to local storage
  const entries = JSON.parse(localStorage.getItem('contactMessages')) || [];
  entries.push({ name, email, message, timestamp: new Date().toLocaleString() });
  localStorage.setItem('contactMessages', JSON.stringify(entries));

  // Submit to Formspree
  fetch('https://formspree.io/f/xwpkgwyd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => {
      if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });

  // Reload messages
  loadMessages();
});
