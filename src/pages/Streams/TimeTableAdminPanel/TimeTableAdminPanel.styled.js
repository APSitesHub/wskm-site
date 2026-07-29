import { FormBtn, Input, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Field, Form } from 'formik';
import styled from 'styled-components';
import Select from 'react-select';

export const AdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled(Form)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;

export const LinksForm = styled(Form)`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const AdminFormBtn = styled(FormBtn)`
  margin: 0 auto;
`;

export const AdminInput = styled(Input)`
  border: 2px solid var(--main-color);
`;

export const AdminTextArea = styled(Input)`
  border-radius: 0;
  width: 35vw;
  height: 75vh;
  scrollbar-width: thin;
  background-color: transparent;
`;

export const AdminInputNote = styled(InputNote)`
  position: static;
  color: var(--main-color);
  font-size: 24px;
  font-weight: 700;
  bottom: -1.1em;
`;

export const ScheduleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 45px;

  text-transform: capitalize;
  font-weight: 600;
  margin-left: auto;
`;

export const ScheduleHeading = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 16px;
`;

export const ScheduleItem = styled.li`
  width: 100%;
  flex-basis: 40%;
  flex-grow: 0;
  padding: 25px;

  border-radius: 50px;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.18);
`;

export const ScheduleInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ScheduleData = styled.li`
  font-size: 14px;
  font-weight: 400;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

export const ScheduleDataDayText = styled.span`
  min-width: 2em;
`;

export const ScheduleDataTypeText = styled.span`
  min-width: 120px;
  text-align: center;
`;

export const ScheduleDataTimeText = styled.span`
  width: 150px;
  text-align: center;
`;

export const ScheduleParagraph = styled.p`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const FormSelect = styled(Select)`
  width: 100%;
  font-size: 14px;
  border: 2px solid var(--main-color);

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

export const FormField = styled(Field)`
  width: 100%;
  height: 42px;
  padding: 12px 10px;
  font-size: 14px;
  border: 2px solid var(--main-color);
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

export const TimetableDeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid red;
  border-radius: 5px;
  margin-left: 10px;
`;
