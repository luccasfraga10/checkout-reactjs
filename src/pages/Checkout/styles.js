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
  position: relative;

  h1 {
    color: #fff;
    font-size: 29px;
  }

  .box-btn {
    position: absolute;
    right: 30px;
  }
  button {
    border: 0;
    margin: 0 3px;
    background: #fff;
    color: #333;
    font-weight: bold;
    font-size: 12px;
    padding: 5px 13px;
    cursor: pointer;

    &.active {
      background: #947bed;
      color: #fff;
    }
  }
`;
