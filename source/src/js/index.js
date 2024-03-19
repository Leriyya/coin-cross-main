//swiper
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

//

const successText = document.querySelector(".success__text");
const successMoreButton = document.querySelector(".success__more");
const successCollapseButtons = document.querySelectorAll(".success__collapse");

successMoreButton.addEventListener("click", () => {
  successText.classList.add("success__text");
  successMoreButton.classList.add("success__collapse-hidden");
  successCollapseButtons.forEach((button) => {
    button.classList.remove("success__collapse-hidden");
  });

  successText.textContent =
    "CoinСross — это криптообменник нового поколения, на котором вы всегда можете осуществить покупку криптовалюты и других электронных валют, таких как: Bitcoin BTC, Tether TRC20, Tether BEP20, Tether ERC20, Ethereum ETH, Litecoin LTC, Сбербанк RUB, Тинькофф RUB, Альфа-Банк RUB, ВТБ RUB, Райффайзен RUB, Visa/MasterCard RUB \nФункционал сайта CoinСross позволяет выполнять удобные и безопасные операции с электронными валютами 24/7, при этом вы можете не только совершать покупку и продажу биткоина и других валют, но и узнавать стоимость криптовалюты в реальном времени. На главной странице вам будет доступна актуальная информация о цене криптовалюты и резервах CoinСross. Чтобы узнать, сколько стоит биткоин в рублях на сегодня или определить стоимость эфира, перейдите на сайт, и вы сможете увидеть курс биткоина сейчас и других криптовалют. Вы также можете найти на платформе резервы Tether и посмотреть курс биткоина к доллару, а также купить USDT за рубли. Для того чтобы узнать актуальную цену биткоина и купить биткоин за рубли, выберите соответствующий банк и криптовалюту, и на платформе CoinCross отобразится текущий курс биткоина в рублях, который обновляется в автоматическом режиме. Помимо перечисленных возможностей, пользователи Coincross могут воспользоваться дополнительными бонусами и программами криптообменника: Принять участие в партнерской программе и получать вознаграждение до 0,5% за каждый обмен; Присоединиться к программе лояльности и совершать криптообмен на более выгодных условиях; Применить накопительную скидку, которая позволит сэкономить вам средства на обмене электронных валют. Криптообменник Coincross предоставляет возможность не только узнать курс крипты и купить биткоин в любое время, но и обеспечивает прозрачные и безопасные операции по обмену за счет современного ПО и доступной информации, которая постоянно обновляется на сайте. ";
});

successCollapseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    successText.classList.remove("success__text");
    successMoreButton.classList.remove("success__collapse-hidden");
    successCollapseButtons.forEach((button) => {
      button.classList.add("success__collapse-hidden");
    });

    successText.textContent =
      "Зарегистрируйтесь на Coincross сегодня и откройте для себя удобство и безопасность покупки и продажи криптовалюты с н";
  });
});

//transations
const transactionsDataMock = [
  {
    coin1: {
      name: "DAI (DAI)",
      price: "435,423",
      image: "./i/coins/dai.svg",
      seconds: "10",
      timeAgo: "10 минут назад",
    },
    coin2: {
      name: "Сбербанк (RUB)",
      price: "39 096,63",
      image: "./i/coins/sber.svg",
      seconds: "10",
      timeAgo: "10 минут назад",
    },
  },
  {
    coin1: {
      name: "Alpha",
      price: "435,423",
      image: "./i/coins/alpha.svg",
      seconds: "40",
      timeAgo: "13 минут назад",
    },
    coin2: {
      name: "Ether",
      price: "39 096,63",
      image: "./i/coins/ether.svg",
      seconds: "10",
      timeAgo: "16 минут назад",
    },
  },
];
// const data = transactionsData;
// fetch(`https://future-url`, {
//   method: "GET",
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));

function createTransactionHTML(transaction) {
  return `
      <div class="transactions__transaction">
        <div class="transactions__change">
          <div class="transactions__coin-container">
            <img src="${transaction.coin1.image}" alt="coin" class="transactions__coin" />
            <div>
              <div class="transactions__coin-name">${transaction.coin1.name}</div>
              <div class="transactions__coin-price">${transaction.coin1.price}</div>
            </div>
          </div>
          <div><img src="./i/change-black.svg" alt="" /></div>
          <div class="transactions__coin-container">
            <img src="${transaction.coin2.image}" alt="coin" class="transactions__coin" />
            <div>
              <div class="transactions__coin-name">${transaction.coin2.name}</div>
              <div class="transactions__coin-price">${transaction.coin2.price}</div>
            </div>
          </div>
        </div>
        <div class="transactions__time">
          <div class="transactions__seconds">
            <img src="./i/clock.svg" alt="" />${transaction.coin1.seconds} секунд
          </div>
          <div class="transactions__timeAgo">${transaction.coin1.timeAgo}</div>
        </div>
      </div>
    `;
}

const transactionsContainer = document.querySelector(
  ".transactions__transactions"
);

transactionsDataMock.forEach((transaction) => {
  const transactionHTML = createTransactionHTML(transaction);
  transactionsContainer.innerHTML += transactionHTML;
});

//mobile menu

const menuOverlay = document.querySelector(".header__menu-overlay");
const burgerButton = document.querySelector(".header__burger");
const closeButton = document.querySelector(".close-button");

burgerButton.addEventListener("click", () => {
  menuOverlay.classList.toggle("active");
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }
});
