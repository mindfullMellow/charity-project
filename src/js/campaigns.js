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
    const volunteerModal = doc.querySelector('.volunteer-modal-component')
    const footer = doc.querySelector('footer')

    // add it to the current page
    if (header) document.body.prepend(header); // or appendChild
    if (modalComponents) document.querySelector('main').after(modalComponents)
    if (volunteerModal) document.querySelector('.modal-components').after(volunteerModal)
    if (footer) document.querySelector('.modal-components').after(footer)
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS ON THIS HTML BEING FECTHED SHOULD BE HERE 

    //MOBILE NAV LOGIC
    utils.mobileNav()


    //Adding sticky nav
    // utils.addStickyNav(document.querySelector('.campaign-hero-section'))

    utils.ModalInit()
    utils.volunteerModalInit()

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

  });


//////////////////////////////////////////////
//LOGIC TO LOAD THE CAMPAIGN DATA FROM THE JSON
//////////////////////////////////////////////
export async function campaignJsonInit() {
  try {
    const response = await fetch('/data/campaign.json')
    const data = await response.json()

    return data
  } catch (err) {
    console.error('Error:', err)
  }

}


async function loadCampaignData() {
  try {

    const data = await campaignJsonInit()
    const currentCampaignUL = document.querySelector('.current-campaign-ul')
    const PastCampaignUL = document.querySelector('.past-campaign-ul')

    const campaignData = data["campaign-data"].sort((a, b) => parseFloat(b.progress) - parseFloat(a.progress));


    //LOOP TO CREATE THE CARDS
    campaignData.forEach(cur => {
      if (cur.status === "uncompleted") {
        const campaignCard = ` <li class="space-y-6" data-tab="${cur["data-tab"]}">
              <div class="li-grid">
                <div class="flex-1 ">
                  <img src="${cur["image"]}" alt="${cur["image-alt"]}"
                    class="campaign-img">
                </div>

                <!-- CAMPIGN CONTENT -->
                <div class="flex flex-col flex-1 gap-xs">
                  <h6 class="font-bold text-h6 font-heading">${cur["campaign-title"]}</h6>
                  <p class="text-body">${cur["campaign-text"]}</p>

                  <div class="donate-flex space-y-xxs">
                    <p class="font-semibold">Goal: ${cur["campaign-goal"]}</p>
                    <button class="current-campaign-btn">Donate</button>
                  </div>

                </div>
              </div>

              <!-- PROGRESS STATUS -->
              <div class="progress-status">

                <!-- PROGRESS CONTENT -->
                <div class="progress-content">
                  <p>Progress</p>
                  <p>${cur["progress"]}</p>
                </div>

                <!-- PROGRESS BAR -->
                <div class="progress-bar">
                  <div class="w-[45%] progress-uncompleted" style="width: ${cur["progress"]}"></div>
                </div>
              </div>

            </li>`

        currentCampaignUL.insertAdjacentHTML('beforeend', campaignCard)
      } else {

        const campaignCard2 = `<li class="space-y-6 data-tab="${cur["data-tab"]}">

              <!-- IMG ND CONTENT -->
              <div class="li-grid">
                <!-- IMG DIV -->
                <div class="flex-1 ">
                  <img src="${cur["image"]}"
                    alt="${cur["image-alt"]}" class="campaign-img">
                </div>

                <!-- CAMPIGN CONTENT -->
                <div class="flex flex-col flex-1 gap-xs">
                  <h6 class="font-bold text-h6 font-heading">${cur["campaign-title"]}</h6>
                  <p class="text-body">${cur["campaign-text"]}</p>
                  <div class="donate-flex">
                    <p class="font-semibold">Goal: ${cur["campaign-goal"]}</p>
                    <button class="past-campaign-btn">Donate</button>
                  </div>

                  <div class="completed-barge-flex">
                    <p class="font-accent">Campaign Sucessfully completed</p>
                    <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                  </div>
                </div>
              </div>

              <!-- PROGRESS STATUS -->
              <div class="progress-status">

                <!-- PROGRESS CONTENT -->
                <div class="progress-content">
                  <p>Progress</p>
                  <p>${cur["progress"]}</p>
                </div>

                <!-- PROGRESS BAR -->
                <div class="progress-bar">
                  <div class="progress-completed"></div>
                </div>
              </div>

            </li>
`
        PastCampaignUL.insertAdjacentHTML('beforeend', campaignCard2)
      }
    });





    //IIFE to invoke the init functions

    (() => {
      scrollToClickedELInit()
      makeTabstickyInit()
      switchTabInit()
    })();



  } catch (err) {
    console.error("Error loading the data:", err)
  }

}
loadCampaignData()



///////////////////////////////////////
//LOGIC TO SCROLL TO THE CLICKED CAMPAIGN CARD FROM THE INDEX.HTML
///////////////////////////////////////////
function scrollToClickedELInit() {

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
    sessionStorage.removeItem('scrollTab')

  }
}





//////////////////////////////////////////////
//LOGIC TO MAKE THE TAB CONTAINER STICKY
//////////////////////////////////////////////
function makeTabstickyInit() {
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
}




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
      if (!cur.classList.contains('active-tab=camp'))
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
      if (target.classList.contains('active-tab-camp')) return;


      //remove the opacity and active class from the btns
      tabBtns.forEach(cur => cur.classList.remove('active-tab-camp', 'opacity-80'))

      //add active class to the clicked btn
      target.classList.add('active-tab-camp')

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




//////////////////////////////////////////////
//ADDING THE "donate" KEYWORD TO EACH OF THE DONATE BTN TO ENABLE THE DONATE MODAL
//////////////////////////////////////////////
(() => {
  document.querySelectorAll('.current-campaign-btn').forEach(cur => {
    cur.classList.add('donate')
  })

})();