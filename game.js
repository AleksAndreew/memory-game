const cards = document.querySelector(".cards");
const card = document.querySelectorAll(".card");

card.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add('hidden');
  });
});
