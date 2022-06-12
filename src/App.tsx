import { BrowserRouter as Router,Routes,Route, Navigate} from'react-router-dom';
import Controller from './components/Controller/Controller';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Setup from './components/Setup/Setup';

import "./App.css";
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Privacy from './components/Privacy/Privacy';

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Analysis" />}/>
          <Route path='/Setup' element={<Setup/>}/>
          <Route path='/Analysis' element={<Controller/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Contact' element={<Contact />} />
          <Route path='/About' element={<About/>}/>
          <Route path='/Privacy' element={<Privacy/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
