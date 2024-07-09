const form = document.forms.myForm;
let errors = [];
const errorMessage = document.querySelector("#errorMessage");

let formElements = form.elements;
  const name = formElements.userName.value;
  const email = formElements.email.value;
  const age = formElements.age.value;
  const password = formElements.password.value;
  

function checkValidityInput(input){
  let error = '';
    switch (input.name){
      case "userName":
        if(input.value.length < 2){
          error = "Your name should be more than 2 symbols";
        }
        break;
      case "email":
          if(!input.value.includes("@")){
            error = "Your email should include @";
          }
          break;
      case "age":
          if(input.value <= 0){
            error = "Your age should be more than 0";
          }
          break;
      case "gender":
      const gender = document.querySelector('input[name="gender"]:checked');
      if(gender === null){
        error = 'Please, choose your gender';
      }
      break;
      case "profession":
        const profession = formElements.profession.value;
        if(profession === ''){
          return "Pleasae, choose your profession"
        }
        break;
      case "password":
        if(input.value.length < 8){
          error = "Your password is too short";
        }
        break;
      case "agreeTerms":
        const agreeTerms = formElements.agreeTerms.checked;
        if(!agreeTerms){
          error = "Please, check agree to continue your registration";
        }
        break;
      default:
      console.log("Поля не заполнены. Пожалуйста, продолжите заполнение формы.");
    }
    return error;
  }


  function checkAll(){
    errors = [];
    let inputs = document.querySelectorAll("input[name], select[name]");
    console.log(inputs);
    let errorsInfo = document.querySelector(".errorsInfo");
  
  
    inputs.forEach(input => {
      let error = checkValidityInput(input);
      if (error) {
        errors.push(error);
        input.classList.add('error'); // Добавляем класс для стилизации ошибок
      } else {
        input.classList.remove('error'); // Убираем класс, если ошибок нет
      }
    });
  
    errorsInfo.innerHTML = errors.join(". \n");
    updateSubmitButtonState();
  }

  function updateSubmitButtonState() {
    const isFormValid = errors.length === 0;
    form.submitBtn.disabled = !isFormValid;
  }

  function updateSubmitButtonState() {
    const isFormValid = errors.length === 0; // Форма валидна, если нет ошибок
    document.getElementById("submitBtn").disabled = !isFormValid;
  }

form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkAll();

  if (errors.length > 0) {
    return;
  }

  const formData = new FormData(form);
  const data = {};

  formData.forEach(function(value, key) {
    data[key] = value;
  });

  const jsonData = JSON.stringify(data);
  localStorage.setItem("formData", jsonData);
  window.location.href = "result.html";
});

addFocusBlurHandlers();

// Добавляем обработчики событий focus и blur
function addFocusBlurHandlers() {
  let inputs = document.querySelectorAll("input, select");
  inputs.forEach(input => {
    input.addEventListener("focus", function() {
      input.classList.remove('error'); // Убираем класс ошибки при фокусе
    });
    input.addEventListener("blur", function() {
      let error = checkValidityInput(input);
      if (error) {
        input.classList.add('error'); // Добавляем класс ошибки при потере фокуса
      } else {
        input.classList.remove('error'); // Убираем класс, если ошибок нет
      }
    });
  });
}

addFocusBlurHandlers();