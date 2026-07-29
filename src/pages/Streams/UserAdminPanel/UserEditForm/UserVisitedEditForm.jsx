import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { useEffect, useState } from 'react';
import {
  AdminFormBtn,
  DatesEditBlock,
  UserDeleteButton,
} from '../UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000';

const translations = {
  en: {
    updateUserError: 'Error while updating user',
    submitButton: 'Confirm changes',
  },
};

// value for <input type="date"> = 'yyyy-mm-dd'
const toInputDate = d => new Date(d).toISOString().slice(0, 10);

export const UserVisitedEditForm = ({
  lang,
  userToEdit,
  updateUserVisits,
  closeEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const list = Array.isArray(userToEdit.visits) ? userToEdit.visits : [];
    // newest first
    setVisits([...list].sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [userToEdit]);

  const addVisit = () =>
    setVisits(prev => [
      { date: new Date().toISOString(), page: 'main' },
      ...prev,
    ]);

  const deleteVisit = index =>
    setVisits(prev => prev.filter((_, i) => i !== index));

  const changeDate = (index, inputValue) =>
    setVisits(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        date: new Date(inputValue).toISOString(),
      };
      return next.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

  const changePage = (index, page) =>
    setVisits(prev => {
      const next = [...prev];
      next[index] = { ...next[index], page };
      return next;
    });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { _id, mail, password } = userToEdit;
      // send oldest-first to match how the model appends visits
      const ordered = [...visits]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(({ date, page }) => ({ date, page }));
      await axios.put(`/wskm-users/${_id}`, {
        mail,
        password,
        visits: ordered,
      });
      updateUserVisits(_id, ordered);
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert(translations[lang]?.updateUserError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DatesEditBlock>
        <div
          style={{
            maxHeight: '70dvh',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          <button
            type="button"
            onClick={addVisit}
            style={{
              padding: '10px',
              border: '1px solid var(--main-color)',
              color: 'var(--main-color)',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
          {visits.map((visit, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                border: '1px solid black',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <input
                type="date"
                value={toInputDate(visit.date)}
                onChange={e => changeDate(index, e.target.value)}
                style={{
                  padding: '4px',
                  border: '1px solid black',
                  borderRadius: '5px',
                }}
              />
              <select
                value={visit.page || 'main'}
                onChange={e => changePage(index, e.target.value)}
                style={{
                  padding: '4px',
                  border: '1px solid black',
                  borderRadius: '5px',
                }}
              >
                <option value="main">Main</option>
                <option value="lesson">Lesson</option>
              </select>
              <UserDeleteButton
                type="button"
                onClick={() => deleteVisit(index)}
              >
                Del
              </UserDeleteButton>
            </div>
          ))}
        </div>
        <AdminFormBtn type="button" onClick={handleSubmit}>
          {translations[lang]?.submitButton}
        </AdminFormBtn>
      </DatesEditBlock>
      {isLoading && <Loader />}
    </>
  );
};
