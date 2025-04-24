let computerScore = 0;
let humanScore = 0;

function getComputerChoice() {
    let numb = Math.random();
    if(numb < 0.3333) {
        return "rock";
    }
    else if (numb < 0.6666) {
        return "paper";
    }
    return "scissors";   
}

function capitalize (text) {
    return text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();
}

function beats (choice1, choice2) {
    return (
        (choice1=="rock" && choice2=="scissors") || 
        (choice1=="scissors" && choice2=="paper") || 
        (choice1=="paper" && choice2=="rock")
    );
}


function playRound (humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    if (humanChoice == computerChoice) return {
        result: "draw",
        message: `Draw! ${capitalize(humanChoice)} draws ${capitalize(computerChoice)}`
    }
    else if (beats(humanChoice, computerChoice)) return {
        result: "win",
        message: `You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
    }
    else return {
        result: "loss",
        message: `You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
    }
}

const buttons = document.querySelector(".buttons");
const results = document.querySelector("#results");
const humanScoreEl = document.querySelector("#human-score");
const computerScoreEl = document.querySelector("#computer-score");

function updateScore(humanScore, computerScore) {
    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
}

function handleGameOver() {
    if(humanScore === 5){
        results.textContent = `You won the game! Congratulations`;
        resetScores();
    }
    else if(computerScore === 5){
        results.textContent = `You lost the game. Better luck next time...`;
        resetScores();
    }
}

function resetScores() {
    humanScore= 0;
    computerScore = 0;
    updateScore(0,0);
}

function handleRoundResult(outcome) {
    results.textContent = outcome.message;
}

buttons.addEventListener("click", (e)=>{
    if(!e.target.matches("button")) return;

    const choice = e.target.id;
    const customEvent = new CustomEvent("buttpress", {
        detail: { choice },
        bubbles: true
    });

    e.target.dispatchEvent(customEvent);
});

document.addEventListener("buttpress", (e)=>{
    const humanChoice = e.detail.choice;
    const computerChoice = getComputerChoice();

    const outcome = playRound(humanChoice, computerChoice);

    if (outcome.result === "win") humanScore++;
    else if(outcome.result === "loss") computerScore++;

    updateScore(humanScore, computerScore);

    if(humanScore === 5 || computerScore === 5) {
        handleGameOver();
    } else {
        handleRoundResult(outcome);
    }   
});




