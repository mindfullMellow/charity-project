'use strict'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // base styles

///////////////////////////////////////////
//GLOBAL VARIABLES
///////////////////////////////////////////
const dataArr = []
const peopleReached = document.querySelector('.people-reached')
const countries = document.querySelectorAll('.country')
const MenuBtn = document.querySelector('.btn-mobile-nav')
const sectionHero = document.querySelector('.section-hero')
const headerEl = document.querySelector('.header')
const headerHeight = headerEl.getBoundingClientRect().height
const AllSections = Array.from(document.querySelectorAll('section'))
const selectedSection = AllSections.filter(cur => !cur.classList.contains('section-hero'))


///////////////////////////////////////////
//ADDING THE STICKY NAV
///////////////////////////////////////////

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`
}


//create the observer 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) { headerEl.classList.add('sticky') } else {
      headerEl.classList.remove('sticky')
    }
  })
}, options)

observer.observe(sectionHero)

/////////////////////////////////////////////////////
//DOM MANIPULATION LOGIC
////////////////////////////////////////////////////

//MOBILE NAV LOGIC
MenuBtn.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open')
})

///////////////////////////////////////////
//REVEALING ELEMNTS ON SCROLL
///////////////////////////////////////////

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

/////////////////////////////////////////////////////
//PEOPLE REACHED SECTION LOGIC
////////////////////////////////////////////////////
countries.forEach(cur => {
  if (cur.dataset.content.includes('million')) {
    const millionvar = parseFloat(cur.dataset.content) * 1000000
    dataArr.push(millionvar)
  } else {
    dataArr.push(parseFloat(cur.dataset.content.replace(/,/g, ""), 10))
  }

})
const totalPeopleReached = dataArr.reduce((acc, cur) => acc + cur, 0).toString()

if (totalPeopleReached.length === 7) {
  peopleReached.textContent = `${totalPeopleReached[0]}.${totalPeopleReached[1]}${totalPeopleReached[2]}  Million`
}


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







//code to get full year
const currentYear = new Date().getFullYear()
document.getElementById('year').textContent = currentYear