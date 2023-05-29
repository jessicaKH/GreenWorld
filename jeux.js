
const QuickTreeGenerator = function(sizeBranch, sizeTrunk, radius, trunkMaterial, leafMaterial, scene) {

    const tree = new BABYLON.Mesh("tree", scene);

    const leaves = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 2, diameter: sizeBranch})
    //console.log(leaves.getBoundingInfo().boundingSphere.radius);

    const positions = leaves.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    const indices = leaves.getIndices();
    const numberOfPoints = positions.length / 3;

    const map = [];

    // The higher point in the sphere
    const v3 = BABYLON.Vector3;
    const max = [];

    for (let i = 0; i < numberOfPoints; i++) {
        const p = new v3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

        if (p.y >= sizeBranch/2) {
            max.push(p);
        }

        let found = false;
        for (let index = 0; index <map.length && !found; index++) {
            const array = map[index];
            const p0 = array[0];
            if (p0.equals (p) || (p0.subtract(p)).lengthSquared() < 0.01){
                array.push(i * 3);
                found = true;
            }
        }
        if (!found) {
            let array = [];
            array.push(p, i*3);
            map.push(array);
        }

    }


    map.forEach(function(array) {
        const min = -sizeBranch/10; 
        const max = sizeBranch/10;
        const rx = randomNumber(min,max);
        const ry = randomNumber(min,max);
        const rz = randomNumber(min,max);

        for (let index = 1; index < array.length; index++) {
            const i = array[index];
            positions[i] += rx;
            positions[i+1] += ry;
            positions[i+2] += rz;
        }
    });

    leaves.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    const normals = [];
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    leaves.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
    leaves.convertToFlatShadedMesh();

    leaves.material = leafMaterial;

    const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", {height: sizeTrunk, diameterTop: radius-2<1?1:radius-2, diameterBottom: radius, tessellation: 10, subdivisions: 2});
    trunk.checkCollisions = true;

    trunk.material = trunkMaterial;

    trunk.convertToFlatShadedMesh();

    leaves.parent = tree;
    trunk.parent = tree;

    leaves.position.y = (sizeTrunk + sizeBranch) / 2-2;
    return tree
}


const randomNumber = function (min, max) {
    if (min == max) {
        return (min);
    }
    const random = Math.random();
    return ((random * (max - min)) + min);
};



const addCharacterWithMouvement = async function(scene, meshes, fires, seeds, end){ //async


    //var camera = new BABYLON.ArcRotateCamera("camera1",0 , 0, 20 , new BABYLON.Vector3(9, 0, -400));
    var camera = new BABYLON.ArcRotateCamera("camera1",0 , 0, 20 , new BABYLON.Vector3(9, 10, -400));
    scene.gravity = new BABYLON.Vector3(0, -9.81 / 60, 0);
    scene.collisionsEnabled = true;

    
    /********************************************************************************************************/
    BABYLON.SceneLoader.ImportMesh("", "models/", "player.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        var character = newMeshes[0];
        //const shadow = BABYLON.MeshBuilder.CreateBox("box", {width: 3,height: 6,depth: 4,}, scene);
        
        //shadow.position = new BABYLON.Vector3(9, 4, -300);
        character.position = new BABYLON.Vector3(9, 0, -300);
        
        character.scaling.scaleInPlace(2);
        //scene.activeCamera.attachControl(canvas, true);
        camera.target = character;
        character.applyGravity = true;
        character.checkCollisions = true;
        //shadow.checkCollisions = true;
        character.minZ = 0.45;
        character.ellipsoid = new BABYLON.Vector3(5, 5, 2);
    
        var ground2 = BABYLON.Mesh.CreateGround("ground1", 26, 26, 2, scene);        
        ground2.rotation = new BABYLON.Vector3(5, 0, 0);
        ground2.position = new BABYLON.Vector3(0, 3, 400);
    
        //var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ground2, 2000, 2000);  
    
        var inputMap = {}  
            scene.actionManager = new BABYLON.ActionManager(scene);
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            }));
    
            
        
       
        const run = scene.getAnimationGroupByName("RunInPlace");
        const movement = scene.onBeforeRenderObservable.add(() => {
    
            character.moveWithCollisions(character.forward.scaleInPlace(1.21));
            run.start(true, 1.6, run.from, run.to, false);
            //shadow.position.z+=0.21;
    
            var keydown = false;
            if (inputMap["s"]) {
                character.position.x+=0.25;
                //shadow.position.x+=0.25;
                keydown = true;
            }
            if (inputMap["q"]) {
                character.position.x-=0.25;
                //shadow.position.x-=0.25;
                keydown = true;
            }
        });



    /*var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    advancedTexture.addControl(plane);  */

            scene.onBeforeRenderObservable.add(() => {
                scene.registerBeforeRender(function () {
                    if (end.intersectsMesh(character, false)) { 
                        /*advancedTexture2.addControl(rectangle);
                        rectangle.addControl(text1);*/
                        
                        SCENETORENDER = "foret";
                        character.position = new BABYLON.Vector3(9, 0, -300);     
                    }
                    for (var i=0; i<meshes.length; i++){
                            if (meshes[i].intersectsMesh(character, false)) {
                                SCENETORENDER = "foret";
                                character.position = new BABYLON.Vector3(9, 0, -300);
                               
                                for (var j=0; j<meshes.length; j++){
                                    meshes[j].dispose();
                                    
                                }
                            }
                    }

                    for (var i=0; i<fires.length; i++){
                        if (fires[i].intersectsMesh(character, false)) {
                            SCENETORENDER = "foret";
                            character.position = new BABYLON.Vector3(9, 0, -300);
                
                        }
                }


        

                        for (var i=0; i<seeds.length; i++){
                            if (seeds[i].intersectsMesh(character, false)) {
                                seeds[i].dispose();
                                ajtPoints();
                                //button.textContent = cpt;
                                seeds.splice(i,1);
                                
                            }
                        }
                        
                });
            });

    });
}


/*************************************************************MINIJEU ****************************************************************************/

const createMiniJeu = async function(){ //async
    const meshes = []; 
    const options = {
        width: 4,
        height: 4,
        depth: 4,
    };
      
        const scene = new BABYLON.Scene(engine);
        scene.collisionsEnabled = true;
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        //new BABYLON.PhotoDome("forest", "bbylonImages/bigforest.jpg", { resolution: 32, size: 1000 }, scene);

//        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

/****************************************************************************************************************************************************/

/******************************MATERIAL*************************************/
        const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
        const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
        woodTexture.ampScale = 50;
        woodMaterial.diffuseTexture = woodTexture;
/*
        var grassMaterial = new BABYLON.StandardMaterial("grassMat", scene);
        var grassTexture = new BABYLON.GrassProceduralTexture("grassTex", 256, scene);
        grassMaterial.ambientTexture = grassTexture;
*/
        var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
        var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
        fireMaterial.diffuseTexture = fireTexture;
        fireMaterial.opacityTexture = fireTexture;

        const leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
        leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.65, 0.5);



        var fire = new BABYLON.FireMaterial("fire", scene);
        fire.diffuseTexture = new BABYLON.Texture("textures/fire.png", scene);
        fire.distortionTexture = new BABYLON.Texture("textures/distortion.png", scene);
        fire.opacityTexture = new BABYLON.Texture("textures/candleopacity.png", scene);
        fire.speed = 5.0;
/**********************************************************************************/

/*
scene.clearColor = new BABYLON.Color3(0, 0, 0);
	
var hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
hemiLight.intensity = 0.4;

// Create fire material
var fire = new BABYLON.FireMaterial("fire", scene);
fire.diffuseTexture = new BABYLON.Texture("textures/fire.png", scene);
fire.distortionTexture = new BABYLON.Texture("textures/distortion.png", scene);
fire.opacityTexture = new BABYLON.Texture("textures/candleopacity.png", scene);
fire.speed = 5.0;

var light = new BABYLON.SpotLight("light", new BABYLON.Vector3(2, 2, 2), new BABYLON.Vector3(-1, -2, -1), 3, 1, scene);
var generator = new BABYLON.ShadowGenerator(1024, light);
generator.usePercentageCloserFiltering = true;
generator.bias = 0.01;
generator.transparencyShadow = true;*/
/***********************************SKYBOX*********************************/

    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;			
	    
        // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_NONE;
    //BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_EXP2;
    //BABYLON.Scene.FOGMODE_LINEAR;

    scene.fogColor = new BABYLON.Color3(0.9, 0.88, 0.85);
    scene.fogDensity = 0.001;


    //const ground2 = BABYLON.MeshBuilder.CreateGround("ground", { width: 400, height: 800, depth:10 }, scene);
    const ground2 = BABYLON.MeshBuilder.CreateGround("ground", { width: 600, height: 1000, depth:10 }, scene);
    //const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 600, height: 1000, depth:15}, scene);
    //ground2.material = fireMaterial;
    const grassText = new BABYLON.StandardMaterial("grassText");
    //grassText.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png");
    grassText.diffuseTexture = fireTexture;
    //ground2.material = grassText;
    //ground.material = woodMaterial;

    /**********************************************ARBRES***********************************************/
  
  
    /*
    const t1 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
    const t2 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
    const t3 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
    const t4 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
       
    t1.position = new BABYLON.Vector3(50, 0, 50);
    t2.position = new BABYLON.Vector3(150, 0, 20);
    t3.position = new BABYLON.Vector3(200, 0, 40);
    t4.position = new BABYLON.Vector3(90, 0, 30);
    */ 
    for (var i=0; i<60; i++){
        var r = randomNumber(-450,450);
        const t = QuickTreeGenerator(80, 60, 15, woodMaterial, leafMaterial, scene);
        t.position = new BABYLON.Vector3(-r, 15, 20*i-5*r);
        const t1 = QuickTreeGenerator(80, 60, 15, woodMaterial, fire, scene);
        t1.position = new BABYLON.Vector3(r, 15, 20*i-5*r);

        t1.checkCollisions = true;
        t.checkCollisions = true;
    }

    /******************************************************************************************************************************************************/

                 /************************PHYSICSAGGREGATE ****************************/
        //const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
        // initialize plugin
        const havokInstance = await HavokPhysics();
        // pass the engine to the plugin
        const hk = new BABYLON.HavokPlugin(true, havokInstance);
        // enable physics in the scene with a gravity
        scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk);
        


        const groundAggregate = new BABYLON.PhysicsAggregate(ground2, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

    
    /*********************************BRANCHES*****************************************/

  

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

            /*****timer*****/

       
            setInterval(() => {
                
                    
                    //for (let j=0; j<5; j++){
                        let random = randomNumber(-200,150);
                        let random2 = randomNumber(-200,300);
                        const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", {height: 30, diameterTop: 5-2<1?1:5-2, diameterBottom: 5, tessellation: 10, subdivisions: 2});
                        trunk.material = fire;
                        trunk.rotation = new BABYLON.Vector3(0,0,3.14/2);
                        trunk.position = new BABYLON.Vector3(random, 150, random2);
                        const trunkAgg = new BABYLON.PhysicsAggregate(trunk, BABYLON.PhysicsShapeType.BOX, { mass: 100, restitution: 0.5 }, scene);
                        
                        meshes.push(trunk);
                        //advancedTexture.addControl(trunk);
                    //}
                    
            },1000);


            setInterval(() => {
                
                    
                //for (let j=0; j<5; j++){
                    let random3 = randomNumber(0,300);
                    let random4 = randomNumber(-200,300);
                    const trunk2 = BABYLON.MeshBuilder.CreateCylinder("trunk", {height: 30, diameterTop: 5-2<1?1:5-2, diameterBottom: 5, tessellation: 10, subdivisions: 2});
                    trunk2.material = fireMaterial;
                    trunk2.rotation = new BABYLON.Vector3(0,0,3.14/2);
                    trunk2.position = new BABYLON.Vector3(random3, 150, random4);
                    const trunkAgg2 = new BABYLON.PhysicsAggregate(trunk2, BABYLON.PhysicsShapeType.BOX, { mass: 100, restitution: 0.5 }, scene);
                    
                    meshes.push(trunk2);
                    //advancedTexture.addControl(trunk);
                //}
                
        },5000);
    
    
    /****************************************FIREBALL*****************************************************/

/*    var fireball = BABYLON.Mesh.CreatePlane("firebawl", 20, scene);
    fireball.material = fireMaterial;
    fireball.rotate(new BABYLON.Vector3(1.0, 1.0, 0.5), Math.PI / 3.0, BABYLON.Space.Local);*/
    


let fires = [];

    /*var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
    var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;*/

    

    //engine.displayLoadingUI();
    for (var j=0; j<20; j++){
        var r = randomNumber(-300,250);
        var r2 = randomNumber(-200, 100);
        /*const fireball = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX: 20, diameterY: 10, diameterZ: 10});
        const fire = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX: 20, diameterY: 10, diameterZ: 10});
              

        fireball.material = fireMaterial;
        fire.material = fireMaterial;*/

        //fireball = BABYLON.Mesh.CreatePlane("fireplane", 1.5, scene);
        fireball = BABYLON.MeshBuilder.CreateBox("plane", {height:5, width: 5, depth: 1});
        fireball.scaling.x = 10;
        fireball.scaling.y = 12;
		fireball.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		fireball.material = fire;

        //f = BABYLON.Mesh.CreatePlane("fireplane", 1.5, scene);
        f =  BABYLON.MeshBuilder.CreateBox("plane", {height:2, width: 2, depth: 1});
        f.scaling.x = 12;
        f.scaling.y = 14;
		f.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		f.material = fire;

        fireball.position = new BABYLON.Vector3(20+r2,5,r);
        f.position = new BABYLON.Vector3(r2,5,r+100);


        fires.push(fireball);
        fires.push(f);

        /*plane = BABYLON.Mesh.CreatePlane("fireplane", 1.5, scene);
		plane.position = new BABYLON.Vector3(0, 2.4, 0);
        plane.scaling.x = 4;
        plane.scaling.y = 5;
		plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		plane.material = fire;*/
    }

    //engine.hideLoadingUI();       
        /**************************************LIGNE D'ARRIVEE******************************************/
        
        const end = BABYLON.MeshBuilder.CreateBox("box", {width: 400,height: 10 ,depth: 15,}, scene);
        end.position = new BABYLON.Vector3(0,3,300);

   
    /**********************************************OBSTACLES*************************************************************/
        /*const box = BABYLON.MeshBuilder.CreateBox("box", options, scene);
        const center = BABYLON.MeshBuilder.CreateBox("box", {width: 8, height: 8,depth: 8}, scene);
        box.position = new BABYLON.Vector3(4, 10, 0);
        box.gravity = new BABYLON.Vector3(0, -9.81 / 60, 0);
        //box.checkCollisions = true;

        const box3 = BABYLON.MeshBuilder.CreateBox("box", options, scene);
        box3.position = new BABYLON.Vector3(10,5,30);
        box3.gravity = new BABYLON.Vector3(0, -9.81 / 60, 0);

        const boxAggregate = new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.BOX, { mass: 1, restitution: 0.75 }, scene);*/
        //boxAggregate.checkCollisions = true;
        
        /*meshes.push(box);
        meshes.push(box3);*/

    /*************************COMPTEUR*************/

    let seeds = [];
    for (let i=0; i<20; i++){
        var rn1 = randomNumber(-200,200);
        var rn2 = randomNumber(-200,200);
        var seed1 = BABYLON.Mesh.CreateSphere("seed", 3, 10, scene);
        seed1.position = new BABYLON.Vector3(rn1, 5, rn2);

        seeds.push(seed1);
   
    
    }





    /****************************************************DECO *********************************************/
    
/*
    //à gauche
    for (let i=0; i<40;i++){
        for (let j=0; j<7;j++){
            const t = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
            t.position = new BABYLON.Vector3(-150+20*j, 15, -350+20*i);
        
        const t1 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
        t1.position = new BABYLON.Vector3(-150, 15, -350+20*j*i);
        }
    }

    //à droite
    for (let i=0; i<40;i++){
        for (let j=0; j<7;j++){
            const t = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
            t.position = new BABYLON.Vector3(150-20*j, 15, -350+20*i);
        
        const t1 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
        t1.position = new BABYLON.Vector3(150, 15, -350+20*j*i);
        }
    }
*/

//à gauche
for (let i=0; i<40;i++){
    for (let j=0; j<7;j++){
        const t = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
        //t.position = new BABYLON.Vector3(-200+20*j, 15, -400+20*i);
        t.position = new BABYLON.Vector3(-200+20*j, 15, -400+20*i);
        const t1 = QuickTreeGenerator(50, 35, 15, woodMaterial, fireMaterial, scene);
        //t1.position = new BABYLON.Vector3(-200, 15, -400+20*j*i);
        t1.position = new BABYLON.Vector3(-200, 15, -400+20*j*i);
    }
}

//à droite
for (let i=0; i<40;i++){
    for (let j=0; j<2;j++){
        const t = QuickTreeGenerator(50, 35, 15, woodMaterial, fireMaterial, scene);
        //t.position = new BABYLON.Vector3(200-20*j, 15, -400+20*i);
        t.position = new BABYLON.Vector3(200-20*j, 15, -400+20*i);
    
    const t1 = QuickTreeGenerator(50, 35, 15, woodMaterial, leafMaterial, scene);
    //t1.position = new BABYLON.Vector3(200, 15, -400+20*j*i);
    t1.position = new BABYLON.Vector3(200, 15, -400+20*j*i);
    }
}




     /********************************************************************************************************************/
     addCharacterWithMouvement(scene, meshes, fires, seeds, end);

    


return scene;
       
}



