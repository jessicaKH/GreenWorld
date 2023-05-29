

const createHouse = function(scene, material, h, w, l,px, py, pz){
    const faceFont = BABYLON.MeshBuilder.CreatePlane("plane", {height:h, width: l, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    faceFont.position = new BABYLON.Vector3(px, py+h/2, pz);
    const gauche = BABYLON.MeshBuilder.CreatePlane("plane", {height:h, width: w, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    gauche.position = new BABYLON.Vector3(px+l/2, py+h/2+0, pz+w/2);
    gauche.rotation.y  =  3.14/2;
    const plane3 = BABYLON.MeshBuilder.CreatePlane("plane", {height:h, width: w, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    plane3.position = new BABYLON.Vector3(px-l/2,py+h/2+ 0,pz+ w/2);
    plane3.rotation.y  =  3.14/2;
    const haut = BABYLON.MeshBuilder.CreatePlane("plane", {height:w, width: l, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    haut.position = new BABYLON.Vector3(px, py+h/2+h/2, pz+w/2);
    haut.rotation.x  =  3.14/2;
    const bas = BABYLON.MeshBuilder.CreateBox("plane", {height:w+1, width: l, depth: 0.25});
    bas.position = new BABYLON.Vector3(px,py+h/2-(h/2), pz+w/2+0.5);
    bas.rotation.x  =  3.14/2;


    //face
    const face = BABYLON.MeshBuilder.CreateBox("plane", {height:h/3*2, width: l, depth: 2});
    face.position = new BABYLON.Vector3(px, py+h/2+h/(3*2), pz+w);

    const g = BABYLON.MeshBuilder.CreateBox("plane", {height:h/3, width: l/3, depth: 2});
    g.position = new BABYLON.Vector3(px+l/3, py+h/2-h/3, pz+w);
    const d = BABYLON.MeshBuilder.CreateBox("plane", {height:h/3, width: l/3, depth: 2});
    d.position = new BABYLON.Vector3(px-l/3, py+h/2-h/3, pz+w);

    faceFont.material = material;
    gauche.material = material;
    plane3.material = material;
    haut.material = material;
    bas.material = material;
    face.material = material;
    g.material = material;
    d.material = material;

    faceFont.checkCollisions = true;
    gauche.checkCollisions = true;
    plane3.checkCollisions = true;
    //haut.checkCollisions = true;
    //bas.checkCollisions = true;
    face.checkCollisions = true;
    g.checkCollisions = true;
    d.checkCollisions = true;


}  

const addCharacter = function(scene){
    //CLAVIER
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(80, 15, 110), scene);
    //scene.activeCamera = camera1;
    scene.activeCamera.attachControl(canvas, true);
    
    camera.lowerBetaLimit = Math.PI / 4;  
    camera.upperBetaLimit = Math.PI / 2.3;  

    
    scene.gravity = new BABYLON.Vector3(0, -9.81 / 60, 0);


    BABYLON.SceneLoader.ImportMesh("", "models/", "player.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
    var hero = newMeshes[0];
    hero.position = new BABYLON.Vector3(80, 0, 120);

    hero.scaling.scaleInPlace(0.8);

    camera.target = hero;

    hero.applyGravity = true;
    scene.collisionsEnabled = true;
    hero.checkCollisions = true;
    hero.minZ = 0.45;
    hero.rotation = new BABYLON.Vector3(0, 0, 0);
    hero.rotation.y = 3.14*2;

    /************************************ELLIPSOID**************************************/
    hero.ellipsoid = new BABYLON.Vector3(1, 4, 1);
  
    var inputMap = {};
        
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    var animating = true;
    //Get the animation Group
    const jump = scene.getAnimationGroupByName("Jump");
    const run = scene.getAnimationGroupByName("RunInPlace");
    const idle = scene.getAnimationGroupByName("Idle");
    const walk = scene.getAnimationGroupByName("WalkInPlace");

    //Rendering loop (executed for everyframe)
    scene.onBeforeRenderObservable.add(() => {
    var keydown = false;

    if (inputMap["w"]) {
        hero.moveWithCollisions(hero.forward.scaleInPlace(0.21));
        keydown = true;
    }
    if (inputMap["s"]) {
        hero.moveWithCollisions(hero.forward.scaleInPlace(0.13));
        keydown = true;
    }
    if (inputMap["a"]) {
        hero.rotate(BABYLON.Vector3.Up(), -0.1);
        keydown = true;
    }
    if (inputMap["d"]) {
        hero.rotate(BABYLON.Vector3.Up(), 0.1);
        keydown = true;
    }
    if (inputMap["j"]) {
        keydown = true;
    }

    //Manage animations to be played  
    if (keydown) {
        if (!animating) {
            animating = true;
            if (inputMap["j"]) {
                jump.start(true, 1.0, jump.from, jump.to, false);
            }
            else if (inputMap["w"]) {
                run.start(true, 1.6, run.from, run.to, false);
            }
            else{
                walk.start(true, 1.2, walk.from, walk.to, false);

            }
        }
    }
    else {

        if (animating) {
            //Default animation is idle when no key is down     
            idle.start(true, 1.0, idle.from, idle.to, false);

            run.stop();
            jump.stop();
            walk.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;
        }
    }
    });

    
    
});


}

const createSceneForet = function () {
    
    /**************************************Scene****************************************/
/*    var columns = 6;
    var rows = 1;
*/
    const options = {
        wrap: true,
        width: 4,
		height: 4,
		depth: 4,
    };
    /*** CAMERA ***/ 

    //Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
      

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
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height: 500}, scene);

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
    const box = BABYLON.MeshBuilder.CreateBox("box", options);
    box.material = wallText;
    box.position = new BABYLON.Vector3(0, 4 / 2, 0);

    box.checkCollisions = true;
    



    /*const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
        const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
        woodTexture.ampScale = 50;
        woodMaterial.diffuseTexture = woodTexture;*/
    //const material = new BABYLON.Texture("bbylonImages/albedo.png.jpg", scene);
    const leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.65, 0.5);
    const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
    woodTexture.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture;
    for (let j=0; j<10; j++){
    const tree1 = new QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
    tree1.position = new BABYLON.Vector3(-25+10*j, 15, -10*j);
    const tree2 = new QuickTreeGenerator(60, 40, 20, woodMaterial, leafMaterial, scene);
    tree2.position = new BABYLON.Vector3(70+10*j, 15, -12*j);
    const tree3 = new QuickTreeGenerator(65, 45, 20, woodMaterial, leafMaterial, scene);
    tree3.position = new BABYLON.Vector3(-100+10*j, 15, 8*j);
    }

    const m = new BABYLON.StandardMaterial("");
    m.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");
    const material = m;
    
    createHouse(scene, m, 30, 70, 30, -80, 0, 60);
    createHouse(scene, m, 30, 70, 30, 30, 0, 40);
    createHouse(scene, m, 30, 70, 30, 100, 0, 20);

    
    //mini jeu 1 /////////////////////////////
    const p1 = BABYLON.MeshBuilder.CreateBox("box", options);
    p1.position = new BABYLON.Vector3(-80, 2, 65);
    p1.checkCollisions = true;

    var plane1 = BABYLON.Mesh.CreatePlane("plane", 2);
    plane1.parent = p1;
    plane1.position = new BABYLON.Vector3(0,2.5,0);

    var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane1);

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play ");
    button1.width = 5;
    button1.height = 1;
    button1.color = "white";
    button1.fontSize = 300;
    button1.background = "black";
    plane1.rotation.x = 3.14;
    plane1.rotation.z = 3.14;

    advancedTexture1.addControl(button1);  
    button1.onPointerClickObservable.add(() => SCENETORENDER = "cans");

    // poster
    var poster = BABYLON.MeshBuilder.CreatePlane("poster", { width: 23, height: 10 }, scene);
    poster.position = new BABYLON.Vector3(-80, 10, 62); 
    poster.rotation.y = Math.PI; 

    // Create a material for the poster
    var posterMaterial = new BABYLON.StandardMaterial("posterMaterial", scene);
    posterMaterial.diffuseTexture = new BABYLON.Texture("textures/canImage.png", scene);
    posterMaterial.backFaceCulling = false; 

    // Apply the material to the poster mesh
    poster.material = posterMaterial;

    //////////////////////////////////////



    //mini jeu 2 /////////////////////////////
    const p2 = BABYLON.MeshBuilder.CreateBox("box", options);
    p2.position = new BABYLON.Vector3(30, 2, 45);
    p2.checkCollisions = true;

    var plane2 = BABYLON.Mesh.CreatePlane("plane", 2);
    plane2.parent = p2;
    plane2.position = new BABYLON.Vector3(0,2.5,0);

    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play ");
    button2.width = 5;
    button2.height = 1;
    button2.color = "white";
    button2.fontSize = 300;
    button2.background = "black";
    plane2.rotation.x = 3.14;
    plane2.rotation.z = 3.14;

    advancedTexture2.addControl(button2);  
    button2.onPointerClickObservable.add(() => SCENETORENDER = "hangman");

        // poster
        var poster = BABYLON.MeshBuilder.CreatePlane("poster", { width: 23, height: 10 }, scene);
        poster.position = new BABYLON.Vector3(30, 10, 43); 
        poster.rotation.y = Math.PI; 
    
        // Create a material for the poster
        var posterMaterial = new BABYLON.StandardMaterial("posterMaterial", scene);
        posterMaterial.diffuseTexture = new BABYLON.Texture("textures/hangmanImage.png", scene);
        posterMaterial.backFaceCulling = false; 
    
        // Apply the material to the poster mesh
        poster.material = posterMaterial;

 ////////////////////////////////////////////////


    //mini jeu 3 ////////////////////////////////////////
    const p3 = BABYLON.MeshBuilder.CreateBox("box", options);
    p3.position = new BABYLON.Vector3(100, 2, 25);
    p3.checkCollisions = true;

    var plane3 = BABYLON.Mesh.CreatePlane("plane", 2);
    plane3.parent = p3;
    plane3.position = new BABYLON.Vector3(0,2.5,0);

    var advancedTexture3 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane3);

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play ");
    button3.width = 5;
    button3.height = 1;
    button3.color = "white";
    button3.fontSize = 300;
    button3.background = "black";
    plane3.rotation.x = 3.14;
    plane3.rotation.z = 3.14;

    advancedTexture3.addControl(button3);  
    button3.onPointerClickObservable.add(() => SCENETORENDER = "miniJeu1");

    // poster
    var poster = BABYLON.MeshBuilder.CreatePlane("poster", { width: 23, height: 10 }, scene);
    poster.position = new BABYLON.Vector3(100, 10, 23); 
    poster.rotation.y = Math.PI; 
        
    // Create a material for the poster
    var posterMaterial = new BABYLON.StandardMaterial("posterMaterial", scene);
    posterMaterial.diffuseTexture = new BABYLON.Texture("textures/fireImage.png", scene);
    posterMaterial.backFaceCulling = false; 
        
    // Apply the material to the poster mesh
    poster.material = posterMaterial;
 ///////////////////////////////////////////
 
    addCharacter(scene);



    return scene;
    
};


