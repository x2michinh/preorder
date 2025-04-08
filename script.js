const menuDiv = document.getElementById("menu");
const productListDiv = document.getElementById("product-list");
const cartDetailsDiv = document.getElementById("cart-details");
const checkoutButton = document.getElementById("checkout-button");

let cart = [];

// Lấy dữ liệu sản phẩm từ Apps Script
async function fetchProducts() {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwEzWTiq4Hb4MleSvxpsr8e40td5XquaZWpNOIpc0cAOim76kSdVdiV9fKohb4_apqRkg/exec");
    const data = await response.json();
    renderProducts(data);
}

// Hiển thị danh sách sản phẩm
function renderProducts(products) {
    products.forEach(product => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p>${product[1]} - Giá: ${product[2]} - Tồn kho: ${product[3]}</p>
            <input type="number" min="1" max="${product[3]}" value="1">
            <button onclick="addToCart('${product[1]}', ${product[2]}, this.previousElementSibling.value)">Thêm vào giỏ hàng</button>
        `;
        productListDiv.appendChild(itemDiv);
    });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(name, price, quantity) {
    cart.push({ name, price, quantity });
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Hiển thị chi tiết giỏ hàng khi click "Xem giỏ hàng"
checkoutButton.addEventListener("click", () => {
    cartDetailsDiv.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement("div");
        itemDiv.textContent = `${item.name} - Số lượng: ${item.quantity} - Tổng: ${item.price * item.quantity}`;
        cartDetailsDiv.appendChild(itemDiv);
    });
    const totalDiv = document.createElement("div");
    totalDiv.textContent = `Tổng tiền: ${total}`;
    cartDetailsDiv.appendChild(totalDiv);
});
