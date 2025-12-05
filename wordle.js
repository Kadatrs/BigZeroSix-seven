const nbLetters = 5;
const freqOffset = 'A'.charCodeAt(0);
const colorImg = ["../Images/case/greyCard.png", "../Images/case/orangeCard.png", "../Images/case/greenCard.png",];

// Takes a word and return a 26-sized number array with the numbers of time the letter has been used.
function wordToFrequencyArray(word) {
    let freq = Array(26).fill(0);
    for (let letter of word) {
        let l = letter.toUpperCase(); // To avoid case issues
        if (l >= 'A' && l <= 'Z') {
            let i = l.charCodeAt(0) - freqOffset;
            freq[i]++;
        }
    }
    return freq;
}

// Modify the res array to include well placed letters. (2)
// e.g: userTry = "crane", solution = "curve"
// wellPlacedLetters would modify res to be equal to [2, 0, 0, 0, 2] 
// would also change freq so the 'c' and 'e' would diminish
function wellPlacedLetters(userTry, solution, freq, res)  {
    for (let i = 0; i < nbLetters; i++) {
        if (userTry.charAt(i) == solution.charAt(i)) {
            res[i] = 2;
            freq[userTry.charCodeAt(i) - freqOffset]--;
        }
    }
}

// Modify the res array to include misplaced letters (1)
//e.g: userTry = "crane", solution = "curve"
// misplacedLetters would modify res to be equal to [2, 1, 0, 0, 2] (assuming that wellPlacedLetters was called already)
function misplacedLetters(userTry, solution, freq, res) {
    for (let i = 0; i < nbLetters; i++) {
        if (res[i] != 2 && freq[userTry.charCodeAt(i) - freqOffset] != 0) {
            res[i] = 1;
            freq[userTry.charCodeAt(i) - freqOffset]--;
        } 
    }
}


// Ultimate function, comparing user's try with solution. Returns a number array.
// 0 is a bad letter. 1 is a misplaced letter. 2 is a good letter
// e.g: userTry = "crane", solution = "curve"
// compareSolutionTry would return [2, 1, 0, 0, 2]
function compareSolutionTry(userTry, solution) {
    let freq = wordToFrequencyArray(solution); // frequency tab of user's try
    let res = Array(nbLetters).fill(0);

    console.log(freq);
    wellPlacedLetters(userTry, solution, freq, res);
    console.log(freq);
    misplacedLetters(userTry, solution, freq, res);
    return res;
}

function bababa(meow) {
    res = "";
    tab = ["🔴", "🟡", "🟢"];
    for (i of meow) {
        res += tab[i];
    }
    return res;
}

// Allows the user to play wordle with text.
function playText(solution) {
    let userInput = prompt("Devinez le mot !");
    let i = 0;
    while (userInput != solution && i < 6) {
        userInput = prompt(bababa(compareSolutionTry(userInput, solution)));
        console.log(bababa(compareSolutionTry(userInput, solution)));
    } 
    alert("mais t trop chaud gg");
}


function changeLine(line, array) {
    for (let i = 1; i < nbLetters+1; i++) {
        img =document.getElementById(String(line) + String(i));
        img.src = colorImg[array[i-1]];
    }
}

const form = document.getElementById("answerForm");
const input = document.getElementById("userWord");
const feedback = document.getElementById("feedback");
const solution = "CURVE";

function whenSubmitted(e) {
    e.preventDefault();
    const userInput = input.value.toUpperCase();
    const result = compareSolutionTry(userInput, solution);

    feedback.textContent = bababa(result);
}



changeLine(2, [2, 0, 1, 0, 2]);

form.addEventListener("submit", whenSubmitted);

//  playText("CURVE");