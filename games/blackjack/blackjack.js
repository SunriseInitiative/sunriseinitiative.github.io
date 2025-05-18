const deck = [];
const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let balance = 1000; // Player's initial balance
let bet = 10; // Player's bet
let betAmount = 0; // Amount to bet
let betInput = document.getElementById('bet-amount');
let playerCards = [];
let dealerCards = [];
let gameOver = false;

function updateInfo() {

    document.getElementById('balance').innerText = `Balance: $${balance}`;
    document.getElementById('bet').innerText = `Bet: $${bet}`;
}

function createDeck() {
    deck.length = 0;
    for (let suit of suits) {
    for (let value of values) {
        deck.push({ value, suit });
    }
    }
    shuffle(deck);
}

function placeBet() {
    betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert('Invalid bet amount. Please enter a valid number.');
        return;
    }
    bet = betAmount;
    balance -= bet;
    document.getElementById('balance').innerText = `Balance: $${balance}`;
    document.getElementById('bet').innerText = `Bet: $${bet}`; // <-- Add this line
    resetGame();
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
}

function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    for (let card of cards) {
    let val = getCardValue(card);
    score += val;
    if (card.value === 'A') aceCount++;
    //document.getElementsByClassName("card_list")[0].innerHTML += card.value + card.suit + " ";
    }

    while (score > 21 && aceCount > 0) {
    score += 11;
    aceCount--;
    }

    return score;
}

function displayCards() {
    document.getElementById('player-cards').innerText = playerCards.map(c => c.value + c.suit).join(' ');
    document.getElementById('dealer-cards').innerText = dealerCards.map(c => c.value + c.suit).join(' ');
    document.getElementById('player-score').innerText = calculateScore(playerCards);
    document.getElementById('dealer-score').innerText = calculateScore(dealerCards);
}

function hit() {
    if (gameOver) return;

    playerCards.push(deck.pop());
    displayCards();

    if (calculateScore(playerCards) > 21) {
    endGame('You busted! Dealer wins.');
    }
}

function stand() {
    if (gameOver) return;

    while (calculateScore(dealerCards) < 17) {
    dealerCards.push(deck.pop());
    }

    displayCards();
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    if (dealerScore > 21 || playerScore > dealerScore) {
    endGame('You win!');
    } else if (dealerScore > playerScore) {
    endGame('Dealer wins.');
    } else {
    endGame("It's a draw.");
    }
}

function endGame(message) {
    gameOver = true;
    if (message.includes('win')) {
        balance += bet * 2; // Player wins double the bet
    }else if (message.includes('draw')) {
        balance += bet; // Player gets back the bet
    } else {
        balance -= bet; // Player loses the bet
    }
    document.getElementById('balance').innerText = `Balance: $${balance}`;
    document.getElementById('result').innerText = message;
}

function resetGame() {
    createDeck();
    playerCards = [deck.pop(), deck.pop()];
    dealerCards = [deck.pop()];
    gameOver = false;
    document.getElementById('result').innerText = '';
    displayCards();
}

// Initialize game on load
resetGame();