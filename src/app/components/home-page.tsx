'use client'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader.js'

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

import Stats from 'three/examples/jsm/libs/stats.module'
/*
import vertexShaderCode from 'raw-loader!./shaders/cylinder_vertex.glsl'
import fragmentShaderCode from 'raw-loader!./shaders/cylinder_fragment.glsl'

import planeVertex from 'raw-loader!./shaders/plane_vertex.glsl'
import planeFragment from 'raw-loader!./shaders/plane_fragment.glsl'
*/
const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current != undefined) {
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        9000
      )
      camera.position.set(0, 7, 20)

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000104) //BB4136
      // scene.fog = new THREE.FogExp2( 0x004404, 0.0001675 );

      const clock = new THREE.Clock()

      const parent = new THREE.Object3D()
      scene.add(parent)
      const grid = new THREE.Points(
        new THREE.PlaneGeometry(15000, 15000, 128, 256),

        new THREE.PointsMaterial({ color: 0xff0000, size: 10 })
      )
      grid.position.y = -800
      grid.rotation.x = -Math.PI / 2
      parent.add(grid)

      /*
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.set(0, 1.3, 2)
      */

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.autoClear = false
      const cyGeometry = new THREE.CylinderGeometry(
        5,
        4,
        12,
        24,
        24
      ).toNonIndexed()
      // define uniform data
      const uniformData = {
        u_time: {
          type: 'f',
          value: clock.getElapsedTime(),
        },
      }
      const cyMaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        transparent: true,
        opacity: 0.6,
        metalness: 0.5,
        roughness: 0.5,
      })

      const cube = new THREE.Mesh(cyGeometry, cyMaterial)
      cube.position.set(0, -1, 0)
      scene.add(cube)

      const ambientLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3)
      ambientLight.position.set(1, 3, 1)

      scene.add(ambientLight)
      const pointLight = new THREE.DirectionalLight(0xffffff, 5)
      pointLight.position.set(40, 0, -1)
      pointLight.lookAt(0, 20, 0)
      scene.add(pointLight)

      /*
      const planeGeometry = new THREE.PlaneGeometry(500, 500, 50, 50)
      const planeMaterial = new THREE.ShaderMaterial({
        wireframe: true,
        uniforms: uniformData,
        vertexShader: planeVertex,
        fragmentShader: planeFragment,
      })

      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.position.set(0, 0, -100)
      scene.add(plane)
     */
    
      const controls = new OrbitControls(camera, renderer.domElement)

      // Render the scene and camera
      renderer.render(scene, camera)

      const renderScene = () => {
        cube.rotation.y += 0.01

        uniformData.u_time.value = clock.getElapsedTime()
        renderer.render(scene, camera)
        controls.update()
        requestAnimationFrame(renderScene)
      }

      /* postprocessing

				const renderModel = new RenderPass( scene, camera );
				const effectBloom = new BloomPass( 0.65 );
				const effectFilm = new FilmPass();

				const effectFocus = new ShaderPass( FocusShader );

				effectFocus.uniforms[ 'screenWidth' ].value = window.innerWidth * window.devicePixelRatio;
				effectFocus.uniforms[ 'screenHeight' ].value = window.innerHeight * window.devicePixelRatio;

				const outputPass = new OutputPass();

				const composer = new EffectComposer( renderer );

				composer.addPass( renderModel );
				composer.addPass( effectBloom );
				composer.addPass( effectFilm );
				composer.addPass( effectFocus );
				composer.addPass( outputPass );
      */

      //stats
      const stats = new Stats()
      canvasRef.current.appendChild(stats.dom)

      const fillWithPoints = (geometry: THREE.BufferGeometry, count: any) => {
        const isInside = (v: THREE.Vector3) => {
          ray.set(v, dir)
          let counter = 0

          let pos = geometry.attributes.position
          let faces = pos.count / 3
          let vA = new THREE.Vector3(),
            vB = new THREE.Vector3(),
            vC = new THREE.Vector3()
          for (let i = 0; i < faces; i++) {
            vA.fromBufferAttribute(pos, i * 3 + 0)
            vB.fromBufferAttribute(pos, i * 3 + 1)
            vC.fromBufferAttribute(pos, i * 3 + 2)
            if (ray.intersectTriangle(vA, vB, vC, false, dummyTarget)) counter++
          }

          return counter % 2 == 1
        }
        const dummyTarget = new THREE.Vector3() // to prevent logging of warnings from ray.at() method

        const ray = new THREE.Ray()

        const size = new THREE.Vector3()
        geometry.computeBoundingBox()
        let bbox = geometry.boundingBox

        let points: THREE.Vector3[] = []

        const dir = new THREE.Vector3(1, 1, 1).normalize()
        for (let i = 0; i < count; i++) {
          let p = setRandomVector(
            bbox?.min || new THREE.Vector3(),
            bbox?.max || new THREE.Vector3()
          )
          points.push(p)
        }
        let counter = 0
        while (counter < count) {
          let v = new THREE.Vector3(
            THREE.MathUtils.randFloat(
              bbox?.min.x || 0,
              (bbox?.max.x || 0) * 0.9
            ),
            THREE.MathUtils.randFloat(
              bbox?.min.y || 0,
              (bbox?.max.y || 0) * 0.9
            ),
            THREE.MathUtils.randFloat(
              bbox?.min.z || 0,
              (bbox?.max.z || 0) * 0.9
            )
          )
          if (isInside(v)) {
            points.push(v)
            counter++
          }
        }

        function setRandomVector(min: THREE.Vector3, max: THREE.Vector3) {
          let v = new THREE.Vector3(
            THREE.MathUtils.randFloat(min.x, max.x * 0.5),
            THREE.MathUtils.randFloat(min.y, max.y * 0.9),
            THREE.MathUtils.randFloat(min.z, max.z * 0.5)
          )
          if (!isInside(v)) {
            return setRandomVector(min, max)
          }
          return v
        }

        return new THREE.BufferGeometry().setFromPoints(points)
      }

      const pointsGeom = fillWithPoints(cyGeometry, 1000)
      //console.log(pointsGeom);
      const points = new THREE.Points(
        pointsGeom,
        new THREE.PointsMaterial({ color: 'aqua', size: 0.25 })
      )
      cube.add(points)

      setTimeout(() => {
        const newPoints = new THREE.Points(
          pointsGeom,
          new THREE.PointsMaterial({ color: 'red', size: 0.25 })
        )
        cube.remove(points)
        cube.add(newPoints)
      }, 5000)

      setTimeout(() => {
        cyMaterial.setValues({ emissive: 'red' })
      }, 10000)
      
      let red = true
      const toggleBG = () => {
        setTimeout(() => {
          if (red) {
            scene.background = new THREE.Color(0xbb4136)
            red = false
          } else {
            scene.background = new THREE.Color(0x000000)
            red = true
          }
          toggleBG()
        }, 1000)
      }
      setTimeout(() => {
        scene.background = new THREE.Color(0xbb4136)
        scene.remove(parent)
        toggleBG()
      }, 15000)

      const axesHelper = new THREE.AxesHelper(3)
      scene.add(axesHelper)
      const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      window.addEventListener('resize', handleResize)
      // Call the renderScene function to start the animation loop
      renderScene()
      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [canvasRef])

  return (
    <>
      <canvas ref={canvasRef} />
      <div className="relative mx-auto mt-4 rounded-lg  px-4 text-left leading-7 text-gray-600  sm:max-w-xl sm:px-12">
        <div className="main">
          <Link href="/birds">Birds</Link>
          <Link href="/boxes">Boxes</Link>
        </div>
      </div>
    </>
  )
}

export default ThreeScene
