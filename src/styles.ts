import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  margin: auto;
  width: 80%;
}

label {
  margin-right: 8px;
}

dt {
  font-weight: bold;
}

dl, dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 1em;
}
`;

export const H1 = styled.h1`
  grid-column: 1/-1;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-right: 8px;
`;

export default GlobalStyle;
