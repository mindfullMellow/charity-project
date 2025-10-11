"use strict"

/////////////////////////////////////////////////////
//DOM MANIPULATION LOGIC
////////////////////////////////////////////////////

//MOBILE NAV LOGIC
export function mobileNav() {
  const headerEl = document.querySelector('.header')
  const MenuBtn = document.querySelector('.btn-mobile-nav')

  MenuBtn.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open')
  })
}



///////////////////////////////////////////
//REVEALING ELEMNTS ON SCROLL
///////////////////////////////////////////
export function revealElementsOnScroll() {
  const AllSections = Array.from(document.querySelectorAll('section'))
  const selectedSection = AllSections.filter(cur => !cur.classList.contains('section-hero') && !cur.classList.contains('quote-section') && !cur.classList.contains('statistic-section'))

  const reavealSection = function (entries, observer) {
    const [entry] = entries
    console.log(entry);

    if (!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
  }

  const sectionObserver = new IntersectionObserver(reavealSection, {
    root: null,
    threshold: 0.15,
  })


  selectedSection.forEach(cur => {
    sectionObserver.observe(cur)
    cur.classList.add('transition-transform', 'transition-opacity', 'duration-1000', 'section--hidden')

  })
}

///////////////////////////////////////////
//ADDING THE STICKY NAV
///////////////////////////////////////////
export function addStickyNav(sectionHero) {
  const headerEl = document.querySelector('.header')
  const headerHeight = headerEl.getBoundingClientRect().height


  const options = {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`
  }



  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) headerEl.classList.add('sticky')
      else headerEl.classList.remove('sticky')
    })
  }, options)

  observer.observe(sectionHero)
}

//code to get full year
export function getFullYear() {
  const currentYear = new Date().getFullYear()
  return currentYear
}

