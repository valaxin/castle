document.querySelectorAll('[data-slider]').forEach((root) => {
  const track = root.querySelector('[data-slider-track]')
  const slides = Array.from(root.querySelectorAll('[data-slider-slide]'))
  const dots = Array.from(root.querySelectorAll('[data-slider-dot]'))
  const prevBtn = root.querySelector('[data-slider-prev]')
  const nextBtn = root.querySelector('[data-slider-next]')

  let index = 0
  let startX = 0
  let deltaX = 0
  let isDragging = false

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-selected', String(i === index))
    })
  }

  const goTo = (i) => {
    index = (i + slides.length) % slides.length
    update()
  }

  prevBtn.addEventListener('click', () => goTo(index - 1))
  nextBtn.addEventListener('click', () => goTo(index + 1))

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i))
  })

  track.addEventListener(
    'touchstart',
    (e) => {
      isDragging = true
      startX = e.touches[0].clientX
      track.style.transition = 'none'
    },
    { passive: true },
  )

  track.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging) return
      deltaX = e.touches[0].clientX - startX
      track.style.transform = `translateX(calc(-${index * 100}% + ${deltaX}px))`
    },
    { passive: true },
  )

  track.addEventListener('touchend', () => {
    isDragging = false
    track.style.transition = ''
    const threshold = track.clientWidth * 0.2
    if (deltaX > threshold) {
      goTo(index - 1)
    } else if (deltaX < -threshold) {
      goTo(index + 1)
    } else {
      update()
    }
    deltaX = 0
  })

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1)
    if (e.key === 'ArrowRight') goTo(index + 1)
  })

  window.addEventListener('resize', update)

  update()
})
