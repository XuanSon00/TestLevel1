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
    };


    
}
//Thêm sự kiện khi ấn nút "Xóa"
    function deleteBtn(){
        var deleteBtns = document.querySelectorAll(".delete");
        deleteBtns.forEach(function(button){
            button.addEventListener("click", function(){
                var del = button.parentNode.parentNode;
               //var del = button.parentElement.parentElement;
                del.remove();
            });
        });
    }
    

/*
window.onload = function(){
    setTimeout(function(){
      readAll();
    }, 2000);
   };
*/   