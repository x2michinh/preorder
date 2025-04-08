// URL của Web App đã triển khai từ Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwEzWTiq4Hb4MleSvxpsr8e40td5XquaZWpNOIpc0cAOim76kSdVdiV9fKohb4_apqRkg/exec";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const productsDiv = document.getElementById("products");

    data.forEach(product => {
      if (product.quantity > 0) { // Chỉ hiển thị sản phẩm còn hàng
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Giá: ${product.price} VND</p>
          <p>Số lượng còn lại: ${product.quantity}</p>
          <button onclick="addToCart('${product.id}', '${product.name}')">Thêm vào giỏ hàng</button>
        `;
        productsDiv.appendChild(productDiv);
      }
    });
  })
  .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));

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

    fetch('https://script.google.com/macros/s/AKfycbwEzWTiq4Hb4MleSvxpsr8e40td5XquaZWpNOIpc0cAOim76kSdVdiV9fKohb4_apqRkg/exec', {
        method: 'POST',
        body: JSON.stringify({ cart, customer: customerInfo }),
    })
    .then(response => response.json())
    .then(data => alert('Đơn hàng đã được gửi thành công!'))
    .catch(error => console.error('Error:', error));
}

}
