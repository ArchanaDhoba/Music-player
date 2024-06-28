document.getElementById('play-button').addEventListener('click', function() {
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('music-player-page').style.display = 'flex';
});

// Array of songs
const songs = [
    {
        title: "I LIKE IT",
        artist: "BTS",
        src: "media/BTS---I-LIKE-IT(musicdownload.cc).mp3"
    },
    {
        title: "DYNAMITE",
        artist: "BTS",
        src: "media/Dynamite-BTS(PagalWorld).mp3"
    },
    {
        title: "Dekha Tenu Pehli Pehli Bar",
        artist: "Artists Unknown",
        src: "media/Dekha Tenu Pehli Pehli Baar Ve_64(PagalWorld.com.sb).mp3"
    },
    {
        title: "Sajni Re",
        artist: "Artist Unknown",
        src: "media/O Sajni Re_64(PagalWorld.com.sb).mp3"
    },
    {
        title: "Ke Janam Pyar Tumse",
        artist: "Artist Unknown",
        src: "media/Ke Janam Pyar Tumse Hai_64(PagalWorld.com.sb).mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songTitleElement = document.getElementById('song-title');
const songArtistElement = document.getElementById('song-artist');

function loadSong(song) {
    audioPlayer.src = song.src;
    songTitleElement.textContent = song.title;
    songArtistElement.textContent = song.artist;
    audioPlayer.load();
    audioPlayer.onloadedmetadata = function() {
        durationElement.textContent = formatTime(audioPlayer.duration);
        seekBar.max = Math.floor(audioPlayer.duration);
    };
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.classList.remove('fa-play');
    playPauseButton.classList.add('fa-pause');
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.classList.remove('fa-pause');
    playPauseButton.classList.add('fa-play');
}

playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

document.getElementById('next').addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

document.getElementById('prev').addEventListener('click', function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

document.getElementById('shuffle').addEventListener('click', function() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(songs[currentSongIndex]);
    playSong();
});

document.getElementById('repeat').addEventListener('click', function() {
    audioPlayer.currentTime = 0;
    playSong();
});

audioPlayer.addEventListener('timeupdate', function() {
    seekBar.value = Math.floor(audioPlayer.currentTime);
    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
});

seekBar.addEventListener('input', function() {
    audioPlayer.currentTime = seekBar.value;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first song initially
loadSong(songs[currentSongIndex]);
