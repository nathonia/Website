// Sample product data with actual image URLs
const products = [
    { id: 1, name: 'Product 1', price: 200, quantity: 1, image: 'images/car.png' }, 
    { id: 2, name: 'Product 2', price: 300, quantity: 1, image: 'images/car.png' }, 
    { id: 3, name: 'Product 3', price: 150, quantity: 1, image: 'images/car.png' }  
];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Function to update the cart and total
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    products.forEach(product => {
        // Create cart item HTML
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" width="50" style="border-radius: 5px;">
            </div>
            <div>${product.name}</div>
            <div>
                <input class="quantity" type="number" value="${product.quantity}" min="1" data-id="${product.id}" aria-label="Quantity for ${product.name}">
            </div>
            <div>R${(product.price * product.quantity).toFixed(2)}</div>
            <button onclick="removeFromCart(${product.id})" aria-label="Remove ${product.name} from cart">Delete</button>
        `;

        // Append to cart items container
        cartItemsContainer.appendChild(cartItem);

        // Update total price
        total += product.price * product.quantity;
    });

    // Update total price display
    totalPriceElement.textContent = total.toFixed(2);

    // Add event listeners for quantity change
    const quantityInputs = cartItemsContainer.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const newQuantity = parseInt(event.target.value);

            updateProductQuantity(productId, newQuantity);
        });
    });
}

// Function to update product quantity
function updateProductQuantity(productId, newQuantity) {
    const product = products.find(product => product.id === productId);
    if (product) {
        product.quantity = newQuantity;
        updateCart();
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        updateCart();
    }
}

// Initial update
updateCart();

// Example checkout button
document.getElementById('checkout-button').addEventListener('click', function() {
    alert('Proceeding to checkout');
});
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Order Placed!");
});

const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const creditCardDetails = document.getElementById('credit-card-details');

paymentMethods.forEach(method => {
    method.addEventListener('change', function() {
        if (document.getElementById('credit-card').checked) {
            creditCardDetails.style.display = 'block';
        } else {
            creditCardDetails.style.display = 'none';
        }
    });
});
