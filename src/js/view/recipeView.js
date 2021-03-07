import View from './View.js'
import icons from 'url:../../img/icons.svg'
import * as model from '../model.js'

class Recipe extends View{
  _parentElement = document.querySelector('.recipe');
  _errorMessage = "Поищите какой-нибудь рецепт для себя"; 
  _message = 'Начните с поиска рецепта или ингредиента.';

  constructor(){
  super();
  }

  render(data, render = true) {
    if(!data || Object.entries(data).length === 0){
      return this.renderError()
    }
    this._data = data;

    const markup = this._generateMarkup();

    if(!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }


  update(data){
    if(!data || Object.entries(data).length === 0){
      return this.renderError()
    }
    this._data = data;
    const newMarkup = this._generateMarkup();
    
    const newDom = document.createRange().createContextualFragment(newMarkup)
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'))
  
  
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent
      }
    
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => { 
          curEl.setAttribute(attr.name, attr.value)})
      }
    })
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--tiny');
      if(!btn) return;
      const toGoPage = +btn.dataset.togo
      if(toGoPage >0)handler(toGoPage)
      
    })
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }


 _generateMarkup() {
   const id = window.location.hash.slice(1)
  if(id !== 'me' || id !== 'login' || id !=='add-recipe' ) {
   return `
   <figure class="recipe__fig">
     <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
     <h1 class="recipe__title">
       <span>${this._data.title}</span>
     </h1>
   </figure>

   <div class="recipe__details">
     <div class="recipe__info">
       <svg class="recipe__info-icon">
         <use href="${icons}#icon-clock"></use>
       </svg>
       <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
       <span class="recipe__info-text">минут</span>
     </div>
     <div class="recipe__info">
       <svg class="recipe__info-icon">
         <use href="${icons}#icon-users"></use>
       </svg>
       <span class="recipe__info-data recipe__info-data--people" >${this._data.servings}</span>
       <span class="recipe__info-text">порций</span>

       <div class="recipe__info-buttons">
         <button class="btn--tiny btn--increase-servings" data-togo="${this._data.servings - 1}">
           <svg>
             <use href="${icons}#icon-minus-circle"></use>
           </svg>
         </button>
         <button class="btn--tiny btn--increase-servings" data-togo="${this._data.servings + 1}">
           <svg>
             <use href="${icons}#icon-plus-circle"></use>
           </svg>
         </button>
       </div>
     </div>

     <div class="recipe__user-generated ${!model.state.user.token ? 'hidden' : ''}">
     <svg>
       <use href="${icons}#icon-user"></use>
     </svg>
   </div>
   <button class="btn--round btn--bookmark ${!model.state.user.token ? 'hidden' : ''}">
     <svg class="">
       <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
     </svg>
   </button>
   </div>

   <div class="recipe__ingredients">
     <h2 class="heading--2">Ингредиенты рецепта</h2>
     <ul class="recipe__ingredient-list">
       ${this._data.ingredients.map(this._generateMarkupIngredient).join('\n')}
     </ul>
   </div>

   <div class="recipe__directions">
     <h2 class="heading--2">Как это приготовить</h2>
     <p class="recipe__directions-text">
       Этот рецепт был тщательно разработан и протестирован
       <span class="recipe__publisher">${this._data.publisher}</span>. Спросите в коментариях если что-то непонятно, или перейтите на сайт.
     </p>
     <a
       class="btn--small recipe__btn"
       href="${this._data.sourceUrl}"
       target="_blank"
     >
       <span>Ссылка на сайт</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </a>
   </div>
   
   <div class="recipe__reviews">
     <h2 class="heading--2">Ваш Отзыв</h2>
     <form class="recipe__directions-text">
     <textarea class="" name="review">
       
     </textarea>
     <button
       class="btn--small recipe__btn"
     >
       <span>Добавить</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
     </button>
     </form>
   </div>`
  };
 }
 
   _generateMarkupIngredient(ing){ 
     return `
     <li class="recipe__ingredient">
     <svg class="recipe__icon">
     <use href="${icons}#icon-check"></use>
     </svg>
     <div class="recipe__quantity">${
         ing.quantity ? new Fraction(ing.quantity).toString() : ''
       }</div>
       <div class="recipe__description">
         <span class="recipe__unit">${ing.unit}</span>
         ${ing.description}
         </div>
     </li>
    `
  }
}


export default new Recipe();