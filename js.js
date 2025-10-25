//primeraEtapa
//////////////////////////////////////////
//creador de inputs para name en base a cantidad de jugadores ingresados
$("#agregarInputTest").on("click", function () {
  cantidadJugadores = parseInt($("#jugadores").val().trim(), 10);

  if (isNaN(cantidadJugadores)) {
    $("#jugadores").addClass("input-error");
    $("#error-jugadores").text("Por favor, ingrese un numero.").show();
    return;
  } else if (cantidadJugadores === "" || cantidadJugadores <= 0) {
    $("#jugadores").addClass("input-error");
    $("#error-jugadores")
      .text("Por favor, completá este campo con un valor mayor a 0")
      .show();
    return;
  } else {
    $("#jugadores").removeClass("input-error");
    $("#error-jugadores").hide();
  }

  const form = $("form");
  for (let i = 0; i < cantidadJugadores; i++) {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = `jugador ${i}`;
    newInput.placeholder = "Nombre de Jugador";
    newInput.required = true;
    newInput.id = `input${i}`;

    const newSmall = document.createElement("small");
    newSmall.id = "error-jugadores";
    newSmall.className = "mensaje-error";

    form.append(newInput);
    form.append(newSmall);

    /* <button type="button" class="jugar" id="jugar">Jugar</button> */
  }
  const botonJugar = document.createElement("button");
  botonJugar.type = "button";
  botonJugar.className = "jugar";
  botonJugar.id = "jugar";
  botonJugar.textContent = "Jugar";
  form.append(botonJugar);

  // Mostrar botón jugar
  $("#jugar").toggleClass("jugar");
  // Ocultar botón de ingresar
  $("#agregarInputTest").toggleClass("jugar");
  // Ocultar input de cantidad de jugadores
  $("#jugadores").toggleClass("jugar");
});
//onclick de button jugar, pasa a segundaEtapa
$(document).on("click", "#jugar", function () {
  for (let i = 0; i < cantidadJugadores; i++) {
    let inputValue = $(`#input${i}`).val().trim();
    if (inputValue === "") {
      $(`#input${i}`).addClass("input-error");
      $("#error-jugadores").text("Por favor, completá este campo").show();
      return;
    } else {
      $(`#input${i}`).removeClass("input-error");
      $("#error-jugadores").hide();
    }
  }

  $("#primeraEtapa").toggleClass("primeraEtapa");
  $("#segundaEtapa").toggleClass("segundaEtapa");
  condicionalParaActivarJuego++;
  selectorDeJugador();
});

//creador de divs x c/u de los jugadores ingresados
function selectorDeJugador() {
  for (let i = 0; i < cantidadJugadores; i++) {
    //nombreJugador almacena el valor del input ingresado en etapaUno
    let nombreJugador = $(`#input${i}`).val();
    const newDiv = document.createElement("div");
    newDiv.id = `playerDiv${i}`;
    const newP = document.createElement("p");
    newP.textContent = nombreJugador;
    newDiv.append(newP);
    $("#quienEstaJugando").append(newDiv);
    $(`#playerDiv${i}`).toggleClass("divDeJugador");

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    $(`#playerDiv${i}`).css("border-color", rgbColor);

    $(`#playerDiv${i}`).hover(
      function () {
        $(this).css("background-color", rgbColor);
      },
      function () {
        $(this).css("background-color", "");
      }
    );
  }
}

//segundaEtapa
//////////////////////////////////////////
//declaraciones
let condicionalParaActivarJuego = 0;
let cantidadJugadores = $("#jugadores").val();
const buttonColurs = ["green", "red", "yellow", "blue"];
const userClickedPattern = [];
const gamePattern = [];
let level = 0;
let checkNextSequence = 0;
//jugadorActual almacena el nombre del boton de jugador clickeado (devuelve string)
let jugadorActual = null;

//selector de jugador
function selectorDeJugadorEtapaDos() {
  if (jugadorActual !== null) {
    $("#quienEstaJugando").off("click", "div");
  } else {
    $("#quienEstaJugando").on("click", "div", function () {
      let botonClickeado = $(this).text();
      let botonClickeadoId = $(this).attr("id");
      console.log(botonClickeado);
      jugadorActual = botonClickeado;
      jugadorActualId = botonClickeadoId;

      $("#quienEstaJugando").off("click", "div");
    });
  }
}
selectorDeJugadorEtapaDos();
//siguiente nivel
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColurs[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(`gamePattern = ${gamePattern}`);
  $("h1").text(`Level ${level}`);
  level++;

  if (randomNumber === 0) {
    new Audio("/sounds/green.mp3").play();
    $("#green").css("opacity", "0");
    setTimeout(function () {
      $("#green").css("opacity", "1");
    }, 250);
  } else if (randomNumber === 1) {
    new Audio("/sounds/red.mp3").play();
    $("#red").css("opacity", "0");
    setTimeout(function () {
      $("#red").css("opacity", "1");
    }, 250);
  } else if (randomNumber === 2) {
    new Audio("/sounds/yellow.mp3").play();
    $("#yellow").css("opacity", "0");
    setTimeout(function () {
      $("#yellow").css("opacity", "1");
    }, 250);
  } else {
    new Audio("/sounds/blue.mp3").play();
    $("#blue").css("opacity", "0");
    setTimeout(function () {
      $("#blue").css("opacity", "1");
    }, 250);
  }
}
//comprueba si puede pasar de nivel (se crean p para TdPuntuacion)
function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      console.log("wrong");
      new Audio("/sounds/wrong.mp3").play();
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").toggleClass("game-over");
      setTimeout(function () {
        $("body").toggleClass("game-over");
      }, 200);

      //adjuntar mismo color
      if ($(`#${jugadorActual}`).length > 0) {
        if ($(`#${jugadorActual}`).text() >= level - 1) {
        } else {
          $(`#${jugadorActual}`).text(level - 1);
          let rgb = $(`#${jugadorActualId}`).css("border-color");
          $(`#${jugadorActual}`).css("border-color", rgb);
        }
      } else {
        const newP = document.createElement("p");
        newP.id = jugadorActual;
        newP.textContent = level - 1;
        $(".tablaDePuntuaciones").append(newP);
        $(`#${jugadorActual}`).toggleClass("newPStyle");
        let rgb = $(`#${jugadorActualId}`).css("border-color");
        $(`#${jugadorActual}`).css("border-color", rgb);
      }

      startOver();
      selectorDeJugadorEtapaDos();
      return;
    }
  }

  if (userClickedPattern.length === gamePattern.length) {
    console.log("success");
    setTimeout(function () {
      nextSequence();
    }, 1000);
    userClickedPattern.length = 0;
  }
}
//reinicio del juego
function startOver() {
  //level gamePattern started variables
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  checkNextSequence = 0;
  jugadorActual = null;
}

//sonido
function playSound(name) {
  if (name === "green") {
    new Audio("/sounds/green.mp3").play();
  } else if (name === "red") {
    new Audio("/sounds/red.mp3").play();
  } else if (name === "yellow") {
    new Audio("/sounds/yellow.mp3").play();
  } else {
    new Audio("/sounds/blue.mp3").play();
  }
}
//animacion
function animatePress(currentColour) {
  if (currentColour === "green") {
    $("#green").toggleClass("pressed");
    setTimeout(function () {
      $("#green").toggleClass("pressed");
    }, 100);
  } else if (currentColour === "red") {
    $("#red").toggleClass("pressed");
    setTimeout(function () {
      $("#red").toggleClass("pressed");
    }, 100);
  } else if (currentColour === "yellow") {
    $("#yellow").toggleClass("pressed");
    setTimeout(function () {
      $("#yellow").toggleClass("pressed");
    }, 100);
  } else {
    $("#blue").toggleClass("pressed");
    setTimeout(function () {
      $("#blue").toggleClass("pressed");
    }, 100);
  }
}

//para iniciar el juego (clicks)
$(".cube").on("click", function () {
  if (jugadorActual !== null) {
    if (checkNextSequence === 1) {
      let userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      console.log(`userClickedPatter = ${userClickedPattern}`);
      playSound(userChosenColour);
      animatePress(userChosenColour);

      checkAnswer();
    } else {
      $("#pressAKeyToStart").toggleClass("error");
      $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
      setTimeout(function () {
        $("#pressAKeyToStart").toggleClass("error");
        $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
      }, 600);
    }
  } else {
    for (let i = 0; i < cantidadJugadores; i++) {
      let idDeJugadorActual = `playerDiv${i}`;
      $(`#${idDeJugadorActual}`).toggleClass("error");
      $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
      setTimeout(function () {
        $(`#${idDeJugadorActual}`).toggleClass("error");
        $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
      }, 600);
    }
  }
});
//para iniciar el juego (keys)
$(document).on("keydown", function () {
  if (checkNextSequence === 0 && condicionalParaActivarJuego > 0) {
    if (jugadorActual !== null) {
      nextSequence();
      checkNextSequence = 1;
    } else {
      for (let i = 0; i < cantidadJugadores; i++) {
        let idDeJugadorActual = `playerDiv${i}`;
        $(`#${idDeJugadorActual}`).toggleClass("error");
        $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
        setTimeout(function () {
          $(`#${idDeJugadorActual}`).toggleClass("error");
          $(`#${idDeJugadorActual}`).toggleClass("errorAlert");
        }, 600);
      }
    }
  }
});

////////
//animaciones
