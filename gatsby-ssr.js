import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

import { JSDOM } from 'jsdom'

global.dom = new JSDOM(`...`)
global.window = dom.window
global.document = dom.window.document
global.navigator = global.window.navigator

global.window.matchMedia = function() {
	return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
}