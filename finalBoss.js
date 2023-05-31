let enemyLifes = 10;
let graines = 5;
let evite = false;
let inter = false;

var addFinalBoss = function () {
        
        var scene = new BABYLON.Scene(engine);

        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionEnabled = true;

       // let camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 2, -20) , scene);
    
        //let camera = new BABYLON.ArcRotateCamera("camera1",0 , 0, -20 , new BABYLON.Vector3(9, 20, 100));
        var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(9, 3, 300), scene);
    
        //camera.attachControl(canvas, true);
            camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            scene.collisionEnabled = true;
            camera.checkCollisions = true;

            var light = new BABYLON.HemisphericLight("Hemi", new BABYLON.Vector3(0, 1, 0), scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            light.specular = new BABYLON.Color3(1, 1, 1);
            light.groundColor = new BABYLON.Color3(0, 0, 0);

            
            var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	        skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/skybox2", scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skybox.material = skyboxMaterial;	
           
                                  
            const options = {
                wrap: true,
                width: 25,
                height: 0.1,
                depth: 25,
            };
            var fireMaterial = new BABYLON.StandardMaterial("fontainSculptur2", scene);
            var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
            fireMaterial.diffuseTexture = fireTexture;
            fireMaterial.opacityTexture = fireTexture;
            const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
            const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
            woodTexture.ampScale = 50;
            woodMaterial.diffuseTexture = woodTexture;
    
            const leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
            leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.65, 0.5);
    
            // Built-in 'ground' shape.
            const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 700, height: 1000}, scene);
            //ground.material = fireMaterial;
            var blackMaterial = new BABYLON.StandardMaterial("blackMaterial", scene);
            blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            ground.material = blackMaterial;

            /************************************arbres************************************/
            

            
        const box  = BABYLON.MeshBuilder.CreateBox("box", options);
            box.position = new BABYLON.Vector3(-100,0,-75);
            const box2  = BABYLON.MeshBuilder.CreateBox("box", options);
            box2.position = new BABYLON.Vector3(-50,0,-75);
            const box3  = BABYLON.MeshBuilder.CreateBox("box", options);
            box3.position = new BABYLON.Vector3(0,0,-75);
            const box4  = BABYLON.MeshBuilder.CreateBox("box", options);
            box4.position = new BABYLON.Vector3(50,0,-75);
            const box5  = BABYLON.MeshBuilder.CreateBox("box", options);
            box5.position = new BABYLON.Vector3(100,0,-75);
            const box6  = BABYLON.MeshBuilder.CreateBox("box", options);
            box6.position = new BABYLON.Vector3(-100,0,0);
            const box7  = BABYLON.MeshBuilder.CreateBox("box", options);
            box7.position = new BABYLON.Vector3(-50,0,0);
            const box8  = BABYLON.MeshBuilder.CreateBox("box", options);
            box8.position = new BABYLON.Vector3(0,0,0);
            //const box9  = BABYLON.MeshBuilder.CreateBox("box", options);
            //box9.position = new BABYLON.Vector3(100,0,0);
            const box10  = BABYLON.MeshBuilder.CreateBox("box", options);
            box10.position = new BABYLON.Vector3(100,0,0);
            const box11  = BABYLON.MeshBuilder.CreateBox("box", options);
            box11.position = new BABYLON.Vector3(-100,0,75);
            const box12  = BABYLON.MeshBuilder.CreateBox("box", options);
            box12.position = new BABYLON.Vector3(-50,0,75);
            const box13  = BABYLON.MeshBuilder.CreateBox("box", options);
            box13.position = new BABYLON.Vector3(0,0,75);
            const box14  = BABYLON.MeshBuilder.CreateBox("box", options);
            box14.position = new BABYLON.Vector3(50,0,75);
            const box15  = BABYLON.MeshBuilder.CreateBox("box", options);
            box15.position = new BABYLON.Vector3(100,0,75);
           
            box.material = blackMaterial;
            box2.material = blackMaterial;
            box3.material = blackMaterial;
            box4.material = blackMaterial;
            box5.material = blackMaterial;
            box6.material = blackMaterial;
            box7.material = blackMaterial;
            box8.material = blackMaterial;
            //box9.material = fireMaterial;
            box10.material = blackMaterial;
            box11.material = blackMaterial;
            box12.material = blackMaterial;
            box13.material = blackMaterial;
            box14.material = blackMaterial;
            box15.material = blackMaterial;
/***************************************************************************************************************************************** */
            //let StartGame = function() {
               
                    /********************************************************************************************************/
                    BABYLON.SceneLoader.ImportMesh("", "models/", "player.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
                        var character = newMeshes[0];
                        character.position = new BABYLON.Vector3(9, 0, 150);
                        character.scaling.scaleInPlace(2);
                        camera.target = character;
/*
                        var inputMap = {}  
                        scene.actionManager = new BABYLON.ActionManager(scene);
                        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                        }));
                        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                        }));
                    
                        const movement = scene.onBeforeRenderObservable.add(() => {
                            //scene.registerBeforeRender(function () {
                            var keydown = false;
                            
                            if (inputMap["s"]) {
                                evite = true;
                                console.log(evite);
                                //character.position.x+=1;
                                character.position = new BABYLON.Vector3(0,0,180);  
                            }
                            
                           // });
                    
                        });
*/                       
                        console.log(evite);
                        /********fonction lightning **********************/
                        
function createLightningBolt(scene) {
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var lightningMaterial = new BABYLON.StandardMaterial("lightningMaterial", scene);
    
    var lightningBolt = new BABYLON.Mesh("lightningBolt", scene);
    lightningBolt.position.y = 0;
    
    var radians = Math.random() * Math.PI * 2;
    var radius = Math.random() * 5;
    lightningBolt.position.x = Math.cos(radians) * radius;
    lightningBolt.position.z = Math.sin(radians) * radius;

    var points = [];
    var totalSegments = 100;
    //var segmentLength = 200 / totalSegments;

    points.push( new BABYLON.Vector3(9, 0, 180));
    points.push( new BABYLON.Vector3(9, 50, 180));
    points.push( new BABYLON.Vector3(9, 100, 180));

    var tube = BABYLON.MeshBuilder.CreateTube("tube", {path: points, radius: 0.1, cap: BABYLON.Mesh.CAP_ALL}, scene);
    tube.material = lightningMaterial;
    tube.parent = lightningBolt;

    lightningMaterial.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

                    /*************************************************/

        if (!evite){
            var defaite = document.getElementById("defaite");
            defaite.style.display = "block";
            canvas.style.display = "none";
            defaite.style.width = "100vw";
            defaite.style.height = "100vh";
        }


    setTimeout(function() {
        lightningBolt.dispose();
    }, 100);
}


                /**************************lighting *****************************************/
                
                let d=0;
                
                    scene.registerBeforeRender(function () {

                        let rdm = randomNumber(3000, 6000);
                        d+=rdm;
                        let interval = setInterval(() => {   
                        //if (Math.random() < 0.02) {
                            createLightningBolt(scene);
                            console.log("appel");
                            evite = false;
                            character.position = new BABYLON.Vector3(9, 0, 150);
                            skybox.material = skyboxMaterial;    
                            ground.material = blackMaterial;
                            box.material = blackMaterial;
                            box2.material = blackMaterial;
                            box3.material = blackMaterial;
                            box4.material = blackMaterial;
                            box5.material = blackMaterial;
                            box6.material = blackMaterial;
                            box7.material = blackMaterial;
                            box8.material = blackMaterial;
                            //box9.material = fireMaterial;
                            box10.material = blackMaterial;
                            box11.material = blackMaterial;
                            box12.material = blackMaterial;
                            box13.material = blackMaterial;
                            box14.material = blackMaterial;
                            box15.material = blackMaterial;
                            
                        //}
                        },5000+d);

                
                        
                        let orage = setInterval(() => {   
                            //ciel s'illumine
                            console.log("sky");
                            //skyboxMaterial.dispose();		
                            var skyboxMaterial2 = new BABYLON.StandardMaterial("skyBox", scene);
                            skyboxMaterial2.backFaceCulling = false;
                            skyboxMaterial2.reflectionTexture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/skybox2", scene);
                            skyboxMaterial2.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                            skyboxMaterial2.diffuseColor = new BABYLON.Color3(1, 1, 1);
                            skyboxMaterial2.specularColor = new BABYLON.Color3(1, 1, 1);
                            skybox.material = skyboxMaterial2;

                            var white = new BABYLON.StandardMaterial("white", scene);
                            white.diffuseColor = new BABYLON.Color3(1, 1, 1);
                            ground.material = white;

                            box.material = white;
                            box2.material = white;
                            box3.material = white;
                            box4.material = white;
                            box5.material = white;
                            box6.material = white;
                            box7.material = white;
                            box8.material = white;
                            //box9.material = fireMaterial;
                            box10.material = white;
                            box11.material = white;
                            box12.material = white;
                            box13.material = white;
                            box14.material = white;
                            box15.material = white;


                            var inputMap = {}  
                            scene.actionManager = new BABYLON.ActionManager(scene);
                            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                            }));
                            scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                            }));

                            const movement = scene.onBeforeRenderObservable.add(() => {
                            //scene.registerBeforeRender(function () {
                            var keydown = false;
                            
                            if (inputMap["s"]) {
                                evite = true;
                                console.log(evite);
                                //character.position.x+=1;
                                character.position = new BABYLON.Vector3(-9,0,150);  
                            }
                            
                           // });
                           inter = true;
                    
                        });
                        },4300+d);
                        if (inter){
                            clearInterval(orage);
                        }
                        
                        
        
                    });
                    var inputMap2 = {}  
                        scene.actionManager = new BABYLON.ActionManager(scene);
                        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
                            inputMap2[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                        }));
                        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                            inputMap2[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                        }));

                        scene.onBeforeRenderObservable.add(() => {
                        //scene.registerBeforeRender(function () {
                        var keydown = false;
                        
                        if (inputMap2["s"]) {
                            //evite = true;
                            console.log(evite);
                            //character.position.x+=1;
                            character.position = new BABYLON.Vector3(-9,0,150);  
                        }
                        });

                    

            });
        
                    //setTimeout(() => {

                        //6 parties diff
                        BABYLON.SceneLoader.ImportMesh("", "models/", "cactusman1.glb", scene, function (newMeshes, particleSystems, skeletons) {
                        var enemy = newMeshes[0];
                        var enemy1 = newMeshes[1];
                        var enemy2 = newMeshes[2];
                        var enemy3 = newMeshes[3];
                        var enemy4 = newMeshes[4];
                        var enemy5 = newMeshes[5];
                        var enemy6 = newMeshes[6];
                        enemy.scaling.scaleInPlace(15);
                       /* enemy1.scaling.scaleInPlace(15);
                        enemy2.scaling.scaleInPlace(15);
                        enemy3.scaling.scaleInPlace(15);
                        enemy4.scaling.scaleInPlace(15);
                        enemy5.scaling.scaleInPlace(15);*/
                        console.log("Enemy detected");
                        /*camera.target = enemy;
                        enemy.position = new BABYLON.Vector3(-100, 0, -20);
                        enemy.scaling.scaleInPlace(1.5);
                        enemy.applyGravity = true;
                        scene.collisionsEnabled = true;
                        enemy.checkCollisions = true;
                        enemy.minZ = 0.45;
                        enemy.ellipsoid = new BABYLON.Vector3(10, 20, 10);
                        enemy.scaling.scaleInPlace(3);*/
                
                
                        
                        const walk = scene.getAnimationGroupByName("Walk");
                        scene.onBeforeRenderObservable.add(() => {
                            enemy.moveWithCollisions(enemy.forward.scaleInPlace(1.5));
                            walk.start(true, 1.2, walk.from, walk.to, false);
                
                        });
                
                        scene.onBeforeRenderObservable.add(() => {
                           
                            scene.registerBeforeRender(function () {
                                if (enemy.intersectsMesh(box, false)){
                                    enemy.rotation = new BABYLON.Vector3(0, 0, 0);
                                    enemy.rotation.y = 3.14;
                                }
                
                
                                
                                if (enemy.intersectsMesh(box8, false)){
                                    enemy.rotation = new BABYLON.Vector3(0, 0, 0);
                                    enemy.rotation.y = 3.14/2;
                                }
                            
                                if (enemy.intersectsMesh(box6, false)){
                                    enemy.position = new BABYLON.Vector3(-50, 0, -75);
                                    
                
                                }
                                if (enemy.intersectsMesh(box15, false)){
                                    enemy.moveWithCollisions(enemy.forward.scaleInPlace(-1));
                                }
                                if (enemy.intersectsMesh(box14, false)){
                                    enemy.position = new BABYLON.Vector3(50,0,-75);
                                    
                
                                }
                                
                                if (enemy.intersectsMesh(box12, false)){
                                    
                                    enemy.rotation = new BABYLON.Vector3(0, 0, 0);
                                    enemy.rotation.y = 3.14/2;
                                }
                
                                if (enemy.intersectsMesh(box11, false)){
                                    enemy.position = new BABYLON.Vector3(100,0,-75);
                                 
                                }

                
                            });
                        });
                        //enemy.counter = 10;
                         
                    //}, 10);

                let shotCounter = 0;
               
                var ok = true;
                window.addEventListener("click", () => {
                    if (SCENETORENDER == "bossFinal"){
                    shotCounter += 1;
                    if(ok){
                        shotCounter=0;
                        ok = false;
                        ajtPoints(1);
                    }
                    ajtPoints(-1);
                    if (shotCounter>graines){
                        var defaite = document.getElementById("defaite");
                        defaite.style.display = "block";
                        canvas.style.display = "none";
                        defaite.style.width = "100vw";
                        defaite.style.height = "95vh";
                    }
                    console.log("You fired " + shotCounter + " rounds");
                   console.log(shotCounter);
                   console.log(graines);
                    let pickResult = scene.pick(scene.pointerX, scene.pointerY);
                    let sphere = BABYLON.Mesh.CreateSphere("sphere1", 10, 4, scene);
                    setInterval(() => {
                        sphere.dispose();
                        
                    }, 1000);

                    sphere.isPickable = false;

                    let sphereAnimation = new BABYLON.Animation(
                        "sphereAnimation",
                        "position",
                        40,
                        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                    );

                    let targetPoint = new BABYLON.Vector3(pickResult.pickedPoint.x, pickResult.pickedPoint.y, pickResult.pickedPoint.z);

                    let sphereKeys = [];
                    sphereKeys.push({
                        frame: 0,
                        value: new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z)
                    });
                    
                    sphereKeys.push({
                        frame: 10,
                        value: targetPoint
                    });
                    
                    sphereAnimation.setKeys(sphereKeys);
                    sphere.animations = [];
                    sphere.animations.push(sphereAnimation);
                    let shotAnimation = scene.beginAnimation(sphere, 0, 10, true);
                    scene.beginAnimation(sphere, 0, 10, true);

                    
                    let hitDetected = function(enemy, sphere) {
                        console.log("fct hit detected");

                        //enemyLifes-=1;
                        switch (enemyLifes) {
                            case 10:
                                sphere.dispose();
                                console.log("9 lifes remaining");
                                enemyLifes = 9;
                                enemy.position = new BABYLON.Vector3(100, 0, 0);
                                console.log(enemy.position);
                            
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                            case 9:
                                sphere.dispose();
                                console.log("8 lifes remaining");
                                enemyLifes = 8;
                                enemy.position = new BABYLON.Vector3(100, 0, -90);
                        
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                            case 8:
                                sphere.dispose();
                                console.log("7 lifes remaining");
                                enemyLifes = 7;
                                enemy.position = new BABYLON.Vector3(200, 0, -70);
                            
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                            case 7:
                                sphere.dispose();
                                console.log("6 lifes remaining");
                                enemyLifes = 6;
                                enemy.position = new BABYLON.Vector3(120, 0, 50);
                            
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                            case 6:
                                sphere.dispose();
                                console.log("5 lifes remaining");
                                enemyLifes = 5;
                                enemy.position = new BABYLON.Vector3(-200, 0, -100);
                            
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                            case 5:
                                sphere.dispose();
                                console.log("4 lifes remaining");
                                enemyLifes = 4;
                                enemy.position = new BABYLON.Vector3(200, 0, 250);
                            
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;
                                                    
                            case 4:
                                sphere.dispose();
                                console.log("3 lifes remaining");
                                enemyLifes = 3;
                                enemy.position = new BABYLON.Vector3(280,0, 110);
    
                                //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                                scene.onBeforeRenderObservable.remove(observer);
                                break;

                            case 3:
                                sphere.dispose();
                            console.log("2 lifes remaining");
                            enemyLifes = 2;
                            enemy.position = new BABYLON.Vector3(-270, 0, 100);
                            
                            //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#5995ff");
                            scene.onBeforeRenderObservable.remove(observer);
                            break;

                            case 2:
                            console.log("1 life remaining");
                            enemyLifes = 1;
                            enemy.position = new BABYLON.Vector3(-220, 0, -100);
                            
                            //sphere.material.emissiveColor = new BABYLON.Color3.FromHexString("#095575");
                            sphere.dispose();
                            scene.onBeforeRenderObservable.remove(observer);
                            break;
                            
                        case 1:
                            console.log("kill");
                            enemyLifes = 0;
                            for (let i=0; i<enemy.length; i++){
                                enemy[i].dispose();
                            }

                            scene.onBeforeRenderObservable.remove(observer);
                            var victoire = document.getElementById("victoire");
                            victoire.style.display = "block";
                            canvas.style.display = "none";
                            victoire.style.width = "100vw";
                            victoire.style.height = "95vh";

                        }
                    
                        
                    }


               
                    let observer = scene.onBeforeRenderObservable.add(() =>{
                            if (sphere.intersectsMesh(pickResult.pickedMesh, false)) {
                                if (pickResult.pickedMesh.name=="Sphere.006" || pickResult.pickedMesh.name=="__root__" ||pickResult.pickedMesh.name=="Cube.007" ||pickResult.pickedMesh.name=="Cube.008" ||pickResult.pickedMesh.name=="Cube.009"|| pickResult.pickedMesh.name=="Sphere.010" ||pickResult.pickedMesh.name=="Sphere.011" ){
                                    let enemy = newMeshes;
                                    hitDetected(enemy, sphere);   
                                }
                                
                                //console.log("intersects");
                                if(pickResult.pickedMesh.name!="skyBox"){
                                }
         
                            } 
                        
                    });
                }
                }); // CLICK EVENT
                
                   
        }); //import mesh

                



            //}   // StartGame
            
            
            
          
            
            //StartGame();
            

            
            return scene;

};