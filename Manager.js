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


    //console.log(request)
    request.onsuccess =function(event){
        //lấy ra kết quả trả về
        var result = request.result;
        // sủ dụng dom thêm vào danh sách
        var tbody = document.querySelector("#table tbody");
        console.log(result);
        for(var i =0; i < result.length; i++){  
          /*  //tạo tr
            var tr = document.createElement("tr");
            var trcontent = document.createElement("td");
            trcontent.innerText =result[i].name;
            //thêm td vào tr
            tr.insertAdjacentHTML('beforeend', trcontent)
            tbody.insertAdjacentHTML('beforeend', tr)
        //console.log(result[i])*/
        var tr = `<tr>
        <td><input type="checkbox"></td>
        <td>${result[i].name}</td>
        <td>${result[i].email}</td>
        <td>${result[i].phone}</td>
        <td>${result[i].gender}</td>
        <td>${result[i].date}</td>
        <td><button class = "edit">Sửa</button></td>
        <td><button onclick="deleteBtn()" style="cursor: pointer" class="delete">Xóa</button></td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', tr);
        }
        deleteBtn()
        CheckboxAll()
    };


    
}/*----------------------Thêm sự kiện khi ấn nút "Xóa" (unfinish)--------------------*/

function deleteBtn(button){
    var deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach(function(button){
        button.addEventListener("click", function(){
            var del = button.closest("tr");
            var productName = del.querySelector("td:nth-child(2)").innerHTML; //lấy tên sản phẩm
            var indexNumber = 0; // chỉ mục trong indexDb số thứ tự
           //var del = button.parentElement.parentElement;
            del.remove();

            //xóa tên sản phẩm trong indexed db
            var request = db.transaction(["Product"], "readwrite").objectStore("Product").index("indexNumber");
            request = request.get(productName)

            request.onsuccess = function (event) {
                var result = event.target.result;
        
                if(result){
                    var delProduct = request.delete(result.name);
                    delProduct.onsuccess  = function() {
                        console.log("Đã xóa thành công tên sản phẩm");
                        deleteAll()
                      };
                      delProduct.onerror = function() {
                        console.log("Lỗi xóa tên sản phẩm");
                      };
                }
        
        }});
    });
    
}

/*----------------------Nút checkbox--------------------*/
function CheckboxAll() {
    let Allcheckbox = document.getElementById("selectAll")
    let checkboxes = document.querySelectorAll('#tableBody input[type="checkbox"]');

//ấn checkbox chọn tất cả
    Allcheckbox.onclick =function(){
        checkboxes.forEach(function(checkbox){
            checkbox.checked = Allcheckbox.checked;
        });
    }
    deleteBtn()
}

/*----------------------nút xóa tất cả(unfinish)--------------------*/
var deleteAllBtn = document.querySelector('.manage button');
deleteAllBtn.addEventListener('click', deleteAll);

function deleteAll(){
    var checkboxes = document.querySelectorAll('#tableBody input[type="checkbox"]:checked')
    checkboxes.forEach(function(checkbox) {
        var del = checkbox.closest('tr');
        del.remove();
    });
    deleteBtn()
}