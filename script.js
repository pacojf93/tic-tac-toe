const game = (function (doc) {
    const gameBoard = (function(){
        const board = Array(9).fill("")
        const getBoard = () => board
        const resetBoard = () => board.forEach((p, i, a) => a[i] = "")
        const markPosition = (index, icon) => board[index] = icon
        const isBoardFull = () => board.every( p => p !== "")
        const checkForLine = function (icon) {
            const lines = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ]
            
            let isVictory = false
            lines.forEach((line) => {
                if(line.map(index => board[index])
                    .every(index => index === icon)) {
                        isVictory = true
                        return
                }
            })    
            return isVictory
        }

        return {resetBoard, markPosition, isBoardFull, getBoard, checkForLine}
    })()

    const display = (function (doc) {
        const printGameBoard = () => doc.querySelectorAll(".board-position").forEach((position) => position.textContent = gameBoard.getBoard()[position.id])
        const printCurrentPlayer = () => doc.querySelector("#current-player").textContent = `${currentPlayer.getIcon()}'s turn`
        const printScores = function () {
            doc.querySelector("#player-a").textContent = playerA.printScore()
            doc.querySelector("#player-b").textContent = playerB.printScore()
        }
        const renderDisplay = () => {
            printGameBoard()
            printCurrentPlayer()
            printScores()
        }
        
        return {printGameBoard, printCurrentPlayer, renderDisplay, printScores}
    })(doc)

    const createPlayer = function (icon) {
        let playerIcon = icon
        let playerScore = 0 
        const getIcon = () => playerIcon
        const getScore = () => playerScore
        const printScore = () => `${playerIcon}'s score: ${playerScore}`
        const oneUp = () => playerScore++
        const resetScore = () => playerScore = 0
        const setIcon = (newIcon) => playerIcon = newIcon       
        return {getIcon, getScore, oneUp, printScore, resetScore, setIcon}
    }

    const togglePlayer = function () {
        if (currentPlayer === playerA) currentPlayer = playerB
        else currentPlayer = playerA
    }

    const whoseTurn = () => console.log(currentPlayer.icon)

    const playRound = function (position) {
        if(gameBoard.getBoard()[position] === "") {

            gameBoard.markPosition(position, currentPlayer.getIcon())
            display.printGameBoard()

            if(gameBoard.checkForLine(currentPlayer.getIcon())) {
                alert(`${currentPlayer.getIcon()} wins!`)
                currentPlayer.oneUp()
                newRound()
            } else if (gameBoard.isBoardFull()) {
                alert("draw!")
                newRound()
            }

            togglePlayer()
            display.printCurrentPlayer()

        }
    }

    const newRound = function () {
        gameBoard.resetBoard()
        display.renderDisplay()
    }

    const resetGame = function () {
        currentPlayer = playerA
        playerA.resetScore()
        playerB.resetScore()
        getPlayerNames()
        newRound()
    }

    const getPlayerNames = function () {
        const playerAChoice = prompt("Choose an icon for player A:")
        const playerBChoice = prompt("Choose an icon for player B:")
       
        playerA.setIcon(playerAChoice?playerAChoice[0]:"x")    
        playerB.setIcon(playerBChoice?playerBChoice[0]:"o")
    }

    // initialize game
    const playerA = createPlayer("x")
    const playerB = createPlayer("o")
    let currentPlayer = playerA

    return {playRound, resetGame}
})(document)

game.resetGame()

document.querySelector("#board-container").addEventListener("click", (event) => {
    const position = event.target.id
    game.playRound(position)
})

document.querySelector("#reset-button").addEventListener("click", game.resetGame)