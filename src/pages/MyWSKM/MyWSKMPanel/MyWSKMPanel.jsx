import { useEffect, useState } from 'react';
import { LogoutConfirmation } from '../LogoutConfirmation/LogoutConfirmation';
import { Timetable } from '../Timetable.jsx/Timetable';
import {
  APPanel,
  APPanelBtn,
  LogoutBtnIcon,
  PanelBackdrop,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  PanelHideSwitch,
  TimetableBtnIcon,
} from './MyWSKMPanel.styled';

export const MyWSKMPanel = ({
  user,
  language,
  handleLogout,
  timetable,
  isMultipleCourses,
}) => {
  const [isBackdropShown, setIsBackdropShown] = useState(false);
  const [isTimetableShown, setIsTimetableShown] = useState(false);
  const [isButtonBoxShown, setIsButtonBoxShown] = useState(true);
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] =
    useState(false);

  const toggleButtonBox = () => {
    hideBackdrop();
    setIsButtonBoxShown(isShown => !isShown);
  };

  const hideBackdrop = () => {
    setIsBackdropShown(false);
    setIsTimetableShown(false);
    setIsLogoutConfirmationOpen(false);
  };

  const toggleTimetable = () => {
    !isBackdropShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));

    setIsTimetableShown(isTimetableShown => !isTimetableShown);
  };

  const toggleLogoutConfirmation = () => {
    !isBackdropShown &&
      !isTimetableShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = true));
    isBackdropShown &&
      !isTimetableShown &&
      setIsBackdropShown(isBackdropShown => (isBackdropShown = false));
    setIsTimetableShown(false);
    setIsLogoutConfirmationOpen(
      isLogoutConfirmationOpen => !isLogoutConfirmationOpen
    );
  };

  useEffect(() => {
    const onEscapeClose = event => {
      if (event.code === 'Escape' && isBackdropShown) {
        hideBackdrop();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <>
      <PanelBackdrop
        onClick={hideBackdrop}
        className={isBackdropShown ? '' : 'hidden'}
      />

      <PanelHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
      </PanelHideSwitch>
      <APPanel className={isButtonBoxShown ? '' : 'hidden'}>
        {user.package !== 'online' && (
          <APPanelBtn onClick={toggleTimetable}>
            <TimetableBtnIcon
              className={isTimetableShown && 'active'}
              id="timetable-btn"
            />
          </APPanelBtn>
        )}
        <APPanelBtn onClick={toggleLogoutConfirmation}>
          <LogoutBtnIcon className={isLogoutConfirmationOpen && 'active'} />
        </APPanelBtn>
      </APPanel>
      {isTimetableShown && <Timetable user={user} timetable={timetable} />}
      {isLogoutConfirmationOpen && (
        <LogoutConfirmation
          handleLogout={handleLogout}
          toggleLogoutConfirmation={toggleLogoutConfirmation}
        />
      )}
    </>
  );
};
