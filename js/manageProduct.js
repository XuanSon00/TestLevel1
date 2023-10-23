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
        <td><button class="edit" onclick="editBtn(${key})" id="editProduct">Sửa</button></td>
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


$(function() {
    // Khởi tạo dialog
    $('#editProduct').dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        "Lưu": function() {
          // Lấy thông tin từ các trường nhập liệu
          var productName = $('#productName').val();
          var productPrice = $('#productPrice').val();
          var productProducer = $('#productProducer').val();
          var productNumber = $('#productNumber').val();
          var productDescribe = $('#productDescribe').val();
  
          // Lưu thông tin vào IndexedDB
          saveToIndexedDB(productName, productPrice, productProducer, productNumber, productDescribe);
  
          // Đóng dialog
          $(this).dialog("close");
        },
        "Đóng": function() {
          // Đóng dialog
          $(this).dialog("close");
        }
      }
    });
    
    // Gắn sự kiện khi click vào button "Sửa"
    $('#editButton').on('click', function() {
      // Hiển thị dialog
      $('#editProduct').dialog('open');
    });
  });
  
  // Hàm lưu thông tin vào IndexedDB
  function saveToIndexedDB(name, price, producer, number, describe) {
    var request3 = window.indexedDB.open("Product-Management", 1);
  
    request3.onerror = function(event) {
      console.log("Lỗi khi mở IndexedDB");
    };
  
    request3.onsuccess = function(event) {
      var db = event.target.result;
  
      // Tạo transaction để thực hiện thao tác ghi
      var transaction = db.transaction(["Product"], "readwrite");
  
      // Lấy object store để thao tác với dữ liệu
      var objectStore = transaction.objectStore("Product");
  
      // Tạo một đối tượng để lưu trữ thông tin sản phẩm
      var product = {
        name: name,
        price: price,
        producer: producer,
        number: number,
        describe: describe
      };
  
      // Thêm đối tượng vào object store
      var request3 = objectStore.add(product);
  
      request3.onsuccess = function(event) {
        console.log("Thông tin sản phẩm đã được lưu vào IndexedDB");
      };
  
      request3.onerror = function(event) {
        console.log("Lỗi khi lưu thông tin vào IndexedDB");
      };
    };
  }

/*-------------Tìm kiếm---------------------*/
  
function searchByName(){

    var name = document.getElementById("search").value;
    console.log(name)

    //sử dụng getAll()
  var request = db.transaction(["Product"]).objectStore("Product").getAll();
    //let info =[]
    request.onerror = function(event){
        console.log('Error')
    };


  const transaction = db.transaction(["Product"], "readonly");
  const objectStore = transaction.objectStore("Product");

  const request5 = objectStore.openCursor();

  request5.onsuccess = (event) => {
    const cursor = event.target.result;

    if(cursor){
      const key = cursor.key; //access the key
      const result2 = cursor.value; //access the value
      

      //const lowerCaseName = result.name.toLowerCase(); //chuyển viết Hoa của chuỗi thành viết thường

       //định dạng lại ngày tháng năm và giờ trong bảng
    

    
      //indexOf = 0 là có ; -1 là k có
      if(result2.name.indexOf(name) > -1){ 
        
    var tbody = document.querySelector("#table tbody");
    tbody.innerHTML = '';
    var tr = `<tr>
    <td><input type="checkbox" ></td>
    <td>${result2.name}</td>
    <td>${result2.price}</td>
    <td>${result2.producer}</td>
    <td>${result2.number}</td>
    <td>${result2.describe}</td>
    <td>${result2.image}</td>
    <td><button class="edit" onclick="editBtn(${key}) id="editProduct">Sửa</button></td>
    <td><button onclick="deleteBtn(`+key+`)" style="cursor: pointer" class="delete">Xóa</button></td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', tr);
      }

      cursor.continue();
      
    }
  }
}
