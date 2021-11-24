const DEFAULT_IMAGE = 'https://www.freeiconspng.com/uploads/no-image-icon-13.png';

export function usePreviewImage(imageSrc) {
  const isDefaultImage = !imageSrc;
  /* if (imageSrc === '') {
    console.info('imageSrc is an empty string, use DEFAULT_IMAGE');
  } */
  return { imageSrc: imageSrc || DEFAULT_IMAGE, isDefaultImage };
}
