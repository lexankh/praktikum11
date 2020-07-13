class CardList {
  constructor(container, api, createCard) {
    this.container = container;
    this.createCard = createCard;
    this.api = api;
  }

  render() {
    this.api
      .getCards()
      .then((res) => {
        res.forEach((item) => {
          this.addCard(item);
        });
      })
      .catch(() => {
        console.log("Карточки не пришли");
      });
  }

  addCard(data) {
    const card = this.createCard(data);
    this.container.append(card);
  }
}
