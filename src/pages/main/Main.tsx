import React, { useState } from 'react';
import { Mail, Shield, AlertTriangle } from 'lucide-react';
import { emailBranches } from '../../api/axios';
import type { MailApi, MailApiResult } from '../../types/api';

const EmailBreachChecker: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [breaches, setBreaches] = useState<MailApi>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await emailBranches(emailInput);
      setBreaches(data);
    } catch (err) {
      setError('No se pudieron obtener los resultados. Por favor, intenta de nuevo.');
      setBreaches(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">Inicio</a>
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">API</a>
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">Documentos</a>
              <a href="#" className="text-gray-600 hover:text-red-600 font-medium">Soporte</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verifica si tu email ha sido comprometido
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre si tu dirección de correo electrónico ha aparecido en brechas de seguridad o bases de datos filtradas
          </p>
        </div>

        {/* Main Analysis Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verificar Email
            </h3>
            <p className="text-gray-600">
              Ingresa tu dirección de correo para verificar su estado de seguridad
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={!emailInput.trim() || !isValidEmail(emailInput)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verificar Email
            </button>
          </div>

          {emailInput && !isValidEmail(emailInput) && (
            <p className="mt-2 text-sm text-red-600">
              Por favor, ingresa una dirección de correo válida
            </p>
          )}

          {isLoading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Verificando brechas de seguridad...</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {breaches && breaches.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h4 className="text-xl font-semibold text-red-600 mb-4">
                Se encontraron {breaches.length} brechas de seguridad
              </h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Servicio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datos Afectados
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cuentas Afectadas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {breaches.map((breach: MailApiResult) => (
                    <tr key={breach.Name}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {breach.LogoPath && (
                            <img
                              className="h-10 w-10 rounded-full mr-3"
                              src={breach.LogoPath}
                              alt={`Logo de ${breach.Name}`}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{breach.Name}</div>
                            <div className="text-sm text-gray-500">{breach.Domain}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(breach.BreachDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {breach.DataClasses.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {breach.PwnCount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {breaches && breaches.length === 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-600">¡Buenas noticias! No se encontraron brechas de seguridad para este correo.</p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Tu privacidad está protegida</h4>
                <p className="text-sm text-blue-700">
                  No almacenamos las direcciones de correo que verificas. La búsqueda se realiza de forma segura y anónima.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ¿Qué verificamos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Brechas de datos</h4>
              <p className="text-gray-600 text-sm">
                Verificamos si tu email aparece en brechas de seguridad conocidas
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bases de datos filtradas</h4>
              <p className="text-gray-600 text-sm">
                Buscamos tu email en bases de datos comprometidas públicamente
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Historial de seguridad</h4>
              <p className="text-gray-600 text-sm">
                Revisamos el historial de exposición de tu dirección de correo
              </p>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Consejos de seguridad
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Si tu email fue comprometido:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Cambia inmediatamente las contraseñas de todas tus cuentas
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Activa la autenticación de dos factores donde sea posible
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Revisa tus cuentas bancarias y tarjetas de crédito
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Considera usar un gestor de contraseñas
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Prevención:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Usa contraseñas únicas para cada servicio
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Mantén tus aplicaciones y navegador actualizados
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Sé cauteloso con los enlaces y archivos adjuntos
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Verifica regularmente la seguridad de tus cuentas
                </li>
              </ul>
            </div>
          </div>
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
            <p>&copy; 2024 BreachGuard. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailBreachChecker;