let rulesDisplay = document.querySelector("#rules")
let gameScreen = document.querySelector("#gameScreen")
let gridDisplay = document.querySelector("#gridDisplay")
let endWindow = document.querySelector("dialog")
let scorePlayerDisplay = document.querySelector("#scorePlayer")
let scoreOpponentDisplay = document.querySelector("#scoreOpponent")
let playerTwoNameContainer = document.querySelector("#playerTwoNameContainer")
let counter = 0
let opponentType = ""
let playerName = ""
let opponentName = ""
let player
let opponent
let scorePlayer = 0
let scoreOpponent = 0
let victory = false

document.querySelector("#player").addEventListener("click", () => {
    playerTwoNameContainer.style.display = "flex"
})

document.querySelector("#computer").addEventListener("click", () => {
    playerTwoNameContainer.style.display = "none"
})

function gridCreation() {
    let square = 0
    for (let i = 0; i < 9; i++) {
        square = document.createElement("div")
        square.setAttribute("id", `square${i + 1}`)
        gridDisplay.appendChild(square)
        square.addEventListener("click", function () {
            if (player) {
                this.textContent = "X"
                victoryCheck()
                player = false
                opponent = true
                if (counter < 9) {
                    opponentTurn()
                }
            } else if (opponent) {
                this.textContent = "O"
                victoryCheck()
                opponent = false
                player = true
            }
        }, { once: true })
    }
}

function settingsSet() {
    opponentType = document.querySelector("input[name=opponent]:checked").value
    if (opponentType === "player") {
        playerName = document.getElementById("playerOneName").value
        opponentName = document.getElementById("playerTwoName").value
    } else if (opponentType === "computer") {
        playerName = document.getElementById("playerOneName").value
        opponentName = "Mia"
    }
}

function opponentTurn() {
    if (opponentType === "computer") {
        randomize()
    }
}

function randomize() {
    do {
        computerChoice = Math.floor((Math.random() * 9) + 1)
        console.log(computerChoice);

    } while (document.getElementById(`square${computerChoice}`).textContent !== "")
    if (victory == false) {
        document.getElementById(`square${computerChoice}`).click()
    }
    return
}

document.querySelector("#settings").addEventListener("submit", (e) => {
    e.preventDefault()
    rulesDisplay.style.display = "none"
    gameScreen.style.display = "flex"
    gridDisplay.replaceChildren()
    gridCreation()
    settingsSet()
    counter = 0
    player = true
    opponent = false
    scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
    scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
})

document.querySelector("#restart").addEventListener("click", () => {
    endWindow.close()
    gridDisplay.replaceChildren()
    gridCreation()
    counter = 0
    victory = false
    if (opponent) {
        opponentTurn()
    }
})

document.querySelector("#home").addEventListener("click", () => {
    location.reload()
})

function victoryCheck() {
    counter++
    for (let i = 1; i <= 7; i = i + 3) {
        if (document.getElementById(`square${i}`).textContent !== "" && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 1}`).textContent && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 2}`).textContent) {
            document.getElementById(`square${i}`).classList.add("win")
            document.getElementById(`square${i + 1}`).classList.add("win")
            document.getElementById(`square${i + 2}`).classList.add("win")
            victory = true
            endGame()
        }
    }
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(`square${i}`).textContent !== "" && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 3}`).textContent && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 6}`).textContent) {
            document.getElementById(`square${i}`).classList.add("win")
            document.getElementById(`square${i + 3}`).classList.add("win")
            document.getElementById(`square${i + 6}`).classList.add("win")
            victory = true
            endGame()
        }
    }
    if (document.getElementById(`square5`).textContent !== "" && document.getElementById(`square5`).textContent === document.getElementById(`square1`).textContent && document.getElementById(`square5`).textContent === document.getElementById(`square9`).textContent) {
        document.getElementById(`square1`).classList.add("win")
        document.getElementById(`square5`).classList.add("win")
        document.getElementById(`square9`).classList.add("win")
        victory = true
        endGame()
    } else if (document.getElementById(`square5`).textContent !== "" && document.getElementById(`square5`).textContent === document.getElementById(`square3`).textContent && document.getElementById(`square5`).textContent === document.getElementById(`square7`).textContent) {
        document.getElementById(`square3`).classList.add("win")
        document.getElementById(`square5`).classList.add("win")
        document.getElementById(`square7`).classList.add("win")
        victory = true
        endGame()
    } else {
        if (counter === 9 && victory === false) {
            player = false
            opponent = false
            endGame()
        }
    }
}

function endGame() {
    if (player) {
        document.querySelector("#winner").textContent = `${playerName} a gagné.`
        scorePlayer++
        scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
        scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
        player = false
        opponent = true
        endWindow.showModal()
    } else if (opponent) {
        document.querySelector("#winner").textContent = `${opponentName} a gagné.`
        scoreOpponent++
        scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
        scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
        opponent = false
        player = true
        endWindow.showModal()
    } else if (victory === false) {
        document.querySelector("#winner").textContent = "Match nul."
        endWindow.showModal()
    }
}