import React from 'react';

import { Provider } from "react-redux";
import {Routing} from "./view/components/Router/Router";
import store from "./data/store/configureStore";

import {ThemeProvider} from "@material-ui/core/styles";
import { theme } from "./view/theme";
import {I18nextProvider} from "react-i18next";

import i18n from '../src/i18n/i18n';

function App() {

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Routing/>
                </ThemeProvider>
            </Provider>
        </I18nextProvider>
    );
}

export default App;
