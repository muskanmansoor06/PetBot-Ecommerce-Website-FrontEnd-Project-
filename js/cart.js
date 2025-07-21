// Universal Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = count;
    }
}

function addToCart(productData) {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    const product = {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        description: productData.description,
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
    
    alert('Product added to cart successfully!');
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
}); 