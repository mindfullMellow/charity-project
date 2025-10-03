'use strict'


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
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS THIS HTML BEING FECTHED SHOULD BE HERE 
    const headerEl = document.querySelector('.header')
    const MenuBtn = document.querySelector('.btn-mobile-nav')
    console.log(MenuBtn);
    //MOBILE NAV LOGIC
    MenuBtn.addEventListener('click', () => {
      headerEl.classList.toggle('nav-open')
    })
  })














