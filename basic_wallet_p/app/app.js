// DONE: allow user to enter ID
// DONE: allow user to save ID (by pressing enter)
// DONE: allow user to edit ID
// DONE: display balance for user
// DONE: display transactions list, including sender and recipient
// Stretch TODO: use styling to visually distinguish coins sent and coins received

const inputDiv = document.querySelector('#input');
let inputState = {
  'editing': false,
  'inputIndex': 0,
  'text': ''
}
let chainState = {
  chain: [
      {
          index: 1,
          previous_hash: 1,
          proof: 100,
          timestamp: 1571852367.484206,
          transactions: [ ]
      },
      {
          index: 2,
          previous_hash: "ddf1adddad9af96695fda647492897f058aa702f806d7eaa21dfd46ecab0fcd1",
          proof: 24368051,
          timestamp: 1571852436.924649,
          transactions: [
              {
                  amount: 1,
                  recipient: "Brian",
                  sender: "0"
              }
          ]
      },
      {
          index: 3,
          previous_hash: "2fa2bcc7b423d5d74d621835b098842cf9dd34591bfc0e68800a41cf20b2ec90",
          proof: 8132268,
          timestamp: 1571852467.247827,
          transactions: [
              {
                  amount: 1,
                  recipient: "Brian",
                  sender: "0"
              }
          ]
      },
      {
          index: 4,
          previous_hash: "3f4b18d04371d8ce3129643ccf5ad46bb9943a87adf8c5addded0d3612128f59",
          proof: 1301845,
          timestamp: 1571852472.199991,
          transactions: [
              {
                  amount: 1,
                  recipient: "Brian",
                  sender: "0"
              }
          ]
      },
      {
          index: 5,
          previous_hash: "9177932144818f9c3072d11849251bdd31096621162f0e081016fa59e25010d2",
          proof: 13176802,
          timestamp: 1571852599.8256152,
          transactions: [
              {
                  amount: "3",
                  recipient: "Beej",
                  sender: "Brian"
              },
              {
                  amount: 1,
                  recipient: "Brian",
                  sender: "0"
              }
          ]
      },
      {
          index: 6,
          previous_hash: "1e110e46bd7a6a86cd39c3adae667439a40e31b20db3b314bed5b1fa56c746ea",
          proof: 41571496,
          timestamp: 1571852940.9420102,
          transactions: [
              {
                  amount: ".5",
                  recipient: "Brady",
                  sender: "Beej"
              },
              {
                  amount: ".5",
                  recipient: "Elissa",
                  sender: "Beej"
              },
              {
                  amount: ".5",
                  recipient: "Tom",
                  sender: "Beej"
              },
              {
                  amount: 1,
                  recipient: "Brian",
                  sender: "0"
              }
          ]
      }
  ],
  length: 6
};

inputDiv.innerHTML = inputState.text;
const baseAxiosURL = 'http://localhost:5000';

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
    const nonControlKey = 
        (event.keyCode > 47 && event.keyCode < 58)   || // number keys
        (event.keyCode > 64 && event.keyCode < 91)   || // letter keys
        (event.keyCode > 95 && event.keyCode < 112)  || // numpad keys
        (event.keyCode > 185 && event.keyCode < 193) || // ;=,-./` (in order)
        (event.keyCode > 218 && event.keyCode < 223);   // [\]' (in order)

    if (nonControlKey) {
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
      getChain();
      displayTransactions();
      tally();
    }

    inputDiv.innerHTML = inputState.text;
  }
});

async function getChain() {
  // try {
  //   chainState = await axios.get(`${baseAxiosURL}/chain`);
  // } catch (error) {
  //   console.log(error);
  // }
}

function displayTransactions() {
  const chain = chainState.chain;
  const transactionList = [];

  chain.forEach(block => {
    block.transactions.forEach(transaction => {
      transactionList.push(transaction);
    });
  });

  const transactionsUL = document.querySelector('#transactions');
  transactionsUL.innerHTML = '';
  transactionList.forEach(transaction => {
    li = document.createElement('li');
    li.innerHTML = `${transaction.sender} sent ${transaction.recipient} ${transaction.amount}BTC.`;
    transactionsUL.appendChild(li);
  });
}

function tally() {
  const chain = chainState.chain;
  const user = inputState.text;

  let tally = 0;
  chain.forEach(block => {
    block.transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      const signedAmount = transaction.sender === user ? -amount : transaction.recipient === user ? amount : 0;
      tally += signedAmount;
    });
  });

  const balanceP = document.querySelector('#balance');
  balanceP.innerHTML = tally;
}
