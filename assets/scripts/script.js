let rulesDisplay = document.querySelector("#rules")
let gameScreen = document.querySelector("#gameScreen")
let gridDisplay = document.querySelector("#gridDisplay")
let endWindow = document.querySelector("dialog")
let scorePlayerDisplay = document.querySelector("#scorePlayer")
let scoreOpponentDisplay = document.querySelector("#scoreOpponent")
let playerTwoNameContainer = document.querySelector("#playerTwoNameContainer")
let connectFourHorizontalArray = [1, 2, 3, 4, 8, 9, 10, 11, 15, 16, 17, 18, 22, 23, 24, 25, 29, 30, 31, 32, 36, 37, 38, 39]
let connectFourDiagonalArrayOne = [1, 2, 3, 4, 8, 9, 10, 11, 15, 16, 17, 18]
let connectFourDiagonalArrayTwo = [4, 5, 6, 7, 11, 12, 13, 14, 18, 19, 20, 21]
let counter = 0
let opponentType = ""
let gridType = ""
let gridSize = 0
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

function settingsSet() {
    opponentType = document.querySelector("input[name=opponent]:checked").value
    if (opponentType === "player") {
        playerName = document.getElementById("playerOneName").value
        opponentName = document.getElementById("playerTwoName").value
    } else if (opponentType === "computer") {
        playerName = document.getElementById("playerOneName").value
        opponentName = "Mia"
    }
    gridType = document.querySelector("input[name=game]:checked").value
    if (gridType === "tictactoe") {
        gridSize = 9
    } else if (gridType === "connectFour") {
        gridSize = 42
    }
}

function gridCreation() {
    let square = 0
    gridDisplay.setAttribute("class", `${gridType}`)
    for (let i = 0; i < gridSize; i++) {
        square = document.createElement("div")
        square.setAttribute("id", `square${i + 1}`)
        gridDisplay.appendChild(square)
        square.addEventListener("click", function () {
            if (player) {
                if (gridType === "tictactoe") {
                    this.textContent = "X"
                    tictactoeVictoryCheck()
                } else if (gridType === "connectFour") {
                    this.textContent = "O"
                    this.style.color = "red"
                    connectFourVictoryCheck()
                }
                player = false
                opponent = true
                if (counter < 9) {
                    opponentTurn()
                }
            } else if (opponent) {
                if (gridType === "tictactoe") {
                    this.textContent = "O"
                    tictactoeVictoryCheck()
                } else if (gridType === "connectFour") {
                    this.textContent = "O"
                    this.style.color = "yellow"
                    connectFourVictoryCheck()
                }
                opponent = false
                player = true
            }
        }, { once: true })
    }
}

function opponentTurn() {
    if (opponentType === "computer") {
        randomize()
    }
}

function randomize() {
    do {
        computerChoice = Math.floor((Math.random() * gridSize) + 1)
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
    settingsSet()
    gridCreation()
    counter = 0
    player = true
    opponent = false
    if (gridType === "tictactoe") {
        scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
        scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
    } else if (gridType === "connectFour") {
        scorePlayerDisplay.textContent = `ROUGE - ${playerName} : ${scorePlayer} points`
        scoreOpponentDisplay.textContent = `JAUNE - ${opponentName} : ${scoreOpponent} points`
    }
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

function tictactoeVictoryCheck() {
    counter++
    for (let i = 1; i <= 7; i = i + 3) {
        if (document.getElementById(`square${i}`).textContent !== "" && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 1}`).textContent && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 2}`).textContent) {
            document.getElementById(`square${i}`).classList.add("win")
            document.getElementById(`square${i + 1}`).classList.add("win")
            document.getElementById(`square${i + 2}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(`square${i}`).textContent !== "" && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 3}`).textContent && document.getElementById(`square${i}`).textContent === document.getElementById(`square${i + 6}`).textContent) {
            document.getElementById(`square${i}`).classList.add("win")
            document.getElementById(`square${i + 3}`).classList.add("win")
            document.getElementById(`square${i + 6}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }
    if (document.getElementById(`square5`).textContent !== "" && document.getElementById(`square5`).textContent === document.getElementById(`square1`).textContent && document.getElementById(`square5`).textContent === document.getElementById(`square9`).textContent) {
        document.getElementById(`square1`).classList.add("win")
        document.getElementById(`square5`).classList.add("win")
        document.getElementById(`square9`).classList.add("win")
        victory = true
        endGame()
        return
    } else if (document.getElementById(`square5`).textContent !== "" && document.getElementById(`square5`).textContent === document.getElementById(`square3`).textContent && document.getElementById(`square5`).textContent === document.getElementById(`square7`).textContent) {
        document.getElementById(`square3`).classList.add("win")
        document.getElementById(`square5`).classList.add("win")
        document.getElementById(`square7`).classList.add("win")
        victory = true
        endGame()
        return
    } else {
        if (counter === 9 && victory === false) {
            player = false
            opponent = false
            endGame()
            return
        }
    }
}

function connectFourVictoryCheck() {
    counter++
    for (let i = 1; i <= 21; i++) {
        if (document.getElementById(`square${i}`).style.color !== "" && document.getElementById(`square${i}`).style.color === document.getElementById(`square${i + 7}`).style.color && document.getElementById(`square${i}`).style.color === document.getElementById(`square${i + 14}`).style.color && document.getElementById(`square${i}`).style.color === document.getElementById(`square${i + 21}`).style.color) {
            document.getElementById(`square${i}`).classList.add("win")
            document.getElementById(`square${i + 7}`).classList.add("win")
            document.getElementById(`square${i + 14}`).classList.add("win")
            document.getElementById(`square${i + 21}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }
    for (let i = 0; i < connectFourHorizontalArray.length; i++) {
        if (document.getElementById(`square${connectFourHorizontalArray[i]}`).style.color !== "" && document.getElementById(`square${connectFourHorizontalArray[i]}`).style.color === document.getElementById(`square${connectFourHorizontalArray[i] + 1}`).style.color && document.getElementById(`square${connectFourHorizontalArray[i]}`).style.color === document.getElementById(`square${connectFourHorizontalArray[i] + 2}`).style.color && document.getElementById(`square${connectFourHorizontalArray[i]}`).style.color === document.getElementById(`square${connectFourHorizontalArray[i] + 3}`).style.color) {
            document.getElementById(`square${connectFourHorizontalArray[i]}`).classList.add("win")
            document.getElementById(`square${connectFourHorizontalArray[i] + 1}`).classList.add("win")
            document.getElementById(`square${connectFourHorizontalArray[i] + 2}`).classList.add("win")
            document.getElementById(`square${connectFourHorizontalArray[i] + 3}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }
    for (let i = 0; i < connectFourDiagonalArrayOne.length; i++) {
        if (document.getElementById(`square${connectFourDiagonalArrayOne[i]}`).style.color !== "" && document.getElementById(`square${connectFourDiagonalArrayOne[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayOne[i] + 8}`).style.color && document.getElementById(`square${connectFourDiagonalArrayOne[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayOne[i] + 16}`).style.color && document.getElementById(`square${connectFourDiagonalArrayOne[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayOne[i] + 24}`).style.color) {
            document.getElementById(`square${connectFourDiagonalArrayOne[i]}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayOne[i] + 8}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayOne[i] + 16}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayOne[i] + 24}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }
    for (let i = 0; i < connectFourDiagonalArrayTwo.length; i++) {
        if (document.getElementById(`square${connectFourDiagonalArrayTwo[i]}`).style.color !== "" && document.getElementById(`square${connectFourDiagonalArrayTwo[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 6}`).style.color && document.getElementById(`square${connectFourDiagonalArrayTwo[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 12}`).style.color && document.getElementById(`square${connectFourDiagonalArrayTwo[i]}`).style.color === document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 18}`).style.color) {
            document.getElementById(`square${connectFourDiagonalArrayTwo[i]}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 6}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 12}`).classList.add("win")
            document.getElementById(`square${connectFourDiagonalArrayTwo[i] + 18}`).classList.add("win")
            victory = true
            endGame()
            return
        }
    }

}

function endGame() {
    if (player) {
        document.querySelector("#winner").textContent = `${playerName} a gagné.`
        scorePlayer++
        if (gridType === "tictactoe") {
            scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
            scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
        } else if (gridType === "connectFour") {
            scorePlayerDisplay.textContent = `ROUGE - ${playerName} : ${scorePlayer} points`
            scoreOpponentDisplay.textContent = `JAUNE - ${opponentName} : ${scoreOpponent} points`
        }
        player = false
        opponent = true
        endWindow.showModal()
    } else if (opponent) {
        document.querySelector("#winner").textContent = `${opponentName} a gagné.`
        scoreOpponent++
        if (gridType === "tictactoe") {
            scorePlayerDisplay.textContent = `X - ${playerName} : ${scorePlayer} points`
            scoreOpponentDisplay.textContent = `O - ${opponentName} : ${scoreOpponent} points`
        } else if (gridType === "connectFour") {
            scorePlayerDisplay.textContent = `ROUGE - ${playerName} : ${scorePlayer} points`
            scoreOpponentDisplay.textContent = `JAUNE - ${opponentName} : ${scoreOpponent} points`
        }
        opponent = false
        player = true
        endWindow.showModal()
    } else if (victory === false) {
        document.querySelector("#winner").textContent = "Match nul."
        endWindow.showModal()
    }
}