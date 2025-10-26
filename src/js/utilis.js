"use strict"

/////////////////////////////////////////////////////
//DOM MANIPULATION LOGIC
////////////////////////////////////////////////////

//MOBILE NAV LOGIC
export function mobileNav() {
  const headerEl = document.querySelector('.header')
  const MenuBtn = document.querySelector('.btn-mobile-nav')

  MenuBtn.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open')
  })
}



///////////////////////////////////////////
//REVEALING ELEMNTS ON SCROLL
///////////////////////////////////////////
export function revealElementsOnScroll() {
  const AllSections = Array.from(document.querySelectorAll('section'))
  const selectedSection = AllSections.filter(cur => !cur.classList.contains('section-hero') && !cur.classList.contains('quote-section') && !cur.classList.contains('statistic-section'))

  const reavealSection = function (entries, observer) {
    const [entry] = entries


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
}

///////////////////////////////////////////
//ADDING THE STICKY NAV
///////////////////////////////////////////
export function addStickyNav(sectionHero) {
  const headerEl = document.querySelector('.header')
  const mainEl = document.querySelector('main')
  const headerHeight = headerEl.getBoundingClientRect().height

  const observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (!entry.isIntersecting) {
      headerEl.classList.add('sticky')
      mainEl.style.paddingTop = `${headerHeight}px`
    } else {
      headerEl.classList.remove('sticky')
      mainEl.style.paddingTop = '0'
    }
  }, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`
  })

  observer.observe(sectionHero)
}

///////////////////////////////////////
//MODAL LOGIC
//////////////////////////////////////

export function ModalInit() {
  //Variables
  let isActive = false
  const btcAddy = 'bc1qua7wfskvt0fde3h434cv3gmnpq2pwcasc7tej0'
  const walletAddy = document.querySelector('.wallet-addy')

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
  const modal_4_btn = modal__4.querySelector('.deposit-confirmation')
  const sumbitEmail_modal5 = document.querySelector('.modal-5-form-submission')
  const closeModal_5Btn = document.getElementById('close-modal-btn-2')
  const mdodal_7_btn = modal__7.querySelector('button')
  const closePaymentErr = modal__8.querySelector('#close-payment-err')
  const goBackToDonationModal = modal__8.querySelector('.back-to-donation')
  const copyBtn = document.querySelector('.copyBtn')



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

    if (sessionStoragevar) {
      sessionStorage.removeItem('donationDetails')
    }
    console.log(sessionStorage)
  }
  ;

  function maskMiddle(s, start = 8, end = 8) {
    if (!s || s <= start + end) return s
    return s.slice(0, start) + '******' + s.slice(-end)
  }

  function getRandomNumbers(lowerRange, higherRange) {
    // return Math.floor((Math.random() * (higherRange - lowerRange) + 1) + lowerRange)
    const min = lowerRange;
    const max = higherRange;
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const num = min + (randomArray[0] % (max - min + 1));
    return num
  }


  //call the init function to place the active ta respectively
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
  closeBtn.addEventListener('click', () => {
    closeModal(modal)

  })

  //ADDINGG KEYBOARD EVENTS FOR ACCESSIBILTY
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal(modal)
      console.log(e.key);
    }

    if (e.key === 'ArrowLeft' && !modal__2.classList.contains('hidden') || e.key === 'Backspace' && !modal__2.classList.contains('hidden')) {
      clearHelpers(true)
      closeModal(modal__2)
      openModal(modal)
    }

    if (e.key === 'Escape' && !modal__5.classList.contains('hidden')) {
      closeModal(modal__5)
      clearHelpers()
    }

    if (e.key === 'Escape' && !modal__6.classList.contains('hidden')) {
      closeModal(modal__6)
    }

    if (e.key === 'Escape' && !modal__7.classList.contains('hidden')) {
      closeModal(modal__7)
      clearHelpers(true)
    }

    if (e.key === 'Escape' && !modal__8.classList.contains('hidden')) {
      closeModal(modal__8)
      clearHelpers(true)
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
    clearHelpers(true)
  })

  modal_2_btn.addEventListener('click', () => {
    //incase the user tries to leave right after the payment details has been displayed
    if (!isActive) {
      window.addEventListener('beforeunload', avoidLeavingThePageMistakenly)
      isActive = true
    }


    const donationDetails = JSON.parse(sessionStorage.getItem('donationDetails'))
    const userPickedOneTimeDonation = donationDetails["donation-type"] === 'One-time Donation'


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

    walletAddy.textContent = maskMiddle(btcAddy)
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

  copyBtn.addEventListener('click', async () => {
    try {
      navigator.clipboard.writeText(btcAddy)
      copyBtn.classList.replace('bg-white-accent', 'bg-header-color/60')
      copyBtn.querySelector('.copy-address').classList.add('hidden')
      copyBtn.querySelector('.copy-icon').classList.add('hidden')
      copyBtn.querySelector('.copy-msg').classList.remove('hidden')

      setTimeout(() => {
        copyBtn.classList.replace('bg-header-color/60', 'bg-white-accent')
        copyBtn.querySelector('.copy-address').classList.remove('hidden')
        copyBtn.querySelector('.copy-icon').classList.remove('hidden')
        copyBtn.querySelector('.copy-msg').classList.add('hidden')
      }, 1500)
    } catch (e) {
      console.log(e);
    }
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

///////////////////////////////////////
// VOLUNTEER MODAL LOGIC
//////////////////////////////////////
export function volunteerModalInit() {
  const overlay = document.querySelector('.overlay')
  const headerEl = document.querySelector('.header')
  const signupSection = document.querySelector('.sign-up-section')
  const volunteerBtns = Array.from(document.getElementsByClassName('volunteer'))
  const loadingModal = document.querySelector('.donation-modal-3')
  const loadingDetails = loadingModal.querySelector('.waiting-details')
  const vol_modal_1 = document.querySelector('.volunteer-modal-1')
  const vol_modal_1CloseBtn = vol_modal_1.querySelector('#close-vol-err')
  const vol_modal_1DonateBtn = vol_modal_1.querySelector('.donate-btn')
  const vol_modal_1UpdateBtn = vol_modal_1.querySelector('.update-btn')
  const vol_modal_2 = document.querySelector('.volunteer-modal-2')
  const vol_modal_2Btn = vol_modal_2.querySelector('button')
  const vol_modal_3 = document.querySelector('.volunteer-modal-3')
  const vol_modal_3Input = vol_modal_3.querySelector('form input')
  const vol_modal_3Btn = vol_modal_3.querySelector('form button')
  const closeVolModal = document.querySelector('#close-vol-modal')
  const sliderContainer = document.querySelector('.slider-container')


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


  function getRandomNumbers(lowerRange, higherRange) {
    // return Math.floor((Math.random() * (higherRange - lowerRange) + 1) + lowerRange)
    const min = lowerRange;
    const max = higherRange;
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const num = min + (randomArray[0] % (max - min + 1));
    return num
  }

  function modalInit(e) {
    e.preventDefault(e)
    openModal(loadingModal)

    //Get the user country 
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        console.log(data.country_name);
        const UserCountry = data.country_name

        if (UserCountry === 'United States') {
          closeModal(loadingModal)
          openModal(vol_modal_3)
        } else {
          setTimeout(() => {
            closeModal(loadingModal)
            openModal(vol_modal_1)
          }, getRandomNumbers(3, 6) * 1000)

        }

      })
  }


  //Opening the modal
  volunteerBtns.forEach(cur => cur.addEventListener('click', (e) => modalInit(e)))

  vol_modal_1CloseBtn.addEventListener('click', () => closeModal(vol_modal_1))

  vol_modal_1DonateBtn.addEventListener('click', () => {
    closeModal(vol_modal_1)
    openModal(document.querySelector('.donation-modal'))
  })

  vol_modal_1UpdateBtn.addEventListener('click', () => {
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
      closeModal(vol_modal_1)
      signupSection.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = '/sign-up'
    }
  })

  vol_modal_2Btn.addEventListener('click', () => closeModal(vol_modal_2))

  vol_modal_3Btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (vol_modal_3Input.value === '') {
      vol_modal_3Input.classList.replace('border-border-b-color', 'border-red-500')

      setTimeout(() => {
        vol_modal_3Input.classList.replace('border-red-500', 'border-border-b-color')
      }, 2000)
    } else {
      closeModal(vol_modal_3)
      openModal(loadingModal)

      setTimeout(() => {
        closeModal(loadingModal)
        openModal(vol_modal_2)
      }, getRandomNumbers(3, 5) * 1000)
    }

  })

  closeVolModal.addEventListener('click', () => closeModal(vol_modal_3))


  // use event delegation to add the modalto the volunteer in the home page slide btn 

  if (sliderContainer) {
    sliderContainer.addEventListener('click', (e) => {

      const clickedCard = e.target

      if (!clickedCard.classList.contains('volunteer-slide-btn')) return;

      if (clickedCard.classList.contains('volunteer-slide-btn'))
        modalInit(e)


    })
  }
}



//code to get full year
export function getFullYear() {
  const currentYear = new Date().getFullYear()
  return currentYear
}

