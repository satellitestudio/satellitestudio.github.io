/* global THREE, TimelineLite, TweenLite, Expo */
var PI_2 = Math.PI / 2

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

scene.fog = new THREE.Fog( 0x111111, 1.5, 1.8 )

// var planetMeshDashedMaterial = new THREE.LineDashedMaterial( {
//   color: 0xffffff,
//   linewidth: .1,
//   scale: .1,
//   dashSize: .3,
//   gapSize: .1,
// } )
var planetsArr = []
var planetGeom = new THREE.SphereGeometry( .7, 32, 24 )
var planetMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 1 } )
var planetMeshMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } )
var planet = new THREE.Mesh( planetGeom, planetMaterial )
var planetWireMain = new THREE.Mesh( planetGeom, planetMeshMaterial )
var planets = new THREE.Group()
planets.add(planet)
planets.add(planetWireMain)
planetsArr.push(planetWireMain)

for (var i = 0; i < 5; i++) {
  var planetWireInner = new THREE.Mesh( new THREE.SphereGeometry( .6 - i * .1, 32 - i*8, 24 - i * 2 ), planetMeshMaterial )
  // planetWireInner.rotateX(Math.random())
  planetsArr.push(planetWireInner)
  planets.add(planetWireInner)
}


var planetsContainer = new THREE.Group()
planetsContainer.rotateZ(.1)
planetsContainer.add(planets)

scene.add( planetsContainer )



var satGeom = new THREE.SphereGeometry( .24, 32, 32 )
var satMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 1 } )
var sat = new THREE.Mesh( satGeom, satMaterial)
sat.position.set(0, 0, .85)

var satOrbit = new THREE.Group()
satOrbit.rotateY(Math.PI/4)
satOrbit.add(sat)

var satOrbitContainer = new THREE.Group()
satOrbitContainer.rotateZ(.8)
satOrbitContainer.add(satOrbit)

scene.add(satOrbitContainer)


camera.rotation.set( 0, 0, 0 )
var cameraPitch = new THREE.Object3D()
cameraPitch.add( camera )
var cameraYaw = new THREE.Object3D()
cameraYaw.position.y = 10
cameraYaw.add( cameraPitch )
var cameraContainer = new THREE.Object3D()
cameraContainer.position.y = -10
cameraContainer.position.z = 5
cameraContainer.add( cameraYaw )
scene.add(cameraContainer)
// sat.add(cameraContainer)
document.addEventListener('mousemove', onMouseUpdate, false)

function onMouseUpdate(event) {
  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
  var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

  cameraYaw.rotation.y -= movementX * 0.002
  cameraPitch.rotation.x -= movementY * 0.002

  cameraPitch.rotation.x = Math.max( - PI_2, Math.min( PI_2, cameraPitch.rotation.x ) )
}

// tl.to()
// tl.to(cameraContainer.position, 1, {z: 2})
// tl.to(cameraContainer.position, 1, {z: 5})
var tl = new TimelineLite()
tl.to(satOrbit.rotation, 3, {y:(-3*Math.PI/2)-Math.PI/4, ease: Expo.easeInOut} )
tl.to(cameraContainer.position, 3, {z:2, ease: Expo.easeIn}, '-=3' )
// tl.to(satOrbit.rotation, 3, {y:-Math.PI/2, ease: Expo.easeInOut}, '-=3' )



function animate(t) {
  requestAnimationFrame( animate )
  if (t > 2000) {
    var d = (t - 2000)/40000
    var s = Math.min(.01, d)
    // satOrbit.rotateY(-s)
    var a = 1 - Math.min(.9, d * 100)
    planetMaterial.opacity = a
  }
  // cameraYaw.position.z += 1
  // planetWireMain.rotateY(.003)
  planetsArr.forEach(function (planet, i) {
    planet.rotateY(.001 * ((i % 2 === 0) ? 1 : -1))
  })
  renderer.render( scene, camera )
}

animate()
