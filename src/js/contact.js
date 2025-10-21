'use strict';
import * as utils from './utilis'

fetch('../../index.html').then(res => res.text())
  .then(data => {
    //convert the fecthed html string into a DOM 
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    // get the <header> element from that HTML
    const header = doc.querySelector('header');
    console.log(header);
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
    utils.addStickyNav(document.querySelector('.get-in-touch-section'))


    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

  });


/////////////////////////////////
//skeleton Loader for the iframe
/////////////////////////////////

//Here i did a trick to ping or get a small file trhrugh this link if its succesfull it means the user it online so definately we wont get that default dino game but if it failes that means we are offline so remove the iframe (also i used and IIFE because the code it only expecte to run once and also not expose other things to the global scope )
(async () => {
  const iframe = document.getElementById('iframe')
  try {
    await fetch("https://www.google.com/favicon.ico", { method: 'HEAD', mode: 'no-cors' })
  } catch {
    iframe.remove()
  }
})()

