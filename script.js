const symbols = ["🍒", "🍊", "🍋", "🔔", "7"];
const balanceEl = document.getElementById("balance");
const spinButton = document.getElementById("spin");
const winMessage = document.getElementById("winMessage");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];
const currentBetEl = document.getElementById("currentBet");
const decreaseBetBtn = document.getElementById("decreaseBet");
const increaseBetBtn = document.getElementById("increaseBet");

let balance = 1000;
let currentBet = 50;

// Уменьшение ставки
decreaseBetBtn.addEventListener("click", () => {
  if (currentBet > 50) {
    currentBet -= 50;
    currentBetEl.textContent = currentBet;
  }
});

// Увеличение ставки
increaseBetBtn.addEventListener("click", () => {
  if (currentBet < balance) {
    currentBet += 50;
    currentBetEl.textContent = currentBet;
  }
});

// Крутим рулетку
spinButton.addEventListener("click", () => {
  if (balance < currentBet) {
    alert("Не хватает денег!");
    return;
  }

  balance -= currentBet;
  balanceEl.textContent = balance;
  spinButton.disabled = true;
  winMessage.textContent = "";

  // Анимация вращения
  let spins = 0;
  const spinInterval = setInterval(() => {
    slots.forEach(slot => {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      slot.textContent = randomSymbol;
    });

    spins++;
    if (spins > 10) {
      clearInterval(spinInterval);
      checkWin();
      spinButton.disabled = false;
    }
  }, 100);
});

// Проверка выигрыша
function checkWin() {
  const [a, b, c] = slots.map(slot => slot.textContent);

  if (a === "7" && b === "7" && c === "7") {
    win(100);
  } else if (a === "🔔" && b === "🔔" && c === "🔔") {
    win(25);
  } else if (a === b && b === c) {
    win(10);
  } else if (a !== "🔔" && a !== "7" && b !== "🔔" && b !== "7" && c !== "🔔" && c !== "7") {
    win(2);
  }
}

// Выигрыш
function win(multiplier) {
  const winAmount = currentBet * multiplier;
  balance += winAmount;
  balanceEl.textContent = balance;
  winMessage.textContent = `Выигрыш: $${winAmount}!`;
}