var x1=document.getElementsByTagName("span")[0];
var x2=document.getElementsByTagName("span")[1];
var x3=document.getElementsByTagName("span")[2];
var x4=document.getElementsByTagName("span")[3];
var x5=document.getElementsByTagName("span")[4];
var y1=document.getElementsByTagName("a")[0];
var y2=document.getElementsByTagName("a")[1];
var y3=document.getElementsByTagName("a")[2];
var y4=document.getElementsByTagName("a")[3];
var y5=document.getElementsByTagName("a")[4];
console.log(x1)
console.log(x2)
console.log(x3)
console.log(x4)
console.log(x5)


function fun()
{
  x1.style.display="block";
  y1.style="color:rgb(18, 204, 195)";
}
function fun_a()
{
    x1.style.display="none";
    y1.style="color:white";

}
function fun1()
{
    x2.style.display="block";
    y2.style="color:rgb(18, 204, 195)";
}
function fun_1()
{
    x2.style.display="none";
    y2.style="color:white";
    
}
function fun2()
{
    x3.style.display="block";
    y3.style="color:rgb(18, 204, 195)";
}
function fun_2()
{
    x3.style.display="none";
    y3.style="color:white";
}


function fun3()
{
    x4.style.display="block";
    y4.style="color:rgb(18, 204, 195)";
}
function fun_3()
{
    x4.style.display="none";
    y4.style="color:block";
}
function fun4()
{
    x5.style.display="block";
    y5.style="color:rgb(18, 204, 195)";
}
function fun_4()
{
    x5.style.display="none";
    y5.style="color:white";
}

/* For Nav Bar 3 Element*/
// var icon1=document.getElementsByClassName("fa-solid fa-bars")[0];
// var select_id=document.getElementsByClassName("selectclass")[0];
// function funi(data)
// {
//     var y1=document.getElementsByClassName(data)[0];
//     y1.style.width="100px";
// }

const funi=(y)=>{
    let x = document.getElementsByClassName(y)[0];
    x.style.display='flex'
}
const funii=(z)=>{
    let x = document.getElementsByClassName(z)[0];
    x.style.display='none'
}


var r1=document.getElementsByClassName("object1")[0];
var r2=document.getElementsByClassName("object2")[0];
var r3=document.getElementsByClassName("object3")[0];
var r4=document.getElementsByClassName("object4")[0];
var parentcentral=document.getElementsByClassName("central")[0];
// function rotating()
// {
//     parentcentral.style="box-shadow: 0px 0px 20px rgb(0, 255, 242)";
//     r1.style="animation: rotate1 6s linear infinite;";
//     r2.style="animation: rotate2 6s linear infinite;";
//     r3.style="animation: rotate3 6s linear infinite;";
//     r4.style="animation: rotate4 6s linear infinite";
//     console.log("Bhanu");


// }
// function rotating2()
// {
//     parentcentral.style="box-shadow: 0px 0px 0px black";
//     r1.style="animation: none";
//     r2.style="animation: none";
//     r3.style="animation: none";
//     r4.style="animation: none";
    


// }

let slideIndex = 0;

let slider = document.getElementById('slider')

let slides = slider.getElementsByClassName('slide')

let slideControl = document.getElementById('slide-control')

let slideControlItems = slideControl.getElementsByClassName('slide-control-item')


slider.style.marginTop = '-' + slideIndex + '00vh'

setTimeout(() => {
	slideControlItems[slideIndex].classList.add('active')
	slides[slideIndex].classList.add('active')
}, 500)


chooseProduct = (index) => {
	if (index === slideIndex) return

	slideIndex = index

	let currSlideControl = slideControl.querySelector('.slide-control-item.active')
	currSlideControl.classList.remove('active')

	let currSlide = slider.querySelector('.slide.active')
	currSlide.classList.remove('active')

	setTimeout(() => {
		slider.style.marginTop = '-' + slideIndex + '00vh'
		slideControlItems[slideIndex].classList.add('active')
		slides[slideIndex].classList.add('active')
	}, 1500)
	
}

Array.from(slideControlItems).forEach((el, index) => {
	el.onclick = function() {
		chooseProduct(index)
	}
})
