'use strict'
import * as utils from "./js/utilis"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // base styles

///////////////////////////////////////////
//GLOBAL VARIABLES
///////////////////////////////////////////
function mainJsInit() {
  const sectionHero = document.querySelector('.section-hero')

  utils.addStickyNav(sectionHero)
  utils.mobileNav()
  // utils.revealElementsOnScroll()
  document.getElementById('year').textContent = utils.getFullYear()
}
mainJsInit()

/////////////////////////////////////////////////////
//PEOPLE REACHED SECTION LOGIC
////////////////////////////////////////////////////
export function peopleReachedInit() {
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

peopleReachedInit()

console.log(peopleReachedInit());

///////////////////////////////////////
//GET THE DATA-TAB TTRUCUTE OF THE CLICKED BUTTON AND SAVE
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
getDataAttributes()

///////////////////////////////////////
//FORM LOGIC FOR GOOD USER EXPERIENCE
//////////////////////////////////////

function formLogicInit() {
  const inputs = document.querySelectorAll('input')
  const formBtn = document.querySelector('form button')
  console.log(formBtn);

  formBtn.addEventListener('click', (e) => {
    e.preventDefault()

  })



  window.addEventListener('beforeunload', (e) => {
    const filled = [...inputs].some(input => input.value !== '')
    if (filled) e.returnValue = ''

  })

}
formLogicInit()


///////////////////////////////////////
//VOLUNTEERS CAOUSELS LOGIC
//////////////////////////////////////
const sliderContents = document.querySelectorAll('.slider-content')
const maxSlides = sliderContents.length
const btnLeft = document.querySelector('.btn-left')
const btnRight = document.querySelector('.btn-right')
let curSlide = 1

function goToSlide(slide) {
  sliderContents.forEach((cur, i) => {
    cur.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}


goToSlide(0)

function moveSlideRight() {

  if (window.innerWidth < 680 && curSlide === maxSlides - 1) {
    curSlide = 0
  } else if (window.innerWidth > 680 && curSlide === maxSlides - 3) {
    curSlide = 0
  } else {
    curSlide++
  }
  goToSlide(curSlide)
}

function moveSlideLeft() {
  //Added the logic to check for the width (dynamic calculations based on the width )
  if (window.innerWidth < 680 && curSlide === 0) {
    curSlide = maxSlides - 1
  } else if (window.innerWidth > 680 && curSlide === 0) {
    curSlide = maxSlides - 3
  } else {
    curSlide--
  }

  goToSlide(curSlide)
}


btnRight.addEventListener('click', moveSlideRight)

btnLeft.addEventListener('click', moveSlideLeft)


//adding keyboard event for accessibilty 
document.addEventListener('keydown', (e) => {
  //Using short  circuting (returns the first flasy value so tsi only runs when e.key === arrowright become true )
  e.key === 'ArrowRight' && moveSlideRight()
  e.key === 'ArrowLeft' && moveSlideLeft()
})

/////////////////////////////////////
//swipe action for small screens 
////////////////////////////////
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