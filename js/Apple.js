/*
// lưu chuỗi JSON vào local storage
//Kiểm tra key "product" có trong local.Storage hay không // có  => giải mã ; không :[]
let productInCart = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")):[];
*/


/*-------Hiển thị sản phẩm Apple------------*/
/*
function renderProduct(){
    let data = ``;
    var select = products.filter(value => value.tag.includes('apple')); // lọc ra sản phẩm apple
    select.map(value =>{
        data += `
        <div class="product-item">
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
}


*/
