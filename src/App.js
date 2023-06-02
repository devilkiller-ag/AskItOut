import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Main from './Components/Main';
import { Login, Signup } from './Components/Auth';
import { Welcome1, Welcome2, Welcome3 } from './Components/Welcome';
import AskQuestion from "./Components/AskPage/AskQuestion";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Main /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/signup' element={ <Signup /> } />
          <Route exact path='/welcome1' element={ <Welcome1 /> } />
          <Route exact path='/welcome2' element={ <Welcome2 /> } />
          <Route exact path='/welcome3' element={ <Welcome3 /> } />
          <Route exact path='/ask' element={ <AskQuestion /> } />
          <Route exact path='/profile' element={ <ProfilePage /> } />
          <Route exact path='*' element={ <ErrorPage /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
