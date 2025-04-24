<template>
  <div id="home" ref="sectionRef" class="w-full h-screen justify-center items-center bg-red-500 overflow-visible">
    <h1 class="text-black text-8xl uppercase flex flex-wrap justify-center">
      <span>S</span><span>i</span><span>t</span><span>e</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const sectionRef = ref<HTMLElement>()

onMounted(() => {
  const { $gsap } = useNuxtApp()
  const el = sectionRef.value!
  const letters = Array.from(el.querySelectorAll<HTMLSpanElement>('h1 span'))

  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: true,
      onUpdate(self) {
        console.log(`Scroll progress: ${(self.progress * 100).toFixed(1)}%`)
      }
    }
  })

  tl.to({}, { duration: 0.1 })

  tl.fromTo(
    letters,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.1
    }
  )

  tl.to({}, { duration: 0.6 })

  tl.to(letters, {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.1
  })

  tl.to({}, { duration: 0.1 })
})
</script>
