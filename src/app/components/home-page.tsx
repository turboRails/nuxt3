'use client'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import vertexShaderCode  from 'raw-loader!./shaders/cylinder_vertex.glsl'
import fragmentShaderCode from 'raw-loader!./shaders/cylinder_fragment.glsl'

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const clock = new THREE.Clock()
   
  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current != undefined) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.set(0, 1.3, 2)

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)

      const boxGeometry = new THREE.CylinderGeometry(1, 0.9, 2, 12, 12)

      // define uniform data
      const uniformData = {
        u_time: {
          type: 'f',
          value: clock.getElapsedTime(),
        },
      }
      const boxMaterial = new THREE.ShaderMaterial({
        wireframe: true,
        uniforms: uniformData,
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode,
      })

      const cube = new THREE.Mesh(boxGeometry, boxMaterial)
      scene.add(cube)

      const ambientLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.2)
      ambientLight.position.set(1, 3, 1)

      scene.add(ambientLight)
      const pointLight = new THREE.DirectionalLight(0xffffff, 1)
      pointLight.position.set(3, 0, 0.5)
      scene.add(pointLight)

      const controls = new OrbitControls(camera, renderer.domElement)

      // Render the scene and camera
      renderer.render(scene, camera)

      const renderScene = () => {
        cube.rotation.x += 0.01
        uniformData.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera)
        controls.update()
        requestAnimationFrame(renderScene)
      }

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
