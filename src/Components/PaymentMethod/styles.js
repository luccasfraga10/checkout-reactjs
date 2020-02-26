import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 80px 0;
  border: 1px solid #c1c1c1;
  padding: 50px 30px;
  box-shadow: inset 0px 0px 8px rgba(193, 193, 193, 0.33);

  b {
    color: #515151;
  }

  > div {
    margin-top: 30px;

    span {
      color: #515151;
      font-weight: bold;
      text-decoration: underline;
      margin: 0 22px;
      font-size: 16px;
      cursor: pointer;

      &.active {
        color: #7059c1;
      }

      i {
        margin-right: 7px;
      }
    }
  }
`;
