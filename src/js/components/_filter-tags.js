const tagsList = document.querySelector('.filters__tags-list');
const tags = tagsList ? tagsList.querySelectorAll('.filters__tags-item') : null;
const itemMore = tagsList ? tagsList.querySelector('.filters__tags-item--more') : null;
const buttonMore = tagsList ? tagsList.querySelector('.filters__tags-link--more') : null;

const showAllTags = () => {
  if (!tags || !tags.length || !buttonMore) return;

  if (tags.length <= 7) {
    itemMore.classList.add('hidden');
    return;
  }

  tags.forEach((tag, index) => {
    if (index >= 7 && tag !== itemMore) {
      tag.classList.add('hidden');
    }
  });

  const showTags = () => {
    tags.forEach((tag, index) => {
      if (index >= 7) {
        tag.classList.remove('hidden');
      }
    });
    buttonMore.classList.add('js-hide-all');
    buttonMore.textContent = 'скрыть';
  };

  const hideTags = () => {
    tags.forEach((tag, index) => {
      if (index >= 7 && tag !== itemMore) {
        tag.classList.add('hidden');
      }
    });
    buttonMore.classList.remove('js-hide-all');
    buttonMore.textContent = 'смотреть еще';
  };

  buttonMore.addEventListener('click', () => {
    if (!buttonMore.classList.contains('js-hide-all')) {
      showTags();
    } else {
      hideTags();
    }
  });
};

export { showAllTags };
