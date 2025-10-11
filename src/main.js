'use strict'
import * as utils from "./js/utilis"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // base styles

///////////////////////////////////////////
//GLOBAL VARIABLES
///////////////////////////////////////////
const dataArr = []
const peopleReached = document.querySelector('.people-reached')
const countries = document.querySelectorAll('.country')
const sectionHero = document.querySelector('.section-hero')


// const header = document.querySelector('header')
// console.log(header);
// function HideNavOnHover(e, change = false) {
//   if (!e.target.classList.contains('nav-hover')) return;

//   const link = e.target
//   const siblings = link.closest('header').querySelectorAll('.nav-hover')


//   siblings.forEach(cur => {
//     if (cur !== link && !change) {
//       cur.classList.add('opacity-50')
//     } else {
//       cur.classList.remove('opacity-50')
//     }
//   })
// }

// header.addEventListener('mouseover', (e) => {
//   HideNavOnHover(e)
// })

// header.addEventListener('mouseout', (e) => {

//   HideNavOnHover(e, true)
// })

///////////////////////////////////////////
//ADDING THE STICKY NAV
///////////////////////////////////////////

utils.addStickyNav(sectionHero)

/////////////////////////////////////////////////////
//DOM MANIPULATION LOGIC
////////////////////////////////////////////////////

//MOBILE NAV LOGIC
utils.mobileNav()

///////////////////////////////////////////
//REVEALING ELEMNTS ON SCROLL
///////////////////////////////////////////
utils.revealElementsOnScroll()

/////////////////////////////////////////////////////
//PEOPLE REACHED SECTION LOGIC
////////////////////////////////////////////////////
let peopleReachedData;

async function peopleReachedCalc() {
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



  return peopleReachedData

}
export const DataReady = peopleReachedCalc()


//Displaying this on the scetion that as the map
peopleReached.textContent = peopleReachedData






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

// get full year from utils
document.getElementById('year').textContent = utils.getFullYear()

