var db; //Khởi tạo DB

var request = window.indexedDB.open("Product-Management", 1); //Tạo đối tượng lưu trữ

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("Product",{autoIncrement: true});

}

request.onerror =function(event){
    console.log("error: ");
}
request.onsuccess = function (event) {
    db = request.result;
    readAll()
    console.log("success: "+ db);
};



/*----------------------lấy ra nhiều đối tượng--------------------*/
function readAll(){
    
    //sử dụng getAll()
    var request = db.transaction(["Product"]).objectStore("Product").getAll();
    //let info =[]
    request.onerror = function(event){
        console.log('Error')
    };


const transaction = db.transaction(['Product'], 'readonly');
const objectStore = transaction.objectStore('Product');

const request1 = objectStore.openCursor();

request1.onsuccess = (event) => {
const cursor = event.target.result;

if (cursor) {
    const key = cursor.key; // Access the key
    const result = cursor.value; // Access the value


    // Perform operations with the key and value
    //console.log('Key:', key, 'Value:', value);
    var tbody = document.querySelector("#table tbody");
    var tr = `<tr>
        <td><input type="checkbox" ></td>
        <td>${result.name}</td>
        <td>${result.price}</td>
        <td>${result.producer}</td>
        <td>${result.number}</td>
        <td>${result.describe}</td>
        <td>${result.image}</td>
        <td><button class="edit" onclick="editBtn(${key})">Sửa</button></td>
        <td><button onclick="deleteBtn(`+key+`)" style="cursor: pointer" class="delete">Xóa</button></td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', tr);
    

    cursor.continue();
    };
}
request.onsuccess =function(event){
    const result1 = event.target.result;
    console.log(result1);
    //lấy ra kết quả trả về
    var result = request.result;
    // sủ dụng dom thêm vào danh sách
    var tbody = document.querySelector("#table tbody");
    
    for(var i =0; i < result1.length; i++){  

        const item = result1[i];
        const keyValue = item.key; // Access the key
        const value = item.value; // Access the value
        //console.log(keyValue)

    }
    deleteBtn()
    editBtn(key)
   
    
};



}
/*----------------------Thêm sự kiện khi ấn nút "Xóa" (unfinish)--------------------*/

function deleteBtn(key){
    
    // Tạo mới 1 transaction
    var request = db.transaction(["Product"], "readwrite");
    // Lấy ra đối tượng cần lưu trữ
    request = request.objectStore("Product");
    // Xóa dùng phương thức delete(), truyền vào key cần xóa
    request.delete(key); // Xóa dữ liệu với key là 1

    deleteAll()
}

/*----------------------Nút checkbox--------------------*/
function checkAll(myCheckbox) {
    var checkboxes = document.querySelectorAll("#tableBody input[type='checkbox']");
    
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = myCheckbox.checked;
    });
  }

/*----------------------nút xóa tất cả--------------------*/
var deleteAll = document.getElementById("deleteAll")
deleteAll.addEventListener("click",function(){
    var transaction = db.transaction(["Product"], "readwrite");
    var objectStore = transaction.objectStore("Product");
    var request2 = objectStore.clear();

    request2.onsuccess =function(event){
        var tbody = document.querySelector("#table tbody")
        tbody.innerHTML="";
        //window.location.href = "createProduct.html";
        
        console.log("xóa tất cả dữ liệu thành công!!")
    }
    request2.onerror = function(event) {
        console.log("Lỗi xóa dữ liệu");
      };
})

/*----------------------Nút sửa thông tin --------------------*/
function editBtn(key) {
    var transaction = db.transaction(["Product"], "readwrite");
    var objectStore = transaction.objectStore("Product");

    var request3 = objectStore.get(key);
    

    var newProduct = prompt("Nhập tên sản phầm:");
    var newPrice = prompt("Nhập giá:");
    var newProducer = prompt("Nhập nhà sản xuất:");
    var newNumber = prompt("Nhập Số Lượng:");
    var newDescribe = prompt("Nhập chi tiết sản pẩm:");
    


    request3.onsuccess = function(event) {
        var data = event.target.result;
        data.nameProduct = newProduct;
        data.priceProduct = newPrice;
        data.producerProduct = newProducer;
        data.numberProduct = newNumber;
        data.describeProduct =  newDescribe;

        var update = objectStore.put(data, key);
        update.onsuccess = function(event) {
            console.log("Dữ liệu đã được cập nhật thành công");
        };
        update.onerror = function(event) {
            console.log("Lỗi khi cập nhật dữ liệu");
        };
    };

    request3.onerror = function(event) {
        console.log("Lỗi khi tìm kiếm bản ghi");
    };
}



