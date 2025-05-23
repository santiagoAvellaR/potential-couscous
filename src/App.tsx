import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import MicrosoftLogin from './pages/MicrosoftLogin';
import GoogleLogin from './pages/GoogleLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/microsoft-login" element={<MicrosoftLogin />} />
        <Route path="/google-login" element={<GoogleLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
