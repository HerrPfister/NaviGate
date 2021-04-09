import React, {
  createContext,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useState,
  ReactElement,
} from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { NaviGateDialog, NaviGateDialogComponentProps } from './NaviGateDialog';

export type getProviderContextProps = {
  onCancel?: (event: MouseEvent) => void;
  onConfirm?: (event: MouseEvent, next?: Location | null) => void;
  onNavigate?: (path: string) => void;
};

export type NaviGateProviderProps = {
  blockingCondition?: boolean;
  children?: ReactNode;
  DialogProps?: NaviGateDialogComponentProps;
} & getProviderContextProps;

export type NaviGateContextType = {
  confirmedNavigation: boolean;
  handleCancel: MouseEventHandler;
  handleConfirm: MouseEventHandler;
  openDialog: boolean;
  updateOpenDialog: (open: boolean) => void;
  updateNextLocation: (next: Location) => void;
};

const getProviderContext = ({ onCancel, onConfirm, onNavigate }: getProviderContextProps): NaviGateContextType => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [nextLocation, setNextLocation] = useState<Location | null>(null);

  const { push } = useHistory();
  const navigateTo = onNavigate || push;

  const updateNextLocation = (next: Location) => setNextLocation(next);
  const updateOpenDialog = (open: boolean) => setOpenDialog(open);

  const handleConfirm = (event: MouseEvent) => {
    if (onConfirm) onConfirm(event, nextLocation);

    setOpenDialog(false);
    setConfirmedNavigation(true);
  };

  const handleCancel = (event: MouseEvent) => {
    if (onCancel) onCancel(event);

    setOpenDialog(false);
    setNextLocation(null);
  };

  useEffect(() => {
    if (confirmedNavigation && nextLocation) {
      navigateTo(nextLocation.pathname);
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, nextLocation]);

  return {
    confirmedNavigation,
    handleCancel,
    handleConfirm,
    openDialog,
    updateNextLocation,
    updateOpenDialog,
  };
};

export const NaviGateContext = createContext<NaviGateContextType>({} as NaviGateContextType);

export const useNaviGate = (): NaviGateContextType => useContext(NaviGateContext);

export const NaviGateProvider = ({
  blockingCondition,
  children,
  DialogProps,
  ...contextProps
}: NaviGateProviderProps): ReactElement => {
  const context = getProviderContext(contextProps);

  const {
    confirmedNavigation,
    handleCancel,
    handleConfirm,
    openDialog,
    updateNextLocation,
    updateOpenDialog,
  } = context;

  const ignoreCondition = blockingCondition === undefined;
  const blockingConditionMet = ignoreCondition || blockingCondition;
  const shouldBlock = blockingConditionMet && !confirmedNavigation;

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    const notSameLocation = nextLocation?.pathname !== window.location.pathname;

    if (notSameLocation && shouldBlock) {
      updateOpenDialog(true);
      updateNextLocation(nextLocation);

      return false;
    }

    return true;
  };

  useEffect(() => {
    window.onbeforeunload = () => false;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <NaviGateContext.Provider value={context}>
      <Prompt when={true} message={handleBlockedNavigation} />
      {children}
      <NaviGateDialog {...DialogProps} open={openDialog} onCancel={handleCancel} onConfirm={handleConfirm} />
    </NaviGateContext.Provider>
  );
};
