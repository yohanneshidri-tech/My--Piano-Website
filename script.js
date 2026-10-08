// Get all piano keys
const keys = document.querySelectorAll(".key");


// Get the sound selector
const soundSelect = document.getElementById("soundSelect");


// Get the last note area
const lastNote = document.getElementById("lastNote");


// Get the song selector
const songSelect = document.getElementById("songSelect");


// Get the song notes area
const songNotes = document.getElementById("songNotes");


// Store the selected sound
let soundType = "sine";


// Create Audio Context
const audioContext = new (
    window.AudioContext ||
    window.webkitAudioContext
)();


// Change sound when user selects another sound
soundSelect.addEventListener("change", function () {

    soundType = soundSelect.value;

});


// Function to play a sound
function playNote(frequency) {

    const oscillator = audioContext.createOscillator();

    const gainNode = audioContext.createGain();


    // Select the sound type
    oscillator.type = soundType;


    // Set the frequency
    oscillator.frequency.value = frequency;


    // Connect the sound
    oscillator.connect(gainNode);

    gainNode.connect(audioContext.destination);


    // Volume
    gainNode.gain.setValueAtTime(
        0.3,
        audioContext.currentTime
    );


    // Start the sound
    oscillator.start();


    // Slowly reduce the volume
    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.8
    );


    // Stop the sound
    oscillator.stop(
        audioContext.currentTime + 0.8
    );
}


// Function to play a piano key
function playKey(key) {

    // Get the frequency
    const frequency = key.dataset.frequency;


    // Get the note
    const note = key.dataset.note;


    // Get the solfege
    const solfege = key.dataset.solfege;


    // Play the sound
    playNote(frequency);


    // Add active class
    key.classList.add("active");


    // Show the last note
    lastNote.textContent =
        note + " - " + solfege;


    // Remove active class after a short time
    setTimeout(function () {

        key.classList.remove("active");

    }, 150);
}


// Keyboard event
document.addEventListener("keydown", function(e) {

    // Convert the pressed key to lowercase
    const pressedKey = e.key.toLowerCase();


    // Find the piano key
    const key = document.querySelector(
        '[data-key="' + pressedKey + '"]'
    );


    // If the key does not exist, do nothing
    if (!key) {
        return;
    }


    // Prevent repeating when holding a key
    if (e.repeat) {
        return;
    }


    // Play the key
    playKey(key);

});


// Key released
document.addEventListener("keyup", function(e) {

    const pressedKey = e.key.toLowerCase();


    const key = document.querySelector(
        '[data-key="' + pressedKey + '"]'
    );


    if (!key) {
        return;
    }


    key.classList.remove("active");

});


// Mouse click
keys.forEach(function(key) {

    key.addEventListener("mousedown", function() {

        playKey(key);

    });


    key.addEventListener("mouseup", function() {

        key.classList.remove("active");

    });


    key.addEventListener("mouseleave", function() {

        key.classList.remove("active");

    });

});


// Famous songs
const songs = {

    birthday:
        "G G A G C B | G G A G D C | G G G E C B A | F F E C D C",


    twinkle:
        "C C G G A A G | F F E E D D C | G G F F E E D | G G F F E E D",


    jingle:
        "E E E | E E E | E G C D E | F F F F F E E E"
};


// Display selected song
songSelect.addEventListener("change", function() {

    const selectedSong = songSelect.value;


    songNotes.textContent =
        songs[selectedSong];

});


// Display first song when page loads
songNotes.textContent =
    songs.birthday;
