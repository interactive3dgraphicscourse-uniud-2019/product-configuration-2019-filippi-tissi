var canvas, container, scene, renderer;
var controls;
var sitting = new Array();
var und_sit = new Array();
var structure = new Array();
var simple_vertex, simple_fragment;
var vs, fs;
var upload = false;
var sgabello;
var structure_price = 80;
var sitting_price = 50;


function showDesc() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
function onResize() {
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    camera.aspect = ( canvas.clientWidth / canvas.clientHeight );
    camera.updateProjectionMatrix();
}

function update() {
    requestAnimationFrame( update );
    render();
}

function render() {
    renderer.render( scene, camera );
}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( file , function ( texture ) {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.needsUpdate = true;
        render();
    } )
    return texture;
}


function init(){
    scene = new THREE.Scene();
    canvas = document.getElementById("canvas_model");
    camera = new THREE.PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
    camera.position.z = 6;
    camera.position.y = 3;
    camera.position.x = -4;
    renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
    renderer.setPixelRatio( canvas.devicePixelRatio );
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    canvas.addEventListener( 'resize', onResize, false );
    renderer.setClearColor( 0xd8d8d8 );
    

    // ------------------- CARICAMENTO DEL MODELLO OBJ DELLO SGABELLO -------------------
    var loader = new THREE.OBJLoader();
    loader.load( "models/SgabelloCompleto.obj", function ( obj ) {
        sgabello = obj;
        obj.position.z = 0;
        obj.position.y = -1.5;
        obj.position.x = 0;
        obj.traverse( 
            function (child){
                if (child instanceof THREE.Mesh) {
                    if (child.name === "Seduta_Plane.003") sitting.push(child);
                    if (child.name === "Sottocuscino_Plane.002") und_sit.push(child);
                    if (child.name === "Struttura_Plane.001") structure.push(child);
                }
            }
        );
        upload = true;
    });

    // ------------------- CARICAMENTO DELLA CUBEMAP - NON UTILIZZATA --------------------
    /*
    var loader = new THREE.CubeTextureLoader();
    loader.setPath( 'textures/cubemapDEF/' );
    var textureCube;
    textureCube = loader.load([
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
        ] );
    //scene.background = textureCube; 
    textureCube.minFilter = THREE.LinearMipMapLinearFilter;      
    // ----------------------------------------------------------------------------      
    */


    var path="textures/MATERIALS/SITTING/";
    /************************* MATERIAL UNIFORMS **********************/
    //SITTING
    //Cloth
    sitting_uniforms_cloth={
        cloth_black: {
            specularMap:    { type: "t", value: loadTexture(path+"Cloth/Carpet_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Cloth/diffuse/Carpet_diffuse_black.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Cloth/Carpet_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Cloth/Carpet_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Cloth/Carpet_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(4.0, 4.0) },
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)},
        },
        cloth_brown: {
            specularMap:    { type: "t", value: loadTexture(path+"Cloth/Carpet_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Cloth/diffuse/Carpet_diffuse_brown.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Cloth/Carpet_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Cloth/Carpet_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Cloth/Carpet_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(4.0, 4.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)},
        },
        cloth_green: {
            specularMap:    { type: "t", value: loadTexture(path+"Cloth/Carpet_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Cloth/diffuse/Carpet_diffuse_green.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Cloth/Carpet_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Cloth/Carpet_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Cloth/Carpet_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(4.0, 4.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)},
        },
        cloth_red: {
            specularMap:    { type: "t", value: loadTexture(path+"Cloth/Carpet_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Cloth/diffuse/Carpet_diffuse_red.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Cloth/Carpet_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Cloth/Carpet_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Cloth/Carpet_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(4.0, 4.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)}, 
        }
    }
    //Leather
    sitting_uniforms_leather={
        leather_black: {
            specularMap:    { type: "t", value: loadTexture(path+"Leather/Leather_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Leather/diffuse/Leather_diffuse_black.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Leather/Leather_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Leather/Leather_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Leather/Leather_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(3.0, 3.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)}, 
        },
        leather_brown: {
            specularMap:    { type: "t", value: loadTexture(path+"Leather/Leather_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Leather/diffuse/Leather_diffuse_brown.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Leather/Leather_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Leather/Leather_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Leather/Leather_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(3.0, 3.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)}, 
        },
        leather_green: {
            specularMap:    { type: "t", value: loadTexture(path+"Leather/Leather_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Leather/diffuse/Leather_diffuse_green.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Leather/Leather_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Leather/Leather_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Leather/Leather_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(3.0, 3.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)},
        },
        leather_red: {
            specularMap:    { type: "t", value: loadTexture(path+"Leather/Leather_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path+"Leather/diffuse/Leather_diffuse_red.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path+"Leather/Leather_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path+"Leather/Leather_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path+"Leather/Leather_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(3.0, 3.0) }  ,
            normalScale: {type: "v2", value: new THREE.Vector2(1,1)},
        }
    }

    //STRUCTURE
    //Metal
    var path2="textures/MATERIALS/STRUCTURE/";
    structure_uniforms_metal={
        metal_fixed: {
            specularMap:    { type: "t", value: loadTexture(path2+"Metal/Metal_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Metal/Metal_Diffuse.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Metal/Metal_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Metal/Metal_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Metal/Metal_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(9.0, 9.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)},
        }
    }

    //Plastic
    structure_uniforms_platic={
        plastic_black: {
            specularMap:    { type: "t", value: loadTexture(path2+"Plastic/Plastic_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Plastic/diffuse/Plastic_diffuse_black.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Plastic/Plastic_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Plastic/Plastic_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Plastic/Plastic_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(10.0, 10.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)}
        },
        plastic_brownC: {
            specularMap:    { type: "t", value: loadTexture(path2+"Plastic/Plastic_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Plastic/diffuse/Plastic_diffuse_brownC.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Plastic/Plastic_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Plastic/Plastic_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Plastic/Plastic_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(10.0, 10.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)}, 
        },
        plastic_brownS: {
            specularMap:    { type: "t", value: loadTexture(path2+"Plastic/Plastic_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Plastic/diffuse/Plastic_diffuse_brownS.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Plastic/Plastic_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Plastic/Plastic_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Plastic/Plastic_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(10.0, 10.0) } ,
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)},
        },
        plastic_red: {
            specularMap:    { type: "t", value: loadTexture(path2+"Plastic/Plastic_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Plastic/diffuse/Plastic_diffuse_red.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Plastic/Plastic_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Plastic/Plastic_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Plastic/Plastic_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(3.0, 3.0) }  ,
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)}, 
        }
    }

    //Wood
    structure_uniforms_wood={
        wood_brownC: {
            specularMap:    { type: "t", value: loadTexture(path2+"Wood/Wood_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Wood/diffuse/Wood_diffuse_brownC.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Wood/Wood_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Wood/Wood_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Wood/Wood_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(1.0, 1.0) },
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)},
        },
        wood_brownS: {
            specularMap:    { type: "t", value: loadTexture(path2+"Wood/Wood_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path2+"Wood/diffuse/Wood_diffuse_brownS.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path2+"Wood/Wood_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path2+"Wood/Wood_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path2+"Wood/Wood_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(1.0, 1.0) }, 
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)},
        }
    }

    //SOTTOCUSCINO - Wood
    var path3="textures/MATERIALS/SOTTOCUSCINO/";
    sottocuscino_uniforms_wood={
        wood_fixed: {
            specularMap:    { type: "t", value: loadTexture(path3+"WoodU_Specular.jpg") },
            diffuseMap:  { type: "t", value: loadTexture(path3+"WoodU_Diffuse.jpg") },
            roughnessMap: { type: "t", value: loadTexture(path3+"WoodU_Roughness.jpg") },
            normalMap:  { type: "t", value: loadTexture(path3+"WoodU_Normal.jpg") },
            aoMap: {type: "t", value: loadTexture(path3+"WoodU_AO.jpg")},
            textureRepeat: { type: "v2", value: new THREE.Vector2(6.0, 6.0) },
            normalScale: {type: "v2", value: new THREE.Vector2(3,3)}, 
        }
    }

    /************************** GESTIONE LUCI ***************************************/
    //Alta
    var param_luce1 = { 
        red: 0.5, 
        green: 0.5, 
        blue: 0.5,    
        intensity: 0.6,    
        position: [0, 3, 1] 
    };

    //Dx
    var param_luce2 = { 
        red: 0.2, 
        green: 0.2, 
        blue: 0.2,    
        intensity: 0.6,     
        position: [2, 1, 1] 
    };

    //Sx
    var param_luce3 = { 
        red: 0.6, 
        green: 0.6, 
        blue: 0.6,    
        intensity: 0.6,     
        position: [-2, 1, 1] 
    };

    //Dietro
    var param_luce4 = { 
        red: 0.6, 
        green: 0.6, 
        blue: 0.6,    
        intensity: 0.4,     
        position: [0, -0.5, -2] 
    };

    var ambientLightParams = { 
        red: 0.5, 
        green: 0.5, 
        blue: 0.5, 
        intensity: 0.8
    };


    var sole1 = new THREE.Mesh( new THREE.SphereGeometry( .5, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
    sole1.position.set( param_luce1.position[0], param_luce1.position[1], param_luce1.position[2] );
    //scene.add(sole1);
    var raggio1 = new THREE.Vector3(sole1.position.x, sole1.position.y, sole1.position.z);

    var sole2 = new THREE.Mesh( new THREE.SphereGeometry( .5, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
    sole2.position.set( param_luce2.position[0], param_luce2.position[1], param_luce2.position[2] );
    //scene.add(sole2);
    var raggio2 = new THREE.Vector3(sole2.position.x, sole2.position.y, sole2.position.z);
    
    var sole3 = new THREE.Mesh( new THREE.SphereGeometry( .5, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
    sole3.position.set( param_luce3.position[0], param_luce3.position[1], param_luce3.position[2] );
    //scene.add(sole3);
    var raggio3 = new THREE.Vector3(sole3.position.x, sole3.position.y, sole3.position.z);

    var sole4 = new THREE.Mesh( new THREE.SphereGeometry( .5, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
    sole4.position.set( param_luce4.position[0], param_luce4.position[1], param_luce4.position[2] );
    //scene.add(sole4);
    var raggio4 = new THREE.Vector3(sole4.position.x, sole4.position.y, sole4.position.z);

    /************************** UNIFORM CONDIVISI E DELLE SINGOLE PARTI ****************************************/
    unif_condivisi = {  
        pointLightPositions: {
            type: "v3[]",
            value: new Array(raggio1, raggio2, raggio3, raggio4)
        },
        clights: {
            type: "v3[]",
            value: new Array(new THREE.Vector3(param_luce1.red * param_luce1.intensity, param_luce1.green * param_luce1.intensity, param_luce1.blue * param_luce1.intensity),
                            new THREE.Vector3(param_luce2.red * param_luce2.intensity, param_luce2.green * param_luce2.intensity, param_luce2.blue * param_luce2.intensity),
                            new THREE.Vector3(param_luce3.red * param_luce3.intensity, param_luce3.green * param_luce3.intensity, param_luce3.blue * param_luce3.intensity),
                            new THREE.Vector3(param_luce4.red * param_luce4.intensity, param_luce4.green * param_luce4.intensity, param_luce4.blue * param_luce4.intensity)
                            )
        },
        ambientLight: {
            type: "v3",
            value: new THREE.Vector3(
                ambientLightParams.red*ambientLightParams.intensity,
                ambientLightParams.green*ambientLightParams.intensity,
                ambientLightParams.blue*ambientLightParams.intensity)
        }
    }
    materialExtensions = {
        derivatives: true, // set to use derivatives
        shaderTextureLOD: true // set to use shader texture LOD
    };
    uniform_sitting = {};
    uniform_sottocuscino = {};
    uniform_structure = {};

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //Set min e max distance for product navigation
    controls.minDistance = 4;
    controls.maxDistance = 11;
    controls.enablePan = false;
    controls.update();
    firstStart();
}

//Function for the first Start, so we have a model with standard texture
function firstStart(){
    if(upload){
        vs = document.getElementById("vertex").textContent;
        fs = document.getElementById("fragment").textContent;
        var sitting_material=new THREE.ShaderMaterial({uniforms: uniform_sitting, vertexShader: vs, fragmentShader: fs, extensions: materialExtensions});
        sitting.needsUpdate = true;
        
        sitting.forEach(function(el){
            el.material = sitting_material;
        });

        var sottocuscino_material=new THREE.ShaderMaterial({uniforms: uniform_sottocuscino, vertexShader: vs, fragmentShader: fs, extensions: materialExtensions});
        und_sit.needsUpdate = true;
        
        und_sit.forEach(function(el){
            el.material = sottocuscino_material;
        });

        var structure_material=new THREE.ShaderMaterial({uniforms: uniform_structure, vertexShader: vs, fragmentShader: fs, extensions: materialExtensions});
        structure.needsUpdate = true;
        
        structure.forEach(function(el){
            el.material = structure_material;
        });
        upload=false;
        scene.add(sgabello);
        requestAnimationFrame(update);
        Object.assign(uniform_sitting, sitting_uniforms_leather.leather_red);
        Object.assign(uniform_sitting, unif_condivisi);

        Object.assign(uniform_sottocuscino, sottocuscino_uniforms_wood.wood_fixed);
        Object.assign(uniform_sottocuscino, unif_condivisi);

        Object.assign(uniform_structure, structure_uniforms_metal.metal_fixed);
        Object.assign(uniform_structure, unif_condivisi);
        document.getElementById("redStruc").style.display = 'none';
        document.getElementById("blackStruc").style.display = 'none';
        document.getElementById("brownSStruc").style.display = 'none';
        document.getElementById("brownCStruc").style.display = 'none';
        document.getElementById("color_av").style.display = 'block';
        calcPrice();
    }else{
        requestAnimationFrame(firstStart);   
    }
}

//Function for change texture by click on color/material
function changeTexture(stoolPart){
    if(stoolPart==1){
        if(document.getElementById("leather").checked){
            if(document.getElementById("redSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_leather.leather_red);
            }else if(document.getElementById("blackSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_leather.leather_black);
            }else if(document.getElementById("brownSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_leather.leather_brown);
            }else if(document.getElementById("greenSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_leather.leather_green);
            }
            sitting_price = 50;
        }else if(document.getElementById("cloth").checked){
            if(document.getElementById("redSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_cloth.cloth_red);
            }else if(document.getElementById("blackSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_cloth.cloth_black);
            }else if(document.getElementById("brownSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_cloth.cloth_brown);
            }else if(document.getElementById("greenSit").checked){
                Object.assign(uniform_sitting, sitting_uniforms_cloth.cloth_green);
            }
            sitting_price = 30;
        }
    }else if (stoolPart==2){
        if(document.getElementById("metal").checked){
            document.getElementById("redStruc").style.display = 'none';
            document.getElementById("blackStruc").style.display = 'none';
            document.getElementById("brownSStruc").style.display = 'none';
            document.getElementById("brownCStruc").style.display = 'none';
            document.getElementById("color_av").style.display = 'block';
            Object.assign(uniform_structure, structure_uniforms_metal.metal_fixed);
            structure_price = 100;
        }else if(document.getElementById("plastic").checked){
            document.getElementById("redStruc").style.display = 'block';
            document.getElementById("blackStruc").style.display = 'block';
            document.getElementById("brownSStruc").style.display = 'block';
            document.getElementById("brownCStruc").style.display = 'block';
            document.getElementById("color_av").style.display = 'none';
            if(document.getElementById("redStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_platic.plastic_red);
            }else if(document.getElementById("blackStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_platic.plastic_black);
            }else if(document.getElementById("brownCStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_platic.plastic_brownC);
            }else if(document.getElementById("brownSStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_platic.plastic_brownS);
            }
            structure_price = 80;
        }else if(document.getElementById("wood").checked){
            document.getElementById("redStruc").style.display = 'none';
            document.getElementById("blackStruc").style.display = 'none';
            document.getElementById("brownSStruc").style.display = 'block';
            document.getElementById("brownCStruc").style.display = 'block';
            document.getElementById("color_av").style.display = 'none';
            Object.assign(uniform_structure, structure_uniforms_wood.wood_brownC);
            if(document.getElementById("brownCStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_wood.wood_brownC);
            }else if(document.getElementById("brownSStruc").checked){
                Object.assign(uniform_structure, structure_uniforms_wood.wood_brownS);
            }
            structure_price = 130;
        }
    }
    calcPrice();
}

//Function for price calculation based on material and quantity
function calcPrice(){
    var option_qta = document.getElementById('options_qta');
    var quantity= option_qta.options[option_qta.selectedIndex].text;
    document.getElementById("total_price").innerHTML = "&euro; " + ((sitting_price+structure_price)*quantity).toFixed(2);
}