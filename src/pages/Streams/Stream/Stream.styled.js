import styled from 'styled-components';

export const PlayerWrapper = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const JitsiContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: none;
`;

export const GradientBackground = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #0f645b, black, #0f645b);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LargeText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  margin: auto;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const PlatformLink = styled.a`
  border-color: var(--secondary-color);
  border-radius: 9px;
  padding: 10px 14px;
  background-color: transparent;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &:hover,
  &:focus {
    background-color: var(--main-transparent-color);
  }
`;

export const LinkText = styled.span`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.45;
  text-decoration: underline;
  text-align: center;

  margin-right: 8px;
  color: var(--main-color);
`;
