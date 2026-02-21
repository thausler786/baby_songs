// Song data - add your songs here!
// Each song needs: title, singer, and audioUrl (path to the MP3 file in the audio folder)
const songs = [
    // Example entries (uncomment and modify when you have actual songs):
    // {
    //     title: "Twinkle Twinkle Little Star",
    //     singer: "Aunt Sarah",
    //     audioUrl: "audio/twinkle.mp3"
    // },
    // {
    //     title: "Rock-a-Bye Baby",
    //     singer: "Uncle Mike",
    //     audioUrl: "audio/rock-a-bye.mp3"
    // },
];

// Player logic
const audioPlayer = document.getElementById('audio-player');
const songList = document.getElementById('song-list');
const nowPlaying = document.getElementById('now-playing');
const nowPlayingText = document.getElementById('now-playing-text');

let currentlyPlaying = null;

function renderSongs() {
    if (songs.length === 0) {
        songList.innerHTML = `
            <div class="empty-state">
                <p>No songs yet!</p>
                <p>Add songs to <code>songs.js</code> to get started.</p>
            </div>
        `;
        return;
    }

    songList.innerHTML = songs.map((song, index) => `
        <div class="song-card" data-index="${index}">
            <button class="play-button" aria-label="Play ${song.title}">
                <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            </button>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-singer">${song.singer}</div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            togglePlay(index);
        });
    });
}

function togglePlay(index) {
    const song = songs[index];
    const cards = document.querySelectorAll('.song-card');

    if (currentlyPlaying === index) {
        // Pause current song
        audioPlayer.pause();
        cards[index].classList.remove('playing');
        nowPlaying.classList.add('hidden');
        currentlyPlaying = null;
    } else {
        // Stop any currently playing song
        if (currentlyPlaying !== null) {
            cards[currentlyPlaying].classList.remove('playing');
        }

        // Play new song
        audioPlayer.src = song.audioUrl;
        audioPlayer.play();
        cards[index].classList.add('playing');
        nowPlayingText.textContent = `Now playing: ${song.title} by ${song.singer}`;
        nowPlaying.classList.remove('hidden');
        currentlyPlaying = index;
    }
}

// Handle song ending
audioPlayer.addEventListener('ended', () => {
    if (currentlyPlaying !== null) {
        document.querySelectorAll('.song-card')[currentlyPlaying].classList.remove('playing');
        nowPlaying.classList.add('hidden');
        currentlyPlaying = null;
    }
});

// Initialize
renderSongs();
