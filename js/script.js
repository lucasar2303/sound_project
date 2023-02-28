let musics = [
    {title:'Billie Eilish: Happier Than Ever', src :'./music/Billie Eilish - Happier Than Ever.mp3', img:'./img/billieEilish.jpg', bgImg:'url(./img/billieEilish.jpg)'},
    {title:'ILLENIUM: Good Things Fall Apart', src :'./music/Good Things Fall Apart.mp3', img:'./img/ILLENIUM.jpg', bgImg:'url(./img/ILLENIUM.jpg)'},
    {title:'Justin Bieber: Peaches', src :'./music/Peaches.mp3', img:'./img/justinBieber.jpg', bgImg:'url(./img/justinBieber.jpg)'},
    {title:'Imagine Dragons: Birds', src :'./music/Birds.mp3', img:'./img/imagineDragons.jpg', bgImg:'url(./img/imagineDragons.jpg)'},
    {title:'BoyWithUke: Toxic', src :'./music/Toxic.mp3', img:'./img/BoyWithUke.jpg', bgImg:'url(./img/BoyWithUke.jpg)'},
    {title:'Glass Animals: Heat Waves', src :'./music/Heat Waves.mp3', img:'./img/GlassAnimals.jpg', bgImg:'url(./img/GlassAnimals.jpg)'}
];
let musicIndex = 0;
let music = document.querySelector("#music");
let imageMusic = document.querySelector(".imgSelected");
let titleMusic = document.querySelector(".musicTitle");
let timeMusic = document.querySelector(".pMusicTime");
let backgroundBody = document.querySelector("body");
let volumeControl = document.querySelector('#volumeControl');
let volumeMute = document.querySelector("#mute");
let progressBar = document.querySelector('#progressBar');
let statusMusic = false;
let volumeValue = 0;
let saveVolume = 0;

setBarAndVolume(12.5, 0.25)

//alert("Este projeto está em desenvolvimento!");


//   EVENTS //

// time music
music.addEventListener('timeupdate', progressMusic);

// change bar volume
volumeControl.addEventListener("change", barVolume);

// change bar music
progressBar.addEventListener("change", barMusic);

// volume

volumeMute.addEventListener('click', () => {
   
    if (music.volume*50 >= 1) {
        saveVolume = volumeValue;
        setBarAndVolume(0,0);
      
    } else if (music.volume == 0) {
        if (saveVolume == 0) {
            setBarAndVolume(2, 0.1);

        } else{
        setBarAndVolume(saveVolume, saveVolume / 50);
        saveVolume = 0;
        }
    };
})

// button previous

document.querySelector('.previous').addEventListener('click', () => {
    
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musics.length-1;
    } 
    renderMusic(musicIndex);
    statusMusic === true ? play() : pause();
    
});

// button next

document.querySelector('.next').addEventListener('click', () => {
    
    musicIndex++;
    if (musicIndex > (musics.length-1)) {
        musicIndex = 0;
    }
    renderMusic(musicIndex);
    statusMusic == true ? play() : pause();

    
    
});


//    FUNCTIONS    //

function unmute(value){
    music.volume = value;
    controlMute();
}

function mute(){
    music.volume = 0;
    controlMute();
}

function setBarAndVolume(valueBar, valueVolume){
    volumeControl.value = valueBar;
    music.volume = valueVolume;
    controlMute(valueBar);
}


function controlMute(volumeValue){
    if (volumeValue >= 35) {
        volumeMute.classList.remove("bi-volume-mute-fill", "bi-volume-down-fill")
        volumeMute.classList.add("bi-volume-up-fill")

    }else if (volumeValue < 35 && volumeValue >= 1) {
        volumeMute.classList.remove("bi-volume-mute-fill", "bi-volume-up-fill")
        volumeMute.classList.add("bi-volume-down-fill")

    }else {
        volumeMute.classList.remove("bi-volume-up-fill", "bi-volume-down-fill")
        volumeMute.classList.add("bi-volume-mute-fill")
    } 
}


function barVolume(){
    volumeValue = volumeControl.value;
    music.volume = volumeValue / 50;
    controlMute(volumeValue);
    return volumeValue;
}

function barMusic(){
    progressValue = progressBar.value/100
    music.currentTime = progressValue * music.duration;
}

function renderMusic(index){
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        titleMusic.textContent = musics[index].title;
        imageMusic.src = musics[index].img;
        backgroundBody.style.backgroundImage = musics[index].bgImg;
        progressBar.value = 0;
    })
};

function play(){
    music.play();
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#pause').style.display = 'block';

    statusMusic = true;
    console.log(statusMusic);

}

function pause(){
    music.pause();
    document.querySelector('#play').style.display = 'block';
    document.querySelector('#pause').style.display = 'none';

    statusMusic = false
    console.log(statusMusic);
}

function progressMusic(){

    


    if (music.currentTime == music.duration) {
        musicIndex++;
        if (musicIndex > (musics.length-1)) {
            musicIndex = 0;
        }
        renderMusic(musicIndex);
        play();

    } else{
        progressBar.value = Math.floor((music.currentTime / music.duration) * 100);
        timeMusic.textContent = secondsToMinute(Math.floor(music.currentTime));
    }
}

function secondsToMinute(seconds){
    let fieldMinutes = Math.floor(seconds/60);
    let fieldSeconds = seconds % 60;
    if (fieldSeconds < 10) {
        fieldSeconds = '0' + fieldSeconds;
    }

    return fieldMinutes + ":" + fieldSeconds;
}