const music = new Audio("LobbySound.mp3");
music.loop = true;
music.volume = 0.125;

const musicBtn = document.getElementById("music-toggle");

let musicEnabled = localStorage.getItem("musicEnabled") === "true";

let hasAutoPlayed = false;

function updateMusicButton() {
    musicBtn.textContent = musicEnabled
    ? "Music: ON 🔊"
    : "Music: OFF 🔇";
}

function playMusic() {
    music.play().then(() => {
        musicEnabled = true;
        localStorage.setItem("musicEnabled", "true");
        updateMusicButton();
    }).catch(() => {});
}

function stopMusic() {
    music.pause();
    musicEnabled = false;
    localStorage.setItem("musicEnabled", "false");
    updateMusicButton();
    hasAutoPlayed = true;
}

musicBtn.addEventListener("click", () => {
    if (musicEnabled) {
        stopMusic();
    } else {
        playMusic();
    }
});

document.addEventListener("pointerdown", () => {
    if (musicEnabled && !hasAutoPlayed) {
        playMusic();
        hasAutoPlayed = true;
    }
}, { once: true });

//Init
updateMusicButton();