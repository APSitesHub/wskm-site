import stopImg from '../../../img/quiz/stop.png';
import { LogoutBtnIcon } from '../MyWSKMPanel/MyWSKMPanel.styled';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from '../Points/Points.styled';
import { TimetableHeading } from '../Timetable.jsx/Timetable.styled';
import {
  ButtonBox,
  LogoutBox,
  LogoutButton,
} from './LogoutConfirmation.styled';

export const LogoutConfirmation = ({
  handleLogout,
  toggleLogoutConfirmation,
}) => {
  return (
    <LogoutBox id="logout" style={{ top: '145px' }}>
      <TimetableHeading>
        <LogoutBtnIcon />
        Log out
      </TimetableHeading>
      <PointsPlaceHolder>
        <EyesEmoji src={stopImg} alt="Eyes emoji" width="80" />
        <PointsPlaceHolderText>
          You are attempting to log out of your account.
        </PointsPlaceHolderText>
        <PointsPlaceHolderText>
          Are you sure you want to log out?
        </PointsPlaceHolderText>
      </PointsPlaceHolder>
      <ButtonBox>
        <LogoutButton className="logout" onClick={handleLogout}>
          Yes, log out
        </LogoutButton>
        <LogoutButton className="stay" onClick={toggleLogoutConfirmation}>
          No, stay
        </LogoutButton>
      </ButtonBox>
    </LogoutBox>
  );
};
