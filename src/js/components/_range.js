import noUiSlider from 'nouislider';
import { FILTER_VALUES } from './../_vars.js';

const form = document.querySelector('.filter-form');
const ranges = form ? form.querySelectorAll('.range') : null;

const setFilterRange = () => {
  if (!ranges || !ranges.length) return;

  const resetButton = form.querySelector('button[type="reset"]');

  const resetAllSliders = () => {
    ranges.forEach((range) => {
      const sliderElement = range.querySelector('.range__container');

      if (sliderElement.noUiSlider) {
        sliderElement.noUiSlider.reset();
      }
    });
  };

  if (resetButton) {
    resetButton.addEventListener('click', resetAllSliders);
  }

  ranges.forEach((range) => {
    const sliderElement = range.querySelector('.range__container');
    const valueElement = range.querySelectorAll('.range__input');
    const valueMinElement = range.querySelector('.range__input--min');
    const valueMaxElement = range.querySelector('.range__input--max');

    const filterType = range.dataset.filter;
    let filterConfig = FILTER_VALUES[filterType];

    if (!filterConfig) {
      filterConfig = FILTER_VALUES['default'];
    }

    valueMinElement.setAttribute('value', filterConfig.start);
    valueMaxElement.setAttribute('value', filterConfig.end);

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
      });

      sliderElement.noUiSlider.on('update', onSliderUpdate);
    };

    valueElement.forEach((element) => {
      element.addEventListener('change', () => {
        sliderElement.noUiSlider.set([valueMinElement.value, valueMaxElement.value]);
      });
    });

    createRange(
      filterConfig.min,
      filterConfig.max,
      filterConfig.step,
      filterConfig.start,
      filterConfig.end
    );
  });
};

export { setFilterRange };
