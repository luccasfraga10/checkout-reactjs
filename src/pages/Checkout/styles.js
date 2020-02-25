import styled from 'styled-components';

export const Section = styled.section`
  display: block;
  background-color: red;
`;

export const Container = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  @media (min-width: 1024px) {
    padding: 0 40px;
    width: 1024px;
  }
`;
