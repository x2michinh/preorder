// URL của Web App đã triển khai từ Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwEzWTiq4Hb4MleSvxpsr8e40td5XquaZWpNOIpc0cAOim76kSdVdiV9fKohb4_apqRkg/exec";

function loadProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const container = document.body;
            data.forEach((row, index) => {
                if (index === 0) return; // Bỏ qua hàng tiêu đề
                const [category, productName, quantity, price] = row;

                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <p>Category: ${category}</p>
                    <p>Product Name: ${productName}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Price: ${price} VND</p>
                `;
                container.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Gọi hàm loadProducts khi trang web được tải
window.onload = loadProducts;

let cart = [];

function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.productName} - ${item.price} VND`;
        cartItems.appendChild(div);
    });
}

function submitOrder() {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    const customerInfo = Object.fromEntries(formData.entries());

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ cart, customer: customerInfo }),
    })
    .then(response => response.json())
    .then(data => alert('Đơn hàng đã được gửi thành công!'))
    .catch(error => console.error('Error:', error));
}

}
