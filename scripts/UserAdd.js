class UserAdd {
  constructor(cardList) {
    this.cardList = cardList;
  }

  addBySubmit(nameFromInput, linkFromInput) {
    const data = {
      name: nameFromInput,
      link: linkFromInput,
    };

    this.cardList.addCard(data);
  }
}
