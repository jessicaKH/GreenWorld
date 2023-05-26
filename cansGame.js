const createCanGame = function () {


    const addRandomParasol = function(scene, count) {
        BABYLON.SceneLoader.ImportMesh("", "models/", "parasol.glb", scene, function(meshes) {
          var originalMesh0 = meshes[0];
          originalMesh0.position = new BABYLON.Vector3(5, 0, 5);
          var originalMesh = meshes[0];
          var minX = -100;
          var maxX = 100;
          var minZ = -100;
          var maxZ = 100;
      
          for (var i = 0; i < count; i++) {
            var mesh = originalMesh.clone("parasol_" + i);
      
            var randomX = minX + Math.random() * (maxX - minX);
            var randomZ = minZ + Math.random() * (maxZ - minZ);
            mesh.position = new BABYLON.Vector3(randomX, 0, randomZ);
          }
    
        });
      };




const createScene = function() {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.minZ = 0.45;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 2;

    const light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    light2.intensity = 2;

    /*** ENVIRONMENT ***/

    new BABYLON.PhotoDome("forest", "img/blueSky.jpg", { resolution: 32, size: 1000 }, scene);


    
    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1000, height: 1000}, scene);
    const lavaGround = new BABYLON.StandardMaterial("lava");
    lavaGround.diffuseTexture = new BABYLON.Texture("img/ground3.png");
    ground.material = lavaGround;
    ground.checkCollisions = true;

    addRandomParasol(scene,10);

    return scene;
}

const scene = createScene();


 // Gravity and collisions

const assumedFramesPerSecond = 60;
const earthGravity = -9.81;
scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0); 

scene.collisionsEnabled = true;



const addCans = function(scene) {
    BABYLON.SceneLoader.ImportMesh("", "models/finishedLolaLola4.glb", "", scene, function(meshes) {
      var originalMesh = meshes[0];
      var clonedMeshes = [];

  
      for (var i = 0; i < 30; i++) {
        var clonedMesh = originalMesh.clone("Clone_" + i);
        clonedMeshes.push(clonedMesh);
      }

      originalMesh.dispose();
  
      var minX = -200;
      var maxX = 200;
      var minZ = -200;
      var maxZ = 200;
  
      function posRandom(meshes, minX, maxX, minZ, maxZ) {
        meshes.forEach(function(mesh) {
          var randomX = minX + Math.random() * (maxX - minX);
          var randomZ = minZ + Math.random() * (maxZ - minZ);
          mesh.position = new BABYLON.Vector3(randomZ, 0, randomX);
          mesh.isPickable = true;
        });
      }
  
      posRandom(clonedMeshes, minX, maxX, minZ, maxZ);
  
      // Event handler for picking on addCans meshes
      var addCansEventHandler = function(event) {
        var pickInfo = scene.pickWithRay(scene.createPickingRay(event.clientX, event.clientY));
  
        if (pickInfo.hit && pickInfo.pickedMesh.name.includes("Clone")) {
          // Handle event for addCans meshes
          console.log("Picked addCans mesh:", pickInfo.pickedMesh.name);
          ajtPoint();
          pickInfo.pickedMesh.isVisible = false;
        }
      };
  
      // Register the event handler for picking on addCans meshes
      canvas.addEventListener("pointerdown", addCansEventHandler);
    });
  };
  
  const addBadCans = function(scene) {
    BABYLON.SceneLoader.ImportMesh("", "models/finishedLL.glb", "", scene, function(meshes) {
      var originalMesh = meshes[0];
      var clonedMeshes = [];

  
      for (var i = 0; i < 25; i++) {
        var clonedMesh = originalMesh.clone("bad_" + i);
        clonedMeshes.push(clonedMesh);
      }

      originalMesh.dispose();
  
      var minX = -200;
      var maxX = 200;
      var minZ = -200;
      var maxZ = 200;
  
      function posRandom(meshes, minX, maxX, minZ, maxZ) {
        meshes.forEach(function(mesh) {
          var randomX = minX + Math.random() * (maxX - minX);
          var randomZ = minZ + Math.random() * (maxZ - minZ);
          mesh.position = new BABYLON.Vector3(randomZ, 0, randomX);
          mesh.isPickable = true;
        });
      }
  
      posRandom(clonedMeshes, minX, maxX, minZ, maxZ);
  
      // Event handler for picking on addBadCans meshes
      var addBadCansEventHandler = function(event) {
        var pickInfo = scene.pickWithRay(scene.createPickingRay(event.clientX, event.clientY));
  
        if (pickInfo.hit && pickInfo.pickedMesh.name.includes("bad_")) {
          // Handle event for addBadCans meshes
          console.log("Picked addBadCans mesh:", pickInfo.pickedMesh.name);
          stopChrono()
        stopTimer();
        timer.style.display = "none"; 
        SCENETORENDER = "foret";
        isResetExecuted = false;
        }
      };
  
      // Register the event handler for picking on addBadCans meshes
      canvas.addEventListener("pointerdown", addBadCansEventHandler);
    });
  };
  
  // Call the addCans and addBadCans functions
  addCans(scene);
  addBadCans(scene);
  

////////////////////////////////////////

// CHRONOMETRE


var timer = document.getElementById("timer");

var tempsEcoule = 0;
var tempsDebut = 0;
var commencer = false;

function startTimer() {
    commencer = true;
    tempsDebut = performance.now();
  }

  function stopTimer() {
    commencer = false;
    elapsedTime = 0;
  }

function updateTimer() {
  tempsEcoule = performance.now() - tempsDebut;
  
  //console.log("Elapsed time:", tempsEcoule);
  //var minutes = Math.floor( tempsEcoule / 60000);
  var secondes = Math.floor(( tempsEcoule % 60000) / 1000);
  timer.style.display = "block";  
  timer.innerText = "Temps écoulé : " + secondes + " secondes"

  if(secondes>30) {
    stopChrono()
    stopTimer();
    timer.style.display = "none"; 
    SCENETORENDER = "foret";
    isResetExecuted = false;

  }

}


var interval;
// Appeler la fonction pour mettre à jour le minuteur chaque seconde
function timePoints(){
    startTimer();
    interval = setInterval(updateTimer, 500);
    points.style.display = "block"; 
//}
}

// pr stopper setInterval si besoin
function stopChrono() {
    clearInterval(interval);
  }

// COMPTEUR DE POINTS


var score = 0;
var toThree = 0; // on n'ajoute un point qu'après avoir ramassé trois morceaux
var points = document.getElementById("score");
function ajtPoint() {
    toThree+=1;
    if(toThree==3){
    score+=1;
    points.innerText = "Score : "+score;
    toThree = 0;
    }
}

// START BUTTON

async function loadGUI() {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("start", true, scene);
    // Assuming you have already initialized the Babylon.js scene and GUI

    const button = BABYLON.GUI.Button.CreateSimpleButton("startButton", "Begin");
    button.width = "200px";
    button.height = "100px";
    button.color = "White";
    button.size = "60px";
    button.background = "#5D270D";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.isVisible = true;

    button.onPointerUpObservable.add(function() {
        button.isVisible = false;
        //console.log("Button clicked");
        timePoints();
    });

    // Add the button to GUI
    advancedTexture.addControl(button);

}
//loadGUI();

const resetGame = function() {
    // remettre les canettes visibles
    scene.meshes.forEach(function(mesh) {
      if (mesh.name.includes("Clone")) {
        mesh.isVisible = true;
      }
    });

    // remettre les canettes visibles
    scene.meshes.forEach(function(mesh) {
        if (mesh.name.includes("bad_")) {
          mesh.isVisible = true;
        }
      });
  
    // Chrono
    //stopTimer();
    timer.style.display = "none";
  
    // Start the game again
    //timePoints();

    //play button
    loadGUI();

  };


  return {
    scene: scene,
    resetGame: resetGame
  };

}