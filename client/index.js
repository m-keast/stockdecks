

function fetchData() {
    //fetch the data from the server
    const note = getRandomNote()
    document.getElementById('noteDisplay').innerText = note;
    playNote(note);
}
    

function getRandomNote() {
  const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
}


document.addEventListener('keydown', function(event) {
  // Check if spacebar is pressed
  if (event.code === 'Space') {
    event.preventDefault(); // Optional: prevent page scroll on spacebar
    fetchData();
  }
});

function playNote(note, duration = 0.5) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Mapping note names to frequencies (A4 = 440 Hz)
  const noteFrequencies = {
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30
  };

  const freq = noteFrequencies[note];
  if (!freq) return;

  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square'; // Change to 'square', 'triangle', etc., for different timbres
  oscillator.frequency.value = freq/2;

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // Volume

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration); // Play for `duration` seconds
}