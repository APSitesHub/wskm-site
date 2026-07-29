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
import { AdminFormBtn, LoginForm } from '../AdminPanel/AdminPanel.styled';
import { LoginErrorNote } from 'pages/MyWSKM/MyWSKMPanel/MyWSKMPanel.styled';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  FormSelect,
  UserEditButton,
  UsersForm,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  ScheduleData,
  ScheduleDataDayText,
  ScheduleDataTimeText,
  ScheduleHeading,
  ScheduleInfo,
  ScheduleItem,
  ScheduleList,
  TimetableDeleteButton,
} from './TimeTableAdminPanel.styled';
import { TimeTableEditForm } from './TimeTableEditForm/TimeTableEditForm';
import {
  PanelHeader,
  SubmitFormBtn,
} from '../AdminPanel/CourseAdminPanel.styled';
import {
  AdminButtonBoxSwitch,
  FormField,
} from '../AdminPanel/TeacherAdminPanel.styled';
import SideAdminMenu from '../AdminPanel/SideAdminMenu';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const TimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [scheduleToEdit, setScheduleToEdit] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const [isButtonBoxOpen, setIsButtonBoxOpen] = useState(true);
  const [groupValue, setGroupValue] = useState(null);
  const [dayValue, setDayValue] = useState(null);

  useEffect(() => {
    document.title = 'Timetable | WSKM';

    const refreshToken = async () => {
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('/admins/refresh/wskm/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getLessons = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/wskm-timetable/');
          console.log(response);
          setLessons(lessons => (lessons = [...response.data]));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isEditFormOpen) {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isLoading, isEditFormOpen]);

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Enter your login!'),
    password: yup.string().required('Enter your password!'),
  });

  const toggleButtonBox = () => {
    setIsButtonBoxOpen(isOpen => !isOpen);
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
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const initialTimetableValues = {
    group: '',
    day: '',
    time: '',
    lessonNumber: '',
    topic: '',
  };

  const timetableSchema = yup.object().shape({
    group: yup.string(),
    day: yup.string(),
    time: yup.string(),
    lessonNumber: yup.string(),
    topic: yup.string(),
  });

  const handleTimetableSubmit = async (values, { resetForm }) => {
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
    setGroupValue(group => (group = null));
    setDayValue(day => (day = null));

    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/wskm-timetable', values);
      console.log(response);
      resetForm();
      alert('Lesson successfully added');
    } catch (error) {
      console.error(error);
      alert(
        'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const groupsOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const daysOptions = [
    {
      label: 'Monday',
      value: '1',
    },
    {
      label: 'Tuesday',
      value: '2',
    },
    {
      label: 'Wednesday',
      value: '3',
    },
    {
      label: 'Thursday',
      value: '4',
    },
    {
      label: 'Friday',
      value: '5',
    },
    {
      label: 'Saturday',
      value: '6',
    },
    {
      label: 'Sunday',
      value: '0',
    },
  ];

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const handleEdit = async (id, scheduleId) => {
    setIsEditFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
    setScheduleToEdit(scheduleToEdit =>
      lessons
        .find(lesson => lesson._id === id)
        .schedule.find(lesson => lesson._id === scheduleId)
    );
  };

  const handleDelete = async (parentId, scheduleId) => {
    setIsLoading(isLoading => (isLoading = true));
    const timetableToDelete = lessons.find(
      timetable => timetable._id === parentId
    );
    const scheduleToDelete = timetableToDelete.schedule.find(
      schedule => schedule._id === scheduleId
    );

    const areYouSure = window.confirm(
      `Are you sure you want to delete the lesson for group ${timetableToDelete.group.replace(
        /(-)|(_)/g,
        ' '
      )} from subject ${scheduleToDelete.topic} on ${
        DAYS[scheduleToDelete.day]
      } at ${scheduleToDelete.time}?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.patch(
          `/wskm-timetable/schedule/${parentId}`,
          {
            _id: parentId,
            scheduleId,
          }
        );
        console.log(response);
        alert('Lesson successfully deleted');
      } catch (error) {
        console.error(error);
        alert(
          'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.'
        );
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    }
  };

  const handleTimetableDelete = async id => {
    setIsLoading(isLoading => (isLoading = true));
    const timetableToDelete = lessons.find(timetable => timetable._id === id);
    const areYouSure = window.confirm(
      `Are you sure you want to delete the timetable for group ${timetableToDelete.group.replace(
        /(-)|(_)/g,
        ' '
      )}?`
    );

    if (!areYouSure) {
      setIsLoading(isLoading => (isLoading = false));
      return;
    } else {
      try {
        const response = await axios.delete(`/wskm-timetable/${id}`);
        console.log(312, response);
        alert('Timetable successfully deleted');
      } catch (error) {
        console.error(error);
        alert(
          'An unexpected server error occurred. Please refresh the page and try again. If the problem persists, please contact technical support.'
        );
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    }
  };

  return (
    <>
      <PanelHeader>Timetable</PanelHeader>
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
                  placeholder="Login"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                <FormBtnText>Log in</FormBtnText>
              </AdminFormBtn>
              <LoginErrorNote
                style={
                  isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }
                }
              >
                Incorrect login or password.
              </LoginErrorNote>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <>
            <SideAdminMenu isOpen={isButtonBoxOpen} currentPage={'timetable'} />

            <AdminButtonBoxSwitch id="no-transform" onClick={toggleButtonBox}>
              {isButtonBoxOpen ? <BoxHideLeftSwitch /> : <BoxHideRightSwitch />}
            </AdminButtonBoxSwitch>
            <Formik
              initialValues={initialTimetableValues}
              onSubmit={handleTimetableSubmit}
              validationSchema={timetableSchema}
            >
              <UsersForm>
                <FormSelect
                  value={groupValue ? groupValue.value : null}
                  options={groupsOptions}
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
                  placeholder="Group"
                  name="group"
                  onChange={group => {
                    setGroupValue(group.value);
                  }}
                />
                <FormSelect
                  value={dayValue ? dayValue.value : null}
                  options={daysOptions}
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
                  placeholder="Day of the week"
                  name="day"
                  onChange={day => {
                    setDayValue(day.value);
                  }}
                />
                <Label>
                  <FormField type="text" name="time" placeholder="Time" />
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
                <SubmitFormBtn type="submit">
                  <FormBtnText>Add</FormBtnText>
                </SubmitFormBtn>
              </UsersForm>
            </Formik>
          </>
        )}
        <ScheduleList>
          {lessons &&
            lessons
              .sort((a, b) => a.group.localeCompare(b.group))
              .map(timetable => (
                <ScheduleItem key={timetable._id}>
                  <ScheduleHeading>
                    {'Group ' + timetable.group.replace(/(-)|(_)/g, ' ')}
                    <TimetableDeleteButton
                      onClick={() => handleTimetableDelete(timetable._id)}
                    >
                      Del
                    </TimetableDeleteButton>
                  </ScheduleHeading>

                  <ScheduleInfo>
                    {timetable.schedule
                      .sort((a, b) => a.day - b.day)
                      .map(schedule => (
                        <ScheduleData key={schedule._id}>
                          <ScheduleDataDayText>
                            {DAYS[schedule.day - 1] || DAYS[DAYS.length - 1]}
                          </ScheduleDataDayText>
                          <ScheduleDataTimeText>
                            {schedule.time}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.lessonNumber}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.topic}
                          </ScheduleDataTimeText>
                          <UserEditButton
                            onClick={() =>
                              handleEdit(timetable._id, schedule._id)
                            }
                          >
                            Edit
                          </UserEditButton>

                          <TimetableDeleteButton
                            onClick={() =>
                              handleDelete(timetable._id, schedule._id)
                            }
                          >
                            Delete
                          </TimetableDeleteButton>
                        </ScheduleData>
                      ))}
                  </ScheduleInfo>
                </ScheduleItem>
              ))}
        </ScheduleList>
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <TimeTableEditForm
              lessonToEdit={lessonToEdit}
              scheduleToEdit={scheduleToEdit}
              groupsOptions={groupsOptions}
              daysOptions={daysOptions}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default TimeTableAdminPanel;
