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

let startBoss = false;
const sceneBoss = addFinalBoss();
//const rappelle= sceneCansObj.rappelle;

//// POINTS /////

let score = 0;
points = document.getElementById("score");

function ajtPoints(nb){
    score+=nb;
    points.innerText = "Graines : "+score;
}


/////////////////


///// BOUTON POUR ACCEDER A MERE NATURE APRES 1MIN////////////


  // Create the button
  const buttonContainer = document.createElement("div");
  buttonContainer.style.position = "absolute";
  buttonContainer.style.top = "40px";
  buttonContainer.style.right = "20px";

  const sheIsComingButton = document.createElement("button");
  sheIsComingButton.textContent = "Recontrer Mère Nature";
  sheIsComingButton.style.width = "100px";
  sheIsComingButton.style.height = "70px";
  sheIsComingButton.style.background = "#eee6d8";
  sheIsComingButton.style.color = "black";

  sheIsComingButton.style.display = "none";

  sheIsComingButton.addEventListener("click", () => {
    //console.log("yay");
    timerText.style.display = "none";
    sheIsComingButton.style.display = "none";
    bossGUI();
  });

  buttonContainer.appendChild(sheIsComingButton);
  document.body.appendChild(buttonContainer);


//////////////////////////////////////////////////////////




/// AFFICHER GUI BOSS ////////////////////

async function bossGUI(){
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("firstMenu", true, sceneForet);
  await advancedTexture.parseFromSnippetAsync("TNAKE1#44");
  const menuScreen = advancedTexture.getControlByName("menuScreen");
  let children1 = menuScreen.getDescendants();
  var bossButton = children1.filter(control => control.name === "tryBoss")[0];
  sheIsComingButton.style.display = "none";

  bossButton.onPointerClickObservable.add(() => {
    SCENETORENDER = "bossFinal";
    timerText.style.display = "none";
    sheIsComingButton.style.display = "none";
    points.style.color = "white";
});
}

/////////////////////////////////////////




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
      bossGUI();
        startTime = null;
        timerText.style.display = "none";
        //SCENETORENDER="bossFinal";
        
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timerText.innerText = `Mère Nature arrive... Temps restant : ${minutes} min ${seconds} sec`;

        if (elapsed >= 1* 60 * 1000) {
          sheIsComingButton.style.display = "block";
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
        //sceneBoss.detachControl();
        /*********************************************/

        sceneForet.attachControl(); // reactiver la scene when called
        sceneForet.render();

        /*let music = new BABYLON.Sound("Music", "music/principal.mp3", sceneForet, null, {
          loop: true,
          autoplay: true,
        });*/
    }
    else if (SCENETORENDER == "cans")
    {
        // remove les autres scenes de l'arriere plan //
        sceneHangman.detachControl();
        sceneForet.detachControl();
        scene.detachControl();
        //sceneBoss.detachControl();
        /*********************************************/

        sceneCans.attachControl(); // reactiver la scene when called
        sceneCans.render();

        if (!isResetExecuted) {
            resetGame();
            isResetExecuted = true;
          }

          /*let music = new BABYLON.Sound("Music", "music/canettes.mp3", sceneCans, null, {
            loop: true,
            autoplay: true,
          });*/

    }
    else if (SCENETORENDER == "hangman")
    {
        // remove les autres scenes de l'arriere plan //
        sceneForet.detachControl();
        sceneCans.detachControl();
        scene.detachControl();
        //sceneBoss.detachControl();
        /*********************************************/

        sceneHangman.attachControl(); // reactiver la scene when called
        sceneHangman.render();

        if (!isresetHangman) {
            resetHangman();
            isresetHangman = true; // necessaire pr reinit une fois et pas en continu
          }

          /*let music = new BABYLON.Sound("Music", "music/pendu.mp3", sceneHangman, null, {
            loop: true,
            autoplay: true,
          });*/
    }

    else if (SCENETORENDER == "miniJeu1")
    {
        // remove les autres scenes de l'arriere plan //
        sceneForet.detachControl();
        sceneCans.detachControl();
        sceneHangman.detachControl();
        //sceneBoss.detachControl();
        /*********************************************/

        scene.attachControl(); // reactiver la scene when called
        scene.render();

        /*let music = new BABYLON.Sound("Music", "music/flamme.mp3", scene, null, {
          loop: true,
          autoplay: true,
        });*/

    }
    else if (SCENETORENDER == "bossFinal")
    {

        // remove les autres scenes de l'arriere plan //
        sceneHangman.detachControl();
        sceneCans.detachControl();
        sceneForet.detachControl();
        scene.detachControl();
        /*********************************************/

        sceneBoss.render();

        
          /*let music = new BABYLON.Sound("Music", "music/bigboss.mp3", sceneBoss, null, {
              loop: true,
              autoplay: true,
            });*/
  
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
