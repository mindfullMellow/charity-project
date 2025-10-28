'use strict'
import { Chart } from 'chart.js/auto';

import * as utils from './utilis'

// import { peopleReachedInit } from '../main';


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
    const impactCards = doc.querySelector('.impact-cards')

    // add it to the current page
    if (header) document.body.prepend(header); // or appendChild
    if (modalComponents) document.querySelector('main').after(modalComponents)
    if (volunteerModal) document.querySelector('.modal-components').after(volunteerModal)
    if (footer) document.querySelector('.modal-components').after(footer)
    if (impactCards) document.querySelector('.statistic-div').append(impactCards)
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS ON THIS HTML BEING FECTHED SHOULD BE HERE 

    //MOBILE NAV LOGIC
    utils.mobileNav()

    utils.ModalInit()
    utils.volunteerModalInit()

    //Adding sticky nav
    utils.addStickyNav(document.querySelector('.section-hero-impact'))

    //Reveal elements on scroll
    utils.revealElementsOnScroll()

    // get full year from utils
    document.getElementById('year').textContent = utils.getFullYear()

    //get the impact cards and add the stye callss to fit the about page
    document.querySelector('.impact-cards').classList.add('mt-sm', 'shadow-xl', 'bg-transparent')
    const cardschildren = document.querySelector('.impact-cards').children
    Array.from(cardschildren).forEach(cur => {
      cur.classList.add('grid-el')
    });


  });

async function impactJsonInit() {
  try {
    const response = await fetch('/data/impact.json')
    const data = await response.json()

    const storyContainer = document.querySelector('.storyContainer')
    const testimonialsContainer = document.querySelector('.testimonies-list')
    const successStories = data['success-stories']
    const testimonials = data["testimonies"]
    console.log(testimonials);
    console.log(successStories);

    successStories.forEach(cur => {

      const storyHTML = `  <li class="stories-grid ">
            <div class="flex flex-col justify-between">

              <div class="flex flex-col items-start gap-sm">
                <h6 class="story-h6 font-heading">${cur["story-title"]}</h6>
                <p class="text-body">${cur["story-content"]}</p>
              </div>

              <div>
                <a href="#" class="">Read
                  More &#x2192;</a>
              </div>

            </div>

            <div class="feature-img">
              <img src="${cur["story-img"]}" alt="${cur['story-img-alt']}">
            </div>
          </li>`

      storyContainer.insertAdjacentHTML('beforeend', storyHTML)

    })

    testimonials.forEach(cur => {
      const testimonialHTML = `   <li class="flex flex-col items-start gap-sm">
            <div class="flex items-center gap-xs">

              <div class="flex items-center justify-center h-xl w-xl ">
                <div class="relative inline-block group">
                  <img src="../public/Assets/img/impact/anon.svg" alt="Avatar"
                    class="p-2 rounded-full bg-border-b-color">
                  <span
                    class="absolute hidden mb-2 text-xs text-white rounded-lg bg-brand-color px-sm py-xs w-section bottom-full group-hover:block">
                    Photo Omitted for recepient safety
                  </span>
                </div>
              </div>

              <div class="flex flex-col text-body">
                <p class="font-bold ">L${cur["UserName"]}</p>
                <span class="text-small opacity-80">${cur["date"]}</span>
              </div>
            </div>

            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>

            <div class="testimonie-text">
              <p class="text-body">${cur["content"]}</p>
            </div>

            <div class="flex items-center reactions gap-lg">
              <div class="space-x-xs">
                <i class="fa-regular fa-thumbs-up"></i>
                <span>${cur["like"]}</span>
              </div>
              <div class="space-x-xs">
                <i class="fa-regular fa-thumbs-down mt-xxs"></i>
                <span>${cur["dislike"]}</span>
              </div>
            </div>



          </li>`

      testimonialsContainer.insertAdjacentHTML('beforeend', testimonialHTML)
    })

  } catch (err) {
    console.error("Error:", err)
  }

}

impactJsonInit()



////////////////////////////////////////////////////
//FUNDS RECIEVED
const donationRecieved = document.getElementById('donations-received')
new Chart(donationRecieved, {

  type: 'line',
  data: {
    labels: ['Oct', 'Nov', 'Dec', 'jan', 'feb', 'mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      year: [2024, 2024, 2024, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025],
      data: [32, 37, 48, 81, 64, 95, 61, 82, 67, 63, 47, 11],
      borderColor: '#0066ff',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#0066ff'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: ctx => {
            const years = ctx.dataset.year[ctx.dataIndex];
            return `${ctx.parsed.y.toLocaleString()}k received in ${ctx.label} ${years}`;
          }
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderJoinStyle: 'round' }
    }
  }
});

////////////////////////////////////////////////////
//FUNDS RECIEVED

const fundsReceived = document.getElementById('funds-received');

new Chart(fundsReceived, {
  type: 'line',
  data: {
    labels: ['Oct', 'Nov', 'Dec', 'jan', 'feb', 'mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      year: [2024, 2024, 2024, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025],
      data: [57729449, 54120709, 55175955, 55015919, 12277922, 40157059, 28598773, 15238966, 13560540, 40114687, 32805928, 29089206],
      borderColor: '#0066ff',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#0066ff'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: ctx => {
            const years = ctx.dataset.year[ctx.dataIndex]
            return `$${ctx.parsed.y.toLocaleString()} in ${ctx.label} ${years}`
          }
        }
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderJoinStyle: 'round' }
    }
  }
});




// //////////////////////////////////////
//CUMULATIVE GRAPH

const ctx = document.getElementById('lives-impacted')
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: '12 month cumulative',
        data: [220000, 210000, 250000, 200000, 230000, 190000, 180000, 210000, 195000, 215000, 200000, 230000],
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // light blue
        borderColor: 'rgba(0, 123, 255, 0)',
        tension: 0.4,
        pointRadius: 0

      },

      {
        label: 'Monthly',
        data: [32400, 24200, 175000, 14000, 111000, 150500, 75600, 147000, 61900, 169850, 20000, 181700],
        fill: true,
        backgroundColor: 'rgba(0, 102, 255, 1)', // deep blue
        borderColor: 'rgba(0, 102, 255, 1)',
        tension: 0.4,
        pointRadius: 0
      }
    ]
  },

  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, pointStyle: 'circle' }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        grid: { drawBorder: false },
        ticks: { callback: val => val + 'k' }
      },
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 5  // show only ~5 months
        }
      }
    }
  }


})