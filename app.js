const permInput = document.querySelector(".perm-input");
const permSubmit = document.querySelector(".perm-submit");
const permOutput = document.querySelector(".perm");

const sortInput = document.querySelector(".sort-input");
const sortSubmit = document.querySelector(".sort-submit");
const sortedOutput = document.querySelector(".sorted");
const reversedOutput = document.querySelector(".reversed");

const generateInput = document.querySelector(".generate-input");
const generateSubmit = document.querySelector(".generate-submit");
const generateOutput = document.querySelector(".generate");

const downloadBtn = document.querySelector(".download-btn");

// Permutations function
const getPermutations = (event) => {
  event.preventDefault();

  arr = Array.from(permInput.value.toString()).map(Number);
  const output = [];

  const swapInPlace = (arrToSwap, indexA, indexB) => {
    const temp = arrToSwap[indexA];
    arrToSwap[indexA] = arrToSwap[indexB];
    arrToSwap[indexB] = temp;
  };

  const generate = (n, heapArr) => {
    if (n === 1) {
      output.push(heapArr.slice());
      return;
    }

    generate(n - 1, heapArr);

    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        swapInPlace(heapArr, i, n - 1);
      } else {
        swapInPlace(heapArr, 0, n - 1);
      }

      generate(n - 1, heapArr);
    }
  };

  generate(arr.length, arr.slice());

  return permOutput.innerHTML = JSON.stringify(output);
};

//SortedArray
const declareClass = (event) => {
  event.preventDefault();

  class SortedArray {
    constructor(list) {
      this.list = list;
    }
    sorted = () => {
      for (let i = 0; i < this.list.length; i++) {
        for (let j = i + 1; j < this.list.length; j++) {
          if (this.list[i] > this.list[j]) {
            let temp = this.list[i];
            this.list[i] = this.list[j];
            this.list[j] = temp;
          }
        }
      }
      sortedOutput.innerHTML = `<p>Sorted Array - ${this.list}</p>`;
      return this.list
    }
    reversed = () => {
      const reversedArray = [];
      for (let i = this.sorted().length - 1; i >= 0; i--){
        reversedArray.push(this.sorted()[i]);
      }
      reversedOutput.innerHTML = `<p>Reversed Array - ${reversedArray}</p>`;
      return reversedArray
    }
  }

  let arr = Array.from(sortInput.value.toString()).map(Number);
  let classInstance = new SortedArray(arr)

  return classInstance.reversed();
}

//Generate file
// const generateFile = (event) => {
//   event.preventDefault();
// }

// let number = generateInput.value;
// let size = number * 1000000;


// downloadBtn.href = window.URL.createObjectURL(file)

// function download() {
//   var downloadBtn = document.createdownloadBtn('a');
//   downloadBtn.setAttribute('href', link);

//   downloadBtn.style.display = 'none';
//   document.body.appendChild(downloadBtn);

//   downloadBtn.click();

//   document.body.removeChild(downloadBtn);
// }

permSubmit.addEventListener("click", getPermutations);
sortSubmit.addEventListener("click", declareClass);
generateSubmit.addEventListener("click", generateFile);
