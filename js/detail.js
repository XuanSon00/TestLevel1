function redirectToDetail(productId) {
    localStorage.setItem('productId', productId);
    window.location.href = 'detail.html';

}

var productId = localStorage.getItem('productId');
var product = products.find(value => value.id === parseInt(productId));  //đổi giá trị của biến productId từ kiểu dữ liệu chuỗi (string) sang kiểu dữ liệu số nguyên 

if (product) {
    document.getElementById('product-items').innerHTML = `
        <div class="product-item" style ="cursor: pointer" >
        <img src="${product.img}" alt="">
        <div class="product-item-text">
        <h1>${product.name}</h1>
        <p><span>${product.price}</span><sup>đ</sup></p>
        </div>
        <button onclick='addToCart(${product.id})' class ="btn btn-primary" >Thêm vào giỏ hàng</button>
        </div>
        <div class="product-detail">
        <h1 style="text-align: center;">Thông Tin Sản Phẩm</h1>
        <div class="producInfo">
            <b>Screen:</b>
            <span>${product.Screen}</span>
        </div>
        <div class="producInfo">
            <b>OS:</b>
            <span>${product.OS}</span>
        </div>
        <div class="producInfo">
            <b>RearCamera:</b>
            <span>${product.RearCamera}</span>
        </div>
        <div class="producInfo">
            <b>FrontCamera:</b>
            <span>${product.FrontCamera}</span>
        </div>
        <div class="producInfo"> 
            <b>Chip:</b>
            <span>${product.Chip}</span>
        </div>
        <div class="producInfo">
            <b>RAM:</b>
            <span>${product.RAM}</span>
        </div>
        <div class="producInfo">
            <b>StorageCapacity:</b>
            <span>${product.StorageCapacity}</span>
        </div>
        <div class="producInfo">
            <b>SIM:</b>
            <span>${product.SIM}</span>
        </div>
        <div class="producInfo">
            <b>BatterPhoneCharger:</b>
            <span>${product.BatterPhoneCharger}</span>
        </div>
    </div>
    `;
}