function redirectToSearch(productName) {
    localStorage.setItem('productName', productName);
    window.location.href = 'seacrch.html';

}



// Lấy giá trị của biến "productName" từ localStorage
var productName = localStorage.getItem('productName');

// Tìm kiếm sản phẩm trong mảng "products" dựa trên tên sản phẩm đã lưu
var product = products.find(function(value) {
  return value.name === productName;
});

// Tạo HTML code để hiển thị sản phẩm tìm kiếm
var data = '';
products.map(value =>{
    data += `
    <div class="product-item" style ="cursor: pointer" >
                <img src="${value.img}" alt="">
                <div class="product-item-text">
                    <h1>${value.name}</h1>
                    <p><span>${value.price}</span><sup>đ</sup></p>
                </div>
                <button onclick='addToCart(${value.id})' class ="btn btn-primary" >Thêm vào giỏ hàng</button>
    </div>
    `;
});
document.getElementById('product-items').innerHTML = data
