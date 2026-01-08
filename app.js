const WORDS = [
  { spanish: "ser", english: "to be", meaning: "Used for identity and relatively permanent characteristics." },
  { spanish: "estar", english: "to be", meaning: "Used for states/feelings and locations." },
  { spanish: "aunque", english: "although", meaning: "Introduces a contrast or concession." },
  { spanish: "entonces", english: "then/so", meaning: "Used to indicate consequence or what happens next." },
  { spanish: "todavía", english: "still/yet", meaning: "Indicates something continues or has not happened yet." },
  { spanish: "ojalá", english: "hopefully/if only", meaning: "Expresses a wish (often followed by subjunctive)." },
];

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

const w = wordOfDay(WORDS);

document.getElementById("spanish").textContent = w.spanish;
document.getElementById("english").textContent = w.english;
document.getElementById("meaning").textContent = w.meaning;

const now = new Date();
document.getElementById("date").textContent =
  "Date: " + now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
