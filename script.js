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
        const renderDisplay = () => {
            printGameBoard()
            printCurrentPlayer()
        }
        
        return {printGameBoard, printCurrentPlayer, renderDisplay}
    })(doc)


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
        if(gameBoard.getBoard()[position] === "") {

            gameBoard.markPosition(position, currentPlayer.getIcon())
            display.printGameBoard()

            if(gameBoard.checkForLine(currentPlayer.getIcon())) {
                alert(`${currentPlayer.getIcon()} wins!`)
                gameBoard.resetBoard()
                display.printGameBoard()
            } else if (gameBoard.isBoardFull()) {
                alert("draw!")
                gameBoard.resetBoard()
                display.printGameBoard()
            }

            togglePlayer()
            display.printCurrentPlayer()

        }
    }

    // initialize game
    const playerA = createPlayer("x")
    const playerB = createPlayer("o")
    let currentPlayer = playerA

    return {display, gameBoard, whoseTurn, playRound, playerA, playerB, currentPlayer}
})(document)

game.display.renderDisplay()

document.querySelector("#board-container").addEventListener("click", (event) => {
    const position = event.target.id
    game.playRound(position)
})