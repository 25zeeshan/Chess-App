import {BrowserRouter as Router,Routes,Route} from'react-router-dom';
import Controller from './components/Controller/Controller';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';

import "./App.css";

function App() {
  return (
    <div id="app">
      <Router basename={window.location.pathname || ''}>
        <Routes>
          <Route path='/' element={<Controller/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/SignUp' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
