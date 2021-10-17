export default function addAPIErrorToast({ addToast, errors, isFullscreen = false }) {
  addToast({
    type: 'error',
    // message: capitalizeFirstLetter(String(error)),
    isFullscreen: errors?.isFullscreen || isFullscreen,
  });
}
