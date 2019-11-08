import styled from 'styled-components';

export const IndexPages = styled.div.attrs(props => ({
  type: 'div',
  disabled: props.pageIndex,
}))`
  list-style: none;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button {
    background: black;
    color: #fff;
    padding: 10px;
    border-radius: 3px;
    font-weight: bold;
    border: 0;

    &[disabled] {
      background: gray;
      cursor: not-allowed;
    }
  }
`;

export const IssueStatus = styled.ul.attrs(props => ({
  type: 'ul',
  disabled: props.issueType,
}))`
  list-style: none;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 20px;
  border-top: 1px solid #eee;

  li {
    list-style: none;
    background: gray;
    color: #fff;
    cursor: pointer;
    padding: 10px;
    border-radius: 3px;
    font-weight: bold;

    & {
      background: ${props => (props.active === 1 ? '#000;' : 'gray;')};
    }
    &:last-child {
      background: ${props => (props.active === 2 ? '#000;' : 'gray;')};
    }
    &:first-child {
      color: white;
      background: ${props => (props.active === 0 ? '#000;' : 'gray;')};
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 14px;
  }
`;

export const Span = styled.span`
  background: ${props => props.colors && `#${props.colors}`};
  color: #333;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  padding: 3px;
  margin-left: 10px;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }
    }
  }
`;
