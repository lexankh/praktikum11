class Card {
  constructor(item, popupCallback) {
    this.item = item;
    this.newCard = null;
    this.popupCallback = popupCallback;
    this.uncrop = this.uncrop.bind(this);
  }

  create() {
    const markup = `<div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>`;

    const element = document.createElement("div");
    element.insertAdjacentHTML("afterbegin", markup);

    this.newCard = element.firstElementChild;
    this.newCard.querySelector(
      ".place-card__name"
    ).textContent = this.item.name;
    this.newCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.item.link})`;
    this.newCard.querySelector(
      ".place-card__image"
    ).dataset.url = this.item.link;
    this.setListeners();

    return this.newCard;
  }

  like() {
    this.classList.toggle("place-card__like-icon_liked");
  }

  deleteCard() {
    this.removeEventListener("click", this.deleteCard);
    this.closest(".place-card").remove();
  }

  uncrop() {
    this.popupCallback.setImageSource(this.item.link);
    this.popupCallback.open();
  }

  setListeners() {
    this.newCard
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.newCard
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.deleteCard);
    this.newCard
      .querySelector(".place-card__image")
      .addEventListener("click", (e) => {
        //if нужен для срабатывания на картинке, а не корзинке
        if (e.target.classList.contains("place-card__image")) {
          this.uncrop();
        }
      });
  }
}
