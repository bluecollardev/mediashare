// import { getIntlMessages } from '<helpers>/utils'
import { updateGlobalState } from './index';

export default function updateLocale({ dispatchGlobalStateUpdate, lang }) {
  const locale = {
    lang,
    // messages: getIntlMessages(lang),
  };

  // No localStorage on native
  // localStorage.setItem('lang', lang);

  updateGlobalState(dispatchGlobalStateUpdate, {
    locale,
  });
}
