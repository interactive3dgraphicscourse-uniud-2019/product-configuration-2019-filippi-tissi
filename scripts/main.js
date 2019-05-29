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

    // ------------------- CARICAMENTO DELLA CUBEMAP -------------------

			var loader = new THREE.CubeTextureLoader();
			loader.setPath( 'textures/cubemapDEF/' );
			
			var textureCube;
			textureCube = loader.load([
					'px.png', 'nx.png',
					'py.png', 'ny.png',
					'pz.png', 'nz.png'

					] );

			scene.background = textureCube;    //se lo si decommenta aggiungo il background alla scena ma a noi non serve
            textureCube.minFilter = THREE.LinearMipMapLinearFilter;
            
    // ----------------------------------------------------------------------------      


    var uniforms_cloth={
        diffuseMap:		{ type: "t", value: loadTexture("textures/cloth/Carpet_Diffuse.jpg") },
        roughnessMap:	{ type: "t", value: loadTexture("textures/cloth/Carpet_Roughness.jpg") },
        normalMap:		{ type: "t", value: loadTexture("textures/cloth/Carpet_Normal.jpg") },
        normalScale:	{ type: "v2", value: new THREE.Vector2(0.5, 0.5) },     //valori da modificare
        textureRepeat:	{ type: "v2", value: new THREE.Vector2(4.0, 4.0) }      //valori da modificare
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

    var param_luce1 = { red: 1.0, green: 1.0, blue: 1.0,    intensity: 0.5,    pos: [0, 40, 0] };
    var param_luce2 = { red: .2, green: .2, blue: .2,    intensity: 0.4,    pos: [20, -30, 0] };

    if (param_luce1.intensity > 0) {
        var sole1 = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
        sole1.position.set( param_luce1.pos[0], param_luce1.pos[1], param_luce1.pos[2] );
        //scene.add(sole1);
        var raggio1 = new THREE.Vector3(sole1.position.x, sole1.position.y, sole1.position.z);
    } else { var lightPos1 = new THREE.Vector3(0,0,0); }
    
    if (param_luce2.intensity > 0) {
        var sole2 = new THREE.Mesh( new THREE.SphereGeometry( 1, 16, 16), new THREE.MeshBasicMaterial ({color: 0xffff00, wireframe:true}));
        sole2.position.set( param_luce2.pos[0], param_luce2.pos[1], param_luce2.pos[2] );
        //scene.add(sole2);
        var raggio2 = new THREE.Vector3(sole2.position.x, sole2.position.y, sole2.position.z)
    }



        var unif_condivisi = {
            pointLightPositions: {
                type: "v3[]",
                value: new Array(param_luce1, param_luce2)
            },
            clights: {
                type: "v3[]",
                value: new Array(
                    new THREE.Vector3(
                        param_luce1.red * param_luce1.intensity,
                        param_luce1.green * param_luce1.intensity,
                        param_luce1.blue * param_luce1.intensity),
                    new THREE.Vector3(
                        param_luce2.red * param_luce2.intensity,
                        param_luce2.green * param_luce2.intensity,
                        param_luce2.blue * param_luce2.intensity)
                )
            },
            ambientLight: {
                type: "v3",
                value: new THREE.Vector3(
                    ambientLightParams.red * ambientLightParams.intensity,
                    ambientLightParams.green * ambientLightParams.intensity,
                    ambientLightParams.blue * ambientLightParams.intensity)
            },
             envMap:	{ type: "t", value: textureCube} 
        }


    
    var lightPos1 = new THREE.Vector3(10,10,10);
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