const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {

    /****************CAMERA****************/ 

    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);

    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5,-10), scene);

    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    /***************************************/ 

    /*******************LUMIERE******************/ 

    // Creates a light, aiming 0,1,0 - to the sky
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	//light.diffuse = new BABYLON.Color3(1, 0, 0);
    
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
    {width: 10, height: 10}, scene);

    // Grass texture
    const grassText = new BABYLON.StandardMaterial("grassText");
    grassText.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png");
    ground.material = grassText;

    /*******************************************/ 

    /***************SKYBOX***************** 
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../bbylonImages/forest", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;



    /*******************************************/ 
    new BABYLON.PhotoDome("jess", "../bbylonImages/bigforest.jpg", { resolution: 32, size: 1000 }, scene);
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


const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});