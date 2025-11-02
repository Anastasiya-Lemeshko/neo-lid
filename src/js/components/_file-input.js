const fileInputs = document.querySelectorAll('.file-input');

const createFileListItem = (file) => {
  const listItem = document.createElement('li');
  listItem.className = 'form__file-item';

  const fileName = document.createElement('span');
  fileName.className = 'form__file-name';
  fileName.textContent = file.name;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'form__file-delete';
  deleteButton.type = 'button';
  deleteButton.setAttribute('aria-label', 'Удалить файл');

  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(fileName);
  listItem.appendChild(deleteButton);

  return listItem;
};

const setFileInputs = () => {
  if (!fileInputs || !fileInputs.length) return;

  fileInputs.forEach((group) => {
    const fileInput = group.querySelector('input[type="file"]');
    const fileList = group.querySelector('ul');

    fileInput.addEventListener('change', (evt) => {
      const files = evt.target.files;

      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          const listItem = createFileListItem(file);
          fileList.appendChild(listItem);
        });
        fileList.classList.remove('hidden');
      } else {
        fileList.innerHTML = '';
      }
    });
  });
};

export { setFileInputs };
