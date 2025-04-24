<template>
  <div>
    <TresCanvas shadows :onCreated="onCreated" clear-color="#82DBC5" window-size>
      <TresPerspectiveCamera :position="[15, 10, 5]" :look-at="[0, 0, 0]" />
      <Suspense>
        <primitive v-if="scene" :object="scene" />
      </Suspense>
      <TresDirectionalLight :position="[3, 5, 2]" :castShadow="true" :intensity="1" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue'
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { useNuxtApp } from '#app'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const scene = ref<THREE.Object3D | null>(null)
let cube: THREE.Mesh | null = null

onMounted(async () => {
  const { $gsap } = useNuxtApp()
  // Register the plugin
  // $gsap.registerPlugin(ScrollTrigger)

  // Load your GLTF and pull out the cube
  const gltf = await useGLTF('/model/cube.glb')
  scene.value = markRaw(gltf.scene)
  cube = scene.value.getObjectByName('Cube') as THREE.Mesh

  if (cube) {
    // Reassign material / shadows as before
    cube.material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.5,
      metalness: 0.1,
    })
    cube.castShadow = true
    cube.receiveShadow = true

    // Create a ScrollTrigger that maps window scroll → rotation
    ScrollTrigger.create({
      start: 'top top',    // when page top hits viewport top
      end: 'bottom bottom', // when page bottom hits viewport bottom
      scrub: true,
      markers: true,
      onUpdate(self) {
        // progress goes 0→1 as you scroll the whole page
        cube!.rotation.y = self.progress * Math.PI * 2
      }
    })
  }
})

// This stays exactly as you had it
const onCreated = ({ renderer }: { renderer: THREE.WebGLRenderer }) => {
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
}
</script>
