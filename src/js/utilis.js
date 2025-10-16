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
  const mainEl = document.querySelector('main')
  const headerHeight = headerEl.getBoundingClientRect().height

  const observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (!entry.isIntersecting) {
      headerEl.classList.add('sticky')
      mainEl.style.paddingTop = `${headerHeight}px`
    } else {
      headerEl.classList.remove('sticky')
      mainEl.style.paddingTop = '0'
    }
  }, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`
  })

  observer.observe(sectionHero)
}


//code to get full year
export function getFullYear() {
  const currentYear = new Date().getFullYear()
  return currentYear
}

