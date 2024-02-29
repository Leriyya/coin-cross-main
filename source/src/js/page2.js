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
