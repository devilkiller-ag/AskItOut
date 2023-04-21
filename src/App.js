import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Main from './Components/Main';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Welcome1 from './Components/Welcome/Welcome1';
import Welcome2 from './Components/Welcome/Welcome2';
import Welcome3 from './Components/Welcome/Welcome3';
import AskQuestion from "./Components/AskPage/AskQuestion";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
