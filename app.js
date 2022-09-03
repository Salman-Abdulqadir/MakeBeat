class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.bpm = 200;
    this.playbtn = document.querySelector(".play");
    this.index = 0;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muted = document.querySelectorAll(".mute");
    this.kickMuted = false;
    this.snareMuted = false;
    this.hihatMuted = false;
    this.tempo = document.querySelector(".tempo-slider");
  }
  addActive() {
    this.classList.toggle("active");
  }
  repeater() {
    let step = this.index % 8;
    let activePads = document.querySelectorAll(`.b${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad") && !this.kickMuted) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad") && !this.snareMuted) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad") && !this.hihatMuted) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    if (!this.isPlaying) {
      let interval = (60 / this.bpm) * 1000;
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updatebtn() {
    if (!this.isPlaying) this.playbtn.innerText = "Stop";
    else this.playbtn.innerText = "Play";
  }
  changeSound(event) {
    const selection = event.target.name;
    const selectionValue = event.target.value;
    switch (selection) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  stopmusic(event) {
    const mutedBtn = event.target.classList[1];
    switch (mutedBtn) {
      case "kick-volume":
        if (this.kickMuted) this.kickMuted = false;
        else this.kickMuted = true;
      case "snare-volume":
        if (this.snareMuted) this.snareMuted = false;
        else this.snareMuted = true;
      case "hihat-volume":
        if (this.hihatMuted) this.hihatMuted = false;
        else this.hihatMuted = true;
    }
  }
  updateTempo() {
    const tempNbr = document.querySelector(".tempo-nr");
    tempNbr.innerText = this.tempo.value;
    this.bpm = this.tempo.value;
  }
  changeInterval() {
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.start();
    }
  }
}
let played = false;
const test = new Drumkit();
test.playbtn.addEventListener("click", function () {
  test.updatebtn();
  test.start();
});
test.pads.forEach((pad) => {
  pad.addEventListener("click", test.addActive);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
test.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    test.changeSound(e);
    console.log(e.target.name);
  });
});
test.muted.forEach((button) => {
  button.addEventListener("click", function (e) {
    test.stopmusic(e);
    console.log(e.target.classList[1]);
  });
});
test.tempo.addEventListener("input", function () {
  test.updateTempo();
});
test.tempo.addEventListener("change", function () {
  test.changeInterval();
});
