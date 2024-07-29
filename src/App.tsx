import { MyRoutes } from './routers/routes';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Container>
        <MyRoutes />
      </Container>
    </BrowserRouter>
    </>
  );
};
const Container = styled.div``;

export default App;

