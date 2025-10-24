'use strict'
import * as utils from './utilis'

fetch('../../index.html').then(res => res.text())
  .then(data => {
    //convert the fecthed html string into a DOM 
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');


    // get the <header> element from that HTML
    const header = doc.querySelector('header');
    const modalComponents = doc.querySelector('.modal-components')
    const footer = doc.querySelector('footer')

    // add it to the current page
    if (header) document.body.prepend(header); // or appendChild
    if (modalComponents) document.querySelector('main').after(modalComponents)
    if (footer) document.querySelector('.modal-components').after(footer)
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS ON THIS HTML BEING FECTHED SHOULD BE HERE 

    //MOBILE NAV LOGIC
    utils.mobileNav()


    //Adding sticky nav
    // utils.addStickyNav(document.querySelector('.campaign-hero-section'))

    utils.ModalInit()

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

  })

///////////////////////////////////////
//LOGIC TO SCROLL TO THE CLICKED CAMPAIGN CARD FROM THE INDEX.HTML
///////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  //on page load:
  //   get tabValue from sessionStorage
  let btnClickedValue = sessionStorage.getItem('scrollTab')

  if (!btnClickedValue) return;
  // if tabValue exists:
  //         find element on page with [data - tab=tabValue]
  if (btnClickedValue) {

    const clickedValueEL = document.querySelector(`[data-tab=${btnClickedValue}]`)
    //if element found:
    //    scroll element into view smoothly
    clickedValueEL.scrollIntoView({ behavior: 'smooth' })

    clickedValueEL.classList.add('bg-border-b-color', 'rounded-lg', 'p-2')

    setTimeout(() => {
      clickedValueEL.classList.remove('bg-border-b-color', 'rounded-lg', 'p-2')
    }, 2000)


    // remove tabValue from sessionStorage
    sessionStorage.clear()

  }

})

const tabContainer = document.getElementById('tab-container')
const target = document.querySelector('.campaign-hero-section')

const observer = new IntersectionObserver(entries => {
  const entry = entries[0]
  if (!entry.isIntersecting) {
    tabContainer.classList.add('sticky', 'top-0', 'left-0', 'h-xxl')
    tabContainer.classList.replace('justify-start', 'justify-center')
  } else {
    tabContainer.classList.remove('sticky', 'top-0', 'left-0', 'h-xxl')
    tabContainer.classList.replace('justify-center', 'justify-start')
  }
}, {
  root: null,
  threshold: 0,
  rootMargin: '-124px'
}
)

observer.observe(target)


//////////////////////////////////////////////
//TAB SWITCHING LOGIC
//////////////////////////////////////////////
function switchTabInit() {
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


}
switchTabInit()


