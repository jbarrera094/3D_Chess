import * as THREE from './three/three.module.js';
import {OrbitControls} from './three/OrbitControls.js';
import { STLLoader } from './three/STLLoader.js';
import { DragControls, SelectedBefore} from './three/DragControls.js';

var UpgradeScreen= document.getElementById("inner");
var GameWonA = document.getElementById("inner2");
var GameWonM = document.getElementById("inner3");
var GameWonN = document.getElementById("inner4");
var Reloader = document.getElementById("Reload");
var Start = document.getElementById("inner5");
var negroIzq =document.getElementById("inner6");
var negroDer =document.getElementById("inner7");

window.myFunction = function myFunction(type) {
	//window.location.reload();
	UpgradeScreen.style.display = "none";
	MatrixTablero[rosUpgrade][colUpgrade].tipo=type;

	var sonidos = document.createElement("iframe");

	if(MatrixTablero[rosUpgrade][colUpgrade].color=="Amarillo"){
		if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Reina"){
			sonidos.setAttribute("src","./Recursos/Sounds/RoyalTrumpet.mp3");
			figureUpgrade.material=materialReinaAmarillaNueva;
		}else{
			if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Alfil"){
				sonidos.setAttribute("src","./Recursos/Sounds/Bells.mp3");
				figureUpgrade.material=materialAlfilAmarilloNueva;
			}else{
				if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Caballo"){
					figureUpgrade.material=materialCaballoAmarilloNueva;
					sonidos.setAttribute("src","./Recursos/Sounds/Caballero.mp3");
				}else{
					if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Torre"){
						figureUpgrade.material=materialTorreAmarillaNueva;
						sonidos.setAttribute("src","./Recursos/Sounds/Gong.mp3");
					}
				}
			}
		}
		MatrixTablero[rosUpgrade][colUpgrade].tipo=type;
		jaque(MatrixTablero,"Morado",posRowM,posColM);
			if(jaqueReyMorado==true){
				rey2.material=materialjaque;
				jaqueMate("Morado");
			}
	}else{
		if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Reina"){
			sonidos.setAttribute("src","./Recursos/Sounds/RoyalTrumpet.mp3");
			figureUpgrade.material=materialReinaMoradaNueva;
		}else{
			if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Alfil"){
				figureUpgrade.material=materialAlfilMoradoNueva;
				sonidos.setAttribute("src","./Recursos/Sounds/Bells.mp3");
			}else{
				if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Caballo"){
					figureUpgrade.material=materialCaballoMoradoNueva;
					sonidos.setAttribute("src","./Recursos/Sounds/Caballero.mp3");
				}else{
					if(MatrixTablero[rosUpgrade][colUpgrade].tipo=="Torre"){
						figureUpgrade.material=materialTorreMoradaNueva;
						sonidos.setAttribute("src","./Recursos/Sounds/Gong.mp3");
					}
				}
			}
		}
		MatrixTablero[rosUpgrade][colUpgrade].tipo=type;
		jaque(MatrixTablero,"Amarillo",posRowA,posColA);
			if(jaqueReyAmarillo==true){
				rey1.material=materialjaque;
				jaqueMate("Amarillo");
			}
	}
	

	document.body.appendChild(sonidos);
}
var water;
var container,camera, scene, renderer, material, material2, light;
var controls,controls2,controls3;
var tablero, ExteriorCube;
var rey1, rey2;
var reina1, reina2;
var caballo1,caballo2,caballo3,caballo4;
var alfil1,alfil2,alfil3,alfil4;
var torre1,torre2,torre3,torre4;
var peon1,peon2,peon3,peon4,peon5,peon6,peon7,peon8;
var peon9,peon10,peon11,peon12,peon13,peon14,peon15,peon16;
var cubeMaterials;
var cX,cY,cZ;
var turn=1;
var piezasAmarillas=[];
var piezasMoradas=[];
var isPlay = true;
var theta = 0;
var radius;
var step=0;
var YChange;
var Xant,Yant;
var selectedbef;
var valid;
var color;
var tipo;
var difX;
var difY;
var row;
var column;
var vacia;
var obstaculo;
var MatrixTablero=new matrix(8,8);
var objectRemove;
var jaqueReyAmarillo=false;
var jaqueReyMorado=false;
var jaqueMateReyAmarillo=false;
var jaqueMateReyMorado=false;
var enorqueLargoAmarillo=true;
var enorqueCortoAmarillo=true;
var enorqueLargoMorado=true;
var enorqueCortoMorado=true;
var enroque;
var comidasAmarillas=[];
var comidasMoradas=[];
var posRowA=0;
var posRowM=7;
var posColA=4;
var posColM=4;
var countTurn=1;
var carnada;
var materialNegro = new THREE.MeshPhongMaterial( { color: 0x000000 } );
var materialReinaAmarillaNueva = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
var materialAlfilAmarilloNueva = new THREE.MeshPhongMaterial( { color: 0x29B9DD } );
var materialTorreAmarillaNueva = new THREE.MeshPhongMaterial( { color: 0xF23D3D  } );
var materialCaballoAmarilloNueva = new THREE.MeshPhongMaterial( { color: 0x56E02A } );
var materialjaque = new THREE.MeshPhongMaterial( { color: 0x8B0000 } );
var materialReinaMoradaNueva = new THREE.MeshPhongMaterial( { color: 0x6B6666} );
var materialAlfilMoradoNueva = new THREE.MeshPhongMaterial( { color: 0x1B697C } );
var materialTorreMoradaNueva = new THREE.MeshPhongMaterial( { color: 0xB50707  } );
var materialCaballoMoradoNueva = new THREE.MeshPhongMaterial( { color: 0x307719 } );
var figureUpgrade;
var rosUpgrade;
var colUpgrade;
var ppa=false;
var ppm=false;
var condicionTablas=40;
init();
animate();
function init() {
	//Añade una clase al elemento que tenga el id myDropdown
	container = document.createElement( 'div' );
    document.body.appendChild( container );
    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    // scene
	scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
	cX=0;
	cY=-250;
	cZ=320;
	camera.position.set(cX,cY,cZ);
	camera.up = new THREE.Vector3(0,0,1);
	camera.lookAt(new THREE.Vector3(400,400,400));

	water= document.createElement("iframe");
	water.setAttribute("src","./Recursos/Sounds/minion_laugh.mp3");

	YChange=Math.round(cY);
	Yant=Math.round(cY);
	radius=Math.round(Math.abs(cY));
	Xant=Math.round(Math.abs(cX));

    scene.add( camera ); // required, because we are adding a light as a child of the camera
	
	controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 0, 200 ); // view direction perpendicular to XY-plane
	controls.minDistance=0;
	controls.maxDistance=400;
	controls.minPolarAngle = Math.asin(Math.abs(cY)/Math.abs(cZ)); // radians
	controls.maxPolarAngle = Math.asin(Math.abs(cY)/Math.abs(cZ)); // radians

	controls2=new DragControls(piezasAmarillas,camera,renderer.domElement);
	controls2.addEventListener( 'dragstart', dragStartCallback);
	controls2.addEventListener ( 'drag', dragCallback );
	controls2.addEventListener( 'dragend', dragendCallbackA );

	controls3=new DragControls(piezasMoradas,camera,renderer.domElement);
	controls3.addEventListener( 'dragstart', dragStartCallback );
	controls3.addEventListener ( 'drag', dragCallback);
	controls3.addEventListener( 'dragend', dragendCallbackM);

	controls3.enabled=false;
	// lights
	scene.add( new THREE.AmbientLight( 0x222222 ) );
	light = new THREE.PointLight( 0xffffff, 0.8 );
	
    camera.add( light );
	
	 // object
				
				//Peones
                var loader = new STLLoader();
                loader.load( './Recursos/Figures/Pawn.stl', function ( geometry ) {

					material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-131;
					//PEONES Amarillos
					//El Peon mide 30 en X y en Y
					
					peon1 = new THREE.Mesh( geometry, material );
					//peon1 = new THREE.Mesh( geometry, materialReinaAmarillaNueva );
					peon1.rotation.z = Math.PI;
					peon1.position.set(posCol,-93,0);
					scene.add( peon1 );
					posCol=posCol+40;
					piezasAmarillas.push(peon1);		
					MatrixTablero[1][0]=({id: peon1.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					peon2 = new THREE.Mesh( geometry, material );
					//peon2 = new THREE.Mesh( geometry, materialReinaMoradaNueva );
					peon2.rotation.z = Math.PI;
					peon2.position.set(posCol,-93,0);
					scene.add( peon2 );
					posCol=posCol+40;
					piezasAmarillas.push(peon2);
					MatrixTablero[1][1]=({id: peon2.id, color: "Amarillo", tipo: "Peon", carnada: 0});
					
					peon3 = new THREE.Mesh( geometry, material );
					//peon3 = new THREE.Mesh( geometry, materialAlfilAmarilloNueva );
					peon3.rotation.z = Math.PI;
					peon3.position.set(posCol,-93,0);
					scene.add( peon3 );
					posCol=posCol+40;
					piezasAmarillas.push(peon3);
					MatrixTablero[1][2]=({id: peon3.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					peon4 = new THREE.Mesh( geometry, material );
					//peon4 = new THREE.Mesh( geometry, materialAlfilMoradoNueva);
					peon4.rotation.z = Math.PI;
					peon4.position.set(posCol,-93,0);
					scene.add( peon4 );
					posCol=posCol+40;
					piezasAmarillas.push(peon4);
					MatrixTablero[1][3]=({id: peon4.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					peon5 = new THREE.Mesh( geometry, material );
					//peon5 = new THREE.Mesh( geometry, materialTorreAmarillaNueva);
					peon5.rotation.z = Math.PI;
					peon5.position.set(posCol,-93,0);
					scene.add( peon5 );
					posCol=posCol+40;
					piezasAmarillas.push(peon5);
					MatrixTablero[1][4]=({id: peon5.id, color: "Amarillo", tipo: "Peon", carnada: 0});
					
					peon6 = new THREE.Mesh( geometry, material );
					//peon6 = new THREE.Mesh( geometry, materialTorreMoradaNueva);
					peon6.rotation.z = Math.PI;
					peon6.position.set(posCol,-93,0);
					scene.add( peon6 );
					posCol=posCol+40;
					piezasAmarillas.push(peon6);
					MatrixTablero[1][5]=({id: peon6.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					peon7 = new THREE.Mesh( geometry, material );
					//peon7 = new THREE.Mesh( geometry, materialCaballoAmarilloNueva);
					peon7.rotation.z = Math.PI;
					peon7.position.set(posCol,-93,0);
					scene.add( peon7 );
					posCol=posCol+40;
					piezasAmarillas.push(peon7);
					MatrixTablero[1][6]=({id: peon7.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					peon8 = new THREE.Mesh( geometry, material );
					//peon8 = new THREE.Mesh( geometry, materialCaballoMoradoNueva);
					peon8.rotation.z = Math.PI;
					peon8.position.set(posCol,-93,0);
					scene.add( peon8 );
					piezasAmarillas.push(peon8);
					MatrixTablero[1][7]=({id: peon8.id, color: "Amarillo", tipo: "Peon", carnada: 0});

					//PEONES Morados
					//El Peon mide 30 en X y en Y
					posCol=-131;
                    peon9 = new THREE.Mesh( geometry, material2 );
					peon9.position.set(posCol-17,93,0);
					scene.add( peon9 );
					posCol=posCol+40;
					piezasMoradas.push(peon9);
					MatrixTablero[6][0]=({id: peon9.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon10 = new THREE.Mesh( geometry, material2 );
					peon10.position.set(posCol-17,93,0);
					scene.add( peon10 );
					posCol=posCol+40;
					piezasMoradas.push(peon10);
					MatrixTablero[6][1]=({id: peon10.id,color: "Morado", tipo: "Peon", carnada: 0});

					peon11 = new THREE.Mesh( geometry, material2 );
					peon11.position.set(posCol-17,93,0);
					scene.add( peon11 );
					posCol=posCol+40;
					piezasMoradas.push(peon11);
					MatrixTablero[6][2]=({id: peon11.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon12 = new THREE.Mesh( geometry, material2 );
					peon12.position.set(posCol-17,93,0);
					scene.add( peon12 );
					posCol=posCol+40;
					piezasMoradas.push(peon12);
					MatrixTablero[6][3]=({id: peon12.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon13 = new THREE.Mesh( geometry, material2 );
					peon13.position.set(posCol-17,93,0);
					scene.add( peon13 );
					posCol=posCol+40;
					piezasMoradas.push(peon13);
					MatrixTablero[6][4]=({id: peon13.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon14 = new THREE.Mesh( geometry, material2 );
					peon14.position.set(posCol-17,93,0);
					scene.add( peon14 );
					posCol=posCol+40;
					piezasMoradas.push(peon14);
					MatrixTablero[6][5]=({id: peon14.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon15 = new THREE.Mesh( geometry, material2 );
					peon15.position.set(posCol-17,93,0);
					scene.add( peon15 );
					posCol=posCol+40;
					piezasMoradas.push(peon15);
					MatrixTablero[6][6]=({id: peon15.id, color: "Morado", tipo: "Peon", carnada: 0});

					peon16 = new THREE.Mesh( geometry, material2 );
					peon16.position.set(posCol-17,93,0);
					scene.add( peon16 );
					posCol=posCol+40;
					piezasMoradas.push(peon16);
					MatrixTablero[6][7]=({id: peon16.id, color: "Morado", tipo: "Peon", carnada: 0});
				} );
				
				
				//Torres
                var loader = new STLLoader();
                loader.load( './Recursos/Figures/Rook.stl', function ( geometry ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					var material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-231;
					//Torres Amarillas
                    torre1 = new THREE.Mesh( geometry, material );
					torre1.rotation.z = Math.PI;
					torre1.position.set(posCol,-133,0);
					scene.add( torre1 );
					posCol=posCol+280;
					piezasAmarillas.push(torre1);
					MatrixTablero[0][0]=({id: torre1.id, color: "Amarillo", tipo: "Torre", carnada: 0});
					torre2 = new THREE.Mesh( geometry, material );
					torre2.rotation.z = Math.PI;
					torre2.position.set(posCol,-133,0);
					scene.add( torre2 );
					piezasAmarillas.push(torre2);
					MatrixTablero[0][7]=({id: torre2.id, color: "Amarillo", tipo: "Torre", carnada: 0});
					
					posCol=-48;
					//Torres Moradas
					torre3 = new THREE.Mesh( geometry, material2 );
					torre3.position.set(posCol,133,0);
					scene.add( torre3 );
					posCol=posCol+280;
					piezasMoradas.push(torre3);
					MatrixTablero[7][0]=({id: torre3.id, color: "Morado", tipo: "Torre", carnada: 0});

					torre4 = new THREE.Mesh( geometry, material2 );
					torre4.position.set(posCol,133,0);
					scene.add( torre4 );
					piezasMoradas.push(torre4);
					MatrixTablero[7][7]=({id: torre4.id, color: "Morado", tipo: "Torre", carnada: 0});
				} );
				
				//Alfiles
                var loader = new STLLoader();
                loader.load( './Recursos/Figures/Bishop.stl', function ( geometry ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					var material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-116;
					//Alfiles Amarillos
                    alfil1 = new THREE.Mesh( geometry, material );
					alfil1.rotation.z = Math.PI;
					alfil1.position.set(posCol,-133,0);
					scene.add( alfil1 );
					posCol=posCol+120;
					piezasAmarillas.push(alfil1);
					MatrixTablero[0][2]=({id: alfil1.id, color: "Amarillo", tipo: "Alfil", carnada: 0});
					alfil2 = new THREE.Mesh( geometry, material );
					alfil2.rotation.z = Math.PI;
					alfil2.position.set(posCol,-133,0);
					scene.add( alfil2 );
					posCol=-5;
					piezasAmarillas.push(alfil2);
					MatrixTablero[0][5]=({id: alfil2.id, color: "Amarillo", tipo: "Alfil", carnada: 0});
					//Alfiles Morados
					alfil3 = new THREE.Mesh( geometry, material2 );
					alfil3.position.set(posCol,133,0);
					scene.add( alfil3 );
					posCol=posCol+120;
					piezasMoradas.push(alfil3);
					MatrixTablero[7][2]=({id: alfil3.id, color: "Morado", tipo: "Alfil", carnada: 0});

					alfil4 = new THREE.Mesh( geometry, material2 );
					alfil4.position.set(posCol,133,0);
					scene.add( alfil4 );
					piezasMoradas.push(alfil4);
					MatrixTablero[7][5]=({id: alfil4.id, color: "Morado", tipo: "Alfil", carnada: 0});
				} );
				
				//Caballos
                var loader = new STLLoader();
                loader.load( './Recursos/Figures/Knight.stl', function ( geometry ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					var material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-124;
					//Caballos Amarillos
                    caballo1 = new THREE.Mesh( geometry, material );
					caballo1.rotation.z = Math.PI;
					caballo1.position.set(posCol,-133,0);
					scene.add( caballo1 );
					posCol=posCol+200;
					piezasAmarillas.push(caballo1);
					MatrixTablero[0][1]=({id:  caballo1.id, color: "Amarillo", tipo: "Caballo", carnada: 0});

					caballo2 = new THREE.Mesh( geometry, material );
					caballo2.rotation.z = Math.PI;
					caballo2.position.set(posCol,-133,0);
					scene.add( caballo2 );
					piezasAmarillas.push(caballo2);
					MatrixTablero[0][6]=({id:  caballo2.id, color: "Amarillo", tipo: "Caballo", carnada: 0});

					posCol=-74;
					//Caballos Morados
					caballo3 = new THREE.Mesh( geometry, material2 );
					caballo3.position.set(posCol,133,0);
					scene.add( caballo3 );
					posCol=posCol+200;
					piezasMoradas.push(caballo3);
					MatrixTablero[7][1]=({id: caballo3.id, color: "Morado", tipo: "Caballo", carnada: 0});

					caballo4 = new THREE.Mesh( geometry, material2 );
					caballo4.position.set(posCol,133,0);
					scene.add( caballo4 );
					piezasMoradas.push(caballo4);
					MatrixTablero[7][6]=({id: caballo4.id, color: "Morado", tipo: "Caballo", carnada: 0});
				} );
				
				//Reinas
                var loader = new STLLoader();
                loader.load( './Recursos/Figures/Queen.stl', function ( geometry ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					var material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-144;
					//Reina Amarilla
                    reina1 = new THREE.Mesh( geometry, material );
					reina1.rotation.z = Math.PI;
					reina1.position.set(posCol,-133,0);
					scene.add( reina1 );
					posCol=posCol+200;
					piezasAmarillas.push(reina1);
					posCol=107;
					MatrixTablero[0][3]=({id:  reina1.id, color: "Amarillo", tipo: "Reina", carnada: 0});
					
					//Reina Morada
					reina2 = new THREE.Mesh( geometry, material2 );
					reina2.position.set(posCol,133,0);
					scene.add( reina2 );
					piezasMoradas.push(reina2);
					MatrixTablero[7][3]=({id: reina2.id, color: "Morado", tipo: "Reina", carnada: 0});
				} );


				//Reyes
				var loader = new STLLoader();
				loader.load( './Recursos/Figures/King.stl', function ( geometry ) {
					
					var material = new THREE.MeshPhongMaterial( { color: 0xf5e050 } );
					var material2 = new THREE.MeshPhongMaterial( { color: 0x987BD2 } );
					var posCol=-138;
					//Rey Amarillo
					rey1 = new THREE.Mesh( geometry, material );
					rey1.rotation.z = Math.PI;
					rey1.position.set(posCol,-133,0);
					scene.add( rey1 );
					posCol=posCol+200;
					piezasAmarillas.push(rey1);
					MatrixTablero[0][4]=({id: rey1.id, color: "Amarillo", tipo: "Rey", carnada: 0});

					posCol=182;
					//Rey Morado
					rey2 = new THREE.Mesh( geometry, material2 );
					rey2.position.set(posCol,133,0);
					scene.add( rey2 );
					piezasMoradas.push(rey2);
					MatrixTablero[7][4]=({id: rey2.id, color: "Morado", tipo: "Rey", carnada: 0});
				} );
				
	var boxGeo = new THREE.BoxGeometry( 800, 800, 800);
			
	cubeMaterials = 
	[
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx3.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx2.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx4.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posy.jpeg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posz.jpeg"), side: THREE.DoubleSide }  
		)
	];
	
	var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
	ExteriorCube = new THREE.Mesh( boxGeo, cubeMaterial );
	ExteriorCube.position.set(0,0,380);
	scene.add(ExteriorCube);

    //Tablero
    var textureChess = new THREE.TextureLoader().load( "./Recursos/Chess.jpg" );
    material = new THREE.MeshBasicMaterial( { map: textureChess} );
    var tableros=new THREE.BoxGeometry(320,320,20);
    tablero = new THREE.Mesh( tableros, material );
	tablero.position.set(0,0,-10);
	scene.add( tablero );  
	window.addEventListener( 'resize', onWindowResize, false );

}

function dragStartCallback(event) {
	controls.enabled=false;
	selectedbef = {id: SelectedBefore.id, position: {x: SelectedBefore.position.x, y: SelectedBefore.position.y, z:SelectedBefore.position.z}};
	if(jaqueMateReyAmarillo==true || jaqueMateReyMorado==true){
		controls.enabled=true;
	}
}

function dragCallback(event) {
	event.object.position.z = 0; 
}
function dragendCallbackA(event) {
	valid=false;
	VerifyMove(event.object);
	if(controls2.enabled==true && valid==true && jaqueMateReyAmarillo==false && jaqueMateReyMorado==false){
		 Yant=Math.round(camera.position.y);
		 YChange=Yant;
		 radius=Math.abs(YChange);
		 turn=turn*-1;
		 controls.enabled=true;
		 controls2.enabled=false;
		 isPlay=false;
		 jaque(MatrixTablero,"Morado",posRowM,posColM);
		}
		if(jaqueMateReyAmarillo==true || jaqueMateReyMorado==true){
			controls.enabled=true;
		}
}

function dragendCallbackM(event) {
	valid=false;
	VerifyMove(event.object);
	if(controls3.enabled==true && valid==true && jaqueMateReyAmarillo==false && jaqueMateReyMorado==false){
		 Yant=Math.round(camera.position.y);
		 YChange=Yant;
		 radius=Math.abs(YChange);
		 turn=turn*-1;
		 controls.enabled=true;
		 controls3.enabled=false;
		 isPlay=false;
		 countTurn++;
		 jaque(MatrixTablero,"Amarillo",posRowA,posColA);

		}
		if(jaqueMateReyAmarillo==true || jaqueMateReyMorado==true){
			controls.enabled=true;
		}
}

function animate() {
		requestAnimationFrame(animate);
		if (isPlay) {
			theta=0;
			render();
		}
		else{
			if(turn==-1){
				render2();
				controls3.enabled=true;
			}
			if(turn==1){
				render3();
				controls2.enabled=true;
			}
		}
		controls.update();
}
	
function render() {
		renderer.render(scene, camera);
	}

function render2() {

			var cont=10;
			camera.position.y=Yant;
			camera.position.x=Xant;
			var pos2=camera.position.y+cont*turn*-1;
			if(Math.abs(pos2)>Math.abs(YChange)){
				camera.position.y=YChange*turn;
				Yant=YChange*turn;
				isPlay=true;
			}
			else{
			camera.position.y=pos2;
			Yant=pos2;
			}

			camera.position.x = Math.sqrt((Math.pow(radius,2))-(Math.pow(camera.position.y,2)));
			Xant=camera.position.x;
			renderer.render(scene, camera);
			
	}

function render3() {
		var cont=10;
		camera.position.y=Yant;
		camera.position.x=Xant;
		var pos2=camera.position.y+cont*turn*-1;
		if(Math.abs(pos2)>Math.abs(YChange)){
			camera.position.y=YChange*-1;
			Yant=YChange**-1;
			isPlay=true;
		}
		else{
		camera.position.y=pos2;
		Yant=pos2;
		}

		camera.position.x = Math.sqrt((Math.pow(radius,2))-(Math.pow(camera.position.y,2)));
		Xant=camera.position.x;
		renderer.render(scene, camera);
		
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//secuencia para cada movimiento
function VerifyMove(figure){
		if(figure.id!=selectedbef.id){
			resetFigure(figure);
		}
		else{
			enroque=false;
			FigureType(figure);
			diferntials(figure);
			verifyNewPosition(figure);
			if(enroque==false){
			VerifyMovetype(figure);
			findObject(figure);
			upDateTable(figure);
			centerFigure(figure);
			}
		}
		imprimirMatrizTablero(MatrixTablero);
		
}

function VerifyMovetype(figure){
	obstaculo=false;
	if(tipo=="Peon"){
		if(difX<2 && difX>-2){
			if(turn==1){
				if(difY!=1){
					if(row==1 && difY==2 && vacia==true){
						moververtical(figure);
					}
					else{
						resetFigure(figure);
					}
				}
				else{
					if((vacia==false && difX==0) || (vacia==true && difX!=0)){
						if(vacia==true && (difX==1||difX==-1)){
							if(((difX==1 && MatrixTablero[row][column+1].carnada==1) || (difX==-1 && MatrixTablero[row][column-1].carnada==1)) && ppm==true){
							
							}
							else{
								resetFigure(figure);
							}
						}
						else{
						resetFigure(figure);
						}
					}
					else{
						if(difX==0){
							moververtical(figure);
						}
					}
				}
			}
			else{
				if(difY!=-1){
					if(row==6 && difY==-2 && vacia==true){
						moververtical(figure);
					}
					else{
						resetFigure(figure);
					}
				}
				else{
					if((vacia==false && difX==0) || (vacia==true && difX!=0)){
						if(vacia==true && (difX==1||difX==-1)){
							if(((difX==1 && MatrixTablero[row][column+1].carnada==1) || (difX==-1 && MatrixTablero[row][column-1].carnada==1)) && ppa==true){
							}
							else{
								resetFigure(figure);
							}
						}
						else{
						resetFigure(figure);
						}
					}
					else{
						if(difX==0){
							moververtical(figure);
						}
					}
				}
			}
		}
		else{
			resetFigure(figure);
		}
		
	}
	if(tipo=="Torre"){
		if(difX!=0 && difY!=0){
			resetFigure(figure);
		}
		else{
			if(difX!=0){
				moverHorizontal();
			}
			else{
				if(difY!=0){
					moververtical();
				}
			}
		}
	}
	if(tipo=="Alfil"){
		if(Math.abs(difX)!=Math.abs(difY)){
			resetFigure(figure);
		}
		else{
			moverDiagonal();
		}
	}
	if(tipo=="Caballo"){
		obstaculo=false;
		if(!((Math.abs(difX)==2 && Math.abs(difY)==1) || (Math.abs(difY)==2 && Math.abs(difX)==1))){
			resetFigure(figure);
		}
	}
	if(tipo=="Rey"){
		if(Math.abs(difX)>1 || Math.abs(difY)>1){
			resetFigure(figure);
		}
	}
	if(tipo=="Reina"){
		if(difX!=0 && difY!=0){
			if(Math.abs(difX)!=Math.abs(difY)){
				resetFigure(figure);
			}
			else{
				moverDiagonal();
			}
		}
		else{
			if(difX!=0){
				moverHorizontal();
			}
			else{
				if(difY!=0){
					moververtical();
				}
			}
		}
	}
}

function resetFigure(figure){	
	figure.position.x=selectedbef.position.x;
	figure.position.y=selectedbef.position.y;
	figure.position.z=selectedbef.position.z;
	valid=false;
}

function FigureType(figure){
	var i=0;
	var j=0;
	
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			if(MatrixTablero[i][j]!=0 && MatrixTablero[i][j].id==figure.id ){
				row=i;
				column=j;
				i=8;
				j=8;
				}
		}
	}


	if(figure.id>=17 && figure.id<=24){
		if(figure.position.x<-140 || figure.position.x>155 || figure.position.y<-140 || figure.position.y>155){
			resetFigure(figure);
		}
		else{
		color="Amarillo";
		tipo=MatrixTablero[row][column].tipo;
		valid=true;
		}
	}
	
	if(figure.id==45 || figure.id==46){
	
		if(figure.position.x<-240 || figure.position.x>61 || figure.position.y<-141 || figure.position.y>156){
			resetFigure(figure);
		}
		else{
		color="Amarillo";
		tipo=MatrixTablero[row][column].tipo;
		valid=true;
		}
	}

	if(figure.id==39 || figure.id==40){
		if(figure.position.x>94 || figure.position.x<-207 || figure.position.y<-138 || figure.position.y>159){
			resetFigure(figure)
		}else{
			color="Amarillo"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==33 || figure.id==34){
		if(figure.position.x>126 || figure.position.x<-180 || figure.position.y<-141 || figure.position.y>160){
			resetFigure(figure)
		}else{
			color="Amarillo"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==37){
		if(figure.position.x>27 || figure.position.x<-277 || figure.position.y<-144 || figure.position.y>160){
			resetFigure(figure)
		}else{
			color="Amarillo"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==43){
		if(figure.position.x>-5 || figure.position.x<-312 || figure.position.y<-141 || figure.position.y>160){
			resetFigure(figure)
		}else{
			color="Amarillo"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}
//--------------------Oye ve!! los MORAOOOOO-----------------------------------------
	if(figure.id>=25 && figure.id<=32){
		if(figure.position.x>140 || figure.position.x<-157 || figure.position.y>140 || figure.position.y<-150){
			resetFigure(figure);
		}
		else{
		color="Morado";
		tipo=MatrixTablero[row][column].tipo;
		valid=true;
		}
	}

	if(figure.id==48 || figure.id==47){
	
		if(figure.position.x>240 || figure.position.x<-55 || figure.position.y>140 || figure.position.y<-155){
			resetFigure(figure);
		}
		else{
		color="Morado";
		tipo=MatrixTablero[row][column].tipo;
		valid=true;
		}
	}

	if(figure.id==42 || figure.id==41){
		if(figure.position.x<-90 || figure.position.x>206 || figure.position.y>140 || figure.position.y<-163){
			resetFigure(figure)
		}else{
			color="Morado"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==36 || figure.id==35){
		if(figure.position.x<-125 || figure.position.x>178 || figure.position.y>142 || figure.position.y<-155){
			resetFigure(figure)
		}else{
			color="Morado"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==38){
		if(figure.position.x<-30 || figure.position.x>278 || figure.position.y>142 || figure.position.y<-156){
			resetFigure(figure)
		}else{
			color="Morado"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}

	if(figure.id==44){
		if(figure.position.x<5 || figure.position.x>310 || figure.position.y>141 || figure.position.y<-155){
			resetFigure(figure)
		}else{
			color="Morado"
			tipo=MatrixTablero[row][column].tipo;
			valid=true
		}
	}
}

function diferntials(figure){
	difX=(figure.position.x-selectedbef.position.x)/40;
	difY=(figure.position.y-selectedbef.position.y)/40;
	difX=Math.round(difX);
	difY=Math.round(difY);
}

function centerFigure(figure){
	if(figure.position.x==selectedbef.position.x && figure.position.y==selectedbef.position.y){
		figure.position.x=selectedbef.position.x;
		figure.position.y=selectedbef.position.y;
	}
	else{
	figure.position.x=selectedbef.position.x+difX*40;
	figure.position.y=selectedbef.position.y+difY*40;
	}
}

function matrix(m, n) {
    var result = []
    for(var i = 0; i < n; i++) {
        result.push(new Array(m).fill(0))
    }
    return result
}

function verifyNewPosition(figure){
		if(MatrixTablero[row+difY][column+difX]!=0){
			if(MatrixTablero[row+difY][column+difX].color==color){
				if(color=="Amarillo" ){
					if(enorqueLargoAmarillo==true                                                              && 
					  ((MatrixTablero[row][column].id==45    && MatrixTablero[row+difY][column+difX].id==43)   || 
					   (MatrixTablero[row][column].id==43    && MatrixTablero[row+difY][column+difX].id==45))  
					   ){
							if(MatrixTablero[row][column].id==45 && MatrixTablero[row][column+1]==0            && 
							   MatrixTablero[row][column+2]==0   && MatrixTablero[row][column+3]==0){
								enroque=true;
								FenorqueLargoAmarillo(figure);
							}
							else{
								if(MatrixTablero[row][column].id==43 &&  MatrixTablero[row][column-1]==0        && 
									MatrixTablero[row][column-2]==0   && MatrixTablero[row][column-3]==0){
										enroque=true;
										FenorqueLargoAmarillo(figure);
								 }
								 else{
								    resetFigure(figure);
									vacia=false;	
								 }
							}
						}
					else{
						if(enorqueCortoAmarillo==true                                                                && 
							((MatrixTablero[row][column].id==46    && MatrixTablero[row+difY][column+difX].id==43)   || 
							 (MatrixTablero[row][column].id==43    && MatrixTablero[row+difY][column+difX].id==46))  
							 ){
								  if(MatrixTablero[row][column].id==46 && MatrixTablero[row][column-1]==0            && 
									 MatrixTablero[row][column-2]==0){
										enroque=true;
										FenorqueCortoAmarillo(figure);
								  }
								  else{
									  if(MatrixTablero[row][column].id==43 &&  MatrixTablero[row][column+1]==0        && 
										  MatrixTablero[row][column+2]==0){
										 enroque=true;
										 FenorqueCortoAmarillo(figure);
									   }
									   else{
										  resetFigure(figure);
										  vacia=false;	
									   }
								  }
							  }
							  else{
								resetFigure(figure);
								vacia=false;	
							  }
					}
				}
				else{
					if(enorqueLargoMorado==true                                                              && 
						((MatrixTablero[row][column].id==47    && MatrixTablero[row+difY][column+difX].id==44)   || 
						 (MatrixTablero[row][column].id==44    && MatrixTablero[row+difY][column+difX].id==47))  
						 ){
							  if(MatrixTablero[row][column].id==47 && MatrixTablero[row][column+1]==0            && 
								 MatrixTablero[row][column+2]==0   && MatrixTablero[row][column+3]==0){
									enroque=true;
									FenorqueLargoMorado(figure);
							  }
							  else{
								  if(MatrixTablero[row][column].id==44 &&  MatrixTablero[row][column-1]==0        && 
									  MatrixTablero[row][column-2]==0   && MatrixTablero[row][column-3]==0){
										enroque=true;
										FenorqueLargoMorado(figure);
								   }
								   else{
									  resetFigure(figure);
									  vacia=false;	
								   }
							  }
						  }
					  else{
						  if(enorqueCortoMorado==true                                                                && 
							  ((MatrixTablero[row][column].id==48    && MatrixTablero[row+difY][column+difX].id==44)   || 
							   (MatrixTablero[row][column].id==44    && MatrixTablero[row+difY][column+difX].id==48))  
							   ){
									if(MatrixTablero[row][column].id==48 && MatrixTablero[row][column-1]==0            && 
									   MatrixTablero[row][column-2]==0){
										enroque=true;
										FenorqueCortoMorado(figure);
									}
									else{
										if(MatrixTablero[row][column].id==44 &&  MatrixTablero[row][column+1]==0        && 
											MatrixTablero[row][column+2]==0){
											enroque=true;
											FenorqueCortoMorado(figure);
										 }
										 else{
											resetFigure(figure);
											vacia=false;	
										 }
									}
								}
								else{
								  resetFigure(figure);
								  vacia=false;	
								}
					  }
				}
			}
			else{
				vacia=false;
			}
		}
		else{
			vacia=true;
		}
}

function moverHorizontal(figure){
	obstaculo=false;
	var j;
	var sign=difX/Math.abs(difX);
	if(sign==1){
		for(j=column+1;j<column+difX;j++){
			if(MatrixTablero[row][j]!=0){
				obstaculo=true;
			}
			}
		}
	else{
		for(j=column-1;j>column+difX;j--){
			if(MatrixTablero[row][j]!=0){
				obstaculo=true;
			}
		}
	}
}

function moververtical(figure){
	obstaculo=false;
	var i;
	var signo=difY/Math.abs(difY);
	if(signo==1){
		for(i=row+1;i<row+difY;i++){
			if(MatrixTablero[i][column]!=0){
				obstaculo=true;
			}
		}
	}else{
		for(i=row-1;i>row+difY;i--){
			if(MatrixTablero[i][column]!=0){
				obstaculo=true;
			}
		}
	}
}

function moverDiagonal(figure){
	obstaculo=false;
	var i;
	var j;
	var sign=difX/Math.abs(difX);
	var sign2=difY/Math.abs(difY);
	if(sign==1){
			i=row+1*sign2;
			for(j=column+1;j<column+difX;j++){
					if(MatrixTablero[i][j]!=0){
						obstaculo=true;
					}
					i=i+1*sign2;
			}
	}
	else{
		i=row+1*sign2;
		for(j=column-1;j>column+difX;j--){
			if(MatrixTablero[i][j]!=0){
				obstaculo=true;
			}
			i=i+1*sign2;
		}
	}
}

function upDateTable(figure){
	if(countTurn==1){
		Start.style.display = "none";
	}
	if(!(figure.position.x==selectedbef.position.x && figure.position.y==selectedbef.position.y) && obstaculo==false){
				var bef;
				var comida=MatrixTablero[row+difY][column+difX];
				carnada=MatrixTablero[row][column].carnada;
				MatrixTablero[row+difY][column+difX]={id: figure.id, color: color, tipo: tipo, carnada: carnada};
				bef=MatrixTablero[row][column];
				MatrixTablero[row][column]=0;
				if(tipo=="Rey" && color=="Amarillo"){
					posRowA=row+difY;
					posColA=column+difX;
				}
				if(tipo=="Rey" && color=="Morado"){
					posRowM=row+difY;
					posColM=column+difX;
				}
				if(turn==1){
						jaque(MatrixTablero,"Amarillo",posRowA,posColA);
						if(jaqueReyAmarillo==true){	
							MatrixTablero[row][column]=bef;
							MatrixTablero[row+difY][column+difX]=comida;
							if(tipo=="Rey"){
								posRowA=row;
								posColA=column;
							}
							resetFigure(figure);
							jaqueMate("Amarillo");
						}
						else{
							jaque(MatrixTablero,"Morado",posRowM,posColM);
							if(jaqueReyMorado==true){
							rey2.material=materialjaque;
							jaqueMate("Morado");
							}
							if(vacia==false){
								getRemovedObject();
								document.body.appendChild(water);
							}
						
							resetCarnada("Amarillo");
							if(MatrixTablero[row+difY][column+difX].tipo=="Peon"&& row==1 && difY==2){
								MatrixTablero[row+difY][column+difX].carnada=1;
								ppa=true;
							}
							if(column+1>=0 && column+1<8 && column-1>=0 && column-1<8 &&
								((MatrixTablero[row][column+1].carnada==1 && MatrixTablero[row][column+1].color!=color)  || 
							    (MatrixTablero[row][column-1].carnada==1 && MatrixTablero[row][column-1].color!=color)) && ppm==true){
									findObject2((column+difX),row);
									getRemovedObject();
									document.body.appendChild(water);
								}
								if(tipo=="Peon" && (((row+difY)==7) || ((row+difY)==0))){
								UpgradePeon(figure);}
						
						}
						if(jaqueReyAmarillo==false){
							rey1.material=material;
							}
					}
					else{
						jaque(MatrixTablero,"Morado",posRowM,posColM);
						if(jaqueReyMorado==true){
							MatrixTablero[row][column]=bef;
							MatrixTablero[row+difY][column+difX]=comida;
							if(tipo=="Rey"){
								posRowM=row;
								posColM=column;
							}
							resetFigure(figure);
							jaqueMate("Morado");
						}
						else{
							jaque(MatrixTablero,"Amarillo",posRowA,posColA);
							if(jaqueReyAmarillo==true){
								rey1.material=materialjaque;
								jaqueMate("Amarillo");
							}
							
							if(vacia==false){
								getRemovedObject();
								document.body.appendChild(water);
							}
							
							resetCarnada("Morado");
							if(MatrixTablero[row+difY][column+difX].tipo=="Peon"&& row==6 && difY==-2){
								MatrixTablero[row+difY][column+difX].carnada=1;
								ppm=true;
							}
							if(column+1>=0 && column+1<8 && column-1>=0 && column-1<8 &&
								((difX==1 && MatrixTablero[row][column+1].carnada==1) || (difX==-1 && MatrixTablero[row][column-1].carnada==1)) && ppa==true){
								if(((MatrixTablero[row][column+1].carnada==1 && MatrixTablero[row][column+1].color!=color)  || 
							    (MatrixTablero[row][column-1].carnada==1 && MatrixTablero[row][column-1].color!=color)) && ppa==true){
									findObject2((column+difX),row);
									getRemovedObject();
									document.body.appendChild(water);
								}
							}
							if( tipo=="Peon" && (((row+difY)==7) || ((row+difY)==0)) ){
								UpgradePeon(figure);}
						
						}
						if(jaqueReyMorado==false){
							rey2.material=material2;
							}
					}
		if(figure.id==45){
			enorqueLargoAmarillo=false;
		}
		if(figure.id==46){
			enorqueCortoAmarillo=false;
		}
		if(figure.id==47){
			enorqueLargoMorado=false;
		}
		if(figure.id==48){
			enorqueCortoMorado=false;
		}
		if(figure.id==44){
			enorqueLargoMorado=false;
			enorqueCortoMorado=false;
		}
		if(figure.id==43){
			enorqueLargoAmarillo=false;
			enorqueCortoAmarillo=false;
		}
		if(turn==-1 && countTurn==condicionTablas){
			jaqueMateReyAmarillo=true;
			jaqueMateReyMorado=true;
			Tablas();
		}
	
	}
	else{
		if(obstaculo==true){
			resetFigure(figure);
		}
	}

}

function resetCarnada(color){
	var i,j;
		for(i=0;i<8;i++){
			for(j=0;j<8;j++){
				if(MatrixTablero[i][j]!=0){
					if(MatrixTablero[i][j].color==color){
							MatrixTablero[i][j].carnada=0;
						}
				}
		}
	}
	if(color=="Amarillo"){
		ppa=false;
	}
	else{
		ppm=false;
	}
}

function findObject(figure){
	var i;
	if(MatrixTablero[row+difY][column+difX].color=="Amarillo"){
		for(i=0;i<piezasAmarillas.length;i++){
			if(piezasAmarillas[i].id==MatrixTablero[row+difY][column+difX].id){
				objectRemove={id: i, color: "Amarillo", tipo: MatrixTablero[row+difY][column+difX].tipo, posRow: row+difY, posCol: column+difX, carnada: MatrixTablero[row+difY][column+difX].carnada};
				if(objectRemove.tipo=="Rey"){
					resetFigure(figure);
				}
			}
		}
	}
	else{
		for(i=0;i<piezasMoradas.length;i++){
			if(piezasMoradas[i].id==MatrixTablero[row+difY][column+difX].id){
				objectRemove={id: i, color: "Morado", tipo: MatrixTablero[row+difY][column+difX].tipo, posRow: row+difY, posCol: column+difX, carnada: MatrixTablero[row+difY][column+difX].carnada};
				if(objectRemove.tipo=="Rey"){
					resetFigure(figure);
				}
			}
		}
	}
}

function findObject2(col,ros){
	var i;
	if(MatrixTablero[ros][col].color=="Amarillo"){
		for(i=0;i<piezasAmarillas.length;i++){
			if(piezasAmarillas[i].id==MatrixTablero[ros][col].id){
				objectRemove={id: i, color: "Amarillo", tipo: MatrixTablero[ros][col].tipo, posRow: ros, posCol: col, carnada: MatrixTablero[ros][col].carnada};
				}
		}
	}
	else{
		for(i=0;i<piezasMoradas.length;i++){
			if(piezasMoradas[i].id==MatrixTablero[ros][col].id){
				objectRemove={id: i, color: "Morado", tipo: MatrixTablero[ros][col].tipo, posRow: ros, posCol: col, carnada: MatrixTablero[ros][col].carnada};
			}
		}
	}
}
function getRemovedObject(){
	var i=objectRemove.id;
	var colu=objectRemove.posCol;
	var roww=objectRemove.posRow;
	var margin=10;
	if(objectRemove.color=="Amarillo"){
				var cn=1;
				var cr=comidasAmarillas.length;
				if(comidasAmarillas.length>7){
					cn=2;
					cr=cr-8;
					if(comidasAmarillas.length==8){
						margin=margin*2;
					}
				}
				var moveH=-colu-cn;
				var moveV=-roww+cr;
				piezasAmarillas[i].position.x=piezasAmarillas[i].position.x+40*moveH-margin;
				piezasAmarillas[i].position.y=piezasAmarillas[i].position.y+40*moveV;
				comidasAmarillas.push(piezasAmarillas[i]);
				piezasAmarillas.splice(i, 1);  
				controls2.setObjects(piezasAmarillas);
	}
	else{
				var cn=1;
				var cr=comidasMoradas.length;
				if(comidasMoradas.length>7){
					cn=2;
					cr=cr-8;
					if(comidasMoradas.length==8){
						margin=margin*2;
					}
				}
				var moveH=(7-colu)+cn;
				var moveV=(7-roww)-cr;
				piezasMoradas[i].position.x=piezasMoradas[i].position.x+40*moveH+margin;
				piezasMoradas[i].position.y=piezasMoradas[i].position.y+40*moveV;
				comidasMoradas.push(piezasMoradas[i]);
				piezasMoradas.splice(i, 1);  
				controls3.setObjects(piezasMoradas);
	}
}

function FenorqueLargoAmarillo(figure){
	if(jaqueReyAmarillo==false && jaqueReyMorado==false){
		MatrixTablero[0][2]=MatrixTablero[0][4];
		MatrixTablero[0][3]=MatrixTablero[0][0];
		MatrixTablero[0][0]=0;
		MatrixTablero[0][4]=0;
		posRowA=0;
		posColA=2;
		resetFigure(figure);
		var i;
			for(i=0;i<piezasAmarillas.length;i++){
				if(piezasAmarillas[i].id==45){
					piezasAmarillas[i].position.x=piezasAmarillas[i].position.x+120;
				}
				if(piezasAmarillas[i].id==43){
					piezasAmarillas[i].position.x=piezasAmarillas[i].position.x-80;
				}
			}
		valid=true;
		enorqueLargoAmarillo=false;
		enorqueCortoAmarillo=false;
	}
	else{
		resetFigure(figure);
	}
}

function FenorqueLargoMorado(figure){
	if(jaqueReyAmarillo==false && jaqueReyMorado==false){
	MatrixTablero[7][2]=MatrixTablero[7][4];
	MatrixTablero[7][3]=MatrixTablero[7][0];
	MatrixTablero[7][0]=0;
	MatrixTablero[7][4]=0;
	posRowM=7;
	posColM=2;
	resetFigure(figure);
	var i;
		for(i=0;i<piezasMoradas.length;i++){
			if(piezasMoradas[i].id==47){
				piezasMoradas[i].position.x=piezasMoradas[i].position.x+120;
			}
			if(piezasMoradas[i].id==44){
				piezasMoradas[i].position.x=piezasMoradas[i].position.x-80;
			}
		}
		valid=true;
		enorqueLargoMorado=false;
		enorqueCortoMorado=false;
	}
	else{
		resetFigure(figure);
	}
}


function FenorqueCortoAmarillo(figure){
	if(jaqueReyAmarillo==false && jaqueReyMorado==false){
	MatrixTablero[0][5]=MatrixTablero[0][7];
	MatrixTablero[0][6]=MatrixTablero[0][4];
	MatrixTablero[0][7]=0;
	MatrixTablero[0][4]=0;
	posRowA=0;
	posColA=6;
	resetFigure(figure);
	var i;
		for(i=0;i<piezasAmarillas.length;i++){
			if(piezasAmarillas[i].id==43){
				piezasAmarillas[i].position.x=piezasAmarillas[i].position.x+80;
			}
			if(piezasAmarillas[i].id==46){
				piezasAmarillas[i].position.x=piezasAmarillas[i].position.x-80;
			}
		}
		valid=true;
		enorqueLargoAmarillo=false;
		enorqueCortoAmarillo=false;
	}
	else{
		resetFigure(figure);
	}
}

function FenorqueCortoMorado(figure){
	if(jaqueReyAmarillo==false && jaqueReyMorado==false){
	MatrixTablero[7][5]=MatrixTablero[7][7];
	MatrixTablero[7][6]=MatrixTablero[7][4];
	MatrixTablero[7][7]=0;
	MatrixTablero[7][4]=0;
	posRowM=7;
	posColM=6;
	resetFigure(figure);
	var i;
		for(i=0;i<piezasMoradas.length;i++){
			if(piezasMoradas[i].id==44){
				piezasMoradas[i].position.x=piezasMoradas[i].position.x+80;
			}
			if(piezasMoradas[i].id==48){
				piezasMoradas[i].position.x=piezasMoradas[i].position.x-80;
			}
		}
		valid=true;
		enorqueLargoMorado=false;
		enorqueCortoMorado=false;
	}
	else{
		resetFigure(figure);
	}
}

function imprimirMatrizTablero(Matrix){
	var i,j,k;
	for(i=Matrix.length-1; i>=0;i--){
		var length=15;
		console.log(" |-----------------------------------------------------------------------------------------------------------------------|");
		var  string=" |";
		for(j=0;j<Matrix[0].length;j++){
			var mostrar;
			if(MatrixTablero[i][j]!=0){
				if(MatrixTablero[i][j].color=="Amarillo"){
					mostrar=MatrixTablero[i][j].tipo+" A";
				}
				else{
					mostrar=MatrixTablero[i][j].tipo+"  M";
				}
			}
			else{
				mostrar="0";
			}
			var spaces=length-mostrar.length;
			if(spaces%2!=0){
				spaces=spaces-1;
			}
			for(k=0;k<length-mostrar.length;k++){
				if(k==spaces/2){
					string=string+mostrar;
				}
				else{
					string=string+" ";
				}
				}
			string=string+"|";
		}
		console.log(string);
	}
	console.log(" |-----------------------------------------------------------------------------------------------------------------------|");
	console.log("***************************************************************************************************************************");
}

function jaque(matrix,colors,rowPosition,colPosition){
	var i=1;
	var cols=colPosition;
	var ros=rowPosition;
	var continues=true;
	if(colors=="Amarillo"){
		jaqueReyAmarillo=false;
	}
	else{
		jaqueReyMorado=false;
	}

	// VERTICALES Y HORIZONTALES 

	//--------------------------------------------------------------------------------------------------------
	//Jaque Vertical Hacia Arriba
	if(continues){
		while(ros+i<matrix.length && matrix[ros+i][cols]==0 ){
			i++;
		}
		if(ros+i<matrix.length && matrix[ros+i][cols].color!=colors){
			if(matrix[ros+i][cols].tipo=="Torre" || matrix[ros+i][cols].tipo=="Reina" || (matrix[ros+i][cols].tipo=="Rey" && i==1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Vertical Amarillo Arriba");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Vertical Morado Abajo");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	
	//Jaque Vertical Hacia Abajo
	if(continues){
		i=-1;
		while(ros+i>=0 && matrix[ros+i][cols]==0 ){
			i--;
		}
		if(ros+i>=0 && matrix[ros+i][cols].color!=colors){
			if(matrix[ros+i][cols].tipo=="Torre" || matrix[ros+i][cols].tipo=="Reina" || (matrix[ros+i][cols].tipo=="Rey" && i==-1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Vertical Amarillo Abajo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Vertical Morado Arriba");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
					}
			}
			
		}
	}
	
	//Jaque Horizontal
	if(continues){
		i=1;
		while(cols+i<matrix.length && matrix[ros][cols+i]==0 ){
			i++;
		}
		if(cols+i<matrix.length && matrix[ros][cols+i].color!=colors){
			if(matrix[ros][cols+i].tipo=="Torre" || matrix[ros][cols+i].tipo=="Reina" || (matrix[ros][cols+i].tipo=="Rey" && i==1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Horizontal Amarillo Derecha");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Horizontal Morado Izqueirda");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
					}
			}
			
		}
	}
	//Jaque Horizontal Hacia La Izquierda
	if(continues){
		i=-1;
		while(cols+i>=0 && matrix[ros][cols+i]==0 ){
			i--;
		}
		if(cols+i>=0 && matrix[ros][cols+i].color!=colors){
			if(matrix[ros][cols+i].tipo=="Torre" || matrix[ros][cols+i].tipo=="Reina" || (matrix[ros][cols+i].tipo=="Rey" && i==-1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Horizontal Amarillo Izquierda");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Horizontal Morado Derecha");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
					}
			}
			
		}
	}


   	// DIAGONALES

	//--------------------------------------------------------------------------------------------------------
	//Jaque Arriba-Derecha
	if(continues){
		i=1;
		while(ros+i>=0 && cols+i>=0 && ros+i<matrix.length && cols+i<matrix.length && matrix[ros+i][cols+i]==0 ){
			i++;
		}
		if(ros+i>=0 && cols+i>=0 && ros+i<matrix.length && cols+i<matrix.length && matrix[ros+i][cols+i].color!=colors){
			if(matrix[ros+i][cols+i].tipo=="Alfil" || matrix[ros+i][cols+i].tipo=="Reina" || ((matrix[ros+i][cols+i].tipo=="Rey" || matrix[ros+i][cols+i].tipo=="Peon") && i==1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Arriba-Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					if(matrix[(ros+i*(1))][(cols+i*(1))].tipo!="Peon"){
					//console.log("Jaque Abajo-Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
					}
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Jaque ArribaIzquierda
	if(continues){
		i=1;
		while(ros+i*(1)>=0 && cols+i*(-1)>=0 && ros+i*(1)<matrix.length && cols+i*(-1)<matrix.length && matrix[ros+i*(1)][cols+i*(-1)]==0 ){
			i++;
		}
		if(ros+i*(1)>=0 && cols+i*(-1)>=0 && ros+i*(1)<matrix.length && cols+i*(-1)<matrix.length && matrix[ros+i*(1)][cols+i*(-1)].color!=colors){
			if(matrix[ros+i*(1)][cols+i*(-1)].tipo=="Alfil" || matrix[ros+i*(1)][cols+i*(-1)].tipo=="Reina" || ((matrix[ros+i*(1)][cols+i*(-1)].tipo=="Rey" || matrix[ros+i*(1)][cols+i*(-1)].tipo=="Peon") && i==1)){
				if(colors=="Amarillo"){
					//console.log("Jaque Arriba-Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					if(matrix[(ros+i*(1))][(cols+i*(-1))].tipo!="Peon"){
					//console.log("Jaque Abajo-Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
					}
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Jaque Abajo-Izquierda
	if(continues){
		i=1;
		while(ros+i*(-1)>=0 && cols+i*(-1)>=0 && ros+i*(-1)<matrix.length && cols+i*(-1)<matrix.length && matrix[ros+i*(-1)][cols+i*(-1)]==0 ){
			i++;
		}
		if(ros+i*(-1)>=0 && cols+i*(-1)>=0 && ros+i*(-1)<matrix.length && cols+i*(-1)<matrix.length && matrix[ros+i*(-1)][cols+i*(-1)].color!=colors){
			if(matrix[ros+i*(-1)][cols+i*(-1)].tipo=="Alfil" || matrix[ros+i*(-1)][cols+i*(-1)].tipo=="Reina" || ((matrix[ros+i*(-1)][cols+i*(-1)].tipo=="Rey" || matrix[ros+i*(-1)][cols+i*(-1)].tipo=="Peon") && i==1)){
				if(colors=="Amarillo"){
					if(matrix[(ros+i*(-1))][(cols+i*(-1))]!="Peon"){
					//console.log("Jaque Abajo-Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
					}
				}
				else{
					//console.log("Jaque Arriba-Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Jaque Abajo-Derecha
	if(continues){
		i=1;
		
		while(ros+i*(-1)>=0 && cols+i*(1)>=0 && ros+i*(-1)<matrix.length && cols+i*(1)<matrix.length && matrix[ros+i*(-1)][cols+i*(1)]==0 ){
			i++;
		}
		
		if(ros+i*(-1)>=0 && cols+i*(1)>=0 && ros+i*(-1)<matrix.length && cols+i*(1)<matrix.length && matrix[ros+i*(-1)][cols+i*(1)].color!=colors){
			if(matrix[ros+i*(-1)][cols+i*(1)].tipo=="Alfil" || matrix[ros+i*(-1)][cols+i*(1)].tipo=="Reina" || ((matrix[ros+i*(-1)][cols+i*(1)].tipo=="Rey" || matrix[ros+i*(-1)][cols+i*(1)].tipo=="Peon") && i==1)){
				if(colors=="Amarillo"){
					if(matrix[(ros+i*(-1))][(cols+i*(1))].tipo!="Peon"){
					//console.log("Jaque Abajo-Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
					}
				}
				else{
					//console.log("Jaque Arriba-Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	//--------------------------------------------------------------------------------------------------------
	}

	// CABALLO

	//Caballo Subo 2 Me muevo 1 a la Derecha
	if(continues){
		if(ros+2>=0 && ros+2<matrix.length && cols+1>=0 && cols+1<matrix.length && matrix[ros+2][cols+1].color!=colors){
			if(matrix[ros+2][cols+1].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 2_Arriba-1_Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 2_Abajo-1_Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Subo 2 Me muevo 1 a la Izquierda
	if(continues){	
		if(ros+2>=0 && ros+2<matrix.length && cols-1>=0 && cols-1<matrix.length && matrix[ros+2][cols-1].color!=colors){
			if(matrix[ros+2][cols-1].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 2_Arriba-1_Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 2_Abajo-1_Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Bajo 2 Me muevo 1 a la Derecha
	if(continues){
		if(ros-2>=0 && ros-2<matrix.length && cols+1>=0 && cols+1<matrix.length && matrix[ros-2][cols+1].color!=colors){
			if(matrix[ros-2][cols+1].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 2_Abajo-1_Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 2_Arriba-1_Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Bajo 2 Me muevo 1 a la Izquierda
	if(continues){	
		if(ros-2>=0 && ros-2<matrix.length && cols-1>=0 && cols-1<matrix.length && matrix[ros-2][cols-1].color!=colors){
			if(matrix[ros-2][cols-1].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 2_Abajo-1_Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 2_Arriba-1_Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Subo 1 Me muevo 2 a la Derecha
	if(continues){
		if(ros+1>=0 && ros+1<matrix.length && cols+2>=0 && cols+2<matrix.length && matrix[ros+1][cols+2].color!=colors){
			if(matrix[ros+1][cols+2].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 1_Arriba-2_Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 1_Abajo-2_Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Subo 1 Me muevo 2 a la Izquierda
	if(continues){	
		if(ros+1>=0 && ros+1<matrix.length && cols-2>=0 && cols-2<matrix.length && matrix[ros+1][cols-2].color!=colors){
			if(matrix[ros+1][cols-2].tipo=="Caballo"){
				if(colors=="Amarillo"){
				    //console.log("Jaque Caballo 1_Arriba-2_Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 1_Abajo-2_Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Bajo 1 Me muevo 2 a la Derecha
	if(continues){
		if(ros-1>=0 && ros-1<matrix.length && cols+2>=0 && cols+2<matrix.length && matrix[ros-1][cols+2].color!=colors){
			if(matrix[ros-1][cols+2].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 1_Abajo-2_Derecha Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 1_Arriba-2_Izquierda Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//Caballo Bajo 1 Me muevo 2 a la Izquierda
	if(continues){	
		if(ros-1>=0 && ros-1<matrix.length && cols-2>=0 && cols-2<matrix.length && matrix[ros-1][cols-2].color!=colors){
			if(matrix[ros-1][cols-2].tipo=="Caballo"){
				if(colors=="Amarillo"){
					//console.log("Jaque Caballo 1_Abajo-2_Izquierda Amarillo");
					jaqueReyAmarillo=true;
					continues=false;
				}
				else{
					//console.log("Jaque Caballo 1_Abajo-2_Derecha Morado");
					jaqueReyMorado=true;
					continues=false;
				}
			}
			else{
					if(colors=="Amarillo"){
						jaqueReyAmarillo=false;
					}
					else{
						jaqueReyMorado=false;
				}
			}
			
		}
	}
	//---------------------------------------------------------------------------------------------------------------

}

function jaqueMate(colors){
	if(colors=="Amarillo"){
		jaqueMateReyAmarillo=true;
	} 
	else{
		jaqueMateReyMorado=true;
	}
	
	

	var i,j;
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			if(MatrixTablero[i][j]!=0){
				if(MatrixTablero[i][j].color==colors){
						MovimientoDisponible(MatrixTablero[i][j],i,j);
						if(colors=="Amarillo"){
							if(jaqueMateReyAmarillo==false){
								i=9;
								j=9;
							}
						}
						else{
							if(jaqueMateReyMorado==false){
								i=9;
								j=9;
							}
						}
					}
			}
		}
	}

	if(jaqueMateReyAmarillo || jaqueMateReyMorado){
		light.color.setHex( 0xff0000 );
		
		var cubeMaterials = 
		[
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posxRED.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx3RED.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx2RED.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx4RED.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posy.jpeg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posz.jpeg"), side: THREE.DoubleSide }  
		)
		];

		var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

		ExteriorCube.material = cubeMaterial;

		if(jaqueMateReyAmarillo==true){
			rey1.material=materialNegro;
			WinnerM();
		}
		if(jaqueMateReyMorado==true){
			rey2.material=materialNegro;
			WinnerA();
		}
		Revancha();
		setTimeout(dancenegga,5400);
	}
}
//iy
function MovimientoDisponible(pieza,ros,cols){
	var continue2=true;
	if((pieza.tipo=="Alfil" || pieza.tipo=="Reina") && continue2){
		continue2=MoverAlfil(continue2,ros,cols);
	}
	
	if((pieza.tipo=="Torre" || pieza.tipo=="Reina") && continue2){
		continue2=MoverTorre(continue2,ros,cols);
	}
	
	if(pieza.tipo=="Caballo" && continue2){
		continue2=MoverCaballo(continue2,ros,cols);
	}
	
	if(pieza.tipo=="Rey" && continue2){
		continue2=MoverRey(continue2,ros,cols);
	}
	
	if(pieza.tipo=="Peon" && continue2){
		continue2=MoverPeon(continue2,ros,cols);
	}

}


function MoverAlfil(continue2,ros,cols){
	var i=1;

	//Diagonal --> Arriba Der
		if(continue2==true){
		while(ros+i>=0 && cols+i>=0 && ros+i<MatrixTablero.length && cols+i<MatrixTablero.length && MatrixTablero[ros+i][cols+i]==0 ){
			MatrixTablero[ros+i][cols+i]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i][cols+i].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}

				MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols+i];
				MatrixTablero[ros+i][cols+i]=0;

			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}

				MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols+i];
				MatrixTablero[ros+i][cols+i]=0;

				}
			i++;
		}

		if(ros+i>=0 && cols+i>=0 && ros+i<matrix.length && cols+i<matrix.length){
			if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i][cols+i].color){
				var aux=MatrixTablero[ros+i][cols+i];
				MatrixTablero[ros+i][cols+i]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				if(MatrixTablero[ros+i][cols+i].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols+i];
						MatrixTablero[ros+i][cols+i]=aux;
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}

						MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols+i];
						MatrixTablero[ros+i][cols+i]=aux;
				}
			}
		}
		}

		//Diagonal --> Arriba Izq
	
		if(continue2==true){
		i=1;
		while(ros+i*(1)>=0 && cols+i*(-1)>=0 && ros+i*(1)<MatrixTablero.length && cols+i*(-1)<MatrixTablero.length && MatrixTablero[ros+i*(1)][cols+i*(-1)]==0 ){
			MatrixTablero[ros+i*(1)][cols+i*(-1)]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i*(1)][cols+i*(-1)].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(1)][cols+i*(-1)];
					MatrixTablero[ros+i*(1)][cols+i*(-1)]=0;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(1)][cols+i*(-1)];
					MatrixTablero[ros+i*(1)][cols+i*(-1)]=0;
			}
			i++;
		}

		if(ros+i*(1)>=0 && cols+i*(-1)>=0 && ros+i*(1)<MatrixTablero.length && cols+i*(-1)<MatrixTablero.length){
			if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i*(1)][cols+i*(-1)].color){
				var aux=MatrixTablero[ros+i*(1)][cols+i*(-1)];
				MatrixTablero[ros+i*(1)][cols+i*(-1)]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				
				if(MatrixTablero[ros+i*(1)][cols+i*(-1)].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(1)][cols+i*(-1)];
						MatrixTablero[ros+i*(1)][cols+i*(-1)]=aux;
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(1)][cols+i*(-1)];
						MatrixTablero[ros+i*(1)][cols+i*(-1)]=aux;
				}
			}
		}
		}

		//Diagonal --> Abajo Izq
		if(continue2==true){
		i=1;
		while(ros+i*(-1)>=0 && cols+i*(-1)>=0 && ros+i*(-1)<MatrixTablero.length && cols+i*(-1)<MatrixTablero.length && MatrixTablero[ros+i*(-1)][cols+i*(-1)]==0 ){
			MatrixTablero[ros+i*(-1)][cols+i*(-1)]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i*(-1)][cols+i*(-1)].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(-1)];
					MatrixTablero[ros+i*(-1)][cols+i*(-1)]=0;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(-1)];
					MatrixTablero[ros+i*(-1)][cols+i*(-1)]=0;
			}
			i++;
		}
		if(ros+i*(-1)>=0 && cols+i*(-1)>=0 && ros+i*(-1)<MatrixTablero.length && cols+i*(-1)<MatrixTablero.length){
			if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i*(-1)][cols+i*(-1)].color){
				var aux=MatrixTablero[ros+i*(-1)][cols+i*(-1)];
				MatrixTablero[ros+i*(-1)][cols+i*(-1)]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				
				if(MatrixTablero[ros+i*(-1)][cols+i*(-1)].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(-1)];
						MatrixTablero[ros+i*(-1)][cols+i*(-1)]=aux;
					
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(-1)];
						MatrixTablero[ros+i*(-1)][cols+i*(-1)]=aux;
				}
			}
		}
		}

		//Diagonal --> Abajo Der
		if(continue2==true){
		i=1;
		while(ros+i*(-1)>=0 && cols+i*(1)>=0 && ros+i*(-1)<MatrixTablero.length && cols+i*(1)<MatrixTablero.length && MatrixTablero[ros+i*(-1)][cols+i*(1)]==0 ){
			MatrixTablero[ros+i*(-1)][cols+i*(1)]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i*(-1)][cols+i*(1)].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(1)];
					MatrixTablero[ros+i*(-1)][cols+i*(1)]=0;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(1)];
					MatrixTablero[ros+i*(-1)][cols+i*(1)]=0;
			}
			i++;
		}

		if(ros+i*(-1)>=0 && cols+i*(1)>=0 && ros+i*(-1)<MatrixTablero.length && cols+i*(1)<MatrixTablero.length){
			if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i*(-1)][cols+i*(1)].color){
				var aux=MatrixTablero[ros+i*(-1)][cols+i*(1)];
				MatrixTablero[ros+i*(-1)][cols+i*(1)]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				
				if(MatrixTablero[ros+i*(-1)][cols+i*(1)].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(1)];
						MatrixTablero[ros+i*(-1)][cols+i*(1)]=aux;
				
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[ros+i*(-1)][cols+i*(1)];
						MatrixTablero[ros+i*(-1)][cols+i*(1)]=aux;
				
				}
			}
		}
	}
	
	return continue2;
}

function MoverTorre(continue2,ros,cols){
	//Vertical solo hacia arriba
	
	var i=1;

	
	if(continue2==true){
	while(ros+i<MatrixTablero.length && MatrixTablero[ros+i][cols]==0 ){
			MatrixTablero[ros+i][cols]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i][cols].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=0;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=0;
			}
			i++;
	}
	
	if(ros+i<MatrixTablero.length){
		if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i][cols].color){
			var aux=MatrixTablero[ros+i][cols];
			MatrixTablero[ros+i][cols]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i][cols].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=aux;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=aux;
			}
		}
	}
	}
	
	//Jaque Vertical hacia abajo
	if(continue2==true){
	i=-1;
	while(ros+i>=0 && MatrixTablero[ros+i][cols]==0 ){
		MatrixTablero[ros+i][cols]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i][cols].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=0;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=0;
			
			}
		i--;
	}
	if(ros+i>=0){
		if(MatrixTablero[ros][cols].color!=MatrixTablero[ros+i][cols].color){
			var aux=MatrixTablero[ros+i][cols];
			MatrixTablero[ros+i][cols]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros+i][cols].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=aux;
			
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros+i][cols];
					MatrixTablero[ros+i][cols]=aux;
		
			}
		}
	}
}
	
	//Jaque Horizontal Derecha
	if(continue2==true){
	i=1;
	while(cols+i<MatrixTablero.length && MatrixTablero[ros][cols+i]==0 ){
		MatrixTablero[ros][cols+i]=MatrixTablero[ros][cols];
		MatrixTablero[ros][cols]=0;
		if(MatrixTablero[ros][cols+i].color=="Amarillo"){
			jaque(MatrixTablero,"Amarillo",posRowA,posColA);
			if(jaqueReyAmarillo==false){
				jaqueMateReyAmarillo=false;
				continue2=false;
			}
				MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
				MatrixTablero[ros][cols+i]=0;
			
		}else{
			jaque(MatrixTablero,"Morado",posRowM,posColM);
			if(jaqueReyMorado==false){
				jaqueMateReyMorado=false;
				continue2=false;
			}
				MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
				MatrixTablero[ros][cols+i]=0;
		
		}
		i++;
	}

	if(cols+i<MatrixTablero.length){
		if(MatrixTablero[ros][cols].color!=MatrixTablero[ros][cols+i].color){
			var aux=MatrixTablero[ros][cols+i];
			MatrixTablero[ros][cols+i]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros][cols+i].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
					MatrixTablero[ros][cols+i]=aux;
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
					MatrixTablero[ros][cols+i]=aux;
			}
		}
	}
}
	//Jaque Horizontal Izquierda
	
	if(continue2==true){
	i=-1;
	while(cols+i>=0 && MatrixTablero[ros][cols+i]==0 ){
		MatrixTablero[ros][cols+i]=MatrixTablero[ros][cols];
		MatrixTablero[ros][cols]=0;
		if(MatrixTablero[ros][cols+i].color=="Amarillo"){
			jaque(MatrixTablero,"Amarillo",posRowA,posColA);
			if(jaqueReyAmarillo==false){
				jaqueMateReyAmarillo=false;
				continue2=false;
			}
				MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
				MatrixTablero[ros][cols+i]=0;
			
		}else{
			jaque(MatrixTablero,"Morado",posRowM,posColM);
			if(jaqueReyMorado==false){
				jaqueMateReyMorado=false;
				continue2=false;
			}
				MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
				MatrixTablero[ros][cols+i]=0;
		}
		i--;
	}
	if(cols+i>=0){
		if(MatrixTablero[ros][cols].color!=MatrixTablero[ros][cols+i].color){
			var aux=MatrixTablero[ros][cols+i];
			MatrixTablero[ros][cols+i]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[ros][cols+i].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
					MatrixTablero[ros][cols+i]=aux;
				
			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[ros][cols+i];
					MatrixTablero[ros][cols+i]=aux;
			}
		}
	}
	
}

}
function MoverCaballo(continue2,ros,cols){
	var notvalid;
	//Caballo Subo 2 Me muevo 1 a la Izquierda	
	if(continue2==true){
		notvalid=false;
		
		if(ros+2>=0 && ros+2< MatrixTablero.length && cols+1>=0 && cols+1< MatrixTablero.length && MatrixTablero[ros + 2][cols + 1]!=0){
			if(MatrixTablero[ros + 2][cols + 1]!=0 && MatrixTablero[ros + 2][cols + 1].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros + 2 >= 0 && ros + 2 < MatrixTablero.length && cols + 1 >= 0 && cols + 1 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros + 2][cols + 1]!=0){
					aux=MatrixTablero[ros + 2][cols + 1];
				}
				MatrixTablero[ros + 2][cols + 1] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros + 2][cols + 1].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					}
						MatrixTablero[ros][cols] = MatrixTablero[ros + 2][cols + 1];
						MatrixTablero[ros + 2][cols + 1] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros + 2][cols + 1];
						MatrixTablero[ros + 2][cols + 1] = aux;
					
				}
			}
		}
	}
	//Caballo Subo 2 Me muevo 1 a la Izquierda
	if(continue2==true){
		notvalid=false;
		if(ros+2>=0 && ros+2< MatrixTablero.length && cols-1>=0 && cols-1< MatrixTablero.length && MatrixTablero[ros + 2][cols - 1]!=0){
			if(MatrixTablero[ros + 2][cols - 1]!=0 && MatrixTablero[ros + 2][cols - 1].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
		if (ros + 2 >= 0 && ros + 2 < MatrixTablero.length && cols - 1 >= 0 && cols - 1 < MatrixTablero.length) {
			var aux=0;
			if(MatrixTablero[ros + 2][cols - 1]!=0){
				aux=MatrixTablero[ros + 2][cols - 1];
			}
			MatrixTablero[ros + 2][cols - 1] = MatrixTablero[ros][cols];
			MatrixTablero[ros][cols] = 0;
			if(MatrixTablero[ros + 2][cols - 1].color=="Amarillo"){
				jaque(MatrixTablero, "Amarillo", posRowA, posColA);
				if (jaqueReyAmarillo == false) {
					jaqueMateReyAmarillo = false;
					continue2 = false;
				} 
					MatrixTablero[ros][cols] = MatrixTablero[ros + 2][cols - 1];
					MatrixTablero[ros + 2][cols - 1] = aux;
				
			}
			else{
				jaque(MatrixTablero, "Morado", posRowM, posColM);
				if (jaqueReyMorado == false) {
					jaqueMateReyMorado = false;
					continue2 = false;
				} 
					MatrixTablero[ros][cols] = MatrixTablero[ros + 2][cols-+ 1];
					MatrixTablero[ros + 2][cols - 1] = aux;
				
			}
		}
		}
	}
	//Caballo Subo 1 Me muevo 2 a la Derecha
	if(continue2==true){
		notvalid=false;
		if(ros+1>=0 && ros+1< MatrixTablero.length && cols+2>=0 && cols+2< MatrixTablero.length && MatrixTablero[ros + 1][cols + 2]!=0){
			if(MatrixTablero[ros + 1][cols + 2]!=0 && MatrixTablero[ros + 1][cols + 2].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros + 1 >= 0 && ros + 1 < MatrixTablero.length && cols + 2 >= 0 && cols + 2 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros + 1][cols + 2]!=0){
					aux=MatrixTablero[ros + 1][cols + 2];
				}
				MatrixTablero[ros + 1][cols + 2] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros + 1][cols + 2].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros + 1][cols + 2];
						MatrixTablero[ros + 1][cols + 2] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros + 1][cols + 2];
						MatrixTablero[ros + 1][cols + 2] = aux;
					
				}
			}
		}
	}
	//Caballo Subo 1 Me muevo 2 a la Izquierda
	if(continue2==true){
		notvalid=false;
		if(ros+1>=0 && ros+1< MatrixTablero.length && cols-2>=0 && cols-2< MatrixTablero.length && MatrixTablero[ros + 1][cols - 2]!=0){
			if(MatrixTablero[ros + 1][cols - 2]!=0 && MatrixTablero[ros + 1][cols - 2].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros + 1 >= 0 && ros + 1 < MatrixTablero.length && cols - 2 >= 0 && cols - 2 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros + 1][cols - 2]!=0){
					aux=MatrixTablero[ros + 1][cols - 2];
				}
				MatrixTablero[ros + 1][cols - 2] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros + 1][cols - 2].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros + 1][cols - 2];
						MatrixTablero[ros + 1][cols - 2] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros + 1][cols - 2];
						MatrixTablero[ros + 1][cols - 2] = aux;
					
				}
			}
		}
	}
	//Caballo Bajo 2 Me muevo 1 a la Derecha
	if(continue2==true){
		notvalid=false;
		if(ros-2>=0 && ros-2 < MatrixTablero.length && cols+1>=0 && cols+1< MatrixTablero.length && MatrixTablero[ros -2 ][cols + 1 ]!=0){
			if(MatrixTablero[ros -2 ][cols +1 ]!=0 && MatrixTablero[ros -2 ][cols +1].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros - 2 >= 0 && ros - 2 < MatrixTablero.length && cols + 1 >= 0 && cols + 1 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros - 2][cols + 1]!=0){
					aux=MatrixTablero[ros - 2][cols + 1];
				}
				MatrixTablero[ros - 2][cols + 1] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros - 2][cols + 1].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 2][cols + 1];
						MatrixTablero[ros - 2][cols + 1] = aux;
					
				}
				else{
					
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 2][cols + 1];
						MatrixTablero[ros - 2][cols + 1] = aux;
					
				}
			}
		}
	}
	//Caballo Bajo 2 Me muevo 1 a la Izquierda
	if(continue2==true){
		notvalid=false;
		if(ros-2>=0 && ros-2 < MatrixTablero.length && cols-1>=0 && cols-1< MatrixTablero.length && MatrixTablero[ros -2 ][cols -1 ]!=0){
			if(MatrixTablero[ros -2 ][cols -1 ]!=0 && MatrixTablero[ros -2 ][cols -1].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros - 2 >= 0 && ros - 2 < MatrixTablero.length && cols - 1 >= 0 && cols - 1 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros - 2][cols - 1]!=0){
					aux=MatrixTablero[ros - 2][cols - 1];
				}
				MatrixTablero[ros - 2][cols - 1] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				
				if(MatrixTablero[ros - 2][cols - 1].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					}
						MatrixTablero[ros][cols] = MatrixTablero[ros - 2][cols - 1];
						MatrixTablero[ros - 2][cols - 1] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 2][cols-+ 1];
						MatrixTablero[ros - 2][cols - 1] = aux;
					
				}
			}
			}
	}
	//Caballo Bajo 1 Me muevo 2 a la Derecha
	if(continue2==true){
		notvalid=false;
		if(ros-1>=0 && ros-1 < MatrixTablero.length && cols+2>=0 && cols+2< MatrixTablero.length && MatrixTablero[ros -1 ][cols +2 ]!=0){
			if(MatrixTablero[ros - 1 ][cols +2 ]!=0 && MatrixTablero[ros -1 ][cols +2 ].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
			if (ros - 1 >= 0 && ros - 1 < MatrixTablero.length && cols + 2 >= 0 && cols + 2 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros - 1][cols + 2]!=0){
					aux=MatrixTablero[ros - 1][cols + 2];
				}
				MatrixTablero[ros - 1][cols + 2] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros - 1][cols + 2].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 1][cols + 2];
						MatrixTablero[ros - 1][cols + 2] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 1][cols + 2];
						MatrixTablero[ros - 1][cols + 2] = aux;
					
				}
			}
		}
	}
	//Caballo Bajo 1 Me muevo 2 a la Izquierda
	if(continue2==true){
		notvalid=false;
		if(ros-1>=0 && ros-1 < MatrixTablero.length && cols-2>=0 && cols-2< MatrixTablero.length && MatrixTablero[ros -1 ][cols -2 ]!=0){
			if(MatrixTablero[ros - 1 ][cols -2 ]!=0 && MatrixTablero[ros -1 ][cols -2 ].color==MatrixTablero[ros][cols].color){
					notvalid=true;
			}
		}

		if(notvalid==false){
		if (ros - 1 >= 0 && ros - 1 < MatrixTablero.length && cols - 2 >= 0 && cols - 2 < MatrixTablero.length) {
				var aux=0;
				if(MatrixTablero[ros - 1][cols - 2]!=0){
					aux=MatrixTablero[ros - 1][cols - 2];
				}
				MatrixTablero[ros - 1][cols - 2] = MatrixTablero[ros][cols];
				MatrixTablero[ros][cols] = 0;
				if(MatrixTablero[ros - 1][cols - 2].color=="Amarillo"){
					jaque(MatrixTablero, "Amarillo", posRowA, posColA);
					if (jaqueReyAmarillo == false) {
						jaqueMateReyAmarillo = false;
						continue2 = false;
					}
						MatrixTablero[ros][cols] = MatrixTablero[ros - 1][cols - 2];
						MatrixTablero[ros - 1][cols - 2] = aux;
					
				}
				else{
					jaque(MatrixTablero, "Morado", posRowM, posColM);
					if (jaqueReyMorado == false) {
						jaqueMateReyMorado = false;
						continue2 = false;
					} 
						MatrixTablero[ros][cols] = MatrixTablero[ros - 1][cols - 2];
						MatrixTablero[ros - 1][cols - 2] = aux;
					
				}
				
			}
		}
	}
		
}

function MoverRey(continue2,ros,cols){
	var i,j;
	var notvalid;
	for(i=ros-1;i<=ros+1;i++){
		for(j=cols-1;j<=cols+1;j++){
			if(i>=0 && j>=0 && i<8 && j<8){
				if(!(i==ros && j==cols)){
					notvalid=false;
					if(MatrixTablero[i][j]!=0 && MatrixTablero[i][j].color==MatrixTablero[ros][cols].color){
						notvalid=true;
					}
					if(notvalid==false){
						var aux=0;
						if(MatrixTablero[i][j]!=0){
							aux=MatrixTablero[i][j];
						}
							
						MatrixTablero[i][j]=MatrixTablero[ros][cols];
						MatrixTablero[ros][cols]=0;
						if(MatrixTablero[i][j].color=="Amarillo"){
							posRowA=i;
							posColA=j;
							jaque(MatrixTablero,"Amarillo",posRowA,posColA);
							if(jaqueReyAmarillo==false){
								jaqueMateReyAmarillo=false;
								continue2=false;
							}
								MatrixTablero[ros][cols]=MatrixTablero[i][j];
								posRowA=ros;
								posColA=cols;
								MatrixTablero[i][j]=aux;
								if(jaqueReyAmarillo==false){
									i=9;
									j=9;
								}
						}else{
								posRowM=i;
								posColM=j;
								jaque(MatrixTablero,"Morado",posRowM,posColM);
								if(jaqueReyMorado==false){
									jaqueMateReyMorado=false;
									continue2=false;
								}
								MatrixTablero[ros][cols]=MatrixTablero[i][j];
								posRowM=ros;
								posColM=cols;
								MatrixTablero[i][j]=aux;
								if(jaqueReyMorado==false){
										i=9;
										j=9;
								}
							}
					}
				}	
			}
		}	
	}
	
	return continue2;
}

function MoverPeon(continue2,ros,cols){
	
	console.log(MatrixTablero[ros][cols])

	var i,j, aux;
	
	//Peon 2 pasos arriba
	if(continue2==true){
	if(ros==1 || ros==6){
		if(ros==1 && MatrixTablero[ros][cols].color=="Amarillo"){
			i=ros+2;
		}
		if(ros==6 && MatrixTablero[ros][cols].color=="Morado"){
			i=ros-2;
		}
		j=cols;
		if(i>=0 && j>=0 && i<8 && j<8){
			if(MatrixTablero[i][j]==0){
				MatrixTablero[i][j]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				if(MatrixTablero[i][j].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=0;
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=0;
				}
			}
		}
	}
	}

	//Peon 1 paso arriba. Movimiento Normal
	if(continue2==true){
	if(MatrixTablero[ros][cols].color=="Amarillo"){
		i=ros+1;
	}
	if(MatrixTablero[ros][cols].color=="Morado"){
		i=ros-1;
	}
	j=cols;
	if(i>=0 && j>=0 && i<8 && j<8){
		if(MatrixTablero[i][j]==0){
			MatrixTablero[i][j]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[i][j].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[i][j];
					MatrixTablero[i][j]=0;

			}else{
				jaque(MatrixTablero,"Morado",posRowM,posColM);
				if(jaqueReyMorado==false){
					jaqueMateReyMorado=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[i][j];
					MatrixTablero[i][j]=0;
			}
		}
	}
	}

	//Peon 1 paso arriba, 1 a la izquierda
	if(continue2==true){
		if(MatrixTablero[ros][cols].color=="Amarillo"){
			i=ros+1;
		}
		if(MatrixTablero[ros][cols].color=="Morado"){
			i=ros-1;
		}
		j=cols-1;
		if(i>=0 && j>=0 && i<8 && j<8){
			if(MatrixTablero[i][j]!=0){
				aux=MatrixTablero[i][j];
				MatrixTablero[i][j]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				if(MatrixTablero[i][j].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=aux;
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=aux;
				}
			}
		}
	}
	
	//Peon 1 paso arriba, 1 a la derecha
	if(continue2==true){
		if(MatrixTablero[ros][cols].color=="Amarillo"){
			i=ros+1;
		}
		if(MatrixTablero[ros][cols].color=="Morado"){
			i=ros-1;
		}
		j=cols+1;

		if(i>=0 && j>=0 && i<8 && j<8){
			if(MatrixTablero[i][j]!=0){
				aux=MatrixTablero[i][j];
				MatrixTablero[i][j]=MatrixTablero[ros][cols];
				MatrixTablero[ros][cols]=0;
				if(MatrixTablero[i][j].color=="Amarillo"){
					jaque(MatrixTablero,"Amarillo",posRowA,posColA);
					if(jaqueReyAmarillo==false){
						jaqueMateReyAmarillo=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=aux;
				}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
						MatrixTablero[ros][cols]=MatrixTablero[i][j];
						MatrixTablero[i][j]=aux;
				}
			}
		}
	}
	
	//Peon al paso
	var paso=false;
	if(continue2==true){
	if(ros==3 || ros==4){
			if(ros==4 && MatrixTablero[ros][cols].color=="Amarillo"){
				if((cols+1>=0 && cols+1<8)){
					if(MatrixTablero[ros][cols+1]!=0){
						if(MatrixTablero[ros][cols+1].color=="Morado" && MatrixTablero[ros][cols+1].carnada==1 && ppm==true){
							i=ros+1;
							j=cols+1;
							paso=true;
						}
						else{
							i=9;
							j=9;
						}
					}
				}
				else{
					if((cols-1>=0 && cols-1<8)){
						if(MatrixTablero[ros][cols-1]!=0){
							if(MatrixTablero[ros][cols-1].color=="Morado" && MatrixTablero[ros][cols-1].carnada==1 && ppm==true){
								i=ros+1;
								j=cols-1;
								paso=true;
							}
							else{
								i=9;
								j=9;
							}
						}
					}
					else{
						i=9;
						j=9;
					}
				}	
			}
			else{
				if((cols+1>=0 && cols+1<8)){
					if(MatrixTablero[ros][cols+1]!=0){
						if(MatrixTablero[ros][cols+1].color=="Amarillo" && MatrixTablero[ros][cols+1].carnada==1 && ppa==true){
							i=ros-1;
							j=cols+1;
							paso=true;
						}
						else{
							i=9;
							j=9;
						}
					}
				}
				else{
					if((cols-1>=0 && cols-1<8)){
						if(MatrixTablero[ros][cols-1]!=0){
							if(MatrixTablero[ros][cols-1].color=="Amarillo" && MatrixTablero[ros][cols-1].carnada==1 && ppa==true){
								i=ros-1;
								j=cols-1;
								paso=true;
							}
							else{
								i=9;
								j=9;
							}
						}
					}
					else{
						i=9;
						j=9;
					}
				}	
			}
		}

	if(i>=0 && j>=0 && i<8 && j<8 && paso==true){
		if(MatrixTablero[i][j]==0){
			var aux;
			if(MatrixTablero[ros][cols].color=="Amarillo"){
				aux=MatrixTablero[i-1][j];
				MatrixTablero[i-1][j]=0;
			}
			else{
				aux=MatrixTablero[i+1][j];
				MatrixTablero[i+1][j]=0;
			}
			MatrixTablero[i][j]=MatrixTablero[ros][cols];
			MatrixTablero[ros][cols]=0;
			if(MatrixTablero[i][j].color=="Amarillo"){
				jaque(MatrixTablero,"Amarillo",posRowA,posColA);
				if(jaqueReyAmarillo==false){
					jaqueMateReyAmarillo=false;
					continue2=false;
				}
					MatrixTablero[ros][cols]=MatrixTablero[i][j];
					MatrixTablero[i-1][j]=aux;				
			}else{
					jaque(MatrixTablero,"Morado",posRowM,posColM);
					if(jaqueReyMorado==false){
						jaqueMateReyMorado=false;
						continue2=false;
					}
					MatrixTablero[ros][cols]=MatrixTablero[i][j];
					MatrixTablero[i+1][j]=aux;
					
				}
		}
	}
	}

	return continue2;
}


function Tablas(){
		light.color.setHex( 0x078D91 );
		
		var cubeMaterials = 
		[
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posxBLUE.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx3BLUE.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx2BLUE.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posx4BLUE.jpg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posy.jpeg"), side: THREE.DoubleSide }  
		),
		new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load("Recursos/cube/posz.jpeg"), side: THREE.DoubleSide }  
		)
		];

		var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

		ExteriorCube.material = cubeMaterial;
		Empate();
		Revancha();
}


function UpgradePeon(figure){
		//muestra el menu de upgrade
		UpgradeScreen.style.display = "block";
		figureUpgrade=figure;
		rosUpgrade=row+difY;
		colUpgrade=column+difX;
}
function WinnerA(){
	GameWonA.style.display = "block";
	var sonido = document.createElement("iframe");
	sonido.setAttribute("src","./Recursos/Sounds/¡¡¡TAN TAN TAAAAN!!!.mp3");
	document.body.appendChild(sonido);

}
function WinnerM(){
	GameWonM.style.display = "block";
	var sonido = document.createElement("iframe");
	sonido.setAttribute("src","./Recursos/Sounds/¡¡¡TAN TAN TAAAAN!!!.mp3");
	document.body.appendChild(sonido);
}

function dancenegga(){
	var sonido = document.createElement("iframe");
	sonido.setAttribute("src","./Recursos/Sounds/Negros_del_Ataud.mp3");
	document.body.appendChild(sonido);
	negroDer.style.display = "block";
	negroIzq.style.display = "block";
}


function Empate(){
	GameWonN.style.display = "block";
	var sonido = document.createElement("iframe");
	sonido.setAttribute("src","./Recursos/Sounds/el-coro.mp3");
	document.body.appendChild(sonido);
}

function Revancha(){
	Reloader.style.display = "block";
}

