import { controlRecipe, controlSearch } from '../controller.js';
import logo from 'url:../../img/logo.png'
import modalView from './modalView.js'
import previewView from './previewView.js'
import bookmarksView from './bookmarksView.js'
import icons from 'url:../../img/icons.svg'
import View from './View.js';


class Header extends View{
  _parentElement = document.querySelector('.header');
  _inputSearch;
  _bookmarkList;
  _dataUser;
  _dataBookmarks;
  
  constructor(){
    super();
  }
  

  
  addHandlerRender(handler){
    window.addEventListener('load', handler)
  }

  render(data){
    if(data.user){
      this._dataUser = data.user;
    }
    if(data.bookmarks){
      this._dataBookmarks = data.bookmarks;
    }
      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
      
    this.#addEventTargetHandler()
   
  }


  getQuery() {
    const query = this._inputSearch.value;
    this._inputSearch.value = '';
    return query;
  }

  #addEventTargetHandler(){
    this._inputSearch = this._parentElement.querySelector('.search__field')
    this._bookmarkList = this._parentElement.querySelector('.bookmarks__list')
    
    if(this._bookmarkList){
      bookmarksView.addBtnBookmark(this._bookmarkList);
      bookmarksView.addHandlerRender(bookmarksView.render(this._dataBookmarks))
      bookmarksView.addHandlerClick(controlRecipe)
    }

    this._parentElement.addEventListener('click', (e)=>{
      e.preventDefault()
      if(!e.target) return;

      if(e.target.closest('.search__btn')){
        controlSearch()
      }

      if(e.target.closest('.nav__btn--login')){
        window.history.pushState(null, '', `/#login`);
        modalView.render(this._dataUser);
        this.addHandlerShowWindow();
      }

      if(e.target.closest('.nav__btn--me')){
        window.history.pushState(null, '', `/#me`);
        modalView.render(this._dataUser);
        this.addHandlerShowWindow();
      }

      if(e.target.closest('.nav__btn--add-recipe')){
        window.history.pushState(null, '', `/#add-recipe`);
        modalView.render(this._dataUser);
        this.addHandlerShowWindow();
      }
    })
  }



  _generateMarkupBookmarks(data) {
  return `${data.map(bookmark => previewView.render(bookmark, false)).join('\n')}`
}

  _generateNavLogin() {
    if(this._dataUser.token) {
      return `
      <ul class="nav__list">
        <li class="nav__item">
          <button class="nav__btn nav__btn--add-recipe">
            <svg class="nav__icon">
              <use href="${icons}#icon-edit"></use>
            </svg>
            <span>Добавить Рецепт</span>
          </button>
        </li>
      <li class="nav__item">
        <button class="nav__btn nav__btn--bookmarks">
          <svg class="nav__icon">
            <use href="${icons}#icon-bookmark"></use>
          </svg>
          <span>Закладки</span>
        </button>
        <div class="bookmarks">
          <ul class="bookmarks__list">
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>
              Закладок пока нет. Найдите хороший рецепт и добавьте его в закладки :)
              </p>
            </div>    
          </ul>
        </div>
      </li>
      <li class="nav__item">
        <button class="nav__btn nav__btn--me">
          <svg class="nav__icon">                          
            <use href="${icons}#icon-smile"></use>
          </svg>
          <span>${this._dataUser.name}</span>
        </button>
      </li>
      </ul>
      </nav>
      `
    } 
    
    if(this._dataUser.id === '' && this._dataUser.name === '' && this._dataUser.token === '' ){
      return ` 
      <ul class="nav__list">
      <li class="nav__item">
        <button class="nav__btn nav__btn--login">
          <svg class="nav__icon">                          
            <use href="${icons}#icon-smile"></use>
          </svg>
          <span>Вход</span>
        </button>
      </li>
    </ul>
  `
    }
  }

  _generateMarkup(){
    return `
      <img src="${logo}" alt="Logo" class="header__logo" />
      <form class="search">
        <input
        type="text"
        class="search__field"
        placeholder="Ищите разные рецепты"
        />
        <button class="btn search__btn">
          <svg class="search__icon">
            <use href="${icons}#icon-search"></use>
          </svg>
          <span>Поиск</span>
        </button>
      </form>
      <nav class="nav">
     ${this._generateNavLogin()}
      </nav>
    `
  }
  
}

export default new Header();