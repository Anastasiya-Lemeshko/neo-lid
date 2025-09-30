const isEscapeKey = (evt) => evt.key === 'Escape';
const isArrowDownKey = (evt) => evt.key === 'ArrowDown';
const isArrowUpKey = (evt) => evt.key === 'ArrowUp';
const isEnterKey = (evt) => evt.key === 'Enter';

const getScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);

  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

export {
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  getScrollWidth
};
