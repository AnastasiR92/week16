const form = document.forms.myForm;

let errors = [];

const errorMessage = document.querySelector("#errorMessage");
// Получаем доступ к элементам формы
let formElements = form.elements;

function checkValidityInput(input){
    // Переменная для хранения сообщения об ошибке
    let error = '';
    switch(input.name){
        // Проверка выбора машины
        case "car":
            const car = formElements.car.value;
            if(car === ''){
                error = "Please, choose a car";
            }
            break;
        // Проверка модели машины
        case "model":
                const model = formElements.model.value;
                if(model === ''){
                error = "Please, choose a model of the car";
                }
                break;
        // Проверка выбора топлива
        case "fuel":
        const fuel = document.querySelector('input[name="fuel"]:checked');
        if(fuel === null){
          error = 'Please, choose a fuel';
        }
        break;
        // Проверка объема двигателя
        case "amount":
        const amount = formElements.amount.value;
        if(amount < 1.1 || amount > 3.5){
        error = 'Please, choose a valid engine capacity';
        }
        break;
        // Проверка состояния автомобиля
        case "condition":
        const condition = document.querySelector('input[name="condition"]:checked');
        if(condition === null){
        error = 'Please, choose a prefer condition';
        }
        break;
        // Проверка количества владельцев
        case "owner":
        const owner = document.querySelector('input[name="owner"]:checked');
        if(owner === null){
        error = 'Please, choose amount of owners';
        }
        break;
        // Проверка способа оплаты
        case "payment":
        const payment = document.querySelector('input[name="payment"]:checked');
        if(payment === null){
        error = 'Please, choose your type of payment';
        }
        break;
        // Сообщение по умолчанию, если поле не заполнено
        default:
        console.log("Поля не заполнены. Пожалуйста, продолжите заполнение формы.");
    }
    // Возвращаем сообщение об ошибке
    return error;
}

// Функция для проверки всех полей формы
function checkAll(){
    // Очищаем массив ошибок
    errors = [];
    // Получаем все элементы формы с атрибутом name
    let inputs = document.querySelectorAll("input[name], select[name]");
    // Получаем элемент для отображения списка ошибок
    let errorsInfo = document.querySelector(".errorsInfo");

    // Перебираем все элементы формы
    inputs.forEach(input => {
    // Проверяем валидность каждого поля
    let error = checkValidityInput(input);
    // Если есть ошибка, добавляем ее в массив
    if (error) {
      errors.push(error);
      // Добавляем класс 'error' для стилизации поля с ошибкой
      input.classList.add('error');
    } else {
      // Убираем класс 'error', если поле валидно
      input.classList.remove('error');
    }
  });

    // Отображаем список ошибок
    errorsInfo.innerHTML = errors.join(". \n");
    // Обновляем состояние кнопки отправки
    updateSubmitButtonState();  
}

function updateSubmitButtonState() {
    // Проверяем, есть ли ошибки
    const isFormValid = errors.length === 0;
    // Если ошибок нет, разблокируем кнопку отправки
    document.getElementById('submitBtn').disabled = !isFormValid;
}

form.addEventListener("submit", function(e) {
    // Предотвращаем стандартное поведение формы
    e.preventDefault();
    // Вызываем функцию проверки всех полей
    checkAll();
  
    // Если есть ошибки, прерываем выполнение функции
    if (errors.length > 0) {
      return;
    }
  
    // Создаем объект FormData из формы
    const formData = new FormData(form);
    // Создаем пустой объект для данных формы
    const data = {};
  
    // Заполняем объект данными из формы
    formData.forEach(function(value, key) {
      data[key] = value;
    });
});

//скрываем/открываем блок с количеством владельцев
document.querySelectorAll("#used, #new").forEach(function(el) {
    el.addEventListener("change", function() {
        const ownerField = document.getElementById("owner-field");
        if(document.getElementById("used").checked) {
            ownerField.style.display = "block";
        } else if(document.getElementById("new").checked) {
            ownerField.style.display = "none";
        }
    });
});


//Пишем функцию для получения стоимости
function calculatePrice() {
    // Получаем значения из формы
    const carBrand = formElements.car.value;
    const carModel = formElements.model.value;
    const fuelType = document.querySelector('input[name="fuel"]:checked').value;
    const engineCapacity = parseFloat(formElements.amount.value);
    const carCondition = document.querySelector('input[name="condition"]:checked').value;
    // const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let previousOwners = 0;
    if (document.getElementById("used").checked) {
        previousOwners = document.querySelector('input[name="owner"]:checked').value;
    }

    // Начальная стоимость автомобиля
    let price = 0;

    // Расчет стоимости на основе марки и модели
    // Расчет стоимости для разных марок и моделей
    switch(carBrand) {
        case 'reno':
            price += 500;
            break;
        case 'opel':
            price += 600;
            break;
        case 'mazda':
            price += 900;
            break;
        case 'jaguar':
            price += 1500;
            break;
            default:
        console.log("Please, choose a brand");
    }

    switch(carModel){
        case "reno_fluence":
            price += 500;
            break;
        case "opel_astra":
            price += 600;
            break;
        case "mazda_cx":
            price += 900;
            break;
        case "jaguar_xe":
            price += 1500;
            break;
            default:
        console.log("Please, choose a model");
    }


    // Расчет стоимости на основе типа топлива
    switch (fuelType) {
        case 'gasoline':
            price += 500;
            break;
        case 'diesel':
            price += 600;
            break;
        case 'gas':
            price += 300;
            break;
        case 'electricity':
            price += 1000;
            break;
    }

    // Расчет стоимости на основе объема двигателя
    price += engineCapacity * 200;

    // Расчет стоимости на основе состояния автомобиля
    if (carCondition === 'new') {
        price += 2000;
    } else {
        price -= 500;
    }

    // Расчет стоимости на основе количества владельцев
    if (previousOwners === 'one') {
        price -= 300;
    } else if (previousOwners === 'few') {
        price -= 500;
    }

    // // Расчет стоимости на основе способа оплаты
    // if (paymentMethod === 'invoice') {
    //     price += 200;
    // }

    // Обновляем отображение стоимости на странице
    const priceElement = document.getElementById('price');
    priceElement.textContent = `Стоимость автомобиля: ${price} рублей`;
}

// Добавляем функцию calculatePrice в обработчик события submit
form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkAll();
    if (errors.length === 0) {
    calculatePrice();
    }
});