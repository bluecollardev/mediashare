import { awsUrl } from 'mediashare/core/aws/key-factory';

const DEFAULT_IMAGE = awsUrl + `assets/no-image.png`;

export function usePreviewImage(imageSrc) {
  const isDefaultImage = !imageSrc;
  /* if (imageSrc === '') {
    console.info('imageSrc is an empty string, use DEFAULT_IMAGE');
  } */
  return { imageSrc: imageSrc || DEFAULT_IMAGE, isDefaultImage };
}
