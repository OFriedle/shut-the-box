

//note: use alert("message") to make a message apear as a pop up, .trim is a method that removes extra spaces after a string,

// gets dice to change when roll button is pressed
const die1 = document.querySelector("#first-die");
const die2 = document.querySelector("#second-die");

// get buttons
const rollBtn = document.querySelector("#roll-btn");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const indivBtn = document.querySelector("#indiv-btn");
const sumBtn = document.querySelector("#sum-btn");
const endTurnBtn = document.querySelector("#end-turn-btn");

// get names at the top of scorecard to change
const scoreNameOne = document.querySelector(".n1");
const scoreNameTwo = document.querySelector(".n2");

// these are values of the "boxes" or more accuratly cards ti record which ones have been closed/flipped
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// these are the divs to hide and make appear on start
const gameDiv = document.querySelector(".game-div");
const startDiv = document.querySelector(".start-game-div");

// player name, points, and whos turn it is
const playerOneInput = document.querySelector("#name-input1");
const playerTwoInput= document.querySelector("#name-input2");
const playerOneTableName = document.querySelector("#p1-table-name");
const playerTwoTableName = document.querySelector("#p2-table-name");
const playerVersusPara = document.querySelector("#vs-para");

let p1Name = playerOneInput.value.trim();
let p2Name = playerTwoInput.value.trim();

const tbody = document.querySelector("#tbody");

let playerTurnPara = document.querySelector("#turn-para");
let playerTurn = 1;
let playerOnePoints = 0;
let playerTwoPoints = 0;

// gets the numbers on the dice
let dieRoll1;
let dieRoll2;

// records the current round
let round = 1;

startBtn.addEventListener("click", function(){
    p1Name = playerOneInput.value.trim();
    p2Name = playerTwoInput.value.trim();

    // only starts game if names inputed then assign those names to the table
    if (p1Name != "" && p2Name != ""){
        gameDiv.style.display = "flex";
        playerOneTableName.textContent = p1Name;
        playerTwoTableName.textContent = p2Name;
        playerVersusPara.textContent = p1Name +  " vs. " + p2Name;
        playerTurnPara.textContent = p1Name + "'s turn"

        startDiv.style.display = "none";

        indivBtn.disabled = true;
        sumBtn.disabled = true;
        endTurnBtn.disabled = true;
    } else {
        alert("Please input your names into the name input spaces to start the game.");
    }
});

rollBtn.addEventListener("click", function(){
    indivBtn.disabled = false;
    sumBtn.disabled = false;
    endTurnBtn.disabled = false;
    rollDice();
});

indivBtn.addEventListener("click", function(){
    if (!indivBtn.disabled)
        {
            boxes[dieRoll1] = "X";
            boxes[dieRoll2] = "X";
            shut(dieRoll1);
            shut(dieRoll2);

            endTurnBtn.disabled = true;
            indivBtn.disabled = true;
            sumBtn.disabled = true;
            rollBtn.disabled = false;

            boxes[0] += dieRoll1;
            boxes[0] += dieRoll2;
        }
});

sumBtn.addEventListener("click", function(){
    if (!sumBtn.disabled)
    {
        let diceSum = dieRoll1 + dieRoll2;
        boxes[diceSum] = "X";
        shut(diceSum);

        endTurnBtn.disabled = true;
        indivBtn.disabled = true;
        sumBtn.disabled = true;
        rollBtn.disabled = false;

        boxes[0] += diceSum;
    }
});

endTurnBtn.addEventListener("click", function(){
    let turnPoints = Math.abs(boxes[0] - 45);
    if (playerTurn == 1)
    {
        buildRow(round, turnPoints);
        playerOnePoints += turnPoints;
    }
    else if (playerTurn == 2)
    {
        let currentRoundRow = document.querySelector("#round" + round);
        console.log(currentRoundRow);
        let playerTwoPointsDisplay = currentRoundRow.getElementsByClassName('p2Pts')[0];

        playerTwoPointsDisplay.textContent = turnPoints;
        playerTurn = 1;
        round++;
        playerTwoPoints += turnPoints;
    }

    endTurnBtn.disabled = true;
    indivBtn.disabled = true;
    rollBtn.disabled = false;
    sumBtn.disabled = true;

    resetBoard();
    gameOver();
});

restartBtn.addEventListener("click", function(){
    location.reload();
});


function rollDice(){
    dieRoll1 = Math.floor(Math.random() * 6) + 1;
    dieRoll2 = Math.floor(Math.random() * 6) + 1;

    die1.classList = "bi bi-dice-" + dieRoll1;
    die2.classList = "bi bi-dice-" + dieRoll2;

    endTurnBtn.disabled = false;
    indivBtn.disabled = false;
    rollBtn.disabled = true;
    sumBtn.disabled = false;

    if (boxes[dieRoll1] == "X" || boxes[dieRoll2] == "X" || dieRoll1 == dieRoll2)
    {
        indivBtn.disabled = true;
    }

    if (boxes[dieRoll1 + dieRoll2] == "X" || dieRoll1 + dieRoll2 > 9)
    {
        sumBtn.disabled = true;
    }

    if (sumBtn.disabled == true && indivBtn.disabled == true)
    {
        endTurnBtn.disable = false;
    }
    else
    {
        endTurnBtn.disable = true;
    }
}

function shut(boxNumber){
    let boxToShut = document.querySelector("#card-" + boxNumber);
    console.log(boxToShut);

    boxToShut.classList.add("shut");
    boxToShut.classList.remove("card");
    boxToShut.textContent = "X"
}

function buildRow(round, points) {
    let newRowtr = document.createElement("tr");
    let newRowth = document.createElement("th");
    let newRowtd1 = document.createElement("td");
    let newRowtd2 = document.createElement("td");

    newRowtr.id = "round" + round;
    newRowtd1.classList.add("p1Pts");
    newRowtd2.classList.add("p2Pts");

    newRowtd1.textContent = points;
    newRowth.textContent = "Round " + round;

    newRowtr.insertAdjacentElement("beforeend", newRowth);
    newRowtr.insertAdjacentElement("beforeend", newRowtd1);
    newRowtr.insertAdjacentElement("beforeend", newRowtd2);
    tbody.insertAdjacentElement("beforeend", newRowtr);

    playerTurn = 2;
}

function resetBoard() {
    boxes.fill(0);

    for (let i = 1; i < boxes.length; i++)
    {
        boxToOpen = document.querySelector("#card-" + i);

        boxToOpen.classList.add("card");
        boxToOpen.classList.remove("shut");
        boxToOpen.textContent = i
    }

    if (playerTurn == 1)
    {
        playerTurnPara.textContent = p1Name + "'s turn";
    }
    else if (playerTurn == 2)
    {
        playerTurnPara.textContent = p2Name + "'s turn";
    }
}

function gameOver() {
    if (round > 5)
    {
        let gameOverDiv = document.querySelector(".game-over-div");
        gameOverDiv.style.display = "flex";

        let winnerPara = document.querySelector("#winner-para");
        let winnerPoints = document.querySelector("#winner-points");

        playerTurnPara.textContent = "GAME OVER";

        for (let i = 1; i < boxes.length; i++)
        {
            boxToOpen = document.querySelector("#card-" + i);

            boxToOpen.classList.add("shut");
            boxToOpen.classList.remove("card");
            boxToOpen.textContent = i
        }

        endTurnBtn.disabled = true;
        indivBtn.disabled = true;
        rollBtn.disabled = true;
        sumBtn.disabled = true;

        let winner;

        if (playerOnePoints > playerTwoPoints)
        {
            winner = p1Name;
        } else if (playerTwoPoints > playerOnePoints)
        {
            winner = p2Name;
        } else if (playerOnePoints == playerTwoPoints)
        {
            winner = "Tie";
        }

        winnerPara.textContent = winner + "!";

        if (winner != "Tie"){
            winnerPoints.textContent = winner + " won with " + playerOnePoints + "!";
        }
        else
        {
            winnerPoints.textContent = "It was a tie!";
        }
    }
}
