console.log("Welcome to SARGAM");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let count =0;
let songs = [
    {songName: "Baari - Bilal Saeed", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Pasoori - CokeStudio", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sakhiyaan - Maninder Buttar", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Srivalli - Pushpa", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Agar Tum Sath Ho - Tamasha", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Raabta - Arijit Singh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Main Agar Kahoon - Om Shanti Om", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bol Na Halke Halke - Rahat Fateh Ali Khan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Matargashti - Tamasha", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Khudaya Khair - Billu Barber", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.addEventListener('click' , ()=>{
        songIndex=i;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        element.style.backgroundColor= 'black';
        element.style.color='white';
        element.style.transform='scale(1.05)'
        element.style.border='solid white';
        makeAllNormal(songIndex);
        //makeOnePause(songIndex);
    }) 
})
 
// const makeOnePause=(songIndex)=>{
//     let player=songItems[songIndex].getElementsByClassName("songItemPlay");
//     player.classList.remove('fa-play-circle');
// }

const makeAllNormal= (songIndex)=>{
    songItems.forEach((element, i)=>{ 
        if (i!=songIndex){
            element.style.backgroundColor= 'white';
            element.style.color='black';
            element.style.transform='scale(1.00)';
            element.style.border='solid black';
            element.addEventListener('mouseover', ()=>{
                element.style.transform='scale(1.05)';
            })
            element.addEventListener('mouseout', ()=>{
                if (element.style.backgroundColor=='white')
                element.style.transform='scale(1.00)';
            })
        }
    })
}

// Handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
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
        console.log(e.classList);
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

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
        songItems[songIndex].style.backgroundColor= 'black';
        songItems[songIndex].style.color='white';
        songItems[songIndex].style.transform='scale(1.05)';
        songItems[songIndex].style.border='solid white';
        makeAllNormal(songIndex);

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songItems[songIndex].style.backgroundColor= 'black';
        songItems[songIndex].style.color='white';
        songItems[songIndex].style.transform='scale(1.05)';
        songItems[songIndex].style.border='solid white';
        makeAllNormal(songIndex);
})