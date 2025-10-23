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
          innerSlide.insertAdjacentHTML('beforeend', `<a href="#" class=" cta-btn Vol-hover transition-all duration-2000 ease-in-out">Volunteer
              Now</a>`)
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

///////////////////////////////////////
//MODAL LOGIC
//////////////////////////////////////

function ModalInit() {
  //Variables
  let isActive = false
  const donateBtns = document.querySelectorAll('.donate')
  const closeBtn = document.getElementById('close-modal-btn')
  const goBackBtn = document.getElementById('go-back-btn')
  const modal = document.querySelector('.donation-modal')
  const modal__2 = document.querySelector('.donation-modal-2')
  const modal__3 = document.querySelector('.donation-modal-3')
  const modal__4 = document.querySelector('.donation-modal-4')
  const modal__5 = document.querySelector('.donation-modal-5')
  const modal__6 = document.querySelector('.donation-modal-6')
  const modal__7 = document.querySelector('.donation-modal-7')
  const modal__8 = document.querySelector('.donation-modal-8')
  const loadingDetails = document.querySelector('.waiting-details')
  const allMainModalEl = Array.from(modal.querySelectorAll('*'))
  const othersInput = document.querySelector('.others-input')
  const overlay = document.querySelector('.overlay')
  const headerEl = document.querySelector('.header')
  const btnContainer = document.querySelector('.btn-container')
  const tabBtns = document.querySelectorAll('.btn-tabs')
  const donationAmounts = document.querySelectorAll('.donation-amount')
  const donationAmountsContainer = document.querySelector('.donation-amount-container')
  const donationInput = document.querySelector('.donation-input-0')
  const donationCustomInput = donationInput.querySelector('input')
  const inputErrMessage = donationInput.querySelector('span')
  const paymentContent = document.querySelector('.payment-method-content')
  const paymentMethod = paymentContent.querySelectorAll('span')
  const durationContext = document.getElementById('duration')
  const amountContext = document.getElementById('amount')
  const mainModalBtn = document.querySelector('.main-modal-btn')
  const modal_2_btn = document.querySelector('.modal-2-btn')
  const modal_4_btn = modal__4.querySelector('button')
  const sumbitEmail_modal5 = document.querySelector('.modal-5-form-submission')
  const closeModal_5Btn = document.getElementById('close-modal-btn-2')
  const mdodal_7_btn = modal__7.querySelector('button')
  const closePaymentErr = modal__8.querySelector('#close-payment-err')
  const goBackToDonationModal = modal__8.querySelector('.back-to-donation')
  console.log(closePaymentErr);


  //Reuseable Function blocks
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

  function tabsInit(index) {
    tabBtns.forEach((__, _, arr) => {
      const tab = arr[index]

      tab.classList.add('active-tab')
      tab.dataset.tab = 'donation-type'

    })
  }

  function DonationAmountsInit(index) {


    donationAmounts.forEach((_, __, arr) => {
      const amountTab = arr[index]

      amountTab.classList.add('active-tab');
      amountTab.dataset.tab = 'donation-amount'
    })
  }

  function DonationMethodInit(index) {
    paymentMethod.forEach((_, __, arr) => {
      const methodTab = arr[index]

      methodTab.classList.add('active-tab')
      methodTab.dataset.tab = 'donation-method'
    })
  }

  const avoidLeavingThePageMistakenly = (e) => {
    e.preventDefault()
    e.returnValue = ''
  }

  function clearHelpers(sessionStoragevar = false) {
    if (isActive) {
      window.removeEventListener('beforeunload', avoidLeavingThePageMistakenly)
    }

    if (sessionStoragevar)
      sessionStorage.removeItem('donationDetails')
  }


  (() => {
    tabsInit(0)
    DonationAmountsInit(3)
    DonationMethodInit(3)
  })()







  ////////////////////////////////////////
  //  DONATION MODAL (STEP 1) LOGIC
  ///////////////////////////////////////
  //switching the payment-method tabs 
  paymentContent.addEventListener('click', (e) => {
    if (!e.target.classList.contains('payment-span')) return

    const clickedMethod = e.target

    paymentMethod.forEach((cur, i) => {
      cur.classList.remove('active-tab');
      delete cur.dataset.tab

      if (cur === clickedMethod) {
        DonationMethodInit(i)
      }
    })
  })

  //switching the donation-amount tabs 
  donationAmountsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('payment-span')) return;
    const clickedAmount = e.target

    donationAmounts.forEach((cur, i) => {
      cur.classList.remove('active-tab');
      delete cur.dataset.tab

      if (cur === clickedAmount) {
        DonationAmountsInit(i)
      }

      if (cur.classList.contains('active-tab') && cur.textContent === 'others') {
        amountContext.textContent = ''
        donationInput.classList.remove('hidden')
        donationCustomInput.value = ''

      } else {
        donationInput.classList.add('hidden')
      }
    })

    if (clickedAmount.dataset.amount !== 'others') {
      amountContext.textContent = clickedAmount.textContent
    } else {

      donationCustomInput.addEventListener('input', () => {
        if (donationCustomInput.value.length <= 5) {

          const testing = Number(donationCustomInput.value)
          amountContext.textContent = '$' + testing.toLocaleString()
          if (!inputErrMessage.classList.contains('hidden'))
            inputErrMessage.classList.add('hidden')
        } else {
          donationCustomInput.value = donationCustomInput.value.slice(0, 5)
          inputErrMessage.classList.remove('hidden')
        }
      })
    }



  })

  //switching the tabs 
  btnContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-tabs')) return;

    const clickedTab = e.target

    //Loop to switch tabs 
    tabBtns.forEach((cur, i) => {
      cur.classList.remove('active-tab')
      delete cur.dataset.tab

      if (cur === clickedTab) {
        tabsInit(i)
      }

      if (cur.classList.contains('active-tab') && cur.textContent === 'Monthly Donation') {
        donationAmounts.forEach(cur => {
          cur.textContent = cur.dataset.monthly

        }
        )
      } else {
        donationAmounts.forEach(cur => {
          cur.textContent = cur.dataset.amount
        })
      }

    })

    // after switcing the tab get the payment amount with the active tab and update its textcontent to the btn modal btn 
    donationAmounts.forEach(cur => {
      if (!cur.classList.contains('active-tab')) return;

      if (cur.classList.contains('active-tab'))
        amountContext.textContent = cur.textContent

      if (amountContext.textContent === 'others') {
        amountContext.textContent = ''
        donationCustomInput.value = ''
      }

    })

    //update the modal btn base on the clickedtab
    durationContext.textContent = clickedTab.textContent === 'Monthly Donation' ? 'monthly' : 'once'
  })


  //OPENING THE MODAL 
  donateBtns.forEach(cur => {
    cur.addEventListener('click', () => {
      openModal(modal)
    })
  })

  //CLOSE THE MODAL
  closeBtn.addEventListener('click', () => closeModal(modal))

  //ADDINGG KEYBOARD EVENTS FOR ACCESSIBILTY
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal(modal)
    }
  })

  //BUTTON SUMBMISSION
  mainModalBtn.addEventListener('click', () => {


    const datasetDetailsArr = []
    const datasetEl__textcontentArr = []
    const donationObj = {}

    if (amountContext.textContent !== '') {
      const selectedTabs = allMainModalEl.filter(cur => cur.dataset.tab)

      //loop to sout ut the dataset content and textcontent
      selectedTabs.forEach(cur => {
        datasetDetailsArr.push(cur.dataset.tab)

        if (cur.textContent === 'others') {
          const customInput = '$' + donationCustomInput.value
          datasetEl__textcontentArr.push(customInput)
        } else {
          datasetEl__textcontentArr.push(cur.textContent)
        }
      })

      //loop to put the sorted data into the object
      for (let i = 0; i < datasetDetailsArr.length; i++) {
        donationObj[datasetDetailsArr[i]] = datasetEl__textcontentArr[i]
      }

      sessionStorage.setItem('donationDetails', JSON.stringify(donationObj))
      console.log(sessionStorage);

      //fix the elment into the textcontent
      (() => {
        document.getElementById('donation-type').textContent = donationObj["donation-type"]
        const amount = Number(donationObj['donation-amount'].replace(/[^0-9.]/g, '')).toLocaleString();
        document.getElementById('donation-amount').textContent = '$' + amount;
        document.getElementById('donation-method').textContent = donationObj['donation-method']
      })()
    }

    //close the modal and open step 2 modal
    if (amountContext.textContent === '') {
      console.log('others is empty');
      othersInput.classList.replace('border-border-b-color', 'border-red-500')
      setTimeout(() => {
        othersInput.classList.replace('border-red-500', 'border-border-b-color')
      }, 2000)
    };
    if (amountContext.textContent !== '') {
      closeModal(modal)
      openModal(modal__2)
    }


  })

  ////////////////////////////////////////
  //  DONATION MODAL (STEP 2) LOGIC
  ///////////////////////////////////////

  goBackBtn.addEventListener('click', () => {
    closeModal(modal__2)
    openModal(modal)
  })

  modal_2_btn.addEventListener('click', () => {
    //incase the user tries to leave right after the payment details has been displayed
    if (!isActive) {
      window.addEventListener('beforeunload', avoidLeavingThePageMistakenly)
      isActive = true
    }

    const donationDetails = JSON.parse(sessionStorage.getItem('donationDetails'))
    const userPickedOneTimeDonation = donationDetails["donation-type"] === 'One-time Donation'
    // console.log(donationDetails, userPickedOneTimeDonation);


    //Check the donation method
    if (userPickedOneTimeDonation) {
      closeModal(modal__2)
      openModal(modal__3)
    } else {
      closeModal(modal__2)
      openModal(modal__3)

      setTimeout(() => {
        closeModal(modal__3)
        openModal(modal__7)
      }, getRandomNumbers(3, 6) * 1000)
    }


    if (donationDetails['donation-method'] === 'Crypto' && userPickedOneTimeDonation) {
      document.getElementById('amount-to-send').textContent = donationDetails['donation-amount']
      const getTime = getRandomNumbers(1, 8)
      console.log(getTime);
      if (getTime > 4) {
        loadingDetails.classList.remove('hidden')
      }
      setTimeout(() => {
        closeModal(modal__3)
        openModal(modal__4)
      }, getTime * 1000)
    }

    if (donationDetails['donation-method'] !== 'Crypto' && userPickedOneTimeDonation) {

      loadingDetails.textContent = `Searching for an online ${donationDetails['donation-method']} broker available in your region. Please wait…`

      setTimeout(() => {
        loadingDetails.classList.remove('hidden')
      }, getRandomNumbers(3, 5) * 1000)


      setTimeout(() => {
        closeModal(modal__3)
        openModal(modal__8)
      }, getRandomNumbers(11, 20) * 1000)

    }
  })


  ////////////////////////////////////////
  //  DONATION MODAL (STEP 4) LOGIC
  ///////////////////////////////////////
  modal_4_btn.addEventListener('click', () => {
    sessionStorage.removeItem('donationDetails')
    console.log(sessionStorage);
    closeModal(modal__4)
    openModal(modal__5)
  })

  ////////////////////////////////////////
  //  DONATION MODAL (STEP 5) LOGIC
  ///////////////////////////////////////
  sumbitEmail_modal5.addEventListener('click', (e) => {
    e.preventDefault();
    clearHelpers(false)

    const formInput = document.querySelector('.submit-email-input')

    if (formInput.value !== '') {
      closeModal(modal__5)
      openModal(modal__6)
    } else {
      formInput.classList.replace('border-border-b-color', 'border-red-500')
      setTimeout(() => {
        formInput.classList.replace('border-red-500', 'border-border-b-color')
      }, 2000)
    }


  })

  closeModal_5Btn.addEventListener('click', () => {
    closeModal(modal__5)
    //Remove the listener
    clearHelpers()
  })



  ////////////////////////////////////////
  //  DONATION MODAL (STEP 7) LOGIC
  ///////////////////////////////////////
  mdodal_7_btn.addEventListener('click', () => {
    closeModal(modal__7)
    clearHelpers(true)
  })

  ////////////////////////////////////////
  //  DONATION MODAL (STEP 8) LOGIC
  ///////////////////////////////////////
  closePaymentErr.addEventListener('click', () => {
    clearHelpers(true)
    closeModal(modal__8)
  })

  goBackToDonationModal.addEventListener('click', () => {
    clearHelpers(true)

    closeModal(modal__8)
    openModal(modal)
  })
}



//IIEF to invoke the initailization functions on page load
(() => {
  VolunteerCarouselInit()
  formLogicInit()
  getDataAttributes()
  peopleReachedInit()
  mainJsInit()
  ModalInit()
})();

function getRandomNumbers(lowerRange, higherRange) {
  // return Math.floor((Math.random() * (higherRange - lowerRange) + 1) + lowerRange)
  const min = lowerRange;
  const max = higherRange;
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  const num = min + (randomArray[0] % (max - min + 1));
  return num
}



// setInterval(() => {
//   console.log(getRandomNumbers(3, 8));
// }, getRandomNumbers(3, 8) * 1000)
