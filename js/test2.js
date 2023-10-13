function renderProduct(){
    let data = ``;
    var select = product.filter(value => value.tag === 'ipad');
    select.map(value =>{
        data += `
        <div class="product-item">
                    <img src="${value.img}" alt="">
                    <div class="product-item-text">
                        <h1>${value.name}</h1>
                        <p><span>${value.price}</span><sup>đ</sup></p>
                    </div>
                    <button class ="btn btn-primary">Thêm vào giỏ hàng</button>
                </div>
        `;
    });
    document.getElementById('product-items').innerHTML = data
}