/* let h1ColorValue = document.querySelector("h1"); 
let h1ColorValue = $("h1").css("color"); usandolo asi me devuelve el valor del color x ej*/

/* document.querySelector("h1").textContent = "lmao"; 
$("h1").text("Text Changed");*/

/* document.querySelector("h1").classList.add("bigTitle"); 
$("h1").addClass("bigTitle");*/

/* document.querySelectorAll("button")[0].style.backgroundColor = "green"; */
for (let i = 0; i < $("button").length; i++) {
  $("button").eq(i++).css("color", "rgb(153, 136, 98)");
}

//button thats toggle the css of the h1 for example
function cssToggle(index) {
  $("h1").toggleClass("bigTitle margin50");

  if (index === 2 || index === "d") {
    $("div").eq(0).toggleClass("columnContainer");
    $("button").eq(2).toggleClass("borderSelector");
  } else if (index === 1 || index === "s") {
    $("div").eq(2).toggleClass("container");
    $("button").eq(1).toggleClass("borderSelector");
  } else {
    $("div").eq(1).toggleClass("container");
    $("button").eq(0).toggleClass("borderSelector");
  }
}
/* document.querySelectorAll("button")[0].addEventListener("click", cssToggle) */
$("button").each(function (index) {
  $(this).on("click", function () {
    cssToggle(index);
  });
});

$("h1").on("mouseover", function () {
  $(this).css("background", "rgb(87, 87, 87)");
  $(this).css("borderRadius", "15px");
  $(this).css("paddingLeft", "15px");
});

$(".cubeButton").on("click", function () {
  $(".cube").slideToggle();
});

$(document).on("keydown", function (keyboard) {
  cssToggle(keyboard.key);
  $("h1").text(keyboard.key);
});

//numbers on buttons
$("button").each(function (i) {
  $(this).on("click", function () {
    let actualText = $(this).text();

    if (actualText.endsWith(`${i} `)) {
      actualText = actualText.slice(0, -2);
      $(this).text(` ${actualText} ${i} `);
    } else {
      $(this).text(` ${actualText} ${i} `);
    }
  });
});

/* .attr to get te value, or use a , after the "" to modify them 
$("h1").attr("class")
   $("img").attr("src") */
