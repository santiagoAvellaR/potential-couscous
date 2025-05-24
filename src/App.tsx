import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import MicrosoftLogin from './pages/microsoft-login/MicrosoftLogin';
import GoogleLogin from './pages/google-login/GoogleLogin';
import Password from './pages/password/Password';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/breach-guard" element={<Main />} />
        <Route path="/microsoft-login" element={<MicrosoftLogin />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/password-check" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}
