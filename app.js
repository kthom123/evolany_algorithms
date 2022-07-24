const permInput = document.querySelector(".perm-input");
const permSubmit = document.querySelector(".perm-submit");
const permOutput = document.querySelector(".perm");


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

permSubmit.addEventListener("click", getPermutations);
