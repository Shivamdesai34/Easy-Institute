import {
  cilApplicationsSettings,
  cilBrowser,
  cilContrast,
  cilMenu,cilPen,cilXCircle,
  cilMoon,cilMoney,cilLockLocked,
  cilSpeedometer,cilArrowRight,
  cilSun,cilHome,cilLayers,
  cilWallpaper,cilNotes
} from '@coreui/icons';

import { signet } from './signet';
import { logo } from './logo';

export const iconSubset = {
  cilApplicationsSettings,
  cilBrowser,
  cilContrast,
  cilMenu,cilArrowRight,cilMoney,
  cilMoon,cilLayers,
  cilSpeedometer,cilPen,
  cilSun,cilXCircle,
  logo,cilLockLocked,
  cilWallpaper,
  cilNotes,
  cilHome,
  signet
};

export enum IconSubset {
  cilApplicationsSettings = 'cilApplicationsSettings',
  cilBrowser = 'cilBrowser',
  cilContrast = 'cilContrast',
  cilMenu = 'cilMenu',
  cilMoon = 'cilMoon',
  cilSpeedometer = 'cilSpeedometer',
  cilSun = 'cilSun',
  logo = 'logo',
  signet = 'signet'
}
