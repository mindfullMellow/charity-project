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

    utils.ModalInit()
    utils.volunteerModalInit()

    //Adding sticky nav
    utils.addStickyNav(document.querySelector('.news-hero-section'))


    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

  })
//////////////////////////
//working on the input(uponn creation f the json file or  this news elements make the serch button real to search for each content)
//////////////////////////
function searchInputInit() {
  const searchInput = document.getElementById('search')
  const clearBtn = document.querySelector('.clear-btn')
  console.log(searchInput);

  searchInput.addEventListener('input', () => {
    let text = searchInput.value

    if (text.length >= 1) {
      clearBtn.classList.replace('hidden', 'flex')
    } else {
      clearBtn.classList.replace('flex', 'hidden')
    }
  })

  clearBtn.addEventListener('click', () => {
    searchInput.value = ''
    clearBtn.classList.replace('flex', 'hidden')
  })
}
searchInputInit()



//////////////////////////
//Pagination initialization
/////////////////////////
function paginationInit() {
  const newsSlide = document.querySelectorAll('.news-slide')
  const newsSlider = document.querySelector('.news-slider')
  const btnRight = document.querySelector('.btn-pagin-right')
  const btnLeft = document.querySelector('.btn-pagin-left')
  let curNewSlide = 0
  const maxNewsSlides = newsSlide.length
  const paginationContainer = document.querySelector('.span-pagination')

  function goToSlide(slide) {
    newsSlide.forEach((cur, i) => {
      cur.style.transform = `translateX(${100 * (i - slide)}%)`
    })
  }
  //default slide placment
  goToSlide(0)

  //Create the pagintions numbers dynamically
  function createSlideNum() {
    newsSlide.forEach((_, i) => {
      paginationContainer.insertAdjacentHTML('beforeend', `<span class="pagin-no active-no transition-all duration-500 ease-linear cursor-pointer" data-slide="${i}">${i + 1}</span>`)
    })
  }
  createSlideNum()

  //function to ativate the paginno baside on which slides we currently on
  function activateSpanEl(slide_no) {
    const paginNums = document.querySelectorAll('.pagin-no')

    paginNums.forEach((cur) => {
      cur.classList.remove('active-no')
    })


    document.querySelector(`.pagin-no[data-slide="${slide_no}"]`).classList.add('active-no')
  }

  //default active no
  activateSpanEl(0)

  //This make the observer updates based on the cntent in each slide
  function observeTheNewSlide(slide) {
    document.querySelector('.news-h3').scrollIntoView({ behavior: 'smooth', block: 'start' })
    resizeObserver.disconnect()
    resizeObserver.observe(newsSlide[slide])
  }


  function moveRight() {
    if (curNewSlide === maxNewsSlides - 1) {
      curNewSlide = 0
    } else {
      curNewSlide++
    }
    observeTheNewSlide(curNewSlide)
    goToSlide(curNewSlide)
    activateSpanEl(curNewSlide)
  }


  function moveLeft() {
    if (curNewSlide === 0) {
      curNewSlide = maxNewsSlides - 1
    } else {
      curNewSlide--
    }

    observeTheNewSlide(curNewSlide)
    goToSlide(curNewSlide)
    activateSpanEl(curNewSlide)
  }

  //Added a resize observer to first calculate the size of the news-slde and then the newsslider uses that height for its container height this would  always be responsive 

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(cur => {
      console.log('Height changed to:', cur.target.offsetHeight);

      newsSlider.style.height = cur.target.offsetHeight + "px"
    })
  })

  resizeObserver.observe(newsSlide[0])

  // newsSlide.forEach(cur => {
  //   resizeObserver.observe(cur)
  // })




  //paginatiion logic
  btnRight.addEventListener('click', moveRight
  )


  btnLeft.addEventListener('click', moveLeft
  )


  //Making the pagination clickable
  paginationContainer.addEventListener('click', (e) => {
    //Find the clicked elemnt
    if (e.target.classList.contains('pagin-no')) {
      // This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curNewSlide = Number(e.target.dataset.slide)

      observeTheNewSlide(curNewSlide)
      goToSlide(curNewSlide)
      activateSpanEl(curNewSlide)

    }
  })


  //Swipe actions for small screens 
  // let startX = 0
  // newsSlide.forEach(cur => {
  //   cur.addEventListener('touchstart', e => {
  //     startX = e.touches[0].clientX
  //   })

  //   cur.addEventListener('touchend', e => {
  //     const endX = e.changedTouches[0].clientX
  //     const diff = endX - startX

  //     if (diff > 40)
  //       moveLeft()

  //     if (diff < -40)
  //       moveRight()
  //   })
  // })

}
paginationInit()
