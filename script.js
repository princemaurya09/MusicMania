console.log("Welcome to MusicMania");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let muteButton = document.getElementById('muteButton');
let volumeSlider = document.getElementById('volume-slider');
let isShuffle = false;

let songs = [
    {songName: "keejo kesari ke laal", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tum Se", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Still Rollins", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "No Love(Shubh)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Tauba Tauba", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Daru Badnam", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Check It Out", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Born To Shine", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Admirin You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Naina from Crew", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Aaoge Tum Kabhi", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Heeriye", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Soulmate", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Aam Jahe Munde", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (shuffleMode) {
        // Play a random song when shuffle is enabled
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        // Play the next song in order
        if (songIndex >= songs.length - 1) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1; // Go to the last song
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
// Volume control functionality
volumeSlider.addEventListener('input', ()=>{
    audioElement.volume = volumeSlider.value;
    if (audioElement.volume == 0) {
        muteButton.classList.remove('fa-volume-up');
        muteButton.classList.add('fa-volume-mute');
    } else {
        muteButton.classList.remove('fa-volume-mute');
        muteButton.classList.add('fa-volume-up');
    }

});
// Toggle mute/unmute when the mute button is clicked
muteButton.addEventListener('click', () => {
    if (audioElement.muted) {
        audioElement.muted = false;
        volumeSlider.value = audioElement.volume;
        muteButton.classList.remove('fa-volume-mute');
        muteButton.classList.add('fa-volume-up');
    } else {
        audioElement.muted = true;
        volumeSlider.value = 0;
        muteButton.classList.remove('fa-volume-up');
        muteButton.classList.add('fa-volume-mute');
    }
});
// Shuffle functionality
let shuffleMode = false;

shuffleButton.addEventListener('click', () => {
    shuffleMode = !shuffleMode;
    if (shuffleMode) {
        shuffleButton.classList.add('fa-shuffle');
    } else {
        shuffleButton.classList.remove('fa-shuffle');
    }
});
// Play next song function
function playNextSong() {
    if (shuffleMode) {
        // Play a random song when shuffle is enabled
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        // Play the next song in order
        if (songIndex >= songs.length - 1) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
    }
    playCurrentSong();
}

// Play current song function
function playCurrentSong() {
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// Automatically play the next song when the current one ends
audioElement.addEventListener('ended', () => {
    playNextSong();
});