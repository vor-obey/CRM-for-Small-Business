import React from 'react';

import { Provider } from "react-redux";
import {Routing} from "./view/components/Router/Router";
import store from "./data/store/configureStore";

import {ThemeProvider} from "@material-ui/core/styles";
import { theme } from "./view/theme";

function App() {

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routing />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
