'use strict'
import * as utils from "./utilis"


const quoteHero = document.querySelector('.quote-section')

fetch('../../index.html').then(res => res.text())
  .then(data => {
    //convert the fecthed html string into a DOM 
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    // get the <header> element from that HTML
    const header = doc.querySelector('header');
    //get the <footer></footer> element 
    const footer = doc.querySelector('footer')
    // add it to the current page
    if (header) document.body.prepend(header); // or appendChild
    if (footer) document.body.append(footer)
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS ON THIS HTML BEING FECTHED SHOULD BE HERE 

    //MOBILE NAV LOGIC
    utils.mobileNav()

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

    //Adding the sticky navigation
    utils.addStickyNav(quoteHero)

    //Reaveal Elemnts on Scroll
    utils.revealElementsOnScroll()
  })


const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
let curSlide = 0
const maxslides = slides.length
const dotContainer = document.querySelector('.dots')


const slider = document.querySelector('.slider')

//First add the transform to teh elmemnt based on tehir positin in teh nodelist
//What we want --> 0%, 100%, 200%, 300%

slides.forEach((cur, i) => {
  cur.style.transform = `translateX(${100 * i}%)`
})

function moveRight() {
  if (curSlide === maxslides - 1) {
    //currentslide back to zero if we reach the end of the nodes list 
    curSlide = 0
  } else {
    //on every click slides increses by 1 
    curSlide++
  }

  //The key logic
  slides.forEach((cur, i) => {
    cur.style.transform = `translateX(${100 * (i - curSlide)}%)`
  })
  //What we want
  // -100%, 0%, 100%, 200%, 300%

  activateDots(curSlide)
  console.log('moving...');
}

function moveLeft() {
  if (curSlide === 0) {
    curSlide = maxslides - 1
  } else {
    curSlide--
  }


  slides.forEach((cur, i) => {
    cur.style.transform = `translateX(${100 * (i - curSlide)}%)`
  })
  activateDots(curSlide)

}

function createDots() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots()

function activateDots(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

activateDots(0)


btnRight.addEventListener('click', () => {
  moveRight()
})


btnLeft.addEventListener('click', () => {
  moveLeft()
})

//making the dots clickable (using event delgation (bubbling))
dotContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset


    slides.forEach((cur, i) => {
      cur.style.transform = `translateX(${100 * (i - slide)}%)`
    })

    activateDots(slide)
  }
})

//adding keyboard event for accessibilty 
document.addEventListener('keydown', (e) => {
  //Using short  circuting (returns the first flasy value so tsi only runs when e.key === arrowright become true )
  e.key === 'ArrowRight' && moveRight()
  e.key === 'ArrowLeft' && moveLeft()
})

let interval;

// start the animation once the element is in view
const observer = new IntersectionObserver(entries => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    if (!interval) interval = setInterval(() => moveRight(), 15000);
  } else {
    clearInterval(interval);
    interval = null;
  }
}, { threshold: 0.5 }); // fires when any part is visible

observer.observe(document.querySelector('.testimonials'));





//swipe action for small screens 
let startX = 0
const content = document.querySelectorAll('blockquote')


content.forEach(cur => {
  cur.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX
    console.log(e.touches);
  })

  cur.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX
    const diff = endX - startX

    if (diff > 50)
      moveLeft()

    if (diff < 50)
      moveRight()
  })

})







