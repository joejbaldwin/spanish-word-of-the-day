let NOUNS = [];
let VERBS = [];
let ADJECTIVES = [];
let ADVERBS = [];

function dayNumberUTC(d = new Date()) {
  // Use UTC so the result is stable regardless of local time-zone changes.
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();
  const todayUTC = Date.UTC(y, m, day);

  const epochUTC = Date.UTC(2024, 0, 1); // 1 Jan 2024
  const msPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((todayUTC - epochUTC) / msPerDay);
}

function wordOfDay(words, d = new Date()) {
  const n = dayNumberUTC(d);
  const idx = ((n % words.length) + words.length) % words.length;
  return words[idx];
}

function displayWord(word) {
  document.getElementById("spanish").textContent = word.spanish;
  document.getElementById("english").textContent = word.english;
  document.getElementById("meaning").textContent = word.meaning;
}

function getFilteredWords() {
  const nounsChecked = document.getElementById("nounsCheckbox").checked;
  const verbsChecked = document.getElementById("verbsCheckbox").checked;
  const adjectivesChecked = document.getElementById("adjectivesCheckbox").checked;
  const adverbsChecked = document.getElementById("adverbsCheckbox").checked;
  
  let filteredWords = [];
  
  if (nounsChecked) {
    filteredWords = filteredWords.concat(NOUNS);
  }
  
  if (verbsChecked) {
    filteredWords = filteredWords.concat(VERBS);
  }
  
  if (adjectivesChecked) {
    filteredWords = filteredWords.concat(ADJECTIVES);
  }
  
  if (adverbsChecked) {
    filteredWords = filteredWords.concat(ADVERBS);
  }
  
  return filteredWords.length > 0 ? filteredWords : [];
}

function showRandomWord() {
  const filteredWords = getFilteredWords();
  const randomIdx = Math.floor(Math.random() * filteredWords.length);
  displayWord(filteredWords[randomIdx]);
}

function handleCheckboxChange(event) {
  const nounsCheckbox = document.getElementById("nounsCheckbox");
  const verbsCheckbox = document.getElementById("verbsCheckbox");
  const adjectivesCheckbox = document.getElementById("adjectivesCheckbox");
  const adverbsCheckbox = document.getElementById("adverbsCheckbox");
  
  // Prevent unchecking if it's the last checked box
  if (!nounsCheckbox.checked && !verbsCheckbox.checked && 
      !adjectivesCheckbox.checked && !adverbsCheckbox.checked) {
    event.target.checked = true;
    return;
  }
  
  showRandomWord();
}

// Fetch all word files
Promise.all([
  fetch("data/nouns.json").then(r => r.json()),
  fetch("data/verbs.json").then(r => r.json()),
  fetch("data/adjectives.json").then(r => r.json()),
  fetch("data/adverbs.json").then(r => r.json())
])
  .then(([nouns, verbs, adjectives, adverbs]) => {
    NOUNS = nouns;
    VERBS = verbs;
    ADJECTIVES = adjectives;
    ADVERBS = adverbs;
    
    // Display initial word
    const filteredWords = getFilteredWords();
    const w = wordOfDay(filteredWords);
    displayWord(w);
    
    // Reroll button functionality
    document.getElementById("reroll").addEventListener("click", showRandomWord);
    
    // Checkbox change listeners with validation
    document.getElementById("nounsCheckbox").addEventListener("change", handleCheckboxChange);
    document.getElementById("verbsCheckbox").addEventListener("change", handleCheckboxChange);
    document.getElementById("adjectivesCheckbox").addEventListener("change", handleCheckboxChange);
    document.getElementById("adverbsCheckbox").addEventListener("change", handleCheckboxChange);
  })
  .catch(error => {
    console.error("Error loading words:", error);
    document.getElementById("spanish").textContent = "Error loading words";
  });

const now = new Date();
document.getElementById("date").textContent =
  "Date: " + now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
