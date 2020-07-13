class UserInfo {
  //работа с данными пользователя

  constructor(name, job, nameInput, jobInput, api, avatar) {
    this.name = name;
    this.job = job;
    this.nameInput = nameInput;
    this.jobInput = jobInput;
    this.api = api;
    this.avatar = avatar;
  }

  setUserInfo() {
    this.api
      .getUser()
      .then((res) => {
        this.name.textContent = res.name;
        this.job.textContent = res.about;
        this.avatar.style.backgroundImage = `url(${res.avatar})`;
        this.nameInput.value = this.name.textContent;
        this.jobInput.value = this.job.textContent;
      })
      .catch(() => {
        console.log("Данные о пользователе не загружены");
      });
  }

  updateUserInfo(nameInput, jobInput) {
    this.name.textContent = nameInput;
    this.job.textContent = jobInput;
  }

  resetState(name, job) {
    this.nameInput.value = name;
    this.jobInput.value = job;
  }
}
