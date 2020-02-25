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

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  padding: 10px 40px;
  font-size: 15px;
  border: none;
  background: #7059c1;
  box-shadow: none;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  margin-top: 28px;
  cursor: pointer;
  border: 1px solid #7059c1;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    background-color: transparent;
    color: #7059c1;
    transform: scale(1.05);
  }

  &:disabled,
  &.disabled {
    background-color: #d8d8d8;
    border-color: #d8d8d8;

    &:hover,
    &:focus {
      background-color: #d8d8d8;
      color: #fff;
      transform: scale(1);
      cursor: auto;
    }
  }
`;
