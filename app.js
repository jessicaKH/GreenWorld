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


// avec remove les autres scenes, ne pas oublier de les reactiver 

engine.runRenderLoop(function () {
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
        /*********************************************/

        sceneHangman.attachControl(); // reactiver la scene when called
        sceneHangman.render();

        if (!isresetHangman) {
            resetHangman();
            isresetHangman = true; // necessaire pr reinit une fois et pas en continu
          }
    }
    else{
        console.log("mauvais SCENETORENDER");
    }
});


// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
