import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  BoxHideLeftSwitch,
  BoxHideRightSwitch,
  LoginLogo,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import { LoginErrorNote } from 'pages/MyWSKM/MyWSKMPanel/MyWSKMPanel.styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as yup from 'yup';
import { AdminFormBtn, LoginForm } from '../AdminPanel/AdminPanel.styled';
import SideAdminMenu from '../AdminPanel/SideAdminMenu';
import {
  AdminButtonBoxSwitch,
  FormField,
} from '../AdminPanel/TeacherAdminPanel.styled';
import {
  PanelHeader,
  SubmitFormBtn,
} from '../AdminPanel/CourseAdminPanel.styled';
import {
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  ArrowDownIcon,
  ErrorNote,
  FormSelect,
  LabelText,
  SpeakingLabel,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
  UsersForm,
} from './UserAdminPanel.styled';
import { UniUserEditForm } from './UserEditForm/UniUserEditForm';
import { UserVisitedEditForm } from './UserEditForm/UserVisitedEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const University = {
  WSKM: 'WSKM (Wyższa Szkoła Nauk Społecznych)',
};

const translations = {
  en: {
    loginPlaceholder: 'Login',
    passwordPlaceholder: 'Password',
    loginRequired: 'Enter your login!',
    passwordRequired: 'Enter your password!',
    loginButton: 'Log in',
    addUserButton: 'Add user',
    userListCaption: 'List of students with access to the lesson',
    crmLeadContact: 'CRM&nbsp;Lead Contact',
    name: 'Full name',
    email: 'Email (login)',
    password: 'Password',
    university: 'University',
    group: 'Group',
    points: 'Points',
    platformId: 'Platform ID',
    attendance: 'Attendance',
    percentage: 'Attendance percentage',
    visitsWithTime: 'Visits with time',
    deleteUserConfirmation: 'Are you sure you want to delete',
    userDeleted: 'User has been deleted',
    edit: 'Edit',
    delete: 'Delete',
    deleteUserError:
      'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.',
    addUserError:
      'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.',
    userAdded: 'User has been added',
    userUpdated: 'User has been updated',
    updateUserError: 'Error while updating user',
    universityRequired: 'University - required field!',
    groupRequired: 'Group - required field!',
    userNameRequired:
      'Name - required field; if the name is unknown for some reason, enter N/A',
    userEmailRequired: 'Email - required field!',
    userPasswordRequired: 'Password - required field!',
    crmIdDigitsOnly: 'Digits only',
    contactIdDigitsOnly: 'Digits only',
    pupilIdDigitsOnly: 'Digits only',
    pupilIdMinLength: 'No fewer than 6 digits',
    pupilIdMaxLength: 'No more than 7 digits',
    pupilIdRequired: 'Required field, check on the platform',
    course: 'Course',
    coursePlaceholder: 'Select a course',
    courseRequired: 'Course is required!',
  },
};

const UniUserAdminPanel = ({ uni, lang = 'pl' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isVisitedEditFormOpen, setIsVisitedEditFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [groupValue, setGroupValue] = useState(null);
  const [isGroupEmpty, setIsGroupEmpty] = useState(false);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [daysAfterLastLogin] = useState(7);
  const selectInputRef = useRef();

  // Створюємо опції для груп базуючиcь на вибраному курсі
  const currentGroupOptions = useMemo(() => {
    // Базові опції для груп
    const defaultGroupOptions = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ];

    return defaultGroupOptions;
  }, []);

  useEffect(() => {
    document.title = 'Students | WSKM';

    const refreshToken = async () => {
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/wskm/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getUsers = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/wskm-users/admin/');

          setUsers(
            users =>
              (users = [
                ...response.data
                  .reverse()
                  .sort((a, b) => a.name.localeCompare(b.name)),
              ])
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();

    const onEscapeClose = event => {
      if (event.code === 'Escape') {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isEditFormOpen, isLoading, uni]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required(translations[lang]?.loginRequired),
    password: yup.string().required(translations[lang]?.passwordRequired),
  });

  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
  };

  const onClear = () => {
    selectInputRef.current.clearValue();
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/wskm', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const initialUserValues = {
    name: '',
    mail: '',
    password: '',
    pupilId: '',
    university: '',
    group: '',
  };

  const usersSchema = yup.object().shape({
    name: yup.string().required(translations[lang]?.userNameRequired),
    mail: yup.string().required(translations[lang]?.userEmailRequired),
    password: yup.string().required(translations[lang]?.userPasswordRequired),
    pupilId: yup
      .string()
      .min(6, translations[lang]?.pupilIdMinLength)
      .max(7, translations[lang]?.pupilIdMaxLength)
      .matches(/^\d{1,7}$/, translations[lang]?.pupilIdDigitsOnly)
      .required(translations[lang]?.pupilIdRequired),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(true);

    const payload = {
      name: values.name.trim(),
      mail: values.mail.toLowerCase().trim(),
      password: values.password.trim(),
      pupilId: values.pupilId.trim(),
      university: uni
        ? University[uni]
        : 'WSKM (Wyższa Szkoła Nauk Społecznych)',
      group: groupValue ? groupValue.value : '1',
    };

    try {
      const response = await axios.post('/wskm-users/new', payload);
      console.log(response.data);
      setUsers(users => [response.data, ...users]);
      resetForm();
      setGroupValue(null);
      onClear();
      alert(translations[lang]?.userAdded);
    } catch (error) {
      console.error(error);
      alert(translations[lang]?.addUserError);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);

    setUserToEdit(
      userToEdit =>
        (userToEdit = {
          ...users.find(user => user._id === id),
          university: University[uni],
        })
    );
  };

  const handleVisitedEdit = async id => {
    const { data } = await axios.get(`/wskm-users/admin/${id}`);
    setUserToEdit(
      userToEdit =>
        (userToEdit = {
          ...data,
          university: University[uni],
        })
    );
    setIsVisitedEditFormOpen(true);
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
    setIsVisitedEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
      setIsVisitedEditFormOpen(false);
    }
  };

  const updateUserVisits = (id, visits) => {
    setUsers(
      users =>
        (users = users.map((user, i) =>
          i === users.findIndex(user => user._id === id)
            ? { ...user, visits: visits }
            : user
        ))
    );
  };

  const updateUser = (id, values) => {
    const userToUpdate = users.find(user => user._id === id);
    userToUpdate.name = values.name;
    userToUpdate.mail = values.mail;
    userToUpdate.password = values.password;
    userToUpdate.pupilId = values.pupilId;
    if (uni) {
      userToUpdate.university = values.university;
    }
    userToUpdate.group = values.group;

    console.log(userToUpdate);

    setUsers(
      users =>
        (users = users.map((user, i) =>
          i === users.findIndex(user => user._id === id) ? userToUpdate : user
        ))
    );
  };

  const handleDelete = async id => {
    setIsLoading(isLoading => (isLoading = true));
    const areYouSure = window.confirm(
      `${translations[lang]?.deleteUserConfirmation} ${
        users.find(user => user._id === id).name
      }?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.delete(`/wskm-users/${id}`);
        console.log(response);
        alert(translations[lang]?.userDeleted);
        setUsers(users => (users = [...users.filter(user => user._id !== id)]));
      } catch (error) {
        console.error(error);
        alert(translations[lang]?.deleteUserError);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    }
  };

  const sortByGroup = () => {
    setUsers(users => [
      ...users.sort((a, b) => {
        if (!a.group) return 1;
        if (!b.group) return -1;
        return a.group.localeCompare(b.group);
      }),
    ]);
  };

  return (
    <>
      <PanelHeader>Students</PanelHeader>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <LoginLogo />
              <Label>
                <AdminInput
                  type="text"
                  name="login"
                  placeholder={translations[lang]?.loginPlaceholder}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder={translations[lang]?.passwordPlaceholder}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                <FormBtnText>{translations[lang]?.loginButton}</FormBtnText>
              </AdminFormBtn>
              <LoginErrorNote
                style={
                  isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }
                }
              >
                E-Mail or password is incorrect.
              </LoginErrorNote>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <>
            <SideAdminMenu isOpen={isButtonBoxOpen} currentPage={'users'} />

            <AdminButtonBoxSwitch id="no-transform" onClick={toggleButtonBox}>
              {isButtonBoxOpen ? <BoxHideLeftSwitch /> : <BoxHideRightSwitch />}
            </AdminButtonBoxSwitch>
            <Formik
              initialValues={initialUserValues}
              onSubmit={handleUserSubmit}
              validationSchema={usersSchema}
            >
              <UsersForm>
                <Label>
                  <FormField
                    type="text"
                    name="name"
                    placeholder={translations[lang]?.name}
                  />
                  <AdminInputNote component="p" name="name" />
                </Label>
                <Label>
                  <FormField
                    type="email"
                    name="mail"
                    placeholder={translations[lang]?.email}
                  />
                  <AdminInputNote component="p" name="mail" />
                </Label>
                <Label>
                  <FormField
                    type="text"
                    name="password"
                    placeholder={translations[lang]?.password}
                  />
                  <AdminInputNote component="p" name="password" />
                </Label>
                <Label>
                  <FormField
                    type="text"
                    name="pupilId"
                    placeholder={translations[lang]?.platformId}
                  />
                  <AdminInputNote component="p" name="pupilId" />
                </Label>
                <SpeakingLabel>
                  {groupValue && groupValue.value && (
                    <LabelText>{translations[lang]?.group}</LabelText>
                  )}
                  <FormSelect
                    ref={selectInputRef}
                    options={currentGroupOptions}
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
                    placeholder={translations[lang]?.group}
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
                  <FormBtnText>{translations[lang]?.addUserButton}</FormBtnText>
                </SubmitFormBtn>
              </UsersForm>
            </Formik>
          </>
        )}

        {isUserAdmin && users && (
          <UserDBTable>
            <UserDBCaption>{translations[lang]?.userListCaption}</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>№</UserHeadCell>
                <UserHeadCell>{translations[lang]?.name}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.email}</UserHeadCell>
                <UserHeadCell style={{ whiteSpace: 'nowrap' }}>
                  {translations[lang]?.group}
                  <button
                    style={{
                      padding: '0',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      marginLeft: '4px',
                    }}
                    onClick={sortByGroup}
                  >
                    <ArrowDownIcon />
                  </button>
                </UserHeadCell>
                <UserHeadCell>{translations[lang]?.platformId}</UserHeadCell>
                <UserHeadCell>{translations[lang]?.attendance}</UserHeadCell>
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserDBRow key={user._id}>
                  <UserCell>{index + 1}</UserCell>
                  <UserCell>{user.name}</UserCell>
                  <UserCell>{user.mail}</UserCell>
                  <UserCell>{user.group || '1'}</UserCell>
                  <UserCell>{user.pupilId}</UserCell>
                  {(() => {
                    const lastVisit = user.visits?.[user.visits.length - 1];
                    const lastDate = lastVisit
                      ? new Date(lastVisit.date)
                      : null;
                    const isStale =
                      lastDate &&
                      Math.floor((Date.now() - lastDate.getTime()) / 86400000) >
                        daysAfterLastLogin;
                    return (
                      <UserCell
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                        onClick={() => handleVisitedEdit(user._id)}
                        className={isStale ? 'attention' : ''}
                      >
                        {lastDate ? lastDate.toLocaleDateString('uk-UA') : '—'}
                      </UserCell>
                    );
                  })()}

                  <UserCell>
                    <UserEditButton onClick={() => handleEdit(user._id)}>
                      Edit
                    </UserEditButton>
                  </UserCell>
                  <UserCell>
                    {user.name === 'Dev Acc' ? null : (
                      <UserDeleteButton onClick={() => handleDelete(user._id)}>
                        Del
                      </UserDeleteButton>
                    )}
                  </UserCell>
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <UniUserEditForm
              uni={uni}
              lang={lang}
              userToEdit={userToEdit}
              updateUser={updateUser}
              closeEditForm={closeEditForm}
              University={University}
              groupOptions={currentGroupOptions}
            />
          </Backdrop>
        )}
        {isVisitedEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <UserVisitedEditForm
              lang={lang}
              userToEdit={userToEdit}
              updateUserVisits={updateUserVisits}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniUserAdminPanel;
