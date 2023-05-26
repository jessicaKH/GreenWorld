var createHangman = function () {
	var scene = new BABYLON.Scene(engine);

     //Creates and positions a free camera
     const camera = new BABYLON.FreeCamera("camera1", 
     new BABYLON.Vector3(0, 15,0), scene);
 
     // This attaches the camera to the canvas
     camera.attachControl(canvas, true);

    camera.applyGravity = true;
    camera.checkCollisions = true;

    // BOX ////////////

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
        width: tailleCube+3,
		height: tailleCube*4,
		depth: tailleCube+3,
    };

    const wallText = new BABYLON.StandardMaterial("wallText");
    wallText.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor_bump.PNG");

    const box = BABYLON.MeshBuilder.CreateBox("box", options);
    const box2 = BABYLON.MeshBuilder.CreateBox("box", options);
    box.material = wallText;
    box2.material = wallText;
    // first box
    box.position = new BABYLON.Vector3(0, tailleCube / 2, 0);
    // second box
    box.position = new BABYLON.Vector3(0, tailleCube / 2, 20);



    box.checkCollisions = true;
    box2.checkCollisions = true;

    //////////////////

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	
	// Skybox
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/TropicalSunnyDay", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;
		
	// Ground
	var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 4;
	
	var ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, scene, false);
	ground.position.y = -1;
	ground.material = groundMaterial;
    ground.checkCollisions = true;

    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);
    scene.collisionsEnabled = true;

		
	// Water
	var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
	
	var water = new BABYLON.WaterMaterial("water", scene);
	//water.bumpTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/waterbump.png", scene);
    water.bumpTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor_bump.PNG", scene); //l'eau bouge bcp avec ca
	
	// Water properties
	water.windForce = -15;
	water.waveHeight = 0;
	water.windDirection = new BABYLON.Vector2(1, 1);
	water.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6);
	water.colorBlendFactor = 0.3;
	water.bumpHeight = 0.1;
	water.waveLength = 1;
	
	// Add skybox and ground to the reflection and refraction
	water.addToRenderList(skybox);
	water.addToRenderList(ground);
	
	// Assign the water material
	waterMesh.material = water;

    // si tu tombes dans l'eau
    scene.registerBeforeRender(function () {
        var playerPosition = camera.position;
        //waterMesh.position.y au lieu de 5 mais renvoie juste 0
        if (playerPosition.y < 5) {
            SCENETORENDER = "foret";
            isresetHangman = false;
            console.log("Touched water");
        }
    });



//var gamePlay = function () {

    //////////////// GUI /////////////////////
    // Create a GUI
    var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  
    // Create a text block
    var textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = "_ _ _ _ _ ";
    textBlock.color = "black";
    textBlock.fontSize = 90;
    textBlock.top = "-300px";
    textBlock.left = "30px";
    //textBlock.verticalAlignment = 0.2;
    gui.addControl(textBlock);
  
    // Create the keyboard
    var keyboard = new BABYLON.GUI.StackPanel();
    keyboard.width = "100%";
    keyboard.height = "100px";
    keyboard.isVertical = false;
    keyboard.top = "150px";
    keyboard.left = "140px";
    gui.addControl(keyboard);
  
    // Define the letters of the keyboard
    var letters = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ];
  
    // Create buttons for each letter
    for (let row = 0; row < letters.length; row++) {
      for (let col = 0; col < letters[row].length; col++) {
        let letter = letters[row][col];

        let button = BABYLON.GUI.Button.CreateSimpleButton(letter, letter);
        button.width = "60px";
        button.height = "60px";
        button.color = "white";
        button.fontSize = 24;
        // quand on teste une lettre
        button.onPointerClickObservable.add(function () {
          //textBlock.text += letter; // Append the clicked letter to the text
            if(!bonneLettre(letter.toLowerCase())) mauvaiseLettre(letter);
            
            victoire();

        });
        keyboard.addControl(button);
      }
    }
    /////////////////////////////////////

    //////// GAME ////////////////::
    /* variables */

    var motSecret = "";
    var motActuel = [];
    const TENTATIVES = 7;

    // mot choisi pour le pendu

    var mots = [
        "eau","inondation","submersion","pollution","niveau","maree","erosion","ouragan","typhon","cyclone",
        "tempete","crue","deluge","contamination","dechet","assainissement","rechauffement","catastrophe","riviere","ocean"
      ];

    var random = Math.floor(Math.random() * mots.length);
    motSecret = mots[random];
    console.log(motSecret);

    for(let i=0 ; i<motSecret.length;i++){
        motActuel[i]="_";
    }
    textBlock.text=motActuel.join(' ');
      

    /* cas ou la lettre est dans le mot */

    function bonneLettre(essai){
        if(motSecret.includes(essai)){
            for(let i=0;i<motSecret.length;i++){
                //remplacer le tiret par la bonne lettre
                if(motSecret.at(i)==essai){
                    motActuel[i]=essai;
                    textBlock.text = motActuel.join(' ');
                    console.log("bonnelettre bug");
                }
            }
            return true;
        }
        return false;
    }

    /* cas ou la lettre n'est pas dans le mot */
    function mauvaiseLettre(essai){
        water.waveHeight+=0.3;
        console.log(water.waveHeight);
    }

    function victoire(){
        if(!motActuel.includes("_")){
            SCENETORENDER = "foret";
            isresetHangman = false;
            console.log("victoire bug");
        }
        if(water.waveHeight >=1.6){
            for(let i=0 ; i<motSecret.length;i++){
                motActuel[i] = motSecret[i];
                textBlock.text = motActuel.join(' ');
            }
            console.log("you lost hangman");
            isresetHangman = false;
            SCENETORENDER = "foret";
        }
    }  


    function resetHangman(){

        // rechoisir un mot dans la liste
        var motSecret = "";
        var motActuel = [];

        // mot choisi pour le pendu
        var random = Math.floor(Math.random() * mots.length);
        motSecret = mots[random];
        console.log(motSecret);

        // reinit le mot avec les tirets

        for(let i=1 ; i<=motSecret.length;i++){
            motActuel[i]="_";
        }
        textBlock.text=motActuel.join(' ');

        //reinit le niveau de l'eau

        water.waveHeight = 0;

    }

    return {
        scene: scene,
        resetHangman: resetHangman
      };
  
}