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

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
const images16 = shuffle(images.concat(images));

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
    picture.src = image;
    container.appendChild(card);
    card.appendChild(cover);
    card.appendChild(picture);
  });
}

const cards = createDesk();
createCards(cards, images16);

const card = document.querySelectorAll(".card");
let count = 0;

function Compare(open_card1, open_card2) {
  if (!open_card1 || !open_card2) return;
  let open_img1 = open_card1.querySelector("img");
  let open_img2 = open_card2.querySelector("img");
  if (open_img1.src === open_img2.src) {
    open_card1.classList.add("blocked");
    open_card2.classList.add("blocked");
    count = 0;
  }
}

let open_card1 = null;
let open_card2 = null;

function Closed() {
  card.forEach((card_elem) => {
    if (
      card_elem.classList.contains("hidden") &&
      !card_elem.classList.contains("blocked")
    ) {
      card_elem.classList.remove("hidden");
    }
  });
}

function OpenFace() {
  card.forEach((card_elem) => {
    card_elem.addEventListener("click", () => {
      count++;
      if (count === 3) {
        Closed();
        count = 1;
        setTimeout(() => {
          card_elem.classList.add("hidden");
          if (!open_card1) {
            open_card1 = card_elem;
            return;
          }
        }, 1000);
        // return;
      }
      card_elem.classList.add("hidden");

      if (!open_card1) {
        open_card1 = card_elem;
        return;
      }
      open_card2 = card_elem;
      Compare(open_card1, open_card2);

      open_card1 = null;
      open_card2 = null;
    });
  });
}

OpenFace();
