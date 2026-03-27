const tabs = document.querySelectorAll('.gallery__tablinks');
const tabList = document.querySelector('.gallery__list');

const setGalleryTabs = () => {
  if (!tabs || !tabs.length || !tabList) return;

  tabs.forEach((tab) => {
    const tabLinks = tab.querySelectorAll('.gallery__tablink');
    const mediaItems = tabList.querySelectorAll('.gallery__item');
    const photoItems = tabList.querySelectorAll('.gallery__item--img');
    const videoItems = tabList.querySelectorAll('.gallery__item--video');

    const isVideo = videoItems && videoItems.length;
    const isPhoto = photoItems && photoItems.length;

    const showVideo = () => {
      console.log(photoItems, videoItems)
      if (isPhoto) {
        photoItems.forEach((item) => {
          item.classList.add('hidden');
        });
      }

      if (isVideo) {
        videoItems.forEach((item) => {
          item.classList.remove('hidden');
        });
      }
    };

    const showPhoto = () => {
      if (isPhoto) {
        photoItems.forEach((item) => {
          item.classList.remove('hidden');
        });
      }

      if (isVideo) {
        videoItems.forEach((item) => {
          item.classList.add('hidden');
        });
      }
    };

    const openTabs = (evt) => {
      const btnTarget = evt.currentTarget;
      const type = btnTarget.dataset.tab;

      if (type === 'photo') {
        showPhoto();
      } else if (type === 'video') {
        showVideo();
      } else {
        mediaItems.forEach((item) => {
          item.classList.remove('hidden');
        });
      }

      tabLinks.forEach((link) => {
        link.classList.remove('gallery__tablink--active');
      });

      btnTarget.classList.add('gallery__tablink--active');
    };

    tabLinks.forEach((tablink) => {
      tablink.addEventListener('click', openTabs);
    });
  });
};

export { setGalleryTabs };
