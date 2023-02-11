import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Welcome1 from './Components/Welcome1';
import Welcome2 from './Components/Welcome2';
import Welcome3 from './Components/Welcome3';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/signup' element={ <Signup /> } />
          <Route exact path='/welcome1' element={ <Welcome1 /> } />
          <Route exact path='/welcome2' element={ <Welcome2 /> } />
          <Route exact path='/welcome3' element={ <Welcome3 /> } />
        </Routes>
      </Router>   
    </>
  );
}

export default App;
