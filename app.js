// Constant declarations for Permutations
const permInput = document.querySelector(".perm-input");
const permSubmit = document.querySelector(".perm-submit");
const permOutput = document.querySelector(".perm");

// Constant declarations for SortedArray
const sortInput = document.querySelector(".sort-input");
const sortSubmit = document.querySelector(".sort-submit");
const sortedOutput = document.querySelector(".sorted");
const reversedOutput = document.querySelector(".reversed");

//Constant declarations for Generate File
const generateInput = document.querySelector(".generate-input");
const generateSubmit = document.querySelector(".generate-submit");
const generateOutput = document.querySelector(".generate");

const downloadBtn = document.querySelector(".download-btn");


// Permutations
const getPermutations = (event) => {
  event.preventDefault(); // This prevents the page from refreshing when clicking the button

  if (!permInput.value) {
    alert("Enter a list of numbers");
    return;
  } // This raises an alert if the user tries to click the button without any input

  arr = Array.from(permInput.value.toString()).map(Number);
  const output = []; // This sets the input to an array

  const repeatedNums = () => {
    return (/([0-9]).*?\1/).test(permInput.value);
  } // This checks for any repeated numbers in the input using regex

  if (repeatedNums()) {
    alert("Numbers cannot be repeated");
    return;
  } // This raises an alert if the numbers are repeated in the input

  const swapInPlace = (arrToSwap, indexA, indexB) => {
    const temp = arrToSwap[indexA];
    arrToSwap[indexA] = arrToSwap[indexB];
    arrToSwap[indexB] = temp;
  }; // This swaps the number's location in the array

  const generate = (n, heapArr) => {
    if (n === 1) {
      output.push(heapArr.slice());
      return;
    } // This pushes it to the output array

    generate(n - 1, heapArr);

    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) {
        swapInPlace(heapArr, i, n - 1);
      } else {
        swapInPlace(heapArr, 0, n - 1);
      }

      generate(n - 1, heapArr);
    }
  }; // This loops through the array

  generate(arr.length, arr.slice());
  return permOutput.innerHTML = JSON.stringify(output);
};


//SortedArray
const declareClass = (event) => {
  event.preventDefault(); // This prevents the page from refreshing when clicking the button

  if (!sortInput.value) {
    alert("Enter a list of numbers");
    return;
  } // This raises an alert if the user tries to click the button without any input

  class SortedArray {
    constructor(list) {
      this.list = list;
    } // This is the class declaration
    sorted = () => { // This is the sorting method
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
    reversed = () => { // This reverses the sorted numbers above
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


// Generate File
const generateFile = (event) => {
  event.preventDefault(); // This prevents the page from refreshing when clicking the button

  if (!generateInput.value) {
    alert("Enter a number for the file size");
    return;
  } // This raises an alert if the user tries to click the button without any input

  let num = generateInput.value;
  let size = num * 1000000; // This converts the input size to bytes

  var bytes = [...Array(size).keys()]; // This sets the array size for the file content based on its size.
  var ia = new Uint8Array(bytes); // This sets the 8-bit unsigned integer array
  var file = new File([ia], "hexfile.bin", {type: "application/octet-stream"}); // This creates the file

  downloadBtn.href = window.URL.createObjectURL(file); // This creates the url for the file and passes it to the href of the download button
  downloadBtn.style.display = "block"; // This displays the download button
};


permSubmit.addEventListener("click", getPermutations);
sortSubmit.addEventListener("click", declareClass);
generateSubmit.addEventListener("click", generateFile);
