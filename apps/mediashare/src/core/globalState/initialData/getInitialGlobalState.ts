// import flatten from 'flat'
// import en from '<assets>/lang/en.json'
// import th from '<assets>/lang/fr.json'
// import th from '<assets>/lang/th.json'
// import {isIE11} from '<helpers>/utils'

export default function getInitialGlobalState(history: any) {
  // When page initially load action is POP, which creates unexpected results
  // It's better to reset it when we clear globalState
  history.action = 'PUSH';
  // const lang = localStorage.getItem('lang') || 'en';

  return {
    isConfirmLogoutModalOpen: false,
    // isIE11: isIE11(),
    locale: {
      // lang,
      // messages: flatten({en, fr, th}[lang]),
    },
  };
}
