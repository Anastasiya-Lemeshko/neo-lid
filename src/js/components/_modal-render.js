const renderModalContent = (modal, button) => {
  // Отрисовка динамического заголовка
  if (button.hasAttribute('data-modal-dynamic')) {
    let sourceTitle = button.closest('[data-modal-title]');
    const modalTitle = modal.querySelector('[data-modal-title]');

    if (!sourceTitle) sourceTitle = button.closest('[class*="content"]').querySelector('[data-modal-title]');
    if (!sourceTitle) sourceTitle = button.closest('[data-modal-card]').querySelector('[data-modal-title]');

    if (sourceTitle && modalTitle) {
      modalTitle.textContent = sourceTitle.textContent;
    };
  }
};

export { renderModalContent };
