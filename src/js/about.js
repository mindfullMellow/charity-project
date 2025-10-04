'use strict'
import * as utils from "./utilis"


const quoteHero = document.querySelector('.quote-section')

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

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

    //Adding the sticky navigation
    utils.addStickyNav(quoteHero)

    //Reaveal Elemnts on Scroll
    utils.revealElementsOnScroll()
  })











