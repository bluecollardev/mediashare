function createUsePreview() {
  const defaultImage = 'https://mediashare0079445c24114369af875159b71aee1c04439-dev.s3.us-west-2.amazonaws.com/public/temp/background-comp.jpg';
  return function () {
    return defaultImage;
  };
}

export const usePreviewImage = createUsePreview();
