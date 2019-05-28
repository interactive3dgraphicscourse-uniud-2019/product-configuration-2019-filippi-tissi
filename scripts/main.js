var canvas, container;
var controls;
var sitting = new Array();
var und_sit = new Array();
var structure = new Array();
var simple_vertex, simple_fragment;
var vs, fs;

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
    //stats.update();
    render();
}

function render() {
    //updateUniforms();
    renderer.render( scene, camera );
}

function loadTexture(file) {
    var texture = new THREE.TextureLoader().load( file , function ( texture ) {

        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.getMaxAnisotropy();
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
    camera.position.z = 4;
    camera.position.y = 3;
    camera.position.x = -6;
    renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
    renderer.setPixelRatio( canvas.devicePixelRatio );
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );

    
    canvas.addEventListener( 'resize', onResize, false );
    renderer.setClearColor( 0xd8d8d8 );
    //document.body.appendChild( renderer.domElement );
    
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
                    if (child.name === "Seduta") sitting.push(child);
                    if (child.name === "Sottocuscino") und_sit.push(child);
                    if (child.name === "Struttura") stucture.push(child);
                }
            }
        );
        scene.add(sgabello);
    });


    var uniforms_cloth={
        diffuseMap:		{ type: "t", value: loadTexture("textures/cloth/Carpet_Diffuse.jpg") },
        roughnessMap:	{ type: "t", value: loadTexture("textures/cloth/Carpet_Roughness.jpg") },
        normalMap:		{ type: "t", value: loadTexture("textures/cloth/Carpet_Normal.jpg") },
        normalScale:	{ type: "v2", value: new THREE.Vector2(0.5, 0.5) },
        textureRepeat:	{ type: "v2", value: new THREE.Vector2(4.0, 4.0) }
    }

    var sitting_uniforms = {
        surfCdiff: { type: "v3", value: new THREE.Vector3(1.0, 1.0, 1.0) }
    }

    var lightParameters = {
        red: 1.0,
        green: 1.0,
        blue: 1.0,
        intensity: 1.0,
        pos: [0,10,0]
    };
    var lightMesh1 = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
     lightMesh1.position.set( lightParameters.pos[0], lightParameters.pos[1], lightParameters.pos[2] );
    //scene.add(lightMesh1);
    var lightPos1 = new THREE.Vector3(lightMesh1.position.x, lightMesh1.position.y, lightMesh1.position.z);
    Object.assign(sitting_uniforms, uniforms_cloth);


    vs = document.getElementById("vertex").textContent;
    fs = document.getElementById("fragment").textContent;
    var sitting_material=new THREE.ShaderMaterial({uniforms: sitting_uniforms, vertexShader: vs, fragmentShader: fs});
    sitting.forEach(function(el){
        el.material = sitting_material;
    });
    //Coordinates.drawAllAxes(); //disegna gli assi
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 4;
    controls.maxDistance = 11;
    controls.enablePan = false;
    controls.update();
    update();
	render();
}