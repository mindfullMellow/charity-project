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
    const modalComponents = doc.querySelector('.modal-components')
    const volunteerModal = doc.querySelector('.volunteer-modal-component')
    const footer = doc.querySelector('footer')

    // add it to the current page
    if (header) document.body.prepend(header);
    if (modalComponents) document.querySelector('main').after(modalComponents)
    if (volunteerModal) document.querySelector('.modal-components').after(volunteerModal)
    if (footer) document.querySelector('.modal-components').after(footer)

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


    utils.ModalInit()
    utils.volunteerModalInit()


  });


async function loadTeamMembers() {
  const imgContainer1 = document.querySelector('.img-container-1')
  const imgContainer2 = document.querySelector('.img-container-2')
  const sliderContainer = document.querySelector('.slider')

  try {
    const response = await fetch('/data/about.json')
    const data = await response.json()
    console.log(data);

    const teamMembersData = data["our-team"]
    const testimonials = data["testimonials"]
    console.log(testimonials);

    teamMembersData.forEach(cur => {
      const teamHTML = `<figure class="flex-1 min-w-[150px]">
          <div class="relative"> 
 <div  class=" rounded-full bg-white-accent skeleton"></div>
            <img src="${cur["figure-img"]}" alt="${cur["figure-name"]}"
              class="w-full rounded-full aspect-square" onload="this.previousElementSibling.remove()">
           </div>
            <figcaption class="flex flex-col items-center text-center pt-sm">
              <h4 class="font-semibold md:text-lead text-h6 ">${cur["figure-name"]}</h4>
              <p class="md:text-body text-small text-header-color/80">${cur["figure-role"]}</p>
            </figcaption>
          </figure>`

      if (imgContainer1.querySelectorAll('figure').length !== 4) {
        imgContainer1.insertAdjacentHTML('beforeend', teamHTML)
      } else {
        imgContainer2.insertAdjacentHTML('beforeend', teamHTML)
      }
    })

    testimonials.forEach((cur, i) => {
      const testiHTML = `  <div class="slide slide-${i + 1}">
            <div class="text-white testimonials-content">

              <blockquote class="font-light text-h6">${cur["testi-quote"]}</blockquote>

              <address class="flex items-center not-italic gap-sm">
                <!-- IMG -->
                <div class="img-container group relative img">
                            <div  class=" rounded-full bg-white-accent skeleton"></div>
                  <img src="https://pub-ff760967c0f94a57ba864d84fa36603e.r2.dev/img/impact/anon.svg" alt="Avatar"
                    class="p-2 rounded-full bg-border-b-color"
                    onload="this.previousElementSibling.remove()">
                  <span
                    class="absolute hidden mb-2 text-xs text-white rounded-lg bg-brand-color px-sm py-xs w-section bottom-full group-hover:block">
                    Photo Omitted for recepient safety
                  </span>
                </div>
                <!-- ADDRESS -->

                <cite class="flex flex-col justify-center gap-1 not-italic">
                  <h6 class="font-semibold text-h6">${cur["name"]}</h6>
                  <p class="font-light text-small">${cur["other-details"]}</p>
                </cite>
              </address>
            </div>
          </div>`

      sliderContainer.insertAdjacentHTML('beforeend', testiHTML)

    })

    testimonialSlideInit()
  } catch (err) {
    console.error('Erroe:', err)
  }

}

loadTeamMembers()


//////////////////////////////
//

function testimonialSlideInit() {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')
  let curSlide = 0
  let interval;
  const maxslides = slides.length


  function goToSlide(slide) {//First add the transform to teh elmemnt based on tehir positin in teh nodelist
    //What we want --> 0%, 100%, 200%, 300%

    //The key logic
    slides.forEach((cur, i) => {
      cur.style.transform = `translateX(${100 * (i - slide)}%)`
    })
  }

  goToSlide(0)


  function moveRight() {
    if (curSlide === maxslides - 1) {
      //currentslide back to zero if we reach the end of the nodes list 
      curSlide = 0
    } else {
      //on every click slides increses by 1 
      curSlide++
    }


    goToSlide(curSlide)
    activateDots(curSlide)
  }

  function moveLeft() {
    if (curSlide === 0) {
      curSlide = maxslides - 1
    } else {
      curSlide--
    }

    goToSlide(curSlide)
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

  ////////////////////////////
  //Event listners
  //////////////////////////////
  btnRight.addEventListener('click', moveRight)
  btnLeft.addEventListener('click', moveLeft)
  //making the dots clickable (using event delgation (bubbling))
  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      // This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide)


      goToSlide(curSlide)

      activateDots(curSlide)
    }
  })

  //adding keyboard event for accessibilty 
  document.addEventListener('keydown', (e) => {
    //Using short  circuting (returns the first flasy value so tsi only runs when e.key === arrowright become true )
    e.key === 'ArrowRight' && moveRight()
    e.key === 'ArrowLeft' && moveLeft()
  })



  /////////////////////////////////////
  //swipe action for small screens 
  ////////////////////////////////
  let startX = 0
  const content = document.querySelectorAll('.slide')


  content.forEach(cur => {
    cur.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX
    })

    cur.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX
      const diff = endX - startX

      if (diff > 50)
        moveLeft()

      if (diff < -50)
        moveRight()
    })

  })
}













