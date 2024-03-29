import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from './components/Landing'; 
import Leaderboard from './components/Leaderboard';
import Search from './components/Search';
import Audio from './components/performance/Audio';
import Video from './components/performance/Video';
import Score from './components/score/Score';
import Account from "./components/Account"; 
import Footer from "./components/Footer"; 
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./components/Settings";
import AudioVideo from "./components/performance/AudioVideo"; 
// import RedirectA from './components/RedirectA';
// import RedirectAV from "./components/RedirectAV"; 

function fetchAPI() {
  axios.get('http://localhost:8080/hello')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error fetching data:', error));
}

class App extends React.Component {
  componentDidMount() {
    fetchAPI();
  }

  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/search" element={<Search />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/score" element={<Score />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/video" element={<Video />} />
              <Route path="/audio-video" element={<AudioVideo />} />


            </Route>

          </Routes>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;

