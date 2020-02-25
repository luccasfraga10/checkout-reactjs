import styled from 'styled-components';

export const Text = styled.h1`
  display: flex;
  font-size: ${props => props.size};
  border-bottom: 1px solid #cccccc;
  color: ${props => props.color};
  padding-bottom: 8px;
  justify-content: flex-start;
  margin: ${props => props.margin};
`;
