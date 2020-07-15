 import {Api} from "./js/Api.js";
  import {Card} from "./js/Card.js";
  import {CardList} from "./js/CardList.js";
  import {FormValidator} from "./js/FormValidator.js";
  import {Popup} from "./js/Popup.js";
  import {UserAdd} from "./js/UserAdd.js";
  import {UserInfo} from "./js/UserInfo.js";

  import "./pages/index.css";

(function () {


  const places = document.querySelector(".places-list");
  const addPopup = document.querySelector(".popup_add");
  const editPopup = document.querySelector(".popup_edit");
  const imagePopup = document.querySelector(".popup_image");
  const editButton = document.querySelector(".user-info__edit-button");
  const plusButton = document.querySelector(".user-info__button");
  const popupButtonSave = document.querySelector(".popup__button_type_save");
  const editFullNameInput = document.querySelector(
    ".popup__input_type_full-name"
  );
  const editJobInput = document.querySelector(".popup__input_type_job");
  const addNameInput = document.querySelector(".popup__input_type_name");
  const addLinkInput = document.querySelector(".popup__input_type_link-url");
  const fullName = document.querySelector(".user-info__name");
  const job = document.querySelector(".user-info__job");
  const editForm = document.querySelector(".popup__form_edit");
  const addForm = document.querySelector(".popup__form_add");
  const exitImageButton = document.querySelector(".popup__close_image");
  const avatar = document.querySelector(".user-info__photo");

  const config = {
    url: "https://praktikum.tk/cohort11/",
    headers: {
      authorization: "5560d32b-c9de-49e5-8704-39c14bd9288a",
      "Content-Type": "application/json",
    },
  };

  const api = new Api(config);

  const popupWindowAdd = new Popup(addPopup);

  plusButton.addEventListener("click", () => {
    popupWindowAdd.open();
    popupWindowAdd.setEventListeners();
  });

  //попап редактирования
  const popupWindowEdit = new Popup(editPopup);
  //экземпляр класса (редактирование информации о себе)
  const formEdit = new UserInfo(
    fullName,
    job,
    editFullNameInput,
    editJobInput,
    api,
    avatar
  );
  formEdit.setUserInfo();

  //попап с картинкой
  const popupWindowUncrop = new Popup(imagePopup);

  function createCard(item) {
    return new Card(item, popupWindowUncrop).create();
  }

  const cardList = new CardList(places, api, createCard);
  cardList.render();

  editButton.addEventListener("click", (e) => {
    formEditValidator.resetState();
    popupWindowEdit.open();
    popupWindowEdit.setEventListeners();
    //чтобы форма редактирования совпадала с написанным на странице

    formEdit.resetState(fullName.textContent, job.textContent);
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    popupButtonSave.textContent = "Подождите...";

    api
      .updateUser(editFullNameInput.value, editJobInput.value)
      .then(() => {
        formEdit.updateUserInfo(editFullNameInput.value, editJobInput.value);
        popupWindowEdit.close();
      })
      .catch(() => {
        console.log("Данные пользователя не обновлены");
      })
      .finally(() => {
        popupButtonSave.textContent = "Сохранить";
      });
  });

  const formEditValidator = new FormValidator(editForm);
  formEditValidator.setEventListeners();

  const formAddValidator = new FormValidator(addForm);
  formAddValidator.setEventListeners();

  const userAdd = new UserAdd(cardList);

  const cardAddByUser = (e) => {
    e.preventDefault();
    userAdd.addBySubmit(addNameInput.value, addLinkInput.value);
    popupWindowAdd.close();
  };
  exitImageButton.addEventListener("click", popupWindowUncrop.close);
  addForm.addEventListener("submit", cardAddByUser);
})();
