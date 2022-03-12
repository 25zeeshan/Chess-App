import {BrowserRouter as Router,Routes,Route,Link} from'react-router-dom';

import Chessboard from './components/Chessboard/Chessboard';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path='/' element={<Chessboard/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/SignUp' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
