// Đăng nhập để có thể hiển thị chi tiết
var condition = document.querySelectorAll(".condition")
condition.forEach(function(popup){
    popup.addEventListener('click', function(event){
        Swal.fire(
            'Vui lòng đăng nhập hoặc đăng ký tài khoản?',
            "" ,
            'question'
          );

    })
})