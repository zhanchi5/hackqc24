/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "./index.css";

const rootElement:HTMLElement | null = document.getElementById('root');

if(rootElement !== null)
{
    createRoot(rootElement).render(
        <Provider store={Store}>
            <App/>
        </Provider>,
    );
}
