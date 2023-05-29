const createSceneMenu = function () {

    //Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    //const scene = new BABYLON.Scene(engine);
    scene.clearColor = "#000000";
    new BABYLON.PhotoDome("forest", "bbylonImages/bigforest.jpg", { resolution: 32, size: 1000 }, scene);

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.useAutoRotationBehavior = true;
    camera.autoRotationBehavior.idleRotationWaitTime = 0;

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
		
    // permet d'afficher la page menu avec les boutons 
    async function loadGUI() {

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("firstMenu", true, scene);
        await advancedTexture.parseFromSnippetAsync("TNAKE1#36");

        const menuScreen = advancedTexture.getControlByName("menuScreen");
        const playScreen = advancedTexture.getControlByName("HTPscreen");

        let children1 = menuScreen.getDescendants();
        let children2 = playScreen.getDescendants();

        menuScreen.isVisible = true;
        playScreen.isVisible = false;

        let children = advancedTexture.getChildren()[0].children;
        console.log(children1);
        var playButton = children1.filter(control => control.name === "play")[0];
        var HTPbutton = children1.filter(control => control.name === "HowTo")[0];
        var back = children2.filter(control => control.name === "Back")[0];
        console.log(HTPbutton, back);

        playButton.onPointerClickObservable.add(() => {
            SCENETORENDER = "foret";
            var points = document.getElementById("score");
            points.style.display = "block";
            startCountdown();

            var bigTimer = document.getElementById("mainGametimer");
            bigTimer.style.display = "block";
            bigTimer.style.backgroundColor = "#B2AC88";
        });
        playButton.onPointerClickObservable.add(() => menuScreen.isVisible = false);
    
        back.onPointerClickObservable.add(() => playScreen.isVisible = false);
        back.onPointerClickObservable.add(() => menuScreen.isVisible = true);
    
        HTPbutton.onPointerClickObservable.add(() => menuScreen.isVisible = false);
        HTPbutton.onPointerClickObservable.add(() => playScreen.isVisible = true);

    }
    loadGUI();

    return scene;

};
