import axios from 'axios';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
} from './AdminPanel.styled';
import {
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserHeadCell,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  AdminDatePicker,
  LessonItem,
  LessonsContainer,
  PointsAdminContainer,
  PointsAdminSidebar,
  PointsAdminTableContainer,
  PointsForm,
  SmallText,
  SubmitFormBtn,
  TeacherSpeakingDBTable,
} from './LessonResultsPanel.styled';
import { PointsFormSelect } from './LessonResultsPanel.styled';

// axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
axios.defaults.baseURL = 'http://localhost:5000';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const coursesOptions = [
  { label: 'CNC', value: 'wskm_cnc' },
  { label: 'Test', value: 'wskm_logistics' },
];

const LessonResultsPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(coursesOptions[0]);
  const [foundLessons, setFoundLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonPoints, setSelectedLessonPoints] = useState([]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Введіть логін'),
    password: yup.string().required('Введіть пароль!'),
  });

  const initialLessonValues = {
    level: '',
    date: '',
  };

  const lessonSchema = yup.object().shape({
    level: yup.string().required('Виберіть рівень'),
    date: yup.date().required('Виберіть дату'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/users', values);
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

  const handleSelectCourse = item => {
    setSelectedCourse(
      coursesOptions.find(course => course.value === item.value)
    );
  };

  const handleFindLessons = async () => {
    try {
      const response = await axios.get(
        `/uni-lesson-results/findOne/${
          selectedCourse.value
        }/${selectedDate.toLocaleDateString('pl-PL')}`
      );

      setFoundLessons(response.data);

      if (response.data.length === 0) {
        toast.error('Nie znaleziono lekcji dla wybranej daty!', {
          duration: 5000,
          position: 'top-center',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFetchLessonPoints = async lessonId => {
    const response = await axios.get(`/uni-lesson-results/points/${lessonId}`);

    setSelectedLessonPoints(response.data);
    setSelectedLesson(foundLessons.find(lesson => lesson._id === lessonId));
  };

  useEffect(() => {
    document.title = 'Lessons Results Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.error(error);
      }
    };
    refreshToken();
  }, []);

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <Label>
                <AdminInput type="text" name="login" placeholder="Login" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <PointsAdminContainer>
            <PointsAdminSidebar>
              <Formik
                initialValues={initialLessonValues}
                onSubmit={handleFindLessons}
                validationSchema={lessonSchema}
              >
                <PointsForm>
                  <PointsFormSelect
                    options={coursesOptions}
                    defaultValue={coursesOptions[0]}
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
                  <AdminDatePicker
                    selected={selectedDate}
                    dateFormat="dd.MM.yyyy"
                    onChange={date => {
                      setSelectedDate(date);
                    }}
                    calendarStartDay={1}
                    shouldCloseOnSelect={true}
                    maxDate={new Date()}
                    placeholderText="Data lekcji"
                  />

                  <SubmitFormBtn onClick={handleFindLessons} type="submit">
                    <FormBtnText>Szukaj</FormBtnText>
                  </SubmitFormBtn>
                </PointsForm>
              </Formik>

              {foundLessons.length > 0 && (
                <LessonsContainer>
                  {foundLessons.map(lesson => (
                    <LessonItem
                      key={lesson._id}
                      onClick={() => handleFetchLessonPoints(lesson._id)}
                    >
                      <p>
                        {lesson.lessonName} {lesson.lessonNumber}
                      </p>
                      <SmallText>Teacher: {lesson.teacherName}</SmallText>
                    </LessonItem>
                  ))}
                </LessonsContainer>
              )}
            </PointsAdminSidebar>
            <PointsAdminTableContainer>
              {selectedLesson && (
                <TeacherSpeakingDBTable>
                  <UserDBCaption>
                    {selectedLesson.lessonName} {selectedLesson.lessonNumber}
                  </UserDBCaption>
                  <thead>
                    <UserDBRow>
                      <UserHeadCell>№</UserHeadCell>
                      <UserHeadCell>Ім'я</UserHeadCell>
                      {selectedLesson &&
                        selectedLesson.questions.map((question, index) => (
                          <UserHeadCell key={question._id}>
                            q_{index + 1}
                          </UserHeadCell>
                        ))}
                      <UserHeadCell>Загалом</UserHeadCell>
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
                </TeacherSpeakingDBTable>
              )}
            </PointsAdminTableContainer>
          </PointsAdminContainer>
        )}

        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default LessonResultsPanel;
