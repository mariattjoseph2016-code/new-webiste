// Cart Management using localStorage
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    addItem(product, quantity = 1) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartUI() {
        const cartCounts = document.querySelectorAll('#cart-count');
        cartCounts.forEach(el => {
            el.textContent = this.getItemCount();
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Update cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartUI();
    
    if (document.getElementById('featured-products')) {
        displayFeaturedProducts();
    }
    if (document.getElementById('products-grid') && !document.getElementById('featured-products')) {
        displayAllProducts();
    }
    if (document.getElementById('cart-items-list')) {
        displayCart();
    }
    if (document.getElementById('checkout-form')) {
        setupCheckout();
    }
});

// Display featured products on home page
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featured = products.slice(0, 6);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Display all products on products page
function displayAllProducts() {
    const container = document.getElementById('products-grid');
    const filterSelect = document.getElementById('category-filter');
    
    function render() {
        const selected = filterSelect.value;
        const filtered = selected ? products.filter(p => p.category === selected) : products;
        container.innerHTML = filtered.map(product => createProductCard(product)).join('');
    }

    render();
    filterSelect?.addEventListener('change', render);
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
        showNotification(`${product.name} added to cart!`);
    }
}

// Display shopping cart
function displayCart() {
    const itemsList = document.getElementById('cart-items-list');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (cart.items.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    itemsList.innerHTML = cart.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" class="quantity-input" value="${item.quantity}" 
                       onchange="cart.updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </td>
        </tr>
    `).join('');

    updateCartSummary();
}

// Remove item from cart
function removeFromCart(productId) {
    cart.removeItem(productId);
    displayCart();
    showNotification('Item removed from cart');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.getTotal();
    const shipping = 10;
    const tax = (subtotal + shipping) * 0.10;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Setup checkout page
function setupCheckout() {
    const emptyCheckout = document.getElementById('empty-checkout');
    const checkoutContent = document.getElementById('checkout-content');

    if (cart.items.length === 0) {
        checkoutContent.style.display = 'none';
        emptyCheckout.style.display = 'block';
        return;
    }

    emptyCheckout.style.display = 'none';
    checkoutContent.style.display = 'grid';

    // Display checkout items
    const itemsDiv = document.getElementById('checkout-items');
    itemsDiv.innerHTML = cart.items.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-name">${item.name} x${item.quantity}</div>
            <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    // Update checkout summary
    const subtotal = cart.getTotal();
    const shipping = 10;
    const tax = (subtotal + shipping) * 0.10;
    const total = subtotal + shipping + tax;

    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;

    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        completeOrder();
    });
}

// Complete order
function completeOrder() {
    const form = document.getElementById('checkout-form');
    
    // Validate form
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Get form data (in a real app, this would be sent to a server)
    const formData = new FormData(form);
    const orderData = {
        customer: formData.get('name'),
        email: formData.get('email'),
        items: cart.items,
        total: cart.getTotal() + 10 + ((cart.getTotal() + 10) * 0.10),
        timestamp: new Date().toISOString()
    };

    // Save order (in a real app, this would be sent to server)
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Clear cart
    cart.clear();

    // Show success message
    alert('Order completed successfully! Thank you for your purchase.\n\nOrder Number: #' + Math.floor(Math.random() * 1000000));
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Show notification
function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
