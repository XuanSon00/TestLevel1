const products =[
    {
        id: 1,
        name: 'Iphone 11',
        img: "img/iphone 11.jpg",
        price: '10.690.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 2,
        name: 'Iphone 12 64GB',
        img: "img/iPhone 12 64GB.jpg",
        price: '13.490.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 3,
        name: 'Iphone 13',
        img: "img/iPhone 13.jpg",
        price: '16.690.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 4,
        name: 'IPhone 14 Plus',
        img: "img/iPhone 14 Plus..jpg",
        price: '21.790.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 5,
        name: 'Iphone 14 Pro Max',
        img: "img/iphone 14 pro-max.jpg",
        price: '26.490.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 6,
        name: 'IPhone 14 Pro',
        img: "img/iPhone 14 Pro.jpg",
        price: '24.190.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 7,
        name: 'IPhone 14',
        img: "img/iPhone 14.jpg",
        price: '19.190.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 8,
        name: 'Iphone 15 Plus',
        img: "img/iPhone 15 Plus.jpg",
        price: '25.990.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 9,
        name: 'IPhone 15 Pro Max',
        img: "img/iPhone 15 Pro Max.jpg",
        price: '34.990.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 10,
        name: 'IPhone 15',
        img: "img/iPhone 15.jpg",
        price: '21.190.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 11,
        name: 'IPhone 15 Pro',
        img: "img/iPhone 15 Pro.jpg",
        price: '27.990.000',
        tag: ['iphone', 'apple'],
    },
    {
        id: 12,
        name: 'IPad 9 WiFi 64GB',
        img: "img/iPad 9 WiFi 64GB.jpg",
        price: '7.990.000',
        tag: ['ipad', 'apple'],
    },
    {
        id: 13,
        name: 'IPad Air 5 M1 Wifi 64GB',
        img: "img/iPad Air 5 M1 Wifi 64GB.jpg",
        price: '14.590.000',
        tag: ['ipad', 'apple'],
    },
    {
        id: 14,
        name: 'IPad 10 WiFi 64GB',
        img: "img/iPad 10 WiFi 64GB.jpg",
        price: '11.390.000',
        tag: ['ipad', 'apple'],
    },
    {
        id: 15,
        name: 'IPad Pro M1 12.9 inch WiFi 2TB (2021)',
        img: "img/iPad Pro M1 12.9 inch WiFi 2TB (2021).jpg",
        price: '54.990.000',
        tag: ['ipad', 'apple'],
    },
    {
        id: 16,
        name: 'IPad Pro M1 11 inch WiFi Cellular 2TB (2021)',
        img: "img/iPad Pro M1 11 inch WiFi Cellular 2TB (2021).jpg",
        price: '50.990.000',
        tag: ['ipad', 'apple'],
    },

    {
        id: 17,
        name: 'Samsung Galaxy M34 5G',
        img: "img/samsung/samsung m34-5g.jpg",
        price: '7.690.000',
        tag: ['samsung-galaxy', 'samsung'],
    },
    {
        id: 18,
        name: 'Samsung Galaxy Z Flip5 5G 256GB',
        img: "img/samsung/Samsung Galaxy Z Flip5 5G 256GB.jpg",
        price: '21.990.000',
        tag: ['samsung-galaxy', 'samsung'],
    },
    {
        id: 19,
        name: 'Samsung Galaxy Z Flip5 5G 512GB',
        img: "img/samsung/Samsung Galaxy Z Flip5 5G 512GB.jpg",
        price: '25.990.000',
        tag: ['samsung-galaxy', 'samsung'],
    },
    {
        id: 20,
        name: 'Samsung Galaxy Z Fold5 5G 256GB',
        img: "img/samsung/Samsung Galaxy Z Fold5 5G 256GB.jpg",
        price: '36.990.000',
        tag: ['samsung-galaxy', 'samsung'],
    },
    {
        id: 21,
        name: 'Samsung Galaxy Z Fold5 5G 512GB',
        img: "img/samsung/Samsung Galaxy Z Fold5 5G 512GB.jpg",
        price: '40.990.000',
        tag: ['samsung-galaxy', 'samsung'],
    },
    {
        id: 22,
        name: 'Samsung Galaxy Tab A8 (2022)',
        img: "img/samsung/Samsung Galaxy Tab A8 (2022).jpg",
        price: '5.390.000',
        tag: ['ipad', 'samsung'],
    },
    {
        id: 23,
        name: 'Samsung Galaxy Tab A7 Lite',
        img: "img/samsung/Samsung Galaxy Tab S9 Ultra 5G.jpg",
        price: '3.390.000',
        tag: ['ipad', 'samsung'],
    },
    {
        id: 24,
        name: 'Samsung Galaxy Tab S9 Ultra 5G',
        img: "img/samsung/Samsung Galaxy Z Fold5 5G 256GB.jpg",
        price: '25.990.000',
        tag: ['ipad', 'samsung'],
    },
];


/*-------Hiển thị sản phẩm------------*/
function renderProduct(){
    let data = ``;
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
}

function searchProducts() {
    let valueSearch = document.getElementById("search").value.toLowerCase();
    let filteredProducts = products.filter(value => {
      return value.name.toLowerCase().includes(valueSearch);
    });
  
    // Chuyển đổi mảng sản phẩm đã lọc thành chuỗi JSON
    let filteredProductsJSON = JSON.stringify(filteredProducts);
  
    // Mã hóa chuỗi JSON sản phẩm đã lọc để sử dụng trong URL
    let encodedFilteredProducts = encodeURIComponent(filteredProductsJSON);
  
    // Xây dựng URL của trang search.html với sản phẩm đã lọc mã hóa làm tham số
    let searchURL = `search.html?products=${encodedFilteredProducts}`;
  
    // Chuyển hướng người dùng đến trang search.html
    window.location.href = searchURL;
  }
  



/*-------Hiển thị sản phẩm Apple------------*/
function renderProductApple(){
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

/*-------Hiển thị sản phẩm Samsung------------*/
function renderProductSamsung(){
    let data = ``;
    var select = products.filter(value => value.tag.includes('samsung')); // lọc ra sản phẩm samsung
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

/*-------Hiển thị sản phẩm điện thoại------------*/
function renderProductPhone(){
    let data = ``;
    var select = products.filter(value => value.tag.includes('apple') || value.tag.includes('samsung-galaxy') ); // lọc ra sản phẩm điện thoại
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

/*-------Hiển thị sản phẩm tablet------------*/
function renderProductTablet(){
    let data = ``;
    var select = products.filter(value => value.tag.includes('ipad')); // lọc ra sản phẩm tablet
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

// lưu chuỗi JSON vào local storage
//Kiểm tra key "product" có trong local.Storage hay không // có  => giải mã ; không :[]
let productInCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")):[];

function saveToLocalStorage(){ //lưu lại trong local storage
    localStorage.setItem('products', JSON.stringify(productInCart));
}

function addToCart(id){
    //console.log(id);
        let checkProduct = productInCart.some(value => value.id === id) 
        if(!checkProduct) {
            let product = products.find(value => value.id === id)  //Tìm id trong mảng products = [ ...]
            //console.log(product)
            productInCart.unshift({     //thêm phần tử vào mảng lên trên đầu
                ...product,
                quantity: 1   //thêm số lượng là 1
            }) 
            localStorage.setItem('products',JSON.stringify(productInCart)) // lưu lại trong mảng products và mã hóa
        } else {   //
            let getIndex = productInCart.findIndex(value => value.id === id)  //tìm chỉ mục sản phẩm lưu trong localstorage
            let product = productInCart.find(value =>value.id === id)  
            productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity 
            }
            localStorage.setItem('product',JSON.stringify(productInCart));
        }
        productTotal()
    }
/*------------- tổng sản phẩm đang có trong giỏ hàng----------------------*/ 
function productTotal(){
    document.getElementById("total").innerHTML = productInCart.length
    }


function indexLoadPage(){
    renderProduct()
    renderProductApple()
    renderProductSamsung()
    renderProductPhone()
    renderProductTablet()
    productTotal()
}

/*---------------Đưa dữ liệu vào giỏ hàng*/ 
function productToTable(){
    let data = ``;
    productInCart.map((value, index) => {
        data += `
        <tr>
            <td style="display: flex;align-items: center;">
            <img style="width: 70px;"src="${value.img}"><span>${value.name}</span>
            </td>
            <td>
            <p><span>${value.price}</span><sup>đ</sup></p>
            </td>
            <td>
            <button class ='btn btn-secondary' onclick='cartIncrease(${index})'>+</button>
            <span class ='mx-2'>${value.quantity}</span>
            <button class ='btn btn-secondary' onclick = 'cartDecrease(${index},${value.quantity})'>-</button>
            </td>
            <td>
          ${(value.quantity * value.price.replace(/[.]/g, '')).toLocaleString()}<sup>đ</sup> 
            </td>
            <td style="cursor: pointer;">
            <button onclick ="deleteCart(${index})" class="btn-cart">Xóa</button>
            </td>
        </tr>
        `
    })
    document.getElementById("productToTable").innerHTML = data;
    
}




/*--------------Thay đổi số lượng table-------------*/
function cartIncrease(index){ //tăng số lượng sản phẩm
//console.log(index)
productInCart[index] ={
    ...productInCart[index], // lấy ra dữ liệu đã lưu trong local storage
    quantity: ++productInCart[index].quantity // lấy ra và tăng giá trị số lượng
}
saveToLocalStorage() 
productToTable() 
totalPrice()
}

function cartDecrease(index, quantity){ //giảm số lượng , tối thiểu là 1
   if(quantity > 1){
    productInCart[index] ={
        ...productInCart[index], // lấy ra dữ liệu đã lưu trong local storage
        quantity: --productInCart[index].quantity // lấy ra và giảm giá trị số lượng
    };
    saveToLocalStorage() ;
    productToTable() ;
    totalPrice()
   } else {
    alert('Số lượng sản phẩm tối thiểu là 1')
   }
    }

/*--------------Xóa sản phẩm trong table-------------*/
function  deleteCart(index){
productInCart.splice(index, 1) //số xóa lượng muốn xóa là 1
saveToLocalStorage() // lưu vào lại local storage
productToTable() //load lại bảng
productTotal()//load lại số giỏ hàng
totalPrice() //load lại tổng tiền trong thanh toán
}

/*--------------Tổng giá tiền thanh toán table-------------*/
function totalPrice(){
    if(productInCart !== ''){
        let total = 0;
          for (let i = 0; i < productInCart.length; i++){
            total += (productInCart[i].quantity * productInCart[i].price.replace(/[.]/g, '')).toLocaleString('vi-VN')
          }
          document.getElementById("totalMoney").innerHTML = total.replace(/^0+/, '').toLocaleString('vi-VN') // loại bỏ số 0 ở đầu
}
}

function cartLoadPage(){
    productTotal()
    productToTable()
    totalPrice()
}


/*----------------------Tìm kiếm--------------------*/
