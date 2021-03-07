import * as model from '../model.js';
import View from './View.js'
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

import { controlAddRecipe, controlLogin, controlSignup } from '../controller.js' 


class ModalView extends View {
  _parentElement = document.querySelector('.upload');
  _errorMessage = 'Что-то пошло не так! Попробуйте позже.';
  _message = '';
  _data;
  _btnLogin;
  _btnSignUp;
  _btnAddRecipe;

  constructor() {
    super();
  }

  render(data){
    this._data = data;

    const markup = this._generateMarkup();
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this.#addHandlerModal();
  }

  #addHandlerModal(){
    this._btnLogin = this._parentElement.querySelector('.form_login');
    this._btnSignUp = this._parentElement.querySelector('.form_signup');      
    this._btnAddRecipe = this._parentElement.querySelector('.form_upload');      

    if(this._btnLogin){
      
      this._btnLogin.addEventListener('submit', function(e){
        e.preventDefault()

        const dataArr = [...new FormData(this)] 
        const data = Object.fromEntries(dataArr)

        controlLogin(data)
      })
    }

    if(this._btnSignUp){

      this._btnSignUp.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)] 
        const data = Object.fromEntries(dataArr)
        
        controlSignup(data)
      })
    }

    if(this._btnAddRecipe){

      this._btnAddRecipe.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)] 
        const data = Object.fromEntries(dataArr)
        controlAddRecipe(data)
      })
    }
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    if(id === 'login'){
      return ` 
          <div class="upload__column-sign">
            <form class="form_login">
              <h3 class="upload__heading">Вход</h3>
              <label>Email</label>
              <input value="" required name="email" type="email" />
              <label>Password</label>
              <input value="" required name="password" type="password" />
              <button class="btn upload__btn">
                <svg>
                  <use href="${icons}#icon-upload-cloud"></use>
                </svg>
              <span>Войти</span>
              </button>
            </form>


            <form class="form_signup">
              <h3 class="upload__heading">Регистрация</h3>
              <label>Имя</label>
              <input value="" required name="name" type="text" />
              <label>Email</label>
              <input value="" required name="email" type="email" />
              <label>Password</label>
              <input value="" required name="password" type="password" />
              <label>Password Confirm</label>
              <input value="" required name="passwordConfirm" type="password" />
              <button class="btn upload__btn">
              <svg>
                <use href="${icons}#icon-upload-cloud"></use>
              </svg>
              <span>Регистрация</span>
              </button>
            </form>
          </div>

          `
    }

    if(id === 'me' && this._data.role) {
      return `
      <div class="upload__me">
      <h2>${this._data.name}</h2>
      </div>
      `
    }

    if(id === 'add-recipe' && this._data.role){
      return `
      <form class='form_upload'>
      <div class="upload__column">
        <h3 class="upload__heading">Данные рецепта</h3>
        <label>Название</label>
        <input placeholder="Название твоей пиццы" required name="title" type="text" />
        <label>Ссылка</label>
        <input placeholder="Где нашёл" required name="sourceUrl" type="text" />
        <label>Ссылка Картинки</label>
        <input placeholder="Если есть картинка" required name="image" type="text" />
        <label>Издатель</label>
        <input placeholder="Если не укажешь, будет твое Имя" required name="publisher" type="text" />
        <label>Время приготовления</label>
        <input placeholder="15" required name="cookingTime" type="number" />
        <label>Порции</label>
        <input placeholder="4" required name="servings" type="number" />
        </div>

        <div class="upload__column">
        <h3 class="upload__heading">Ингредиенты</h3>
        <label>Ингредиент 1</label>
        <input
          type="text"
          required
          name="ingredient-1"
          placeholder="Формат: «Количество, единица, описание»"
        />
        <label>Ингредиент 2</label>
        <input
          type="text"
          name="ingredient-2"
          placeholder="Формат: «Количество, единица, описание»"
        />
          <label>Ингредиент 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Формат: «Количество, единица, описание»"
          />
          <label>Ингредиент 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Формат: «Количество, единица, описание»"
          />
          <label>Ингредиент 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Формат: «Количество, единица, описание»"
          />
          <label>Ингредиент 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Формат: «Количество, единица, описание»"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Загрузить</span>
        </button>
      </form>
      `
    }
  }
}


export default new ModalView();