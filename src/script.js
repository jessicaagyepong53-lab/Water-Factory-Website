document.getElementById('product').addEventListener('change', function() {
      if (this.value === 'bulk-purchase') {
        document.getElementById('quantity').value = 1000;
      } else if (this.value === 'sachet-water') {
        document.getElementById('quantity').value = '';
      }
    });