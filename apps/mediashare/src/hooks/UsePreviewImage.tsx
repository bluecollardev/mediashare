function createUsePreview() {
  const defaultImage = require('./video-placeholder.jpg');
  return function () {
    return defaultImage;
  };
}

export const usePreviewImage = createUsePreview();
