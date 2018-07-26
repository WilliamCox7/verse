const OPEN = 'nav/OPEN';
const CLOSE = 'nav/CLOSE';
const SET_ITEM = 'nav/SET_ITEM';

const initState = {
  showModal: false,
  modalType: undefined,
  item: undefined
}

/**
 * @method reducer the reducer for the scripture
 * @param {object} [state=initState] allow the initial state to be manipulated
 * @param {object} action the incoming settings
 * @returns the new state
 */

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case OPEN:
      editState.showModal = true;
      editState.modalType = action.payload;
      editState.item = action.item;
      return Object.assign({}, state, editState);

    case CLOSE:
      editState.showModal = false;
      editState.modalType = undefined;
      return Object.assign({}, state, editState);

    case SET_ITEM:
      editState.item = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function openModal(type, item) {
  return {
    type: OPEN,
    payload: type,
    item: item
  }
}

export function closeModal() {
  return {
    type: CLOSE
  }
}

export function setItem(item) {
  return {
    type: SET_ITEM,
    payload: item
  }
}
