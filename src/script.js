// Welcome modal — only on the home page
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
  (function() {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';

    overlay.innerHTML = `
      <div class="welcome-modal">
        <h2>Welcome!</h2>
        <label for="welcome-name">Please enter your name:</label>
        <input type="text" id="welcome-name" placeholder="Your name" />
        <label for="welcome-first-time">Is this your first time here?</label>
        <select id="welcome-first-time">
          <option value="" disabled selected>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button id="welcome-submit">Submit</button>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('welcome-submit').addEventListener('click', function() {
      const name = document.getElementById('welcome-name').value.trim();
      const firstTime = document.getElementById('welcome-first-time').value;

      if (!name) { alert('Please enter your name.'); return; }
      if (!firstTime) { alert('Please select an option.'); return; }

      overlay.remove();

      if (firstTime === 'yes') {
        alert(`Welcome ${name} to White Water Wells! We hope you enjoy your stay. 🤗`);
      } else {
        alert(`Welcome back ${name}! ❤️`);
      }
    });
  })();
}
// Bulk-purchase automation
document.getElementById('product').addEventListener('change', function() {
      if (this.value === 'bulk-purchase') {
        document.getElementById('quantity').value = 1000;
      } else if (this.value === 'sachet-water') {
        document.getElementById('quantity').value = '';
      }
    });

// Check URL parameters on page load
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('product') === 'bulk-purchase') {
  document.getElementById('product').value = 'bulk-purchase';
  document.getElementById('product').dispatchEvent(new Event('change'));
} 