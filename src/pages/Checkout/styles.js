import styled from 'styled-components';

export const Section = styled.section`
  display: block;
`;

export const Container = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  background-color: #fff;

  @media (min-width: 1024px) {
    padding: 40px;
    width: 1024px;
  }

  @media (min-width: 1366px) {
    width: 1366px;
  }
`;

export const Navbar = styled.section`
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
  background: #7059c1;

  h1 {
    color: #fff;
    font-size: 29px;
  }
`;
