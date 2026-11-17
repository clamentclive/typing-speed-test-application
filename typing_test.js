
// ======================================
// CHECK LOGIN
// ======================================
if (
    localStorage.getItem("isLoggedIn") !== "true"
) {

    window.location.href = "login.html";

}
// ======================================
// PARAGRAPHS
// ======================================

const paragraphs = [
    "Technology has changed the way people communicate, work and learn. Every day new tools and applications are created to make our lives easier. Learning how to use technology effectively can open many opportunities and help people solve problems in creative ways.",
    "Success does not happen overnight. It requires patience, practice and consistency. When you work on something every day, even for a short amount of time, you slowly become better at it. Small improvements made regularly can eventually create a big difference.",
    "The internet has become an important part of modern life. People use it to communicate with friends, study new subjects, work with teams and discover information from around the world. However, it is important to use technology responsibly and protect personal information.",
    "Learning programming can be challenging at first, but practice makes the process easier. Writing code, finding mistakes and solving problems are all important parts of becoming a good programmer. The more projects you create, the more confident you become with programming.",
    "Time is one of the most valuable resources we have. Unlike money, lost time cannot be recovered. Managing time properly helps us complete important tasks, reduce stress and create opportunities for learning and personal growth. Good habits can make every day more productive."
];
// ======================================
// VARIABLES
// ======================================
let timer = null;
let testRunning = false;
let totalTime = 0;
let timeLeft = 0;
let startTime = 0;
let currentParagraph = "";
let previousParagraph = -1;

// ======================================
// GET HTML ELEMENTS
// ======================================

const timeSelect = document.getElementById("timeSelect");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const textBox = document.getElementById("text");
const input = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");
const result = document.getElementById("result");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalCharacters = document.getElementById("finalCharacters");
const finalTime = document.getElementById("finalTime");
const tryAgainBtn = document.getElementById("tryAgainBtn");

// ======================================
// LOGIN USERNAME
// ======================================

const logoutBtn = document.getElementById("logoutBtn");
const welcomeUser = document.getElementById("welcomeUser");

// ======================================
// SHOW USERNAME
// ======================================

const username =
    localStorage.getItem("username");
if (username) {
    welcomeUser.textContent =
        "Welcome, " + username;
}

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener(
    "click",
    function() {
        // Remove login information
        localStorage.removeItem(
            "isLoggedIn"
        );
        localStorage.removeItem(
            "username"
        );
        // Go back to login page
        window.location.href =
            "login.html";
    }
);

// ======================================
// SELECT RANDOM PARAGRAPH
// ======================================

function selectParagraph() {
    let randomNumber;
    do {
        randomNumber =
            Math.floor(Math.random() * paragraphs.length);
    } while (
        randomNumber === previousParagraph
    );
    previousParagraph = randomNumber;
    currentParagraph =
        paragraphs[randomNumber];
    displayParagraph();
}

// ======================================
// DISPLAY PARAGRAPH
// ======================================

function displayParagraph() {
    textBox.innerHTML = "";
    for (let i = 0; i < currentParagraph.length; i++) {
        const span = document.createElement("span");
        span.textContent = currentParagraph[i];
        textBox.appendChild(span);
    }
}

// ======================================
// FORMAT TIME
// ======================================

function updateTimer() {
    let minutes =
        Math.floor(timeLeft / 60);
    let seconds =
        timeLeft % 60;
    minutes =
        String(minutes).padStart(2, "0");
    seconds =
        String(seconds).padStart(2, "0");
    timeDisplay.textContent =
        minutes + ":" + seconds;
}

// ======================================
// START TEST
// ======================================

function startTest() {
    // Stop any previous timer
    clearInterval(timer);
    // Get selected minutes
    let selectedMinutes =
        Number(timeSelect.value);
    // Convert minutes to seconds
    totalTime =
        selectedMinutes * 60;
    timeLeft =
        totalTime;
    // Save start time
    startTime =
        Date.now();
    // Select a new paragraph
    selectParagraph();
    // Reset typing area
    input.value = "";
    input.disabled = false;
    // Reset statistics
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    // Hide previous result
    result.style.display = "none";
    // Button states
    startBtn.disabled = true;
    finishBtn.disabled = false;
    timeSelect.disabled = true;
    // Test is running
    testRunning = true;
    // Show timer
    updateTimer();
    // Focus typing area
    input.focus();

    // ==================================
    // START COUNTDOWN
    // ==================================

    timer = setInterval(function () {
        timeLeft--;
        updateTimer();
        calculateStats();
        // Automatically finish at 0
        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);

// ======================================
// INPUT EVENT
// ======================================

input.addEventListener("input", function () {
    if (!testRunning) {
        return;
    }
    calculateStats();
    updateCharacterColors();
    updateCurrentCharacter();
});

// ======================================
// CALCULATE WPM + ACCURACY
// ======================================

function calculateStats() {
    const typedText =
        input.value;
    // How many seconds have passed
    let elapsedSeconds =
        (Date.now() - startTime) / 1000;
    if (elapsedSeconds < 1) {
        elapsedSeconds = 1;
    }
    // ==================================
    // WPM
    // ==================================

    const words =
        typedText.length / 5;
    const minutes =
        elapsedSeconds / 60;
    const wpm =
        Math.round(words / minutes);
    wpmDisplay.textContent =
        wpm;

    // ==================================
    // ACCURACY
    // ==================================

    let correctCharacters = 0;
    for (
        let i = 0;
        i < typedText.length;
        i++
    ) {
        if (
            typedText[i] ===
            currentParagraph[i]
        ) {
            correctCharacters++;
        }
    }

    let accuracy = 100;
    if (typedText.length > 0) {
        accuracy =
            Math.round(
                (correctCharacters /
                typedText.length) * 100
            );
    }
    accuracyDisplay.textContent =
       accuracy + "%";
}

// ======================================
// COLOR CHARACTERS
// ======================================

function updateCharacterColors() {
    const typedText =
        input.value;
    const characters =
        textBox.querySelectorAll("span");
    characters.forEach(function (span, index) {
        span.classList.remove("correct");
        span.classList.remove("incorrect");
        if (index < typedText.length) {
            if (
                typedText[index] ===
                currentParagraph[index]
            ) {
                span.classList.add("correct");
            } else {
                span.classList.add("incorrect");
            }
        }
    });
}

// ======================================
// SHOW CURRENT CHARACTER
// ======================================

function updateCurrentCharacter() {
    const characters =
        textBox.querySelectorAll("span");
    const typedLength =
        input.value.length;
    characters.forEach(function (span) {
        span.classList.remove("current");
    });
    if (
        typedLength < characters.length
    ) {
        characters[typedLength]
            .classList.add("current");
    }

}
// ======================================
// FINISH TEST
// ======================================

function finishTest() {
    // IMPORTANT:
    // Don't allow finish to run twice
    if (!testRunning) {
        return;
    }
    // Stop timer immediately
    clearInterval(timer);
    timer = null;
    // Mark test as finished
    testRunning = false;
    // Disable typing
    input.disabled = true;
    // Enable/disable buttons
    finishBtn.disabled = true;
    startBtn.disabled = false;
    timeSelect.disabled = false;
    // Calculate final statistics
    calculateStats();
    // ==================================
    // FINAL WPM
    // ==================================
    const typedText =
        input.value;
    let elapsedSeconds =
        (Date.now() - startTime) / 1000;
    if (elapsedSeconds < 1) {
        elapsedSeconds = 1;
    }

    // Calculate elapsed time

    let elapsedMinutes =
    Math.floor(elapsedSeconds / 60);
    let elapsedSecondsRemaining =
    Math.floor(elapsedSeconds % 60);
    elapsedMinutes =
        String(elapsedMinutes).padStart(2, "0");
    elapsedSecondsRemaining =
        String(elapsedSecondsRemaining).padStart(2, "0");
    finalTime.textContent =
        elapsedMinutes + ":" + elapsedSecondsRemaining;
    const words =
        typedText.length / 5;
    const minutes =
        elapsedSeconds / 60;
    const finalWpmValue =
        Math.round(words / minutes);

    // ==================================
    // FINAL ACCURACY
    // ==================================

    let correctCharacters = 0;
    for (
        let i = 0;
        i < typedText.length;
        i++
    ) {
        if (
            typedText[i] ===
            currentParagraph[i]
        ) {
            correctCharacters++;
        }
    }

    let finalAccuracyValue = 100;

    if (typedText.length > 0) {
        finalAccuracyValue =
            Math.round(
                (correctCharacters /
                typedText.length) * 100
            );

    }

    // ==================================
    // DISPLAY RESULT
    // ==================================

    finalWpm.textContent =
        finalWpmValue;
    finalAccuracy.textContent =
        finalAccuracyValue + "%";
    finalCharacters.textContent =
        typedText.length;
    result.style.display =
        "block";

    // Scroll to result
    result.scrollIntoView({
        behavior: "smooth"
    });

}

// ======================================
// START BUTTON
// ======================================

startBtn.addEventListener(
    "click",
    function () {
        startTest();
    }
);


// ======================================
// FINISH BUTTON
// ======================================

finishBtn.addEventListener(
    "click",
    function () {
        finishTest();
    }
);

// ======================================
// TRY AGAIN BUTTON
// ======================================

tryAgainBtn.addEventListener(
    "click",
    function () {
        startTest();
    }
);

// ======================================
// INITIAL STATE
// ======================================

input.disabled = true;
finishBtn.disabled = true;
timeDisplay.textContent = "05:00";
}