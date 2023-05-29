const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let SCENETORENDER = "menu"; // on affiche le menu en 1er lieu


const sceneMenu = createSceneMenu();
const sceneForet = createSceneForet(); //Call the createScene function

const sceneHangmanObj = createHangman();
const sceneHangman = sceneHangmanObj.scene;
const resetHangman = sceneHangmanObj.resetHangman;
let isresetHangman = false;


const sceneCansObj = createCanGame();
const sceneCans = sceneCansObj.scene;
const resetGame = sceneCansObj.resetGame;
let isResetExecuted = false;



//// POINTS /////

let score = 0;
points = document.getElementById("score");

function ajtPoints(nb){
    score+=nb;
    points.innerText = "Graines : "+score;
}


/////////////////


///// BOUTON POUR ACCEDER A MERE NATURE APRES 1MIN////////////

var buttonBigBoss = document.createElement("button");
    buttonBigBoss.style.top = "100px";
    buttonBigBoss.style.right = "30px";
    buttonBigBoss.textContent = "Meet Mother Nature";
    buttonBigBoss.style.width = "100px"
    buttonBigBoss.style.height = "100px"

    buttonBigBoss.setAttribute = ("id", "but");
    buttonBigBoss.style.position = "absolute";
	buttonBigBoss.style.color = "black";

    document.body.appendChild(buttonBigBoss);
    buttonBigBoss.style.display = "none";

    // if clicked acces au bigboss

//////////////////////////////////////////////////////////




//// CHRONO /////

let startTime = null;
const countdownDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

timerText = document.getElementById("mainGametimer");


function startCountdown() {
  startTime = Date.now();
}


function updateMainTimer() {
    if (startTime) {
      const elapsed = Date.now() - startTime;
      const remaining = countdownDuration - elapsed;
  
      if (remaining <= 0) {
        console.log("5 min"); //envoyer au big boss et faire disparaitre timer
        startTime = null;
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timerText.innerText = `Mère Nature arrive... Temps restant : ${minutes} min ${seconds} sec`;

        if (elapsed >= 2 * 60 * 1000) {
            buttonBigBoss.style.display = "block";
          }
        }
      }
    }

/////////////////







// avec remove les autres scenes, ne pas oublier de les reactiver 
createMiniJeu().then((scene) => {
engine.runRenderLoop(function () {

    updateMainTimer();

    if (SCENETORENDER == "menu")
    {
        sceneMenu.render();
    }
    else if (SCENETORENDER == "foret")
    {

        // remove les autres scenes de l'arriere plan //
        sceneHangman.detachControl();
        sceneCans.detachControl();
        /*********************************************/

        sceneForet.attachControl(); // reactiver la scene when called
        sceneForet.render();
    }
    else if (SCENETORENDER == "cans")
    {
        // remove les autres scenes de l'arriere plan //
        sceneHangman.detachControl();
        sceneForet.detachControl();
        scene.detachControl();
        /*********************************************/

        sceneCans.attachControl(); // reactiver la scene when called
        sceneCans.render();

        if (!isResetExecuted) {
            resetGame();
            isResetExecuted = true;
          }
    }
    else if (SCENETORENDER == "hangman")
    {
        // remove les autres scenes de l'arriere plan //
        sceneForet.detachControl();
        sceneCans.detachControl();
        scene.detachControl();
        /*********************************************/

        sceneHangman.attachControl(); // reactiver la scene when called
        sceneHangman.render();

        if (!isresetHangman) {
            resetHangman();
            isresetHangman = true; // necessaire pr reinit une fois et pas en continu
          }
    }

    else if (SCENETORENDER == "miniJeu1")
    {
        // remove les autres scenes de l'arriere plan //
        sceneForet.detachControl();
        sceneCans.detachControl();
        sceneHangman.detachControl();
        /*********************************************/

        scene.attachControl(); // reactiver la scene when called
        scene.render();

        if (!isresetHangman) {
            resetHangman();
            isresetHangman = true; // necessaire pr reinit une fois et pas en continu
          }
    }

    else{
        console.log("mauvais SCENETORENDER");
    }
});
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
