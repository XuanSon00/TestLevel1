let list = document.querySelector(".slider .slider-list");
let item = document.querySelectorAll(".slider .slider-list .slider-item");
let dots = document.querySelectorAll("slider .dots. li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;

next.onclick = function(){
    active += 1;
    reloadSlider();

}

function reloadSlider(){
    let checkleft = item[active].offsetLeft; 
}
