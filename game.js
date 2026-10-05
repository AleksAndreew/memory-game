const images = [
  "/memory-game/src/images/eve_online.jpg",
  "/memory-game/src/images/star_wars.jpg",
  "/memory-game/src/images/firefly.jpg",
  "/memory-game/src/images/galactica.jpg",
  "/memory-game/src/images/mass_effect.jpg",
  "/memory-game/src/images/star_trek.jpg",
  "/memory-game/src/images/starcraft.jpg",
  "/memory-game/src/images/w40000.jpg",
];

const header = document.createElement("header");
header.className = "header";

const h1 = document.createElement("h1");
h1.textContent = "Memory Game";
header.appendChild(h1);

const buttons = document.createElement("div");
buttons.className = "buttons";

const btnLeaders = document.createElement("button");
btnLeaders.className = "header_button";
btnLeaders.textContent = "Таблица лидеров";

const btnNew = document.createElement("button");
btnNew.className = "header_button";
btnNew.id = "new_game";
btnNew.textContent = "Новая игра";

buttons.append(btnLeaders, btnNew);
header.appendChild(buttons);

const score = document.createElement("div");
score.className = "score";

const h2_count = document.createElement("h2");
h2_count.append("Количество ходов: ");
const countSpan = document.createElement("span");
countSpan.id = "count";
countSpan.textContent = "0";
h2_count.appendChild(countSpan);

const h2_pairs = document.createElement("h2");
h2_pairs.append("Открыто пар ");
const pairsSpan = document.createElement("span");
pairsSpan.id = "pairs";
pairsSpan.textContent = "0";
h2_pairs.appendChild(pairsSpan);
h2_pairs.append(" из 8");

score.append(h2_count, h2_pairs);
header.appendChild(score);

document.body.prepend(header);

const new_game = document.getElementById("new_game");
const count = document.getElementById("count");
const pairs = document.getElementById("pairs");
let sum = 0;
let open_pairs = 0;
let open_card1 = null;
let open_card2 = null;

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
function createDesk() {
  const cards = document.createElement("div");
  cards.className = "cards";
  document.body.appendChild(cards);
  return cards;
}

function createCards(container, images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "card";
    const cover = document.createElement("div");
    cover.className = "cover";
    const picture = document.createElement("img");
    picture.alt = "game card";
    picture.src = image;
    container.appendChild(card);
    card.appendChild(cover);
    card.appendChild(picture);
  });
}

const cards = createDesk();
createCards(cards, shuffle(images.concat(images)));

function newGame() {
  cards.replaceChildren();
  createCards(cards, shuffle(images.concat(images)));
  cards.classList.remove("no-events");
  count.textContent = 0;
  pairs.textContent = 0;
  sum = 0;
  open_pairs = 0;
  open_card1 = null;
  open_card2 = null;
}
new_game.addEventListener("click", newGame);
function Compare(open_card1, open_card2) {
  if (!open_card1 || !open_card2) return;
  let open_img1 = open_card1.querySelector("img");
  let open_img2 = open_card2.querySelector("img");
  if (open_img1.src === open_img2.src) {
    open_card1.classList.add("blocked");
    open_card2.classList.add("blocked");
    open_pairs++;
    pairs.textContent = open_pairs;
    cards.classList.remove("no-events");
    sum++;
    count.textContent = sum;
  } else {
    setTimeout(() => {
      open_card1.classList.remove("hidden");
      open_card2.classList.remove("hidden");
      cards.classList.remove("no-events");
      sum++;
      count.textContent = sum;
    }, 1500);
  }
}

cards.addEventListener("click", (e) => {
  const cardEl = e.target.closest(".card");
  if (!cardEl) return;
  if (cardEl.classList.contains("hidden")) return;
  if (cardEl.classList.contains("blocked")) return;
  cardEl.classList.add("hidden");
  if (!open_card1) {
    open_card1 = cardEl;
    return;
  }

  open_card2 = cardEl;
  cards.classList.add("no-events");
  Compare(open_card1, open_card2);
  open_card1 = null;
  open_card2 = null;
});
