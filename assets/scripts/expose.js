// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('#expose img');
  const hornAudio = document.querySelector('#expose audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playSoundButton = document.querySelector('#expose button');
  const jsConfetti = new JSConfetti();

  hornSelect.addEventListener('change', (event) => {
    const hornVal = event.target.value;
    updateHorn(hornVal);
  });

  volumeSlider.addEventListener('input', (event) => {
    const volumeVal = event.target.value;
    updateVolumeIcon(volumeVal);
  });

  playSoundButton.addEventListener('click', () => {
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
    hornAudio.play();
  });

  function updateHorn(horn) {
    if (horn === 'select') {
      hornImage.src = `assets/images/no-image.png`;
      return;
    }
    hornImage.src = `assets/images/${horn}.svg`;
    hornAudio.src = `assets/audio/${horn}.mp3`;
  }

  function updateVolumeIcon(volume) {
    const volumeVal = volume / 100;

    hornAudio.volume = volumeVal;

    if (volume == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
    } else if (volume < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
    } else if (volume < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
    }
  }

  console.log(hornSelect.value);
  updateHorn(hornSelect.value);
  updateVolumeIcon(volumeSlider.value);
}