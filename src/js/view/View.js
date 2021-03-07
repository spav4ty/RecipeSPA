import icons from 'url:../../img/icons.svg'

export default class View {
  _parentElement;
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.window');
  _btnClose = document.querySelector('.btn--close-modal')

  constructor(){
   this._addHandlerHideWindow()
  }


  // -------------------------------------------
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
      if(!this._overlay.classList.contains('hidden' && !this._window.classList.contains('hidden'))){
        this._overlay.classList.remove('hidden');
      this._window.classList.remove('hidden'); 
    }
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', (e)=> {
      if(!this._overlay.classList.contains('hidden' && !this._window.classList.contains('hidden'))){
        this._overlay.classList.add('hidden');
      this._window.classList.add('hidden'); 
    }
  });
  
  this._overlay.addEventListener('click', (e)=> {
    if(!this._overlay.classList.contains('hidden' && !this._window.classList.contains('hidden'))){
      this._overlay.classList.add('hidden');
      this._window.classList.add('hidden'); 
      }
    });
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }


 
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  
}