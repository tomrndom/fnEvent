import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

if (typeof window === 'undefined') {
  global.window = {}
}