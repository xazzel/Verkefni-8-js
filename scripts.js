const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    //Förum í rétt fall miðað við það sem ýtt er á
    for(let item of items.querySelectorAll('.item')){
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const text = item.querySelector('.item__text');
      text.addEventListener('click', edit);

      const button = item.querySelector('.item__button');
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector('.form__input');

    //Ef fallið er ekki tómt og ekki bara bil þá sendum við það
    //í add fallið og hreinsum input reitinn
    if (input.value.trim().length > 0) {
      add(input.value);
      input.value = "";
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {target} = e
    const {textContent, parentNode} = target;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit');
    input.setAttribute('type', 'text');
    input.value = textContent; //Setjum gamla textann í reitinn
    input.addEventListener('keyup',commit);

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    //enter takkinn
    if(event.keyCode === 13){
      console.log(e.target)

      //geymum gamla textan
      const newText = e.target.value
      const parentNode = e.target.parentNode
      parentNode.removeChild(e.target)

      //Búum til nýtt element með núja textanum
      newTextEl = el('span', 'item__text', edit)
      newTextEl.appendChild(document.createTextNode(newText))

      const button = parentNode.querySelector('.item__button');

      //Bætum nýja elementinu á foreldið
      parentNode.insertBefore(newTextEl, button)
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    //Búum til item
    const newItem = el('li', 'item')

    //Búum til checkbox
    const newCheckbox = el('input', 'item__checkbox', finish)
    newCheckbox.setAttribute('type', 'checkbox');

    //Búum til textann
    const newText = el('span', 'item__text', edit)
    newText.appendChild(document.createTextNode(value))

    //Búum til eyða takka
    const newButton = el('button', 'item__button', deleteItem)
    newButton.appendChild(document.createTextNode('Eyða'))

    //Tengjum hlutina rétt saman
    items.appendChild(newItem)
    newItem.appendChild(newCheckbox)
    newItem.appendChild(newText)
    newItem.appendChild(newButton)
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {target} = e
    const {textContent, parentNode} = target;

    parentNode.remove(target);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var newElement = document.createElement(type); //búum til element af type
    if(className) {
      newElement.className = className; //búum til className ef við á
    }
    if(clickHandler){   // setjum clickhandler ef við á
      newElement.addEventListener('click', clickHandler);
    }
    return newElement;  //skilum nýja elementinu
  }

  return {
    init: init
  }
})();
