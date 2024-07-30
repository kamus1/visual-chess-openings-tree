import { MyRoutes } from './routers/routes';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/sidebar';
import React from 'react';
import { useState } from 'react';

//themes
import { lightTheme, darkTheme } from './styles/themes';

export const ThemeContext = React.createContext('null');

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeStyle=theme==='light'?lightTheme:darkTheme;

  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container className={sideBarOpen ? "sidebarState active":"sidebarState"}>
                <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
                <MyRoutes />
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};
const Container = styled.div`
display: grid;
grid-template-columns: 90px auto;
background-color: ${({theme})=> theme.bgtotal};
color: ${({theme})=> theme.text};
transition: all 0.3s;
&.active{
  grid-template-columns: 300px auto;
}

`;

export default App;

