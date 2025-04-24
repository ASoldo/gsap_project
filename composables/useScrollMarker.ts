import { onMounted, type Ref } from 'vue'
import { useNuxtApp } from '#app'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Pull in the param type for better typing on `options`
type STVars = Partial<Parameters<typeof ScrollTrigger.create>[0]>

/**
 * Attaches a ScrollTrigger (with markers + console‐logging) to your elementRef.
 *
 * @param elementRef - a Vue ref pointing to your DOM element
 * @param options    - any overrides for the default ScrollTrigger vars
 */
export function useScrollMarker(
  elementRef: Ref<HTMLElement | undefined>,
  options: STVars = {}
) {
  const { $gsap } = useNuxtApp()

  onMounted(() => {
    const el = elementRef.value
    if (!el || !$gsap) return

    $gsap.registerPlugin(ScrollTrigger)

    const defaults: Parameters<typeof ScrollTrigger.create>[0] = {
      scroller: document.querySelector('#container'),
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      markers: true,
      onUpdate(self) {
        if (self.trigger)
          console.log(`Scroll ${self.trigger.id || ''}: ${(self.progress * 100).toFixed(1)}%`)
      }
    }

    ScrollTrigger.create({ ...defaults, ...options })
  })
}
