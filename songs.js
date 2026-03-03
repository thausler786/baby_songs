// Song data - add your songs here!
// Each song needs: title, singer, and audioUrl (path to the MP3 file in the audio folder)
const songs = [
    {
        title: "Love is Little",
        singer: "Tim Hausler",
        audioUrl: "audio/Love is Little.m4a"
    },
    {
        title: "When You Were Born",
        singer: "Baby Fest-ivalers",
        audioUrl: "audio/when you were born.m4a"
    },
    {
        title: "You Belong With Me",
        singer: "Sunday Brunch Club",
        audioUrl: "audio/you belong with me.m4a"
    },
    {
        title: "French Happy Birthday",
        singer: "Francophone Canada Stans",
        audioUrl: "audio/French happy birthday.m4a"
    },
    {
        title: "Happy Birthday",
        singer: "Baby Fest-ivalers",
        audioUrl: "audio/happy birthday.m4a"
    },
    {
        title: "Wiegenlied",
        singer: "Kunsel Tenzin",
        audioUrl: "audio/kunsel song.m4a"
    },
    {
        title: "Edelweiss",
        singer: "Shivani Srivastav",
        audioUrl: "audio/Edelweiss for Kate.m4a"
    },
];

// Player logic
const audioPlayer = document.getElementById('audio-player');
const songList = document.getElementById('song-list');
const nowPlaying = document.getElementById('now-playing');
const nowPlayingText = document.getElementById('now-playing-text');
const progressSlider = document.getElementById('progress-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let currentlyPlaying = null;
let isSeeking = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

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

// Update progress slider as song plays
audioPlayer.addEventListener('timeupdate', () => {
    if (!isSeeking && audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressSlider.value = progress;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
});

// Update duration when metadata loads
audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
    progressSlider.value = 0;
    currentTimeEl.textContent = '0:00';
});

// Handle seeking
progressSlider.addEventListener('input', () => {
    isSeeking = true;
    if (audioPlayer.duration) {
        currentTimeEl.textContent = formatTime((progressSlider.value / 100) * audioPlayer.duration);
    }
});

progressSlider.addEventListener('change', () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressSlider.value / 100) * audioPlayer.duration;
    }
    isSeeking = false;
});

// Initialize
renderSongs();
