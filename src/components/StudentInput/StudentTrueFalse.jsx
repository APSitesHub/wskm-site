import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  ClockIcon,
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizOptions,
  StudentQuizSubmitBtnOptions,
  StudentQuizTimer,
} from './StudentInput.styled';

export const StudentTrueFalse = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  currentUser,
  user,
  questionID,
  timer,
}) => {
  const [currentTimer, setCurrentTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isInputOpen) {
      setCurrentTimer(timer);
      timerRef.current = setInterval(() => {
        setCurrentTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCurrentTimer(0);
    }
    return () => clearInterval(timerRef.current);
    // restart the countdown when a new question arrives while the widget is already open
  }, [isInputOpen, timer, questionID]);

  useEffect(() => {
    if (currentTimer === 0 && isInputOpen) {
      toggleQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimer]);

  const handleSubmit = async e => {
    e.preventDefault();
    const answer = e.target.innerText;
    toggleQuiz();

    socket.emit('answer:given', {
      answer: answer,
      page: page,
    });

    try {
      await axios.post('/answers', {
        answer: answer,
        username: user?.name || currentUser.username,
        page: page,
        socketID: socket.id,
        questionID: questionID,
        userID: user?.id || currentUser.userID,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      try {
        await axios.post('/answers-errors', {
          error:
            `Error message: ${error.message || 'No Error Message in Error Object'}; ` +
            `Error code: ${error.code || null}; ` +
            `Error status:  ${error.response?.status || null};`,
          username: user?.name || currentUser.username,
          page: page,
        });
      } catch (error) {
        console.error('Error is persistent, cannot submit it:', error);
      }
    }
  };

  return (
    <StudentQuizBox className={isInputOpen ? 'shown' : 'hidden'}>
      <StudentQuizForm>
        <StudentQuizOptions>
          <StudentQuizTimer>
            <ClockIcon />
            {currentTimer}
          </StudentQuizTimer>
        </StudentQuizOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          True
        </StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          False
        </StudentQuizSubmitBtnOptions>
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
