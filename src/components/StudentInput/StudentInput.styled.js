import styled from 'styled-components';
import { ReactComponent as _ClockIcon } from '../../img/svg/clock.svg';

export const StudentQuizBox = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  z-index: 15;

  min-height: 160px;
  max-height: 480px;
  width: 320px;
  border-radius: 25px;

  transform: translateX(-50%);
  overflow: hidden;

  background-color: #000;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow:
    inset 0 0 6px rgba(255, 255, 255, 0.4),
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 24px rgba(255, 255, 255, 0.3);

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.shown {
    opacity: 1;
  }
`;

export const StudentQuizForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  gap: 10px;
  background-color: #000;
`;

export const StudentQuizBoxInput = styled.input`
  padding: 12px;
  height: 40px;
  width: 85%;

  border-radius: 50px;
  border: 2px solid #0f645b;
`;

export const StudentQuizSubmitBtn = styled.button`
  color: #fff;
  border-radius: 50px;
  border: 2px solid #00e5c8;
  box-shadow:
    0 0 12px 2px #00e5c8aa,
    inset 0 0 10px 1px #00e5c820;
  height: 50px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    box-shadow: 0px 4px 8px rgba(15, 100, 91, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 2px 4px rgba(15, 100, 91, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px rgba(15, 100, 91, 0.2);
  }
`;

export const StudentQuizBoxInputNote = styled.p`
  color: red;
  font-size: 14px;
`;

export const StudentQuizSubmitBtnOptions = styled(StudentQuizSubmitBtn)`
  color: #fff;
  border-radius: 50px;
  border: 2px solid #00e5c8;
  box-shadow:
    0 0 12px 2px #00e5c8aa,
    inset 0 0 10px 1px #00e5c820;
  height: 50px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    box-shadow: 0px 4px 8px rgba(15, 100, 91, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 2px 4px rgba(15, 100, 91, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px rgba(15, 100, 91, 0.2);
  }
`;

export const StudentQuizOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  width: 100%;
`;

export const ClockIcon = styled(_ClockIcon)`
  width: 48px;
  height: 48px;
`;

export const StudentQuizTimer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 20px;
  font-weight: 700;
  color: #00e5c8;
  z-index: 1;
`;
