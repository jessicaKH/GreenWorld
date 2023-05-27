const createSceneForet = function () {

    /*** CAMERA ***/ 

    //Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);

    //Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5,-10), scene);

    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero()); 

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.minZ = 0.45;



    /***GRAVITE ET COLLISIONS ***/

    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);

    scene.collisionsEnabled = true;


    /*** LUMIERE ***/ 

    // Creates a light, aiming 0,1,0 - to the sky
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	//light.diffuse = new BABYLON.Color3(1, 0, 0);


    /*** SOL ***/
    
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 300, height: 400}, scene);

    // Grass texture
    const grassText = new BABYLON.StandardMaterial("grassText");
    grassText.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png");
    ground.material = grassText;
    ground.receiveShadows = true;

    ground.checkCollisions = true;


    /*** ENVIRONMENT ***/

     new BABYLON.PhotoDome("forest", "bbylonImages/bigforest.jpg", { resolution: 32, size: 1000 }, scene);



    /*** BOITE ***/ 
    
    const wallText = new BABYLON.StandardMaterial("wallText");
    wallText.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/lava/cloud.png");

    var columns = 6;
    var rows = 1;
    var tailleCube = 4;

    // faceUV permet d'ajouter des textures aux murs
    const faceUV = new Array(6);
    for (let i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    const options = {
        faceUV: faceUV,
        wrap: true,
        width: tailleCube,
		height: tailleCube,
		depth: tailleCube,
    };

    const box = BABYLON.MeshBuilder.CreateBox("box", options);
    box.material = wallText;
    box.position = new BABYLON.Vector3(0, tailleCube / 2, 0);

    box.checkCollisions = true;

    box.isPickable = true;
    box.actionManager = new BABYLON.ActionManager(scene);

    box.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
            //box.isVisible = false; // Hide the box
            SCENETORENDER = "cans";
        })
    );

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", options);
    box2.material = wallText;
    box2.position = new BABYLON.Vector3(0, tailleCube / 2, 10);

    box2.checkCollisions = true;

    box2.isPickable = true;
    box2.actionManager = new BABYLON.ActionManager(scene);

    box2.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
            SCENETORENDER = "hangman";
        })
    );

    //// jeu anne marie 
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", options);
    box3.material = wallText;
    box3.position = new BABYLON.Vector3(0, tailleCube / 2, 40);

    box3.checkCollisions = true;

    box3.isPickable = true;
    box3.actionManager = new BABYLON.ActionManager(scene);

    box3.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (evt) {
            //SCENETORENDER = "hangman";
        })
    );


    return scene;
    
};
