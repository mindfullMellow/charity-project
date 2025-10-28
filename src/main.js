'use strict'
import * as utils from "./js/utilis"
import "./keep-assets.js"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // base styles


///////////////////////////////////////////
//JSON INIT
///////////////////////////////////////////
async function loadVolunteers() {
  try {
    const response = await fetch('/data/index.json');
    const data = await response.json();

    const volunteerDataArr = data["volunteer-data"];
    const sliderContainer = document.querySelector('.slider-container')

    //LOOP TO CREATE THE CARDS
    volunteerDataArr.forEach(cur => {
      const cardHtml = `
    <div class="slider-content">
      <div
        class="relative flex flex-col text-white cursor-pointer group slider-inner img-default"
        style="background-image: linear-gradient(to bottom, rgba(17,22,24,0.2), rgba(17,22,24,0.9)), url('${cur.image}')"
        role="img"
        aria-label="${cur['aria-label']}">
        
        <div class="vol-content-container">
          <h6>${cur['card-title']}</h6>
          <p>${cur['card-text']}</p>
        </div>
      </div>
    </div>
  `;

      sliderContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
    //WAIT UNTIL THE CARD LOOP IS DONE THEN CALL ALL INIT FUNCTIONS
    (() => {
      mainJsInit()
      consentModalInit()
      peopleReachedInit()
      getDataAttributes()
      formLogicInit()
      VolunteerCarouselInit()
      utils.ModalInit()
      utils.volunteerModalInit()
    })();

  } catch (err) {
    console.error('Error loading volunteer data:', err)
  }

}
loadVolunteers()


///////////////////////////////////////////
//GLOBAL VARIABLES
///////////////////////////////////////////
function mainJsInit() {
  const sectionHero = document.querySelector('.section-hero')

  utils.addStickyNav(sectionHero)
  utils.mobileNav()
  utils.revealElementsOnScroll()
  document.getElementById('year').textContent = utils.getFullYear()
}


///////////////////////////////////////////
//CONSENT MODAL
///////////////////////////////////////////
function consentModalInit() {
  const consentModal = document.querySelector('.consent-modal')
  const agreeBtn = consentModal.querySelector('.agree-btn')
  const disAgreeBtn = consentModal.querySelector('.disagree-btn')
  const overlay = document.querySelector('.overlay')
  const headerEl = document.querySelector('.header')
  function openModal(element) {
    //Disable scrolling while the modal is active (body and html elemnt itslef)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden';

    element.classList.remove('hidden')
    overlay.classList.remove('hidden')

    //store a message to inform the page taht sticky is activated 
    if (headerEl.classList.contains('sticky')) {
      headerEl.classList.remove('sticky')
      sessionStorage.setItem('sticky', "sticky is active")
    }

    if (!headerEl.classList.contains('sticky')) return
  }

  function closeModal(element) {
    //activate  scrolling while the modal is inactive (body and html elemnt itslef)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    element.classList.add('hidden')
    overlay.classList.add('hidden')

    //check the stored message to know if sticky class isactivated 
    if (sessionStorage.getItem('sticky')) {
      headerEl.classList.add('sticky')
      sessionStorage.removeItem('sticky')
    }
  }

  setTimeout(() => {
    if ((!localStorage.getItem('One-Life-Org'))) {
      openModal(consentModal)
    }
  }, 5000)

  agreeBtn.addEventListener('click', () => {
    localStorage.setItem('One-Life-Org', 'true')
    closeModal(consentModal)
  })

  disAgreeBtn.addEventListener('click', () => {
    console.log('this woks');
    closeModal(consentModal)
    window.location.href = '/Access-denied'
  })
}



/////////////////////////////////////////////////////
//PEOPLE REACHED SECTION LOGIC
////////////////////////////////////////////////////
function peopleReachedInit() {
  let peopleReachedData;
  const dataArr = []
  const peopleReached = document.querySelector('.people-reached')
  const countries = document.querySelectorAll('.country')

  ///////////////////////////////////////
  //CALCULATONS FOR TEH MAPS DATA 
  //////////////////////////////////////
  countries.forEach(cur => {
    if (cur.dataset.content.includes('million')) {
      const millionvar = parseFloat(cur.dataset.content) * 1000000
      dataArr.push(millionvar)
    } else {
      dataArr.push(parseFloat(cur.dataset.content.replace(/,/g, ""), 10))
    }

  })
  const totalPeopleReached = dataArr.reduce((acc, cur) => acc + cur, 0).toString();
  peopleReachedData = `${totalPeopleReached[0]}.${totalPeopleReached[1]}${totalPeopleReached[2]}  Million`



  //Displaying this on the scetion that as the map
  peopleReached.textContent = peopleReachedData


  ///////////////////////////////////////
  //TIPPY.JS LOGIC FOR THE MAP
  //////////////////////////////////////

  countries.forEach(country => {
    const countryName = country.getAttribute('name')
    const people = country.dataset.content
    // console.log(countryName, people);

    tippy(country, {
      content:
        `<div class="flex flex-col gap-xxs items-start ">
    <span class=" font-bold text-body font-heading">${countryName}</span>
    <span class="text-body">People Reached: ${people}</span>
    </div>`,
      placement: 'top',
      theme: 'custom',
      arrow: true,
      animation: 'scale',
      allowHTML: true,
      maxWidth: 400,
      delay: [0, 0],
      duration: 0,
    })
  })

  return peopleReachedData;
}

///////////////////////////////////////
//GET THE DATA-TAB ATTRIBUTE OF THE CLICKED BUTTON AND SAVE
//////////////////////////////////////
function getDataAttributes() {
  const campaignBtn = document.querySelectorAll('.camp-btn')

  campaignBtn.forEach(cur => {
    cur.addEventListener('click', (e) => {
      const btnClicked = e.target.dataset.tab
      sessionStorage.setItem('scrollTab', btnClicked)
      window.location.href = '/campaigns'
    })
  })
}

///////////////////////////////////////
//FORM LOGIC FOR GOOD USER EXPERIENCE
//////////////////////////////////////

function formLogicInit() {
  const inputs = document.querySelectorAll('input')
  const formBtn = document.querySelector('form button')

  formBtn.addEventListener('click', (e) => {
    e.preventDefault()

  })

  window.addEventListener('beforeunload', (e) => {
    const filled = [...inputs].some(input => input.value !== '')
    if (filled) e.returnValue = ''

  })

}


///////////////////////////////////////
//VOLUNTEERS CAOUSELS LOGIC
//////////////////////////////////////
function VolunteerCarouselInit() {
  //Global fumction for this scope
  const sliderContents = document.querySelectorAll('.slider-content')
  const maxSlides = sliderContents.length
  const btnLeft = document.querySelector('.btn-left')
  const btnRight = document.querySelector('.btn-right')
  const dotContainer__Index = document.querySelector('.dots')
  let curSlide = 0

  function goToSlide(slide) {
    sliderContents.forEach((cur, i, arr) => {
      cur.style.transform = `translateX(${100 * (i - slide)}%)`

      //add active slides to the matched el
      if (cur === arr[slide]) {
        cur.classList.add('active-slide')
      } else {
        cur.classList.remove('active-slide')
      }

      //remove the Vol-btn based on the specified condition
      if (cur.classList.contains('active-slide')) {
        const innerSlide = cur.querySelector('.slider-inner')
        if (!innerSlide.querySelector('.Vol-hover')) {
          innerSlide.insertAdjacentHTML('beforeend', `<button class=" cta-btn Vol-hover transition-all vol-slide-btn  duration-2000 ease-in-out volunteer-slide-btn">Volunteer
              Now</button>`)
        }


      } else {
        const volBtn = cur.querySelector('.Vol-hover')
        if (volBtn)
          volBtn.remove()
      }

    })

  }


  function moveSlideRight() {

    if (curSlide === maxSlides - 1) {
      curSlide = 0
    } else {
      curSlide++
    }
    goToSlide(curSlide)
    activateCarouselDots(curSlide)

  }

  function moveSlideLeft() {
    //Added the logic to check for the width (dynamic calculations based on the width )
    if (curSlide === 0) {
      curSlide = maxSlides - 1
    } else {

    } curSlide--
    activateCarouselDots(curSlide)
    goToSlide(curSlide)
  }

  function CreateCarouselDots() {
    sliderContents.forEach((__, i) => {
      dotContainer__Index.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }


  function activateCarouselDots(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }


  dotContainer__Index.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide)
      goToSlide(curSlide)
      activateCarouselDots(curSlide)
    }
  })

  //ADDING KEYBOARD EVENT FOR ASSECCIBILITY
  document.addEventListener('keydown', (e) => {
    //Using short  circuting (returns the first flasy value so tsi only runs when e.key === arrowright become true )
    e.key === 'ArrowRight' && moveSlideRight()
    e.key === 'ArrowLeft' && moveSlideLeft()
  })


  //SWIPE ACTION LOGIC FROM SMALL SCREEN
  function swipeFeature() {
    let startX = 0
    sliderContents.forEach(cur => {
      cur.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX
      })

      cur.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX
        const diff = endX - startX

        if (diff > 50)
          moveSlideLeft()

        if (diff < -50)
          moveSlideRight()
      })

    })
  }


  (() => {
    swipeFeature()
    goToSlide(0)
    CreateCarouselDots()
    activateCarouselDots(0)
  })()

  // EVENT LISTENERS
  btnRight.addEventListener('click', moveSlideRight)
  btnLeft.addEventListener('click', moveSlideLeft)


}





