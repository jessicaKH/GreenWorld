const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let SCENETORENDER = "menu"; // on affiche le menu en 1er lieu



const sceneMenu = createSceneMenu();
const sceneForet = createSceneForet(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    if (SCENETORENDER == "menu")
    {
        sceneMenu.render();
    }
    else if (SCENETORENDER == "foret")
    {
        sceneForet.render();
    }
    else{
        console.log("mauvais SCENETORENDER");
    }
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});