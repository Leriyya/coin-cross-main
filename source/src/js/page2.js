//questions

const questions = document.querySelectorAll(".questions__question");
const arrays = document.querySelectorAll(".questions__array");
questions.forEach((question) => {
  question.addEventListener("click", () => {
    question.classList.toggle("active");
  });
});

arrays.forEach((array) => {
  array.addEventListener("click", () => {
    array.classList.toggle("active");
  });
});

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 2000,
    pagination: {
      el: ".swiper-pagination",
    },
  },
});
