// Récupération des objets du DOM

let rulesDisplay = document.querySelector("#rules")
let gameScreen = document.querySelector("#gameScreen")
let gridDisplay = document.querySelector("#gridDisplay")
let buttonDisplay = document.querySelector("#buttonDisplay")
let endWindow = document.querySelector("dialog")
let scorePlayerDisplay = document.querySelector("#scorePlayer")
let scoreOpponentDisplay = document.querySelector("#scoreOpponent")
let playerTwoNameContainer = document.querySelector("#playerTwoNameContainer")
let titleOne = document.querySelector("h1")
let titleTwo = document.querySelector("#connect4")

//Mise en place des variables nécessaires au bon fonctionnement du code

let connectFourHorizontalArray = [1, 2, 3, 4, 8, 9, 10, 11, 15, 16, 17, 18, 22, 23, 24, 25, 29, 30, 31, 32, 36, 37, 38, 39]
let connectFourDiagonalArrayOne = [1, 2, 3, 4, 8, 9, 10, 11, 15, 16, 17, 18]
let connectFourDiagonalArrayTwo = [4, 5, 6, 7, 11, 12, 13, 14, 18, 19, 20, 21]
let availableColumns = []
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

// Cochage par défaut de certains paramètres

document.querySelector("#computer").checked = true
document.querySelector("#tictactoe").checked = true

// Affichage différent selon les paramètres choisis

document.querySelector("#player").addEventListener("click", () => {
    playerTwoNameContainer.style.display = "flex"
})

document.querySelector("#computer").addEventListener("click", () => {
    playerTwoNameContainer.style.display = "none"
})

document.querySelector("#tictactoe").addEventListener("click", () => {
    titleOne.style.display = "block"
    titleTwo.style.display = "none"
    document.querySelector("#tictactoeRules").style.display = "block"
    document.querySelector("#connectFourRules").style.display = "none"
})

document.querySelector("#connectFour").addEventListener("click", () => {
    titleOne.style.display = "none"
    titleTwo.style.display = "block"
    document.querySelector("#tictactoeRules").style.display = "none"
    document.querySelector("#connectFourRules").style.display = "block"
})

// Implémentation des valeurs des paramètres choisis par l'utilisateur

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

// Création de la grille de morpion ou de puissance 4

function gridCreation() {
    let square = 0
    gridDisplay.setAttribute("class", `${gridType}`)
    for (let i = 0; i < gridSize; i++) {
        square = document.createElement("div")
        square.setAttribute("id", `square${i + 1}`)
        gridDisplay.appendChild(square)

        // Si morpion, ajout d'un event listener sur clic des cases
        if (gridType === "tictactoe") {
            square.addEventListener("click", function () {
                if (player) {
                    if (gridType === "tictactoe") {
                        this.textContent = "X"
                        tictactoeVictoryCheck()
                    }
                    player = false
                    opponent = true
                    if (counter < gridSize) {
                        opponentTurn()
                    }
                } else if (opponent) {
                    if (gridType === "tictactoe") {
                        this.textContent = "O"
                        tictactoeVictoryCheck()
                    }
                    opponent = false
                    player = true
                }
            }, { once: true })
        }
    }
}

// Si puissance 4, création des boutons de sélection des colonnes du jeu + event listener sur chaque bouton

function buttonCreation() {
    let columnButton = 0
    if (gridType === "connectFour") {
        for (let i = 0; i < 7; i++) {
            columnButton = document.createElement("button")
            columnButton.setAttribute("id", `button${i + 1}`)
            columnButton.textContent = `${i + 1}`
            buttonDisplay.appendChild(columnButton)
            columnButton.addEventListener("click", () => {
                token(i + 1)
            })
        }
    }
}

// Fonction qui vérifie si l'adversaire est l'ordinateur et déclenche la fonction aléatoire le cas échéant

function opponentTurn() {
    if (opponentType === "computer") {
        setTimeout(randomize, 750)
    }
}

// Fonction qui place le jeton de puissance 4 à l'emplacement disponible le plus bas de la colonne choisie

function token(column) {
    for (let i = (column + 35); i >= 1; i = i - 7) {
        if (document.getElementById(`square${i}`).textContent === "") {
            if (player) {
                document.getElementById(`square${i}`).textContent = "🟠"
                document.getElementById(`square${i}`).style.color = "red"
                connectFourVictoryCheck()
                player = false
                opponent = true
                if (counter < gridSize) {
                    opponentTurn()
                }
                break
            } else if (opponent) {
                document.getElementById(`square${i}`).textContent = "🟡"
                document.getElementById(`square${i}`).style.color = "yellow"
                connectFourVictoryCheck()
                opponent = false
                player = true
                break
            }
        }
    }
}

// Fonction qui vérifie les colonnes disponibles

function columnCheck() {
    availableColumns = []
    for (let i = 1; i <= 7; i++) {
        if (document.getElementById(`square${i}`).textContent === "") {
            availableColumns.push(i)
        }
    }
}

// Fonction aléatoire de choix de la case (morpion) ou de la colonne (puissance 4) par l'ordinateur

function randomize() {
    if (gridType === "tictactoe") {
        do {
            computerChoice = Math.floor((Math.random() * gridSize) + 1)
        } while (document.getElementById(`square${computerChoice}`).textContent !== "")
        if (victory == false) {
            document.getElementById(`square${computerChoice}`).click()
        }
        return
    } else if (gridType === "connectFour") {
        columnCheck()
        computerChoice = availableColumns[Math.floor(Math.random() * availableColumns.length)]
        if (victory == false) {
            document.getElementById(`button${computerChoice}`).click()
        }
        return
    }
}

// Event listener sur l'envoi du formulaire de sélection des paramètres et qui démarre la partie

document.querySelector("#settings").addEventListener("submit", (e) => {
    e.preventDefault()
    rulesDisplay.style.display = "none"
    gameScreen.style.display = "flex"
    gridDisplay.replaceChildren()
    settingsSet()
    gridCreation()
    buttonCreation()
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

// Event listener sur le bouton permettant de recommencer avec les mêmes paramètres à la fin d'une partie

document.querySelector("#restart").addEventListener("click", () => {
    endWindow.close()
    gridDisplay.replaceChildren()
    gridCreation()
    buttonDisplay.replaceChildren()
    buttonCreation()
    counter = 0
    victory = false
    if (opponent) {
        opponentTurn()
    }
})

// Event listener sur le bouton permettant de retourner à l'accueil à la fin d'une partie

document.querySelector("#home").addEventListener("click", () => {
    location.reload()
})

// Fonction qui vérifie l'alignement de 3 symboles sur la grille de morpion et déclenche la fin de partie le cas échéant

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
        if (counter === gridSize && victory === false) {
            player = false
            opponent = false
            endGame()
            return
        }
    }
}

// Fonction qui vérifie l'alignement de 4 couleurs sur la grille de puissance 4 et déclenche la fin de partie le cas échéant

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
    if (counter === gridSize && victory === false) {
        player = false
        opponent = false
        endGame()
        return
    }
}

// Fonction de fin de partie avec affichage du vainqueur, incrémentation et affichage du score

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