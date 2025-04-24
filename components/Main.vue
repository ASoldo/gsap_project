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
      start: 'top bottom',  // 0%  → as soon as section top hits bottom of viewport
      end: 'bottom top',  // 100%→ when section bottom hits top of viewport
      scrub: true,
      markers: true,
      onUpdate(self) {
        console.log(`Scroll progress: ${(self.progress * 100).toFixed(1)}%`)
      }
    }
  })

  // 1) EMPTY tween: 0 → 0.1s (0%–10% scroll) → nothing happens
  tl.to({}, { duration: 0.1 })

  // 2) FADE IN: 0.1–0.2s (10%–20%) 
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

  // 3) HOLD: 0.2–0.8s (20%–80%) → letters stay put
  tl.to({}, { duration: 0.6 })

  // 4) FADE OUT: 0.8–0.9s (80%–90%)
  tl.to(letters, {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.1
  })

  // 5) SLACK: 0.9–1.0s (90%–100%) → nothing
  tl.to({}, { duration: 0.1 })
})
</script>
