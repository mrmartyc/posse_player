"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "img_audio/1.mp3",
    displayName: "VJBSNT",
    cover: "img_audio/img-1.jpg",
    artist: "NAUME",
  },
  {
    path: "img_audio/2.mp3",
    displayName: "Šála",
    cover: "img_audio/img-2.jpg",
    artist: "Churaq Sputnik",
  },
  {
    path: "img_audio/3.mp3",
    displayName: "Fuj ty kurvo",
    cover: "img_audio/img-3.jpg",
    artist: "Churaq Clique",
  },
  {
    path: "img_audio/4.mp3",
    displayName: "Torsa",
    cover: "img_audio/img-2.jpg",
    artist: "Churaq Sputnik, Řezník",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Prehrat pisnicku true/false====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Prehrat pisnicku ====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== zastavit ====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Loadnout pisnicku ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}
//================== Zmenit ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Cas ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Nastaveni casu ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Eventy ========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);