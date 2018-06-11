import * as Pack from './exports/packages';
import scripture from './reducers/scripture';
import nav from './reducers/nav';
import user from './reducers/user';

export default Pack.combineReducers({
  scripture, nav, user
});
