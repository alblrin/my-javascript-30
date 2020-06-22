const video = document.querySelector('.player .viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const skips = document.querySelectorAll('.player__button');
const ranges = document.querySelectorAll('.player__slider');
const progressBar = document.querySelector('.progress__filled');

const togglePlay = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const toggleButton = (event) => {
  if (video.paused) {
    toggle.innerText = '►';
  } else {
    toggle.innerText = '❚❚';
  }
};

const changeRange = (event) => {
  video[event.target.name] = event.target.value;
};

const handleProgress = (event) => {
  const completion = (video.currentTime / video.duration) * 100;
  if (!video.paused) {
    progressBar.style['flex-basis'] = `${completion}%`;
  }
};

const scrub = (event) => {
  const newCompletion = event.offsetX / progress.clientWidth;
  video.currentTime = newCompletion * video.duration;
};

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);

skips.forEach(skip => {
  skip.addEventListener('click', (event) => {
    const timing = video.currentTime + parseInt(event.target.dataset.skip, 10);
    if (timing < video.duration && timing > 0) {
      video.currentTime = timing;
    }
  })
});

ranges.forEach(range => {
  range.addEventListener('change', changeRange)
});

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    scrub(event);
  }
});

video.addEventListener('timeupdate', handleProgress);
