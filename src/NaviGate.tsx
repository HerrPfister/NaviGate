import React, { createContext, MouseEventHandler, MouseEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { NaviGateDialog, NaviGateDialogComponentProps } from './NaviGateDialog';

export type NaviGateHookProps = {
  onCancel?: (event: MouseEvent) => void;
  onConfirm?: (event: MouseEvent, next?: Location | null) => void;
  onNavigate?: (path: string) => void;
};

export type NaviGateProviderProps = {
  blockingCondition?: boolean;
  children?: ReactNode;
  DialogProps?: NaviGateDialogComponentProps;
} & NaviGateHookProps;

export type NaviGateContextType = {
  confirmedNavigation: boolean;
  handleCancel: MouseEventHandler;
  handleConfirm: MouseEventHandler;
  openDialog: boolean;
  updateOpenDialog: (open: boolean) => void;
  updateNextLocation: (next: Location) => void;
};

export const NaviGateContext = createContext<NaviGateContextType>({} as NaviGateContextType);

export const NaviGateProvider = ({
  blockingCondition,
  children,
  DialogProps,
  onCancel,
  onConfirm,
  onNavigate,
}: NaviGateProviderProps) => {
  const context = useProviderNaviGate({ onCancel, onConfirm, onNavigate });

  const {
    confirmedNavigation,
    handleCancel,
    handleConfirm,
    openDialog,
    updateNextLocation,
    updateOpenDialog,
  } = context;

  const ignoreCondition = blockingCondition === undefined;
  const shouldBlock = ignoreCondition || blockingCondition;

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    const notSameLocation = nextLocation?.pathname !== window.location.pathname;

    if (notSameLocation && shouldBlock && !confirmedNavigation) {
      updateOpenDialog(true);
      updateNextLocation(nextLocation);

      return false;
    }

    return true;
  };

  return (
    <NaviGateContext.Provider value={context}>
      <Prompt when={true} message={handleBlockedNavigation} />
      {openDialog ? (
        <NaviGateDialog {...DialogProps} open={openDialog} onCancel={handleCancel} onConfirm={handleConfirm} />
      ) : null}
      {children}
    </NaviGateContext.Provider>
  );
};

export const useNaviGate = () => useContext(NaviGateContext);

const useProviderNaviGate = ({ onCancel, onConfirm, onNavigate }: NaviGateHookProps): NaviGateContextType => {
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
