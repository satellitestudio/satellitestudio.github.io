/* global THREE */
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var planetGeom = new THREE.SphereGeometry( .7, 32, 24 )
var planetMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 1 } )
var planetMeshMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } )
var planet = new THREE.Mesh( planetGeom, planetMaterial )
var planetWire = new THREE.Mesh( planetGeom, planetMeshMaterial )

var planets = new THREE.Group()
planets.add(planet)
planets.add(planetWire)

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


camera.position.z = 5

function animate(t) {
  requestAnimationFrame( animate )
  if (t > 2000) {
    var d = (t - 2000)/40000
    var s = Math.min(.1, d)
    satOrbit.rotateY(-s)
    var a = 1 - Math.min(.5, d * 2)
    planetMaterial.opacity = a
  }
  planets.rotateY(.003)
  renderer.render( scene, camera )
}

animate()
