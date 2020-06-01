import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import {internetDocumentEN} from "./localization/internetDocumentModule/internetDocumentEN";
import {internetDocumentRU} from "./localization/internetDocumentModule/internetDocumentRU";
import {internetDocumentUA} from "./localization/internetDocumentModule/internetDocumentUA";
import {ProductEN} from "./localization/productModule/productEN";
import {ProductRU} from "./localization/productModule/productRU";
import {ProductUA} from "./localization/productModule/productUA";
import {UsersEN} from "./localization/userModule/usersEN";
import {UsersUA} from "./localization/userModule/usersUA";
import {UsersRU} from "./localization/userModule/usersRU";
import {SystemEN} from "./localization/system/systemEN";
import {SystemUA} from "./localization/system/systemUA";
import {SystemRU} from "./localization/system/systemRU";
import {CustomerEN} from "./localization/customerModule/customerEN";
import {CustomerUA} from "./localization/customerModule/customerUA";
import {CustomerRU} from "./localization/customerModule/customerRU";
import {OrgRU} from "./localization/organizationModule/orgRU";
import {OrgUA} from "./localization/organizationModule/orgUA";
import {OrgEN} from "./localization/organizationModule/orgEN";
import {orderEN} from "./localization/orderModule/orderEN";
import {orderUA} from "./localization/orderModule/orderUA";
import {orderRU} from "./localization/orderModule/orderRU";
import {NotificationEN} from "./localization/NotificationModule/notificationEN";
import {NotificationRU} from "./localization/NotificationModule/notificationRU";
import {NotificationUA} from "./localization/NotificationModule/notificationUA";
import {InstagramEN} from './localization/instagramModule/instagramEN';
import {InstagramUA} from './localization/instagramModule/instagramUA';
import {InstagramRU} from './localization/instagramModule/instagramRU';


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: {
                    ...UsersEN,
                    ...SystemEN,
                    ...CustomerEN,
                    ...orderEN,
                    ...OrgEN,
                    ...ProductEN,
                    ...internetDocumentEN,
                    ...NotificationEN,
                    ...InstagramEN,
                }
            },
            ua: {
                translations: {
                    ...UsersUA,
                    ...SystemUA,
                    ...CustomerUA,
                    ...OrgUA,
                    ...orderUA,
                    ...ProductUA,
                    ...internetDocumentUA,
                    ...NotificationUA,
                    ...InstagramUA,
                }
            },
            ru: {
                translations: {
                    ...UsersRU,
                    ...SystemRU,
                    ...CustomerRU,
                    ...orderRU,
                    ...OrgRU,
                    ...ProductRU,
                    ...internetDocumentRU,
                    ...NotificationRU,
                    ...InstagramRU
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