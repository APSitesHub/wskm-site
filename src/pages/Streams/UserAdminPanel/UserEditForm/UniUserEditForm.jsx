import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { FormField } from '../../AdminPanel/TeacherAdminPanel.styled';
import { SubmitFormBtn } from '../../AdminPanel/CourseAdminPanel.styled';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import {
  AdminInputNote,
  ErrorNote,
  FormSelect,
  LabelText,
  SpeakingLabel,
  UsersEditForm,
} from '../UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000';

const translations = {
  en: {
    namePlaceholder: 'Full name',
    emailPlaceholder: 'Email (login)',
    passwordPlaceholder: 'Password',
    pupilIdPlaceholder: 'Platform student ID',
    groupPlaceholder: 'Group',
    universityRequired: 'University - required field!',
    groupRequired: 'Group - required field!',
    editUserError:
      'An unexpected server error occurred. Please refresh and try again.',
    userUpdated: 'User has been updated!',
    submitButton: 'Confirm changes',
  },
};

export const UniUserEditForm = ({
  lang,
  uni,
  userToEdit,
  updateUser,
  closeEditForm,
  groupOptions,
  University,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupValue, setGroupValue] = useState(
    groupOptions.find(o => o.value === (userToEdit.group || '1')) ||
      groupOptions[0]
  );
  const [isGroupEmpty, setIsGroupEmpty] = useState(false);
  const selectInputRef = useRef();

  const initialUserValues = {
    name: userToEdit.name,
    mail: userToEdit.mail,
    password: userToEdit.password,
    pupilId: userToEdit.pupilId,
    group: userToEdit.group ? userToEdit.group : '1',
    university: userToEdit.university || University[uni],
  };

  const usersSchema = yup.object().shape({
    name: yup.string().required(translations[lang]?.namePlaceholder),
    mail: yup.string().required(translations[lang]?.emailPlaceholder),
    password: yup.string().required(translations[lang]?.passwordPlaceholder),
    pupilId: yup
      .string()
      .min(6, translations[lang]?.pupilIdPlaceholder)
      .max(7, translations[lang]?.pupilIdPlaceholder)
      .matches(/^\d{1,7}$/, translations[lang]?.pupilIdPlaceholder)
      .required(translations[lang]?.pupilIdPlaceholder),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    const payload = {
      name: values.name.trim(),
      mail: values.mail.toLowerCase().trim(),
      password: values.password.trim(),
      pupilId: values.pupilId.trim(),
      university: uni
        ? University[uni]
        : 'WSKM (Wyższa Szkoła Nauk Społecznych)',
      group: groupValue.value,
    };

    try {
      setIsLoading(isLoading => (isLoading = true));
      const response = await axios.put(
        `/wskm-users/${userToEdit._id}`,
        payload
      );
      console.log(response);
      resetForm();
      alert(translations[lang]?.userUpdated);
      updateUser(userToEdit._id, payload);
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert(translations[lang]?.editUserError);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialUserValues}
        onSubmit={handleUserSubmit}
        validationSchema={usersSchema}
      >
        <UsersEditForm>
          <Label>
            <FormField
              type="text"
              name="name"
              placeholder={translations[lang]?.namePlaceholder}
            />
            <AdminInputNote component="p" name="name" />
          </Label>
          <Label>
            <FormField
              type="email"
              name="mail"
              placeholder={translations[lang]?.emailPlaceholder}
            />
            <AdminInputNote component="p" name="mail" />
          </Label>
          <Label>
            <FormField
              type="text"
              name="pupilId"
              placeholder={translations[lang]?.pupilIdPlaceholder}
            />
            <AdminInputNote component="p" name="pupilId" />
          </Label>
          <SpeakingLabel>
            {groupValue && groupValue.value && (
              <LabelText>{translations[lang]?.groupPlaceholder}</LabelText>
            )}
            <FormSelect
              ref={selectInputRef}
              options={groupOptions}
              defaultValue={
                userToEdit.group
                  ? groupOptions.find(
                      o => o.value === (userToEdit.group || '1')
                    )
                  : groupOptions[0]
              }
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '50px',
                  minHeight: '38px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: '7px',
                }),
              }}
              placeholder={translations[lang]?.groupPlaceholder}
              name="group"
              onBlur={() => {
                !groupValue
                  ? setIsGroupEmpty(empty => (empty = true))
                  : setIsGroupEmpty(empty => (empty = false));
              }}
              onChange={group => {
                setGroupValue(group);
                group?.value && setIsGroupEmpty(empty => (empty = false));
              }}
            />
            {isGroupEmpty && (
              <ErrorNote>{translations[lang]?.groupRequired}</ErrorNote>
            )}
          </SpeakingLabel>
          <SubmitFormBtn type="submit">
            {translations[lang]?.submitButton}
          </SubmitFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
