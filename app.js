const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5, -10), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;
    // Built-in 'sphere' shape.
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", 
    {diameter: 2, segments: 32}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
    {width: 6, height: 6}, scene);
    return scene;
};

// essai du labyrinthe 
const labyrinthe = function () {
    var scene = new BABYLON.Scene(engine);
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: 2, width: 1, depth: 10}, scene);
    wall1.position = new BABYLON.Vector3(-4.5, 1, 0);
    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {height: 2, width: 1, depth: 10}, scene);
    wall2.position = new BABYLON.Vector3(4.5, 1, 0);
    var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", {height: 2, width: 10, depth: 1}, scene);
    wall3.position = new BABYLON.Vector3(0, 1, -4.5);
    var wall4 = BABYLON.MeshBuilder.CreateBox("wall4", {height: 2, width: 10, depth: 1}, scene);
    wall4.position = new BABYLON.Vector3(0, 1, 4.5);

    const camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    return scene;
};


const scene = labyrinthe(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});