// TODO: allow user to enter ID
// TODO: allow user to save ID (by pressing enter)
// TODO: allow user to edit ID
const inputDiv = document.querySelector('#input');
let inputState = {
  'editing': false,
  'inputIndex': 0,
  'text': ''
}

inputDiv.innerHTML = inputState.text;

inputDiv.addEventListener('click', () => {
  if (!inputState.editing) {
    inputState.editing = true;
  }
});
inputDiv.addEventListener('blur', () => {
  inputState.inputIndex = inputState.text.length;
})

document.addEventListener('keydown', event => {
  if (inputState.editing) {
    if ((48 <= event.keyCode && event.keyCode <= 57) // key is a number
      || (96 <= event.keyCode && event.keyCode <= 105)) { // or key is a numpad number
      const strSlice1 = inputState.text.slice(0, inputState.inputIndex);
      const strSlice2 = inputState.text.slice(inputState.inputIndex, inputState.text.length);
      
      inputState.text = strSlice1 + event.key + strSlice2;
      inputState.inputIndex += 1;
    } else if (event.keyCode === 8 && inputState.inputIndex > 0) { // backspace
        const strSlice1 = inputState.text.slice(0, inputState.inputIndex - 1);
        const strSlice2 = inputState.text.slice(inputState.inputIndex, inputState.text.length);
  
        inputState.text = strSlice1 + strSlice2;
        inputState.inputIndex -= 1;
    } else if (event.keyCode === 46) { // del
      const strSlice1 = inputState.text.slice(0, inputState.inputIndex);
      const strSlice2 = inputState.text.slice(inputState.inputIndex + 1, inputState.text.length);

      inputState.text = strSlice1 + strSlice2
    } else if (event.keyCode === 37) { // left arrow
      if (inputState.inputIndex > 0) {
        inputState.inputIndex -= 1;
      } 
    } else if (event.keyCode === 39) { // right arrow
      if (inputState.inputIndex < inputState.text.length - 1) {
        inputState.inputIndex += 1;
      }
    } else if (event.keyCode === 13) { // enter
      inputState.editing === false;
      inputDiv.blur();
    }

    inputDiv.innerHTML = inputState.text;
  }
});

// TODO: display balance for user

// TODO: display transactions list, including sender and recipient

// Stretch TODO: use styling to visually distinguish coins sent and coins received