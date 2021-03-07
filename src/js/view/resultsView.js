import View from './View.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js'

class ResultsView extends View{
  _parentElement = document.querySelector('.results');
  _errorMessage = 'По вашему запросу рецептов не найдено!';
  _message = '';


render(data, render = true) {
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


_clear(){
  this._parentElement.innerHTML = '';
}

  _generateMarkup() {
    return `${this._data.map(result => previewView.render(result, false)).join('\n')}`
  }
}

export default new ResultsView();