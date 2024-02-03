import Analysis from './page/Analysis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Analysis />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
