import styled from 'styled-components';

export const LogoutBox = styled.div`
  position: absolute;
  top: 30px;
  right: 60px;
  z-index: 8;

  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  font-family: var(--my-ap-font-family);
  font-size: 16px;

  overflow-y: scroll;
  scrollbar-width: thin;
  border-radius: 20px;
  padding: 0 20px;
  padding-bottom: 30px;
  height: 768px;
  width: calc(100% - 65px);

  @media screen and (min-height: 320px) {
    height: 280px;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
    height: 400px;
  }

  @media screen and (min-width: 480px) {
    width: 362px;
    font-size: 20px;
    scrollbar-width: none;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    height: 442px;
  }

  @media screen and (min-width: 768px) {
    right: 90px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const LogoutButton = styled.button`
  padding: 6px;
  width: 145px;

  background: transparent;
  border-radius: 20px;
  border: 2px solid var(--main-color);

  font-size: 15px;

  transition: var(--animation-global);

  &.logout:hover {
    background: linear-gradient(135deg, #fff4b1, #ffd07f);
  }

  &.stay:hover {
    background: linear-gradient(135deg, #f0faff, #cfdfff);
  }
`;
