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
  utils.revealElementsOnScroll()
  document.getElementById('year').textContent = utils.getFullYear()
}
mainJsInit()

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
}

peopleReachedInit()


///////////////////////////////////////
//GET THE DATA-TAB TTRUCUTE OF THE CLICKED BUTTON AND SAVE
//////////////////////////////////////
function getDataAttributes() {
  const campaignBtn = document.querySelectorAll('.camp-btn')
  console.log(campaignBtn);

  campaignBtn.forEach(cur => {
    cur.addEventListener('click', (e) => {
      const btnClicked = e.target.dataset.tab
      sessionStorage.setItem('scrollTab', btnClicked)
      window.location.href = '/html/campaigns.html'
      console.log(btnClicked);
    })
  })
}
getDataAttributes()
