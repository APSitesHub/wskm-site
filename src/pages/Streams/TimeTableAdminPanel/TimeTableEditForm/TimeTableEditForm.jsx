import axios from 'axios';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInputNote,
  UsersEditForm,
} from '../../UserAdminPanel/UserAdminPanel.styled';
import { FormField, FormSelect } from '../TimeTableAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TimeTableEditForm = ({
  lessonToEdit,
  scheduleToEdit,
  groupsOptions,
  daysOptions,
  closeEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupValue, setGroupValue] = useState(lessonToEdit.group);
  const [dayValue, setDayValue] = useState(scheduleToEdit.day);

  const initialEditTimetableValues = {
    group: lessonToEdit.group || '',
    day: scheduleToEdit.day,
    time: scheduleToEdit.time,
    lessonNumber: scheduleToEdit.lessonNumber,
    topic: scheduleToEdit.topic,
  };

  const timetableSchema = yup.object().shape({
    group: yup.string(),
    day: yup.string(),
    time: yup.string(),
    lessonNumber: yup.string(),
    topic: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      group: groupValue,
      schedule: [
        {
          day: dayValue,
          time: values.time,
          lessonNumber: values.lessonNumber,
          topic: values.topic,
        },
      ],
    };

    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.put(`/wskm-timetable/${lessonToEdit._id}`, {
        lessonId: scheduleToEdit._id,
        body: values,
      });
      console.log(response);
      closeEditForm();
      alert('Changes saved successfully');
    } catch (error) {
      console.error(error);
      alert(
        'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialEditTimetableValues}
        onSubmit={handleEditTimetableSubmit}
        validationSchema={timetableSchema}
      >
        <UsersEditForm>
          <FormSelect
            defaultValue={groupsOptions.find(
              option => option.value === groupValue
            )}
            options={groupsOptions}
            isDisabled
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Grupa"
            name="group"
            onChange={group => {
              setGroupValue(group.value);
            }}
          />
          <FormSelect
            options={daysOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Day"
            name="day"
            defaultValue={daysOptions.find(
              option => +option.value === scheduleToEdit.day
            )}
            onChange={day => {
              setDayValue(day.value);
            }}
          />
          <Label>
            <FormField type="text" name="time" placeholder="Czas" />
            <AdminInputNote component="p" name="time" />
          </Label>
          <Label>
            <FormField
              type="text"
              name="lessonNumber"
              placeholder="Lesson number"
            />
            <AdminInputNote component="p" name="lessonNumber" />
          </Label>
          <Label>
            <FormField type="text" name="topic" placeholder="Subject" />
            <AdminInputNote component="p" name="topic" />
          </Label>
          <AdminFormBtn type="submit">
            <FormBtnText>Save changes</FormBtnText>
          </AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
