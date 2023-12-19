import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from './components/Landing'; 
import Account from './components/Account';
import Leaderboard from './components/Leaderboard';
import Search from './components/Search';
import Performance from './components/Performance';
import Score from './components/Score';

function App() {

  return (
    <>
     <Router>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/account" element={<Account />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/songsearch" element={<Search/>} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/score" element={<Score />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
      </Router>
    </>
     
  )
}

export default App; 
