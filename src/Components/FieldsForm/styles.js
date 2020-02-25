import styled from 'styled-components';

export const FormContainer = styled.form`
  display: block;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -20px;
  flex-direction: ${props => props.FormDirectionRow};

  > div {
    padding: 0 20px;
    margin-top: 25px;
  }
`;

export const Button = styled.button`
  display: flex;
`;
