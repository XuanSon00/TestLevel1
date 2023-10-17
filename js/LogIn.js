/*-----------------Lưu trữ dữ liệu indexDB----------------*/
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
    console.log("success: "+ db);
};
    
/*--------------------*/
var logInBtn = document.getElementById("button");
logInBtn.addEventListener("click", confirm)

function confirm(){
    var username = document.getElementById("userLogin").value;
    var password = document.getElementById("passwordLogin").value;


    var check = db.transaction(["Info"], "readonly");
    check = check.objectStore("Info");
    check = check.getAll(); // lấy giá trị ở trong indexedDB đã tạo ở signIn.html

    
    check.onerror = function(event){
        console.log("lỗi khi lấy từ cơ sở dữ liệu IndexedDB", event.target.errorCode)
    }

    check.onsuccess = function(event){
        var data = event.target.result;
        var LogIn = false;

        data.forEach(function(checking){
            if(checking.user === username && checking.password === password) {
                LogIn = true;
                return;
            }
        });

        if (LogIn) {
            window.location.href = "Manager.html";
        } else {
            Swal.fire({
                icon: 'Error',
                title: 'Lỗi',
                text: 'Tài khoản hoặc Mật khẩu chưa nhập hoặc không chính xác!',
                
              })
        }
    }

}


