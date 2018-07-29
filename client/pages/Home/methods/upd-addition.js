export default function updAddition(form) {
  let newState = Object.assign({}, this.state);
  var items;
  if (form.type === 'person') {
    delete form.type;
    newState.verses = newState.verses.map((verse) => {
      if (!verse) return verse;
      verse.items = verse.items.map((item) => {
        if (item._id === form._id || item.personId === form._id) item = Object.assign({}, item, form);
        return item;
      });
      return verse;
    });
  } else {
    items = newState.verses[newState.index].items;
    newState.verses[newState.index].items = items.map((item) => {
      if (item._id === form._id) item = form;
      return item;
    });
  }
  this.setState(newState);
}
