import styled from 'styled-components';
import { ReactComponent as _ArrowDownIcon } from '../../../img/svg/invertedDownArrow.svg';
import { Field, Form } from 'formik';
import { InputNote } from 'components/LeadForm/LeadForm.styled';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { FormBtn } from 'components/LeadForm/LeadForm.styled';

export const AdminPanelSection = styled.section`
  height: max-content;
  min-height: calc(100vh - 78px);
  padding: 30px 20px;
  display: flex;
  align-items: flex-start;
  gap: 30px;
`;

export const Input = styled(Field)`
  width: 100%;
  height: 58px;
  padding: 22px 20px;
  font-size: 14px;
  border: 2px solid var(--main-color);
  border-radius: 50px;
  line-height: 1;

  @media screen and (min-width: 768px) {
    height: 59px;
    padding: 20px 40px;
    font-size: 19px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }

  &:-webkit-autofill {
    &,
    &:hover,
    &:focus {
      -webkit-box-shadow: 0 0 0px 1000px var(--accent-semi-transparent-color)
        inset;
    }
  }

  &::placeholder {
  }
`;

export const LoginForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
  height: 48px;
  padding: 0;
`;

export const AdminInputHint = styled.p`
  color: var(--main-color);
  text-align: left;
  font-size: 12px;
  padding: 0 20px;
`;

export const AdminInput = styled(Input)`
  font-family: var(--new-font-family);
  font-size: 16px;
  padding: 20px;
  border: 2px solid var(--main-color);
  max-width: 600px;
`;

export const AdminInputNote = styled(InputNote)`
  position: static;
  color: #bb0000;
  font-size: 14px;
  bottom: -1.1em;
`;

export const UsersForm = styled(Form)`
  margin: 0 auto;

  position: sticky;
  top: 50%;

  width: 400px;

  transform: translateY(-15%);

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UsersEditForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const UserEditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
`;

export const UserDBTable = styled.table`
  max-width: 65vw;
  margin: 0 auto;

  table-layout: auto;
  width: 100%;

  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;
`;

export const UserDBCaption = styled.caption`
  caption-side: top;
  margin-bottom: 20px;
`;

export const UserDBRow = styled.tr`
  border: 1px solid #000;
`;

export const UserHeadCell = styled.th`
  border: 1px solid #000;
  padding: 3px;
`;

export const UserCell = styled.td`
  border: 1px solid #000;
  padding: 3px;
  height: 3em;

  &.last-name {
    text-transform: capitalize;
  }

  &.attention {
    color: red;
  }

  &.error {
    background-color: #ff0000;
  }
`;

export const ArrowDownIcon = styled(_ArrowDownIcon)`
  width: 12px;
  height: 12px;
  cursor: pointer;

  color: #000;

  &:hover {
    color: var(--main-color);
  }
`;

export const DatesEditBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const UserDeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const UserBanButton = styled(UserDeleteButton)`
  &.banned {
    border-color: #023020;
  }
  &.not_banned {
    border-color: #8b0000;
  }
`;

export const UserSpeakingEditForm = styled(Form)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 20px);
  max-width: 400px;

  background-color: white;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  & .react-datepicker__tab-loop {
    margin-top: -6px;
  }

  & .react-datepicker-popper {
    z-index: 2;
  }

  @media screen and (min-height: 960px) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);

    padding: 16px 24px;
    border-radius: 24px;

    gap: 9px;
  }

  @media screen and (min-height: 960px) {
    & .react-datepicker__tab-loop {
      margin-top: -9px;
    }
  }
`;

export const SpeakingLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;

  &:first-child {
    padding-top: 4px;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  max-height: 38px;
  padding: 10px;
  border: 2px solid var(--main-color);

  @media screen and (min-width: 960px) {
    font-size: 16px;
  }

  &.error {
    border: 4px solid red;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }
`;

export const LabelText = styled.span`
  position: absolute;
  top: -5.5px;
  left: 10px;
  z-index: 1;
  background-color: white;

  font-size: 10px;
  display: block;
  padding: 1px;

  @media screen and (min-height: 960px) {
    top: -8px;
    font-size: 12px;
    padding: 2px;
  }
`;

export const LabelDatePickerText = styled(LabelText)`
  position: absolute;
  top: 0px;
  left: 10px;
  z-index: 1;
  background-color: white;

  font-size: 10px;
  display: block;
  padding: 1px;

  @media screen and (min-height: 960px) {
    top: 1px;
    padding: 2px;
    font-size: 12px;
  }
`;
export const FormSelect = styled(Select)`
  width: 100%;
  font-size: 14px;
  border: 2px solid var(--main-color);
  border-radius: 50px;

  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 19px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-burnt-color);
    outline: transparent;
  }
`;
export const SpeakingSelect = styled(FormSelect)`
  font-size: 16px;
`;

export const SpeakingFormBtn = styled(FormBtn)`
  margin: 0 auto;
  padding: 12px;
  height: auto;

  @media screen and (min-width: 768px) {
    padding: 16px;
    letter-spacing: 0.6px;
  }
`;

export const StudentDateInputNote = styled.p`
  text-align: center;
  font-size: 14px;
  color: red;
`;

export const StudentTextAreaNote = styled(AdminInputNote)`
  color: red;
`;

export const TeacherLangSelect = styled(SpeakingSelect)`
  border-radius: 50px;
`;

export const ErrorNote = styled.p`
  color: var(--main-color);
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  position: static;
  max-width: 240px;

  @media screen and (min-width: 768px) {
    max-width: 360px;
  }
`;
