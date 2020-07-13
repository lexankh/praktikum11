class FormValidator {


  constructor(form) {
      this.form = form;
      this.submit = this.form.querySelector('.popup__button');
  }

isValidate(input) {

  const errorMessages = {
      empty: "Это обязательное поле",
      errorLength: "Должно быть от 2 до 30 символов",
      url: "Здесь должна быть ссылка",
    };
  
      input.setCustomValidity("");
    
      if (input.validity.valueMissing) {
        input.setCustomValidity(errorMessages.empty);
        return false;
      }
    
      if (input.validity.tooShort || input.validity.tooLong) {
        input.setCustomValidity(errorMessages.errorLength);
        return false;
      }
    
    
      if(input.validity.typeMismatch && input.type === "url") {
        input.setCustomValidity(errorMessages.url);
        return false;
      }
    
      return input.checkValidity();
    
}
  

  checkInputValidity(e) {

      e.preventDefault();

      const input = e.target;
      const submit = this.form.querySelector('.popup__button');
    
      const errorElem = this.form.querySelector(`#${input.id}-error`);
      const valid = this.isValidate(input);
      errorElem.textContent = input.validationMessage;
    
      if (this.form.checkValidity()) {
        this.setSubmitButtonState(submit, true);
      }
      else {
        this.setSubmitButtonState(submit, false);
      }
      
    
      return valid;
      

  }

 

  


  setSubmitButtonState(button, state) {
      if (state) {
        button.classList.remove('popup__button_novalid');
        button.removeAttribute('disabled', 'true');
    
      } else {
        button.classList.add('popup__button_novalid');
        button.setAttribute('disabled', 'true');
    
      }
    }

  setEventListeners() {

      this.form.addEventListener('input', (e) => {
          this.checkInputValidity(e);
      })

  }

  resetState() {
    this.setSubmitButtonState(this.submit, true);
    const spansError = Array.from(this.form.querySelectorAll('.error'));
    spansError.forEach(span => span.textContent = "");
  }
}