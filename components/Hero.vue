<template>
  <div id="hero" ref="sectionRef" class="w-full h-screen flex flex-col justify-between items-center bg-blue-500">
    <div class="w-full h-full flex flex-col justify-center items-center uppercase font-light">
      <h1 class="text-black text-center text-8xl flex z-50">
        <span>H</span>
        <span>e</span>
        <span>r</span>
        <span>o</span>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useScrollMarker } from '~/composables/useScrollMarker'

// const sectionRef = ref<HTMLElement>()

// useScrollMarker(sectionRef, {})
</script>
