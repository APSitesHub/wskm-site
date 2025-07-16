import axios from 'axios';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  LoginLogo
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import { LoginErrorNote } from 'pages/MyWSKM/MyWSKMPanel/MyWSKMPanel.styled';
import {
  AdminFormBtn,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  PanelHeader,
  SubmitFormBtn,
} from './CourseAdminPanel.styled';
import {
  AdminDatePicker,
  FormSelect,
  LessonItem,
  LessonsContainer,
  PointsAdminContainer,
  PointsAdminSidebar,
  PointsAdminTableContainer,
  PointsForm,
  SmallText,
  UserCell
} from './TeacherAdminPanel.styled';
import {
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserHeadCell,
} from './UserAdminPanel.styled';

import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const PointsAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [foundLessons, setFoundLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonPoints, setSelectedLessonPoints] = useState([]);
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const [customError, setCustomError] = useState('');

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Podaj login!'),
    password: yup.string().required('Podaj hasło!'),
  });

  const initialLessonValues = {
    course: '',
    group: '',
    date: '',
  };

  const lessonSchema = yup.object().shape({
    course: yup.string().required('Wybierz kurs!'),
    group: yup.string().required('Wybierz grupę!'),
    date: yup
      .date()
      .required('Wybierz datę!')
      .max(new Date(), 'Data nie może być w przyszłości!'),
  });

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

  const handleSelectCourse = item => {
    setSelectedCourse(courses.find(course => course.slug === item.value));
    setCustomError('');
  };

  const handleSelectGroup = item => {
    setSelectedGroup(item.value);
    setCustomError('');
  };

  const handleFindLessons = async () => {
    try {
      const response = await axios.get(
        `/wskm-lessons/findOne/${
          selectedCourse.slug
        }_${selectedGroup}/${selectedDate.toLocaleDateString('pl-PL')}`
      );

      setFoundLessons(response.data);

      if (response.data.length === 0) {
        alert('Nie znaleziono żadnych lekcji dla podanych parametrów!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFetchLessonPoints = async lessonId => {
    const response = await axios.get(`/wskm-lessons/points/${lessonId}`);

    setSelectedLessonPoints(response.data);
    setSelectedLesson(foundLessons.find(lesson => lesson._id === lessonId));
  };

  useEffect(() => {
    document.title = 'Panel wyników | WSKM';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/wskm/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.error(error);
      }
    };
    refreshToken();

    const getCourses = async () => {
      const response = await axios.get('/wskm-courses/admin');

      setCourses(response.data);
    };

    getCourses();
  }, []);

  return (
    <>
      <PanelHeader>Panel wyników</PanelHeader>
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
                  placeholder={'Login'}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder={'Hasło'}
                  onBlur={() => setIsUserInfoIncorrect(false)}
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">
                <FormBtnText>Zaloguj się</FormBtnText>
              </AdminFormBtn>
              <LoginErrorNote
                style={
                  isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }
                }
              >
                Błędne hasło lub e-mail.
              </LoginErrorNote>
            </LoginForm>
          </Formik>
        )}
        {isUserAdmin && (
          <>
            <PointsAdminContainer>
              <PointsAdminSidebar>
                {courses.length > 0 && (
                  <Formik
                    initialValues={initialLessonValues}
                    onSubmit={handleFindLessons}
                    validationSchema={lessonSchema}
                  >
                    <PointsForm>
                      <FormSelect
                        options={courses.map(course => ({
                          label: course.courseName,
                          value: course.slug,
                        }))}
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
                        placeholder="Kurs"
                        onChange={handleSelectCourse}
                      />
                      <FormSelect
                        options={
                          selectedCourse?.courseGroups?.map(group => ({
                            label: group,
                            value: group,
                          })) || []
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
                        placeholder="Grupa"
                        onChange={handleSelectGroup}
                        isDisabled={!selectedCourse}
                      />
                      <AdminDatePicker
                        selected={selectedDate}
                        dateFormat="dd.MM.yyyy"
                        onChange={date => {
                          setSelectedDate(date);
                        }}
                        calendarStartDay={1}
                        shouldCloseOnSelect={true}
                        maxDate={new Date()}
                        placeholderText="Data"
                      />
                      <AdminInputNote component="p" name="courseGroups" />

                      <SubmitFormBtn onClick={handleFindLessons} type="submit">
                        <FormBtnText>Szukaj</FormBtnText>
                      </SubmitFormBtn>
                      {customError && (
                        <LoginErrorNote>{customError}</LoginErrorNote>
                      )}
                    </PointsForm>
                  </Formik>
                )}

                {foundLessons.length > 0 && (
                  <LessonsContainer>
                    {foundLessons.map(lesson => (
                      <LessonItem
                        key={lesson._id}
                        onClick={() => handleFetchLessonPoints(lesson._id)}
                      >
                        <p>
                          {lesson.lessonName} #{lesson.lessonNumber}
                        </p>
                        <SmallText>Teacher: {lesson.teacherName}</SmallText>
                      </LessonItem>
                    ))}
                  </LessonsContainer>
                )}
              </PointsAdminSidebar>
              <PointsAdminTableContainer>
                {selectedLesson && (
                  <UserDBTable>
                    <UserDBCaption>
                      {selectedLesson.lessonName} #{selectedLesson.lessonNumber}
                    </UserDBCaption>
                    <thead>
                      <UserDBRow>
                        <UserHeadCell>№</UserHeadCell>
                        <UserHeadCell>Nazwisko i imię</UserHeadCell>
                        {selectedLesson &&
                          selectedLesson.questions.map((question, index) => (
                            <UserHeadCell key={question._id}>
                              q_{index + 1}
                            </UserHeadCell>
                          ))}
                        <UserHeadCell>łącznie</UserHeadCell>
                      </UserDBRow>
                    </thead>
                    <tbody>
                      {selectedLessonPoints.length > 0 &&
                        selectedLessonPoints.map((user, index) => (
                          <UserDBRow key={user._id}>
                            <UserCell>{index + 1}</UserCell>
                            <UserCell>{user.name}</UserCell>
                            {selectedLesson.questions.map(question => (
                              <UserCell key={question._id}>
                                {(() => {
                                  const ans = user.answers.find(
                                    answer => answer.questionId === question._id
                                  );
                                  return ans?.points !== undefined
                                    ? ans.points
                                    : '';
                                })()}
                              </UserCell>
                            ))}
                            <UserCell>{user.totalPoints}</UserCell>
                          </UserDBRow>
                        ))}
                    </tbody>
                  </UserDBTable>
                )}
              </PointsAdminTableContainer>
            </PointsAdminContainer>
          </>
        )}

        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default PointsAdminPanel;
