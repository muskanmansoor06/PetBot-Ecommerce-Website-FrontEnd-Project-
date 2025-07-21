// Universal Cart Functionality for all product pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = count;
    }
}

function addToCart() {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    if (quantity <= 0) {
        showNotification('Please enter a valid quantity', 'error');
        return;
    }
    
    // Get product info from the page
    const productName = document.querySelector('h3') ? document.querySelector('h3').textContent : 'Product';
    const priceElement = document.querySelector('h2');
    const price = priceElement ? parseInt(priceElement.textContent.replace(/[^\d]/g, '')) : 500;
    const imageElement = document.querySelector('.col-lg-5 img');
    const image = imageElement ? imageElement.src.split('/').pop() : 'default.jpg';
    
    // Generate unique ID based on filename
    const currentFile = window.location.pathname.split('/').pop().replace('.html', '');
    
    const product = {
        id: currentFile,
        name: productName,
        price: price,
        image: image,
        description: 'High-quality product',
        quantity: quantity
    };
    
    // Check if product already exists in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showNotification('Product added to cart successfully!', 'success');
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
    `;
    notification.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
}); 