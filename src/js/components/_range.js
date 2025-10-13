import noUiSlider from 'nouislider';

// const range = document.querySelector('.range');
// const sliderElement = range.querySelector('.range__container');
// const valueElement = range.querySelectorAll('.range__input');
// const valueMinElement = range.querySelector('.range__input--min');
// const valueMaxElement = range.querySelector('.range__input--max');
// const resetButton = document.querySelector('.filter__button--reset');

const onSliderUpdate = () => {
  const valueArray = sliderElement.noUiSlider.get();
  valueMinElement.value = valueArray[0];
  valueMaxElement.value = valueArray[1];
};

const createRange = (min, max, step, start, end) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    start: [start, end],
    step,
    connect: [false, true, false],
    format: {
      to: (value) => Number(Math.round(value)),
      from: (value) => Number(Math.round(value)),
    },
    // cssPrefix: 'range__',
    // classes: {
    //   target: 'container',
    //   base: 'base',
    //   origin: 'origin',
    //   handle: 'handle',
    //   handleLower: 'handle-lower',
    //   handleUpper: 'handle-upper',
    //   touchArea: 'touch-area',
    //   horizontal: 'horizontal',
    //   vertical: 'vertical',
    //   background: 'background',
    //   connect: 'connect',
    //   connects: 'connects',
    //   draggable: 'draggable',
    //   drag: 'drag',
    //   tap: 'tap',
    //   active: 'active',
    //   tooltip: 'tooltip'
    // }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

valueElement.forEach((element) => {
  element.addEventListener('change', () => {
    sliderElement.noUiSlider.set([valueMinElement.value, valueMaxElement.value]);
  });
});

// resetButton.addEventListener('click', () => {
//   sliderElement.noUiSlider.reset();
// });

export { createRange };
