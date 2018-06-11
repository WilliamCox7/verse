const SET = 'scripture/SET';
const ADD_COM = 'scripture/ADD_COM';
const ADD_END = 'scripture/ADD_END';
const ADD_STT = 'scripture/ADD_STT';
const SET_REF = 'scripture/SET_REF';
const ADD_ADD = 'scripture/ADD_ADD';
const SET_IND = 'scripture/SET_IND';

const initState = {
  abrString: 'Gen 1:1',
  refId: undefined,
  index: 101,
  verses: [],
  comments: []
}

/**
 * @method reducer the reducer for the scripture
 * @param {object} [state=initState] allow the initial state to be manipulated
 * @param {object} action the incoming settings
 * @returns the new state
 */

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  let p = action.payload;
  switch(action.type) {

    case SET:
      editState.verses = action.payload;
      editState.abrString = `${p[101].bookAbr} ${p[101].chapter}:${p[101].verse}`;
      editState.refId = p[101]._id;
      return Object.assign({}, state, editState);

    case ADD_END:
      editState.verses.push(action.payload);
      return Object.assign({}, state, editState);

    case ADD_STT:
      editState.verses[action.index] = action.payload;
      return Object.assign({}, state, editState);

    case SET_REF:
      editState.abrString = `${p.bookAbr} ${p.chapter}:${p.verse}`;
      editState.refId = p._id;
      return Object.assign({}, state, editState);

    case ADD_ADD:
      editState.verses[editState.index] = Object.assign({}, editState.verses[editState.index], p);
      return Object.assign({}, state, editState);

    case SET_IND:
      editState.index = action.payload;
      return Object.assign({}, state, editState);

    case ADD_COM:
      editState.comments.unshift(action.payload);
      return Object.assign({}, state, editState);

    default: return state;

  }
}

/**
 * @method setReference sets the current scripture reference
 * @param {object} reference contains all things pertaining to the scripture
 */

export function setVerses(verses) {
  return {
    type: SET,
    payload: verses
  }
}

/**
 * @method addComment adds comment to display of comments
 * @param {object} comment contains all things pertaining to the new comment
 */

export function addComment(comment) {
  return {
    type: ADD_COM,
    payload: comment
  }
}

export function addScriptureToEnd(verse) {
  return {
    type: ADD_END,
    payload: verse
  }
}

export function addScriptureToStart(verse, index) {
  return {
    type: ADD_STT,
    payload: verse,
    index: index
  }
}

export function setReference(verse) {
  return {
    type: SET_REF,
    payload: verse
  }
}

export function addAddition(form) {
  return {
    type: ADD_ADD,
    payload: form
  }
}

export function setIndex(index) {
  return {
    type: SET_IND,
    payload: index
  }
}
