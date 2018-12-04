window.onload = () => {
  // Set references to main elements
  const cardsContainer = document.querySelector('.cards-container')
  const endGameModal   = document.querySelector('.endgame-modal')
  const restartBtn     = document.querySelector('.restartBtn')
  
  // create an array to store the last two clicked elements
  let lastTwoClicks = []
  
  // What happends when you click an element?
  function click(element) {
    
    // If you have one active card & isn't clicking the same card
    if (lastTwoClicks.length === 1 && element.id !== lastTwoClicks[0].id) {
      if (lastTwoClicks[0].querySelector('.text').innerHTML === element.querySelector('.text').innerHTML) {
        element.classList.remove('hidden')
        element.classList.add('success')
        lastTwoClicks[0].classList.add('success')
        lastTwoClicks = []
      }
    }
    
    
    // If the clicked card is hidden
    if (element.classList.contains('hidden')) {
      
      if (lastTwoClicks.length >= 2) {
        lastTwoClicks.forEach((el) => {
          el.classList.remove('turn')
          setTimeout(() => {
            console.log('UBGEUISGBGI')
            el.classList.add('hidden')
          }, 150)
        })
        
        lastTwoClicks = [element]
      } else {
        lastTwoClicks.push(element)
      }
    }
    
    // Show hidden cards content
    element.classList.remove('hidden')
    
    // This is really makeshift tbh and needs to be made better
    // It automatically turns the two last cards around after 750ms
    if(lastTwoClicks.length > 1){
      const tmpLastTwoClicks = lastTwoClicks
      
      // Remove
      setTimeout(() => {
        tmpLastTwoClicks.forEach((el) => {
          el.classList.add('hidden')
        })
      }, 750)
    }
    
    // If won
    if(checkIfWon()){
      endGameModal.classList.remove('hidden')
    }
  }
  
  restartBtn.addEventListener("click", () => {
    // Start game with (8) pairs
    startGame(8)
  })
  startGame(8)
  
  /**
  *  Initialize game with specified amount of pairs
  *  @param {int} amountOfPairs An integer to specify amount of pairs
  */
  function startGame(amountOfPairs) {
    
    if(!endGameModal.classList.contains('hidden')){
      endGameModal.classList.add('hidden')
    }
    
    cardsContainer.innerHTML = null
    cardTemplate             = (id, content, i) => `
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
      let tmp                       = contents[i]
          cardsContainer.innerHTML += cardTemplate(i, tmp, i)
    }
    
    // Add evenlisteners to cards
    for (let i = 0; i < cardsContainer.children.length; i++) {
      cardsContainer.children[i].addEventListener("click", () => {
        let tmp = cardsContainer.children[i].querySelector('.text').innerHTML
        
        click(cardsContainer.children[i])
      })
    }
  }
  
  /**
  * Checks if the game is won,
  * in that case, who engame modal
  * 
  * @returns bool
  */
  function checkIfWon(){
    let counter = 0
    for (let i = 0; i < cardsContainer.children.length; i++) {
      if(cardsContainer.children[i].classList.contains('hidden')){
        counter++
      }
    }
    
    if(counter === 0){
      return true
    }
    return false
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
                          j  = Math.floor(Math.random() * (i + 1))
                          x  = a[i]
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