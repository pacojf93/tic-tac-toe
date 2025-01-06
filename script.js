
const game = (function (doc) {

    const printGameBoard = () => doc.querySelectorAll(".board-position").forEach((position) => position.textContent = gameBoard[position.id])
    const printCurrentPlayer = () => doc.querySelector("#current-player").textContent = `${currentPlayer.getIcon()}'s turn`
    const renderDisplay = () => {
        printGameBoard()
        printCurrentPlayer()
    }

    const resetBoard = () => gameBoard.forEach((p, i, a) => a[i] = "")

    const markPosition = function (index, icon) {
        gameBoard[index] = icon
    }

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
            if(line.map(index => gameBoard[index])
                .every(index => index === icon)) {
                    isVictory = true
                    return
            }
        })

        return isVictory
    }

    const isBoardFull = function () {
        return gameBoard.every( p => p !== "")
    }

    const createPlayer = function (icon) {
        const playerIcon = icon 
        const getIcon = () => playerIcon
        return {getIcon}
    }

    const togglePlayer = function () {
        if (currentPlayer === playerA) currentPlayer = playerB
        else currentPlayer = playerA
    }

    const whoseTurn = () => console.log(currentPlayer.icon)

    const playRound = function (position) {
        if(gameBoard[position] === "") {

            markPosition(position, currentPlayer.getIcon())
            printGameBoard()

            if(checkForLine(currentPlayer.getIcon())) {
                alert(`${currentPlayer.getIcon()} wins!`)
                resetBoard()
                printGameBoard()
            } else if (isBoardFull()) {
                alert("draw!")
                resetBoard()
                printGameBoard()
            }

            togglePlayer()
            printCurrentPlayer()

        }
    }

    // initialize game
    const gameBoard = Array(9).fill("")
    const playerA = createPlayer("x")
    const playerB = createPlayer("o")
    let currentPlayer = playerA

    return {renderDisplay, markPosition, checkForLine, isBoardFull, whoseTurn, playRound, playerA, playerB, currentPlayer}
})(document)

game.renderDisplay()

document.querySelector("#board-container").addEventListener("click", (event) => {
    const position = event.target.id
    game.playRound(position)
})