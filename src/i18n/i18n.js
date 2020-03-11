import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import {UsersEN} from "../constants/userModule/usersEN";
import {UsersUA} from "../constants/userModule/usersUA";
import {UsersRU} from "../constants/userModule/usersRU";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: {
                    ...UsersEN,
                }
            },
            ua: {
                translations: {
                    ...UsersUA,
                }
            },
            ru: {
                translations: {
                    ...UsersRU,
                }
            },
        },
        fallbackLng: "ua",
        debug: false,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            // escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true
        }
    });

export default i18n;