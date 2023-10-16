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



    
/*-------------Kiểm tra lỗi-------------*/
function check(event){
    // kiểm tra lỗi tên người dùng
    var name = document.getElementById('name')
    var nameError = document.getElementById('nameError')
    var nameErrorLength = document.getElementById('nameErrorLength')
    
    if(name.value === ""){
        nameError.style.display ='block';
        nameError.style.color ='red';
    } else {
        if(name.value.length < 5){
            nameErrorLength.style.display ='block';
            nameErrorLength.style.color ='red';
            nameError.style.display ='none'
        } else {
            nameError.style.display = 'none'
            nameErrorLength.style.display = 'none'
        }
    }
    // kiểm tra lỗi email
    var email = document.getElementById('email')
    var emailError = document.getElementById('emailError')
    var emailErrorCheck = document.getElementById('emailErrorCheck')
    
    if(email.value === ""){
        emailError.style.display ='block'
        emailError.style.color ='red'
    } else {
        if(email.value.indexOf('@') === -1 || email.value.indexOf('.com') === -1) {
            emailErrorCheck.style.display ='block'
            emailErrorCheck.style.color ='red'
            emailError.style.display ='none'
        } else {
            emailErrorCheck.style.display ='none'
            emailError.style.display = 'none'
        }
    }
    // kiểm tra số điện thoại
    var phone = document.getElementById('phone')
    var phoneError = document.getElementById('phoneError')
    var phoneErrorLength = document.getElementById('phoneErrorLength')
    
    if(phone.value === ""){
        phoneError.style.display = 'block'
        phoneError.style.color = 'red'
    } else {
        if(phone.value.length > 11) {
            phoneErrorLength.style.display = 'block'
            phoneErrorLength.style.color = 'red'
        } else {
            phoneError.style.display = 'none'
            phoneErrorLength.style.display = 'none'
        }
    }
    //kiểm tra lựa chọn nam/nữ
    var genderMale = document.getElementById('male')
    var genderFemale = document.getElementById('female') 
    var genderError = document.getElementById('genderError')
    
    if (!genderMale.checked && !genderFemale.checked ) {
        genderError.style.display ='block'
        genderError.style.color ='red'
    } else {
        genderError.style.display ='none'
    }
    
    //kiểm tra user người dùng
    var user = document.getElementById('user')
    var userError = document.getElementById('userError')
    var userErrorLength = document.getElementById('userErrorLength')
    
    if(user.value === ""){
        userError.style.display ='block';
        userError.style.color ='red';
    } else {
        if(user.value.length < 5){
            userErrorLength.style.display ='block';
            userErrorLength.style.color ='red';
            userError.style.display ='none'
        } else {
            userError.style.display = 'none'
            userErrorLength.style.display = 'none'
        }
    }
    
    //kiểm tra mật khẩu
    var password = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');
    var passwordErrorLength = document.getElementById('passwordErrorLength');
    var passwordCheck = document.getElementById('passwordCheck');
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    
    if(password.value ===""){
        passwordError.style.display ='block';
        passwordError.style.color ='red';
    } else {
        if(password.value.length < 8){
            passwordErrorLength.style.display ='block';
            passwordErrorLength.style.color ='red';
            passwordError.style.display ='none'
        } else {
           if(!regex.test(password.value)){
            passwordCheck.style.display ='block';
            passwordCheck.style.color ='red';
            userErrorLength.style.display ='none';
           }
        }
    }
    
    //kiểm tra xác nhận lại mật khẩu
    var confirmPassword = document.getElementById('confirmPassword');
    var confirmError = document.getElementById('confirmError');
    var confirmErrorCheck = document.getElementById('confirmErrorCheck');
    
    if(confirmPassword.value ===""){
        confirmError.style.display ='block'
        confirmError.style.color ='red'
    } else {
        if(confirmPassword.value !== password.value){
            confirmErrorCheck.style.display ='block';
            confirmErrorCheck.style.color ='red';
            confirmError.style.display ='none'
        }
    }
    
    add();
    }
    
/*-------------Thêm dữ liệu vào indexed DB-------------*/
    function add(){
        let name = document.getElementById("name").value
        let email = document.getElementById("email").value
        let phone = document.getElementById("phone").value
        let gender = document.querySelector('input[name="Gender"]:checked').value;
        let user = document.getElementById("user").value
        let password = document.getElementById("password").value 

    //Tạo mới 1 transaction  
    var request = db.transaction(["Info"], "readwrite");
    //var request = db.transaction(["Info"], "readwrite");
    //Lấy ra đối tượng lưu trữ
    //var objectStore = transaction.objectStore("Info");
        request = request.objectStore("Info");
    //Thêm vào "Thông Tin" sử dụng add()
        request = request.add({name: name, email: email, phone: phone,gender: gender,user: user,password: password, date: new Date()});

        request.onsuccess = function(event){    
            console.log('Success');
            //chuyển trang hoặc thông báo thêm thành công
            Swal.fire({
                icon: 'success ',
                title: 'Đăng ký thành công',
                
              })
        };
        request.onerror = function(event){
            console.log('Error');
            
        }
    };
    
  
/*-------------Hiển thị password-------------*/
function ShowPassword(){
    var ShowPass1 = document.getElementById('password');
    var checkbox1 = document.getElementById('checkbox1');
    
    if (checkbox1.checked === true) {
        ShowPass1.type = 'text';
    } else {
        ShowPass1.type = 'password';
    }
    }
    function ShowConfirmPassword(){
    var ShowPass2 = document.getElementById('confirmPassword');
    var checkbox2 = document.getElementById('checkbox2');
    
    if (checkbox2.checked === true) {
        ShowPass2.type = 'text';
    } else {
        ShowPass2.type = 'password';
    }
    };


    
    
    