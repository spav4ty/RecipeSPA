import View from './View.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js'
import * as model from '../model.js'
import recipeView from './recipeView.js';
import resultsView from './resultsView.js';
import { controlRecipe } from '../controller.js';

class BookmarksView extends View {
  _parentElement;
  _errorMessage = 'Закладок пока нет. Найдите хороший рецепт и добавьте его в закладки =)';
  _message = '';

  constructor(){
    super();
  }

  addBtnBookmark(el){
    this._parentElement = el;
  }

  render(data, render = true) {
    if(!this._parentElement) return;
    if(!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError()
    }    
    this._data = data;
    const markup = this._generateMarkup(); 

    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);   
  }
  
  update(data){
    if(!this._parentElement) return;
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


  addHandlerClick(handler){
    if(this._parentElement){
      this._parentElement.addEventListener('click', e => {
        if(e.target.closest('.preview')){
          const btn = e.target.closest('.preview').querySelector('.preview__link')
          const idBookamrks = btn.getAttribute('href');
          window.history.pushState(null, '', `/${idBookamrks}`);
          handler()
        };
      })

    }

  }

  _generateMarkup() {
  return `${this._data.map(bookmark => previewView.render(bookmark, false)).join('\n')}`
  }
}

export default new BookmarksView();
