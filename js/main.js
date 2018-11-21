window.onload = () => {
    // Set references to main elements
    const startScreen = document.querySelector('.start-screen')
    const cardsContainer = document.querySelector('.cards-container')
    const endGameModal = document.querySelector('.endgame-modal')

    // Set reference to all 
    const cards = cardsContainer.querySelectorAll('.card')

    // Start game with (8) pairs
    startGame(8)

    // 
    function startGame (amountOfPairs) {
        cardsContainer.innerHTML = null
        cardTemplate = (id, content) => `
        <div id="${id}" class="card">
            <div class="text">${content}</div>
        </div>
        ` 
        
        let contents = []
        for (let i = 0; i < amountOfPairs; i++) {
            let tmp = '' + getRandNumStr(6)
            contents.push(tmp)
            contents.push(tmp)
        }
        
        shuffle(contents)
        console.log(contents)

        for (let i = 0; i < (amountOfPairs * 2); i++) {
            let tmp = contents[i]
            cardsContainer.innerHTML += cardTemplate(i, tmp)
            
        }

        for (let i = 0; i < cardsContainer.children.length; i++) {
            cardsContainer.children[i].addEventListener("click", () => {
                let tmp = cardsContainer.children[i].querySelector('.text').innerHTML
                console.log(i + ' was clicked with the content \'' + tmp + '\'')
            })
        }
    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
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
 */
const getRandNumStr = (n) => {
    let tmp = ''

    for (let i = 0; i < n; i++) {
        tmp += Math.floor(Math.random() * 10)
    }

    return tmp
}
