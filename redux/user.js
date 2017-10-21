const SET = 'user/SET';

const initState = {}

export default function reducer(state=initState, action) {

  let editState = Object.assign({}, state); // create state to manipulate

  switch(action.type) {

    case SET:
      editState = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }

}

export function setUser(user) {
  return {
    type: SET,
    payload: user
  }
}
