import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Field, Form } from 'formik';
import styled from 'styled-components';
import { ReactComponent as FilterIcon } from '../../../img/svg/filter.svg';
import Select from 'react-select';
import { SubmitFormBtn } from './CourseAdminPanel.styled';
import { BoxHideSwitch, ButtonBox } from 'components/Stream/Stream.styled';
import { StyledDatePicker } from './TeacherPageSpeakingEditForm.styled';

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

export const AdminPanelSection = styled.section`
  height: 100vh;
  padding: 30px 20px;
  display: flex;
  align-items: flex-start;
  margin: 0 auto;

  gap: 30px;
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

export const UsersForm = styled(Form)`
  margin: 0 auto;

  position: sticky;
  top: 50%;

  width: 420px;

  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PointsForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;
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

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
  height: 48px;
  padding: 0;
`;

export const AdminInput = styled(Input)`
  width: 240px;
  padding: 8px 10px;
  font-size: 16px;
  height: 40px;
  -webkit-text-stroke: 0px;

  border: 2px solid var(--main-color);

  &.error {
    border-color: red;
  }

  @media screen and (min-width: 768px) {
    width: 360px;
  }
`;

export const FormField = styled(Field)`
  width: 100%;
  height: 42px;
  padding: 12px 10px;
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

export const AdminInputNote = styled(InputNote)`
  color: var(--main-color);
  font-size: 12px;
  font-weight: 500;
  position: static;
  max-width: 240px;

  @media screen and (min-width: 768px) {
    max-width: 360px;
  }
`;

export const UserDBTable = styled.table`
  max-width: 50vw;
  margin: 0 auto;

  table-layout: auto;
  width: 100%;

  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;
`;

export const UserDBCaption = styled.caption`
  caption-side: top;
  margin-bottom: 60px;
`;

export const UserDBItemValue = styled.span`
  font-size: 11px;
`;

export const UserDBRow = styled.tr`
  border: 1px solid #000;
`;

export const UserHeadCell = styled.th`
  border: 1px solid #000;
  padding: 3px;
`;

export const Filterable = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  position: relative;
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

export const UserCellLeft = styled(UserCell)`
  text-align: start;
  padding-left: 8px;
  max-width: 50vw;
`;

export const UserEditButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 5px;
  cursor: pointer;
`;

export const UserDeleteButton = styled.button`
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

export const FilterButton = styled(FilterIcon)`
  width: 18px;
  height: 12px;

  color: #000;

  transition: color var(--animation-global);

  &:hover {
    color: var(--main-color);
  }
`;

export const FilterPicker = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
`;

export const FilterPickerButton = styled.button`
  width: 100%;
  text-transform: capitalize;
`;

export const Feedback = styled.p`
  font-size: 10px;
  margin-bottom: 3px;
  text-align: start;
`;

export const TeacherTable = styled(UserDBTable)`
  max-width: 80vw;
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

export const DateInputBox = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;

  display: flex;
  gap: 16px;

  transform: translateX(-50%);
`;

export const DateInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;
`;

export const DateInputSelect = styled(SpeakingSelect)`
  width: 280px;
  border-radius: 50px;
`;

export const KahootsAdminContainer = styled.div`
  position: relative;
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
`;

export const KahootsAdminForm = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 420px;
`;

export const PointsAdminContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  gap: 40px;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

export const PointsAdminSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 360px;
  padding: 1rem;
  height: 100%;
  border-right: 1px solid lightgray;
`;

export const PointsAdminTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

export const LessonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 12px 0;
`;

export const LessonItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 16px;
  background-color: #d5e7f8;
  width: 100%;
  font-size: 14px;
  transition: background-color var(--animation-global);

  &:hover {
    background-color: #add2f0;
  }

  @media screen and (min-width: 768px) {
    font-size: 19px;
    font-weight: 700;
  }
`;

export const SmallText = styled.p`
  font-size: 12px;
  color: #666;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

export const LinkArea = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border: 1px solid gray;
  border-radius: 25px;
  padding: 12px 4px 4px 4px;
  min-height: 360px;
  max-height: 100%;
`;

export const NoLinksChosen = styled.h3`
  text-align: center;
  padding: 4px;
`;

export const AdminButtonBox = styled(ButtonBox)`
  top: 16px;
  background-color: var(--secondary-color);
  padding: 8px;
  border: 1px solid var(--main-color);
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  gap: 8px;
  z-index: 5;

  transition: transform var(--animation-global);

  &.hidden {
    transform: translateX(calc(-100% - 30px));
  }
`;

export const AdminButtonBoxSwitch = styled(BoxHideSwitch)`
  top: 114px;
  width: 18px;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.4));

  & svg {
    scale: 1.25;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-height: 360px;
  max-height: 90%;
  overflow: auto;
`;

export const KahootLinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const VisibleGroupName = styled.h2`
  text-align: center;
  border-bottom: 1px solid gray;
  padding-bottom: 8px;
`;

export const DefaultInput = styled.input`
  flex: 1;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid #242329;
`;

export const AddButton = styled.button`
  min-width: max-content;
  margin: 0 auto;

  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid green;
  background: none;
  color: green;
  transition: var(--animation-global);

  &:hover {
    background-color: rgba(29, 180, 29, 0.2);
  }
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid red;
  border-radius: 50px;
  background: none;
  color: red;
  transition: var(--animation-global);

  &:hover {
    background-color: rgba(233, 103, 103, 0.15);
  }
`;

export const SubmitKahootsButton = styled(SubmitFormBtn)`
  width: 400px;
`;

export const AdminDatePicker = styled(StyledDatePicker)`
  border-radius: 50px;
  min-height: 42px;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 19px;
  }
`;
