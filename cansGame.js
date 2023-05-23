//const canvas = document.getElementById('renderCanvas'); // a enlever quand je mets avec les autres codes
//const engine = new BABYLON.Engine(canvas, true);

const createCanGame = function () {

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

    return scene;
}

const scene = createScene();


 // Gravity and collisions

const assumedFramesPerSecond = 60;
const earthGravity = -9.81;
scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0); 

scene.collisionsEnabled = true;


const addCanette = function(scene){
    BABYLON.SceneLoader.ImportMesh("", "models/", "finishedLolaLola4.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, -5, 0), scene);
        var object = newMeshes[0];
        //object.material.emissiveColor = new BABYLON.Color3(1, 1, 1); // Set the emissive color of the object's material

        can.position = new BABYLON.Vector3(100, 1000, 100);
        
        can.scaling.scaleInPlace(0.2);

        camera.target = can;

        can.checkCollisions = true;
        can.minZ = 0.45;

    
    })
}


const addCans = function(scene){

    // bonnes canettes
    BABYLON.SceneLoader.ImportMesh("", "models/finishedLolaLola4.glb", "", scene, function (meshes) {
        var originalMesh = meshes[0];


        var clonedMeshes = [];
        for (var i = 0; i < 20; i++) {
        var clonedMesh = originalMesh.clone("Clone_" + i);
        clonedMesh.name = "can"+i;
        clonedMeshes.push(clonedMesh);

        }



        var minX = -100; // Minimum X coordinate
        var maxX = 100; // Maximum X coordinate
        var minZ = -100; // Minimum Y coordinate
        var maxZ = 100; 

        function posRandom(meshes, minX, maxX, minZ, maxZ) {
            meshes.forEach(function (mesh) {
            var randomX = minX + Math.random() * (maxX - minX);
            var randomZ = minZ + Math.random() * (maxZ - minZ);
            // on place tous les clones
            mesh.position = new BABYLON.Vector3(randomZ,0, randomX); 
            mesh.isPickable = false;
            });

        }

        // placer des canettes au hasard
        posRandom(clonedMeshes, minX, maxX, minZ,maxZ);

        // pouvoir clicker dessus
        scene.onPointerDown = function castRay(){
            var ray = scene.createPickingRay(scene.pointerX,scene.pointerY,BABYLON.Matrix.Identity(),false);
            var hit = scene.pickWithRay(ray);
            //console.log(hit.pickedMesh.name);
            if(hit.pickedMesh.name.includes("Can")||hit.pickedMesh.name.includes("Tab")){
                hit.pickedMesh.isVisible = false;
                ajtPoint();

            }
        }

        });

        //


}

addCans(scene);

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
  
  console.log("Elapsed time:", tempsEcoule);
  //var minutes = Math.floor( tempsEcoule / 60000);
  var secondes = Math.floor(( tempsEcoule % 60000) / 1000);
  timer.style.display = "block";  
  timer.innerText = "Temps écoulé : " + secondes + " secondes"

  if(secondes>30) {
    console.log("oveeeer");
    stopChrono()
    stopTimer();
    timer.style.display = "none"; 
    SCENETORENDER = "foret";

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
    button.width = "300px";
    button.height = "100px";
    button.color = "white";
    button.background = "#5D270D";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    button.onPointerUpObservable.add(function() {
        button.isVisible = false;
        console.log("Button clicked");
        timePoints();
    });

    // Add the button to GUI
    advancedTexture.addControl(button);

}
loadGUI();

return scene;
}