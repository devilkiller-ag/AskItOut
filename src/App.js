import Login from './Components/Login';
import Signup from './Components/Signup';
// import Welcome1 from './Components/Welcome1';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/login' element={ <Login /> } />
          <Route exact path='/signup' element={ <Signup /> } />
        </Routes>
      </Router>   
    </>
  );
}

export default App;
