# Simple Static Website

This is a minimal static website scaffold. Open `index.html` in a browser or serve it with a simple HTTP server.

Quick start (recommended so routing and fetches work):

Windows / PowerShell:

```
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or just double-click `index.html` to open it directly in your default browser.

Files:

- `index.html`: main page
- `css/styles.css`: styles
- `js/script.js`: small interactive behaviors

Customize and extend as needed.
# TechStore - Simple Static E-Commerce Website

A fully functional static e-commerce website built with HTML, CSS, and JavaScript. No backend required!

## Features

- **Home Page**: Hero section with featured products
- **Products Page**: Browse all 12 tech products with category filtering
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Checkout**: Complete order with customer and payment information
- **Responsive Design**: Works great on desktop, tablet, and mobile
- **Local Storage**: Cart data persists even after page refresh
- **Interactive UI**: Smooth animations and notifications

## Project Structure

```
mywebsite/
├── index.html           # Home page
├── products.html        # Products listing page
├── cart.html           # Shopping cart page
├── checkout.html       # Checkout page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── products-data.js    # Product database
└── README.md           # This file
```

## How to Use

1. **Open in Browser**: Double-click `index.html` or open with your web browser
2. **Browse Products**: Click "Products" or "Shop Now" to see all items
3. **Add to Cart**: Click "Add to Cart" button on any product
4. **View Cart**: Click "Cart" in the top navigation
5. **Checkout**: Click "Proceed to Checkout" and fill in your details
6. **Complete Order**: Review order summary and submit

## Products Included

- Wireless Headphones ($79.99)
- Pro Laptop Stand ($49.99)
- USB-C Cable 3-pack ($24.99)
- Gaming Laptop 15" ($1299.99)
- Professional Ultrabook ($1099.99)
- Budget 13" Laptop ($499.99)
- Smartphone Pro Max ($1199.99)
- Budget Smartphone ($299.99)
- 5G Phone ($899.99)
- Wireless Charger ($34.99)
- Power Bank 20000mAh ($44.99)
- Screen Protector Bundle ($19.99)

## Features in Detail

### Shopping Cart
- Add products with one click
- Adjust quantities in cart
- See real-time totals with shipping and tax
- Data persists between sessions using localStorage

### Checkout
- Customer information form
- Payment information form (demo purposes)
- Order summary with itemized list
- Automatic order confirmation

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly buttons and inputs

## Customization

### Add Products
Edit `products-data.js` and add new items to the `products` array:
```javascript
{
    id: 13,
    name: "New Product",
    price: 99.99,
    category: "accessories",
    description: "Product description",
    emoji: "🎉"
}
```

### Change Colors
Edit the color variables in `styles.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    /* etc */
}
```

### Modify Shipping Cost
In `script.js`, update the shipping value in `updateCartSummary()` and `setupCheckout()`:
```javascript
const shipping = 10; // Change this number
```

## Browser Support

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Notes

- This is a static website (no backend server needed)
- Orders are stored locally in browser localStorage
- For production use, integrate with a real payment processor
- All data is stored client-side

## Author

Built with HTML5, CSS3, and Vanilla JavaScript

Enjoy your e-commerce store! 🎉
