var db; //Khởi tạo DB

var request = window.indexedDB.open("User-Information", 1); //Tạo đối tượng lưu trữ

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("Info",{autoIncrement: true});

}

request.onerror =function(event){
    console.log("error: ");
}
request.onsuccess = function (event) {
    db = request.result;
    readAll()
    console.log("success: "+ db);
};



//lấy ra nhiều đối tượng
function readAll(){
    
    //sử dụng getAll()
    var request = db.transaction(["Info"]).objectStore("Info").getAll();
    //let info =[]
    request.onerror = function(event){
        console.log('Error')
    };

//     const objectStore = db.transaction(["Info"]).objectStore("Info");

//   const myIndex = objectStore.index("name");
//   const getKeyRequest = myIndex.getKey();
//   getKeyRequest.onsuccess = () => {
//     console.log(getKeyRequest.result);
//   };


const transaction = db.transaction(['Info'], 'readonly');
const objectStore = transaction.objectStore('Info');

const request1 = objectStore.openCursor();

request1.onsuccess = (event) => {
  const cursor = event.target.result;

  if (cursor) {
    const key = cursor.key; // Access the key
    const result = cursor.value; // Access the value

    //định dạng lại ngày tháng năm và giờ trong bảng
    const date = moment(result.date);
    const formatDate = date.format('DD/MM/YYYY HH:mm')

  
    

    // Perform operations with the key and value
    //console.log('Key:', key, 'Value:', value);
    var tbody = document.querySelector("#table tbody");
    var tr = `<tr>
        <td><input type="checkbox" data-key="1" ></td>
        <td >${result.name}</td>
        <td>${result.email}</td>
        <td>${result.phone}</td>
        <td>${result.gender}</td>
        <td>${formatDate}</td>
        <td><button class="edit" onclick="editBtn(${key})">Sửa</button></td>
        <td><button onclick="deleteBtn(`+key+`)" style="cursor: pointer" class="delete">Xóa</button></td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', tr);


    cursor.continue();
  }
};


    //console.log(request)
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
          /*  //tạo tr
            var tr = document.createElement("tr");
            var trcontent = document.createElement("td");
            trcontent.innerText =result[i].name;
            //thêm td vào tr
            tr.insertAdjacentHTML('beforeend', trcontent)
            tbody.insertAdjacentHTML('beforeend', tr)
        //console.log(result[i])*/
    //     var tr = `<tr>
    //     <td><input type="checkbox"></td>
    //     <td >${result[i].name}</td>
    //     <td>${result[i].email}</td>
    //     <td>${result[i].phone}</td>
    //     <td>${result[i].gender}</td>
    //     <td>${result[i].date}</td>
    //     <td><button class="edit">Sửa</button>.</td>
    //     <td><button onclick="deleteBtn()" style="cursor: pointer" class="delete">Xóa</button></td>
    //   </tr>`;
    // tbody.insertAdjacentHTML('beforeend', tr);
        }
        deleteBtn()
        editBtn(key)
       
        
    };

}
    
/*----------------------Thêm sự kiện khi ấn nút "Xóa" --------------------*/

function deleteBtn(key){
    // var deleteBtns = document.querySelectorAll(".delete");
    // deleteBtns.forEach(function(button){
    //     button.addEventListener("click", function(){
    //         var del = button.closest("tr");
    //         var productName = del.querySelector("td:nth-child(2)").innerHTML; //lấy tên sản phẩm
    //         var indexNumber = 0; // chỉ mục trong indexDb số thứ tự
    //        //var del = button.parentElement.parentElement;
    //         del.remove();

    //         //xóa tên sản phẩm trong indexed db
    //         var request = db.transaction(["Product"], "readwrite").objectStore("Product").index("indexNumber");
    //         request = request.get(productName)

    //         request.onsuccess = function (event) {
    //             var result = event.target.result;
        
    //             if(result){
    //                 var delProduct = request.delete(result.name);
    //                 delProduct.onsuccess  = function() {
    //                     console.log("Đã xóa thành công tên sản phẩm");
    //                     deleteAll()
    //                   };
    //                   delProduct.onerror = function() {
    //                     console.log("Lỗi xóa tên sản phẩm");
    //                   };
    //             }
        
    //     }});
    // });
    // Tạo mới 1 transaction
    var request = db.transaction(["Info"], "readwrite");
    // Lấy ra đối tượng cần lưu trữ
    request = request.objectStore("Info");
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
    var transaction = db.transaction(["Info"], "readwrite");
    var objectStore = transaction.objectStore("Info");
    var request2 = objectStore.clear();

    request2.onsuccess =function(event){
        var tbody = document.querySelector("#table tbody")
        tbody.innerHTML="";
        //window.location.href = "index.html";
        
        console.log("xóa tất cả dữ liệu thành công!!")
    }
    request2.onerror = function(event) {
        console.log("Lỗi xóa dữ liệu");
      };
    

})



/*----------------------Nút sửa thông tin --------------------*/
function editBtn(key) {
    var transaction = db.transaction(["Info"], "readwrite");
    var objectStore = transaction.objectStore("Info");

    var request3 = objectStore.get(key);
    

    var newName = prompt("Nhập tên mới:");
    var newEmail = prompt("Nhập Email mới:");
    var newPhone = prompt("Nhập sđt mới:");
    var newGender = prompt("Nhập Giới tính(Nam hoặc Nữ):");


    request3.onsuccess = function(event) {
        var data = event.target.result;
        data.name = newName;
        data.email = newEmail;
        data.phone = newPhone;
        data.gender = newGender;
        data.date =  newDate;

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



/*----------------------Tìm kiếm (unfinished)--------------------*/
var transaction = db.transaction(["Info"], "readonly");
  var objectStore = transaction.objectStore("Info");
  var request4 = objectStore.index("name").openCursor(IDBKeyRange.only(name));
  var tbody = document.querySelector("#table tbody");
  tbody.innerHTML = ""; // Xóa các dòng hiện tại trong bảng

  request4.onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      var value = cursor.value;

      // Tạo dòng mới trong bảng với thông tin tìm kiếm được
      var tr = `<tr>
        <td><input type="checkbox" data-key="${cursor.key}"></td>
        <td>${value.name}</td>
        <td>${value.email}</td>
        <td>${value.phone}</td>
        <td>${value.gender}</td>
        <td></td>
        <td><button class="edit" onclick="editBtn(${cursor.key})">Sửa</button></td>
        <td><button onclick="deleteBtn(${cursor.key})" style="cursor: pointer" class="delete">Xóa</button></td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", tr);

      cursor.continue();
    }
  };

  request4.onerror = function(event) {
    console.log("Lỗi khi tìm kiếm theo tên");
  };
