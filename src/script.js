let Username = prompt("Please enter your name:");
if (Username) {
  alert(`Welcome, ${Username} back to White Water Wells Ltd!`);
} else {
  alert("Welcome, Guest to White Water Wells Ltd we hope you have a great experience!");
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