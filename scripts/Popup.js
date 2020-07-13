class Popup {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }

  setEventListeners() {
    this.popup
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  }

  setImageSource(link) {
    this.popup.querySelector(".popup__uncrop").src = link;
  }
}
