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

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id, name) {
  alert(`Đã thêm sản phẩm "${name}" vào giỏ hàng.`);
}
