import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import MicrosoftLogin from './pages/microsoft-login/MicrosoftLogin';
import GoogleLogin from './pages/google-login/GoogleLogin';

export default function App() {
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
