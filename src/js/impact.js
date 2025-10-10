'use strict'
import { Chart } from 'chart.js/auto';

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
    // if (footer) document.body.append(footer)


    const impactCards = doc.querySelector('.impact-cards')
    console.log(impactCards);

    if (impactCards) document.querySelector('.statistic-div').append(impactCards)
  }).then(() => {
    //  EVERY ELEMENT THAT DEPENDS ON THIS HTML BEING FECTHED SHOULD BE HERE 

    //MOBILE NAV LOGIC
    utils.mobileNav()

    //Adding sticky nav


    // get full year from utils
    // document.getElementById('year').textContent = utils.getFullYear()

    const cardsContainer = document.querySelector('.impact-cards').classList.add('mt-lg')
    const cardschildren = document.querySelector('.impact-cards').children

    Array.from(cardschildren).forEach(cur => {
      cur.classList.add('grid-el')
    });
  })

////////////////////////////////////////////////////
//FUNDS RECIEVED
const donationRecieved = document.getElementById('donations-received')
new Chart(donationRecieved, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      data: [12000000, 10000000, 30000000, 40000000, 56000000, 60000000, 16000000],
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
          label: ctx => `$${ctx.parsed.y.toLocaleString()} in ${ctx.label} 2025`
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      data: [12000000, 10000000, 30000000, 40000000, 56000000, 60000000, 16000000],
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
          label: ctx => `$${ctx.parsed.y.toLocaleString()} in ${ctx.label} 2025`
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
        data: [10, 20, 25, 40, 60, 70, 90, 100, 120, 130, 135, 140],
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // light blue
        borderColor: 'rgba(0, 123, 255, 0)',
        tension: 0.4,
        pointRadius: 0

      },

      {
        label: 'Monthly',
        data: [2, 3, 5, 4, 6, 7, 5, 8, 9, 11, 10, 12],
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