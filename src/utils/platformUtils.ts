import {Dimensions, NativeModules, Platform} from 'react-native';

export const {width, height} = Dimensions.get('window');

/** The scale function is used to scale up
 * the app UI across different sized devices.
 * The guideline width is based on iPhone SE.
 */
const guidelineBaseWidth = 320;

const widthRatio = width / guidelineBaseWidth;

const baseScale = (size: number) => widthRatio * size;

export const scale = (size: number, factor = 0.2) =>
  size + (baseScale(size) - size) * factor;

export const isAndroid = () => Platform.OS === 'android';

export const STATUSBAR_HEIGHT = !isAndroid()
  ? 20
  : NativeModules.StatusBarManager.HEIGHT;

