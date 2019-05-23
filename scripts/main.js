function showDesc() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xf0f0f0 );
    document.body.appendChild( renderer.domElement );
    let canvas = document.getElementById("canvas_model");
    // ------------------- CARICAMENTO DEL MODELLO OBJ DELLO SGABELLO -------------------

    var loader = new THREE.OBJLoader();
    loader.load( "models/SgabelloCompleto.obj", function ( obj ) {
        sgabello = obj;
        
        obj.position.z = 0;
        obj.position.y = 0;

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

}