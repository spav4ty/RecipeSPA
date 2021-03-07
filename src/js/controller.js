import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';

import headerView from './view/headerView.js'
import modalView from './view/modalView.js';
import recipeView from './view/recipeView.js'
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


  
const controlHeader = async function() {
  try {
    await headerView.render(model.state)

  } catch(err) {
    throw err;
  }
}

const controlResults = async function() {
  try{
    await resultsView.render(model.state.search)
  }catch(err) {
    resultsView.renderError()
  }
}

export const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id || (id === 'me' || id === 'login' || id === 'add-recipe')) {
      return;
    }

    recipeView.renderSpinner()
    bookmarksView.render(model.state.bookmarks)
    resultsView.update(model.getSearchResultsPage())

    await model.loadRecipe(id)
    
    await recipeView.render(model.state.recipe)
    window.history.pushState(null, '', `/#${model.state.recipe.id}`);
  } catch(err) {
    recipeView.renderError()
  }
}

export const controlSearch = async function(){
  try{
    const query = headerView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    await resultsView.render(model.getSearchResultsPage())

    paginationView.render(model.state.search)
  } catch (err) {
    resultsView.renderError()
    throw err;
    
  }
}


const controlPagination = async function(goToPage) {

  resultsView.render(model.getSearchResultsPage(goToPage))

  paginationView.render(model.state.search)
}


export const controlLogin = async function(user){
  try{
    modalView.renderSpinner();
    await model.signIn(user);
    headerView.render(model.state);
    recipeView.render(model.state.recipe);
    window.history.pushState(null, '', `/#me`);
    
    setTimeout(function () {
      modalView.toggleWindow();
    }, 1000);

  } catch (err) {
    modalView.renderError()
    throw err;   
  }
}

export const controlSignup = async function(user){
  try{
    modalView.renderSpinner();
    await model.signUp(user);
    model.setUserInfo();
    headerView.render(model.state)
    window.history.pushState(null, '', `/#me`);
    
    setTimeout(function () {
      modalView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    modalView.renderError()
    throw err;   
  }
}

export const controlAddBookmarks = function() {
  
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }
  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}

export const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
} 

const controlServings = function(toGoPage){
  model.updateServings(toGoPage)

  recipeView.update(model.state.recipe)
}


export const controlAddRecipe = async function(newRecipe){
  try{
    modalView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmarks)

    window.history.pushState(null, '', `#${model.state.recipe.id}`);


    setTimeout(function () {
      modalView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }catch(err) {
    throw err;
  }
}


const init = function(){
  headerView.addHandlerRender(controlHeader)  
  paginationView.addHandlerClick(controlPagination)
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerAddBookmark(controlAddBookmarks)
  recipeView.addHandlerServings(controlServings)
}
  


init()



