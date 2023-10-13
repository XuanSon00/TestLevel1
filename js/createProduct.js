/*-----------------Lưu trữ dữ liệu indexDB----------------*/
var db; //Khởi tạo DB

var request = window.indexedDB.open("Product-Management", 1); //Tạo đối tượng lưu trữ

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("Product",{autoIncrement: true});

}

request.onerror =function(event){
    console.log("error: " + event.target.errorCode);
}
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: "+ db);
};

/*-------------Kiểm tra lỗi-------------*/
function check(event){
    //kiểm tra sản phẩm
    var name = document.getElementById("productName")
    var nameError = document.getElementById("productError")
    var nameConfirm = document.getElementById("productConfirm")

    if(name.value === ""){
        nameError.style.display = 'block';
        nameError.style.color = 'red';
    } else {
        nameError.style.display = 'none'
    }


    //kiểm tra Giá
    var price = document.getElementById("priceProduct")
    var priceError = document.getElementById("priceProductError")

    if(price.value === ""){
        priceError.style.display = 'block';
        priceError.style.color = 'red';
    } else {
        priceError.style.display = 'none'
    }
    add()

}
/*-------------Thêm dữ liệu vào indexed DB-------------*/
function add(){
    let nameProduct = document.getElementById("productName").value
    let priceProduct = document.getElementById("priceProduct").value
    let producerProduct = document.getElementById("producer").value
    let numberProduct = document.getElementById("number").value
    let describeProduct = document.getElementById("describe").value
    let imgProduct = document.getElementById("imageInput").value

//Tạo mới 1 transaction  
var request = db.transaction(["Product"], "readwrite");
//var request = db.transaction(["Product"], "readwrite");
//Lấy ra đối tượng lưu trữ
//var objectStore = transaction.objectStore("Product");
    request = request.objectStore("Product");
//Thêm vào "Thông Tin" sử dụng add()
    request = request.add({name: nameProduct, price: priceProduct, producer: producerProduct,number: numberProduct,describe: describeProduct,image: imgProduct});

    request.onsuccess = function(event){    
        console.log('Success');
        //chuyển trang hoặc thông báo thêm thành công
        Swal.fire({
            icon: 'success ',
            title: 'Tạo thành công',
            
          })
    };
    request.onerror = function(event){
        console.log('Error');
        
    }}

