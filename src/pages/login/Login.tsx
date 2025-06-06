import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; //

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log('Iniciando sesión con Google');
    navigate('/google-login');
    // Aquí se integraría con Google OAuth
  };

  const handleMicrosoftLogin = () => {
    console.log('Iniciando sesión con Microsoft');
    navigate('/microsoft-login');
    // Aquí se integraría con Microsoft OAuth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BreachGuard</h1>
                <p className="text-sm text-gray-500">Verificación de brechas de datos</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/breach-guard" className="text-gray-600 hover:text-red-600 font-medium">Inicio</a>
              <a href="/password-check" className="text-gray-600 hover:text-red-600 font-medium">Contraseñas</a>
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">API</a>
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">Soporte</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-1 py-13 min-h-[300px]">
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-red-600 p-3 rounded-full w-16 h-16 mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600">
              Accede a tu cuenta de BreachGuard
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </button>

            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#f25022" d="M1 1h10v10H1z"/>
                <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                <path fill="#7fba00" d="M1 13h10v10H1z"/>
                <path fill="#ffb900" d="M13 13h10v10H13z"/>
              </svg>
              Continuar con Microsoft
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Conexión segura</h4>
                <p className="text-sm text-blue-700">
                  Tu información está protegida con cifrado de extremo a extremo y autenticación de dos factores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Al iniciar sesión, aceptas nuestros{' '}
            <a href="#" className="text-red-600 hover:text-red-700">Términos de Servicio</a>
            {' '}y{' '}
            <a href="#" className="text-red-600 hover:text-red-700">Política de Privacidad</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">BreachGuard</span>
              </div>
              <p className="text-gray-400">
                Protegiendo tu identidad digital mediante verificación de brechas de datos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Verificación de email</a></li>
                <li><a href="#" className="hover:text-white">API de brechas</a></li>
                <li><a href="#" className="hover:text-white">Monitoreo continuo</a></li>
                <li><a href="#" className="hover:text-white">Alertas de seguridad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Guías de seguridad</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white">Base de conocimientos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Acerca de</a></li>
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BreachGuard. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;