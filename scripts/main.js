var canvas, container;
var controls;

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

function init(){
    scene = new THREE.Scene();
    canvas = document.getElementById("canvas_model");
    camera = new THREE.PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
    camera.position.z = 10;
    camera.position.y = 8;
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
        obj.position.y = -2;
        obj.position.x = 2;

        obj.traverse(
            function (child){
                if (child instanceof THREE.Mesh) {
                    if (child.name === "Seduta") seduta.push(child);
                    if (child.name === "Sottocuscino") sottocuscino.push(child);
                    if (child.name === "Struttura") struttura.push(child);
                }
            }
        );
        scene.add(sgabello);
    });
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controls.update();
    update();
	render();
}