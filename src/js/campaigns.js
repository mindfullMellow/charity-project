'use strict'
import * as utils from './utilis'

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

    //Adding sticky nav
    utils.addStickyNav(document.querySelector('.campaign-hero-section'))

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

  })


///////////////////////////////////////
//switching tab
const tabContainer = document.getElementById('tab-container');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContent = document.querySelectorAll('.tab-content')
function addOpacityToBtns() {
  tabBtns.forEach(cur => {
    if (!cur.classList.contains('active-tab'))
      cur.classList.add('opacity-80')

  })
}


//First add opacity to the non active class
addOpacityToBtns()



tabContainer.addEventListener('click', (e) => {

  //I couldnt figure out using opacity because the  elemnts still shows so i added a slight delay 
  setTimeout(() => {
    //Making sure we get  a result only when the el with the "tab-btn" is clicked
    if (!e.target.classList.contains('tab-btn')) return;

    //Find the target
    const target = e.target

    //find the elment that its id is the same as the clicked/active btn data-tab
    const targetContent = target.closest('.parent-container').querySelector(`#${target.dataset.tab}`)


    //Check if target has the active class
    if (target.classList.contains('active-tab')) return;


    //remove the opacity and active class from the btns
    tabBtns.forEach(cur => cur.classList.remove('active-tab', 'opacity-80'))

    //add active class to the clicked btn
    target.classList.add('active-tab')

    //add opacity to the non-active tab 
    addOpacityToBtns()

    //remove the hidden class from all the tab content 
    tabContent.forEach(cur => cur.classList.remove('hidden'))

    //if the tab content id doesnt match the clickedbtn/target dataset add the hidden class
    tabContent.forEach(cur => {
      if (cur.id !== targetContent.id)
        cur.classList.add('hidden')
    })
  }, 50)

});
