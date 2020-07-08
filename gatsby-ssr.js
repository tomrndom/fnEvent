import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

import { window, document } from 'ssr-window';

global.window = window
global.document = document