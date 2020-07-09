import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

import Browser from "zombie"

const browser = new Browser();

global.window = browser.window