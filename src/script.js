// Welcome modal — only on the home page, and only once per session
if ((window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) && !sessionStorage.getItem('welcomeDone')) {
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

      sessionStorage.setItem('welcomeDone', 'true');
      overlay.remove();

      if (firstTime === 'yes') {
        alert(`Welcome ${name} to White Water Wells! We hope you enjoy your stay. 🤗`);
      } else {
        alert(`Welcome back ${name}! ❤️`);
      }
    });
  })();
}
// Bulk-purchase automation (only on order page)
if (document.getElementById('product')) {
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
}

// Receipt generation on form submit
(function() {
  const form = document.querySelector('.order-form-container form');
  if (!form) return;

  const overlay = document.getElementById('receipt-overlay');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather values
    const name     = document.getElementById('full-name').value.trim();
    const phone    = document.getElementById('telp').value.trim();
    const email    = document.getElementById('email').value.trim();
    const street   = document.getElementById('street-address').value.trim();
    const city     = document.getElementById('city').value.trim();
    const gps      = document.getElementById('gps').value.trim();
    const productEl = document.getElementById('product');
    const product  = productEl.options[productEl.selectedIndex].text;
    const quantity = parseInt(document.getElementById('quantity').value, 10) || 0;
    const orderEl  = document.getElementById('order-type');
    const orderType = orderEl.options[orderEl.selectedIndex].text;
    const orderVal  = orderEl.value;
    const date     = document.getElementById('delivery-date').value;
    const timeEl   = document.getElementById('time-slot');
    const timeSlot = timeEl.options[timeEl.selectedIndex].text;
    const instructions = document.getElementById('instructions').value.trim();

    // Price calculation
    const pricePerBag = 7;
    let subtotal = quantity * pricePerBag;
    let discountPct = 0;
    if (orderVal === 'weekly')   discountPct = 10;
    if (orderVal === 'biweekly') discountPct = 15;
    if (orderVal === 'monthly')  discountPct = 20;
    const discount = subtotal * (discountPct / 100);
    const total = subtotal - discount;

    // Generate order ID
    const orderId = 'WWW-' + Date.now().toString(36).toUpperCase().slice(-6) + '-' + Math.floor(Math.random() * 900 + 100);

    // Format date
    const fmtDate = date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '';

    // Populate receipt
    document.getElementById('receipt-id').textContent = 'Order #' + orderId;
    document.getElementById('r-name').textContent    = name;
    document.getElementById('r-phone').textContent   = phone;
    document.getElementById('r-email').textContent   = email;
    document.getElementById('r-street').textContent  = street;
    document.getElementById('r-city').textContent    = city;
    document.getElementById('r-gps').textContent     = gps;
    document.getElementById('r-product').textContent = product;
    document.getElementById('r-quantity').textContent = quantity + (quantity === 1 ? ' bag' : ' bags');
    document.getElementById('r-order-type').textContent = orderType;
    document.getElementById('r-date').textContent    = fmtDate;
    document.getElementById('r-time').textContent    = timeSlot;

    // Discount row
    const discountRow = document.getElementById('r-discount-row');
    if (discountPct > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('r-discount').textContent = '-' + discountPct + '% (GH₵' + discount.toFixed(2) + ')';
    } else {
      discountRow.style.display = 'none';
    }

    // Instructions row
    const instrRow = document.getElementById('r-instructions-row');
    if (instructions) {
      instrRow.style.display = 'flex';
      document.getElementById('r-instructions').textContent = instructions;
    } else {
      instrRow.style.display = 'none';
    }

    // Total
    document.getElementById('r-total').textContent = 'GH₵' + total.toFixed(2);

    // Show receipt
    overlay.classList.add('active');
  });

  // Close receipt
  document.getElementById('receipt-close').addEventListener('click', function() {
    overlay.classList.remove('active');
  });

  // Print receipt
  document.getElementById('receipt-print').addEventListener('click', function() {
    window.print();
  });

  // Close on overlay background click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('active');
  });
})(); 