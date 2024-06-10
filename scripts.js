const songList = [
    {
        name: "Moby Dick",
        artist: "Led Zeppelin",
        src: "archivos/assets3.mp3", 
        cover: "archivos/assets3.jpg"
    },
    {
        name: "Smells like a teen spirit",
        artist: "Nirvana",
        src: "archivos/assets2.mp3",
        cover: "archivos/assets2.jpg"
    },
    {
        name: "Black",
        artist: "Pearl Jam",
        src: "archivos/assets1.mp3",
        cover: "archivos/assets1.jpg"
    }
];

const artistName = document.querySelector('.artist-name'); 
const musicName = document.querySelector('.song-name'); 
const fillBar = document.querySelector('.fill-bar'); 
const time = document.querySelector('.time'); 
const cover = document.getElementById('cover');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prog = document.querySelector('.progress-bar'); 

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prev.addEventListener('click', prevSong);
    next.addEventListener('click', nextSong);
    play.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});
function loadSong(index){
    const { name, artist, src, cover: thumb} = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress(){
    if(song.duration){
        const pos= (song.currentTime / song.duration) *
        100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60) ;
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause(){
    if(playing){
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classlist.toogle('fa-pause', playing);
    playBtn.classlist.toogle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong(){
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

function prevSong(){
    currentSong = (currentSong - 1 + songList.length) % 
    songList.length;
    playMusic();
}

function playMusic(){
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e){
    const pos = (e.offsetX / prog,clientWidth) * song.duration;
    song.curretTime = pos;

}