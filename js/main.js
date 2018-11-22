window.onload = () => {
  // Set references to main elements
  const startScreen = document.querySelector('.start-screen')
  const cardsContainer = document.querySelector('.cards-container')
  const endGameModal = document.querySelector('.endgame-modal')

  // create an array to store the last two clicked elements
  let lastTwoClicks = []

  // What happends when you click an element?
  function click(element) {

    // If you clicked a card that is hidden
    if (element.classList.contains('hidden')) {
      if (lastTwoClicks.length >= 2) {
        lastTwoClicks.forEach((el) => {
          el.classList.add('hidden')
        })

        lastTwoClicks = [element]
      } else {
        lastTwoClicks.push(element)
      }
    }
    // Show hidden cards content
    element.classList.remove('hidden')
  }

  // Start game with (8) pairs
  startGame(8)

  /**
   *  Initialize game w/ specified amount of pairs
   *  @param {int} amountOfPairs An integer to specify amount of pairs
   */ 
  function startGame(amountOfPairs) {
    cardsContainer.innerHTML = null
    cardTemplate = (id, content) => `
        <div id="${id}" class="card hidden">
            <div class="text">${content}</div>
            <div class="memory">MEMO</div>
        </div>
        `

    let contents = []
    for (let i = 0; i < amountOfPairs; i++) {
      let tmp = '' + getRandNumStr(6)
      contents.push(tmp)
      contents.push(tmp)
    }

    // I made a bad shuffle function, so I made a work-around :/
    for (let i = 0; i < (Math.random() * 10); i++) {
      shuffle(contents)
    }

    // Assign content to cards
    for (let i = 0; i < (amountOfPairs * 2); i++) {
      let tmp = contents[i]
      cardsContainer.innerHTML += cardTemplate(i, tmp)
    }

    // Add evenlisteners to cards
    for (let i = 0; i < cardsContainer.children.length; i++) {
      cardsContainer.children[i].addEventListener("click", () => {
        let tmp = cardsContainer.children[i].querySelector('.text').innerHTML

        click(cardsContainer.children[i])
      })
    }
  }
}

//
// Functions
//

/**
 * Shuffles array in place.
 * @param {Array} a An array containing the items.
 */
function shuffle(a) {
  let j, x, i

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }

  return a
}

/**
 * Gets a random string of numbers
 * @param {int} n An integer defining the amount of numbers in the string
 */
function getRandNumStr(n) {
  let tmp = ''

  for (let i = 0; i < n; i++) {
    tmp += Math.floor(Math.random() * 10)
  }

  return tmp
}