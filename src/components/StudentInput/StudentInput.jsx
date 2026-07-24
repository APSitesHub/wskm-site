import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  ClockIcon,
  StudentQuizBox,
  StudentQuizBoxInput,
  StudentQuizBoxInputNote,
  StudentQuizForm,
  StudentQuizOptions,
  StudentQuizSubmitBtn,
  StudentQuizTimer,
} from './StudentInput.styled';

export const StudentInput = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  currentUser,
  user,
  questionID,
  timer,
}) => {
  const [isValid, setIsValid] = useState(true);
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
    if (!document.querySelector('#answer_input').value) {
      setIsValid(false);
      return;
    }

    const answer = document
      .querySelector('#answer_input')
      .value.trim()
      .trimEnd()
      .toLowerCase();
    e.preventDefault();

    document.querySelector('#answer_input').value = '';
    toggleQuiz();

    socket.emit('answer:given', {
      answer: answer,
      page: page,
    });

    console.log(43, 'answer:given', {
      answer: answer,
      username: user?.name || currentUser.username,
      page: page,
      socketID: socket.id,
      questionID: questionID,
      userID: user?.id || currentUser.userID,
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
        <StudentQuizBoxInput
          type="text"
          id="answer_input"
          placeholder="Write your answer"
          required
          onChange={e => {
            return e.target.value && setIsValid(true);
          }}
        />
        <StudentQuizSubmitBtn onClick={e => handleSubmit(e)}>
          Send
        </StudentQuizSubmitBtn>
        {!isValid && (
          <StudentQuizBoxInputNote>Answer is required</StudentQuizBoxInputNote>
        )}
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
