import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { passwords } from '../../api/axios';
import type { PasswordApi } from '../../types/api';
import { useApiContext } from '../../context/ApiContext';
import { Link } from 'react-router-dom';

const PasswordChecker: React.FC = () => {
  const { password: savedPassword } = useApiContext();
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordCheck, setPasswordCheck] = useState<PasswordApi>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = useCallback(async (pass?: string) => {
    const passwordToCheck = pass || passwordInput;
    if (!passwordToCheck.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await passwords(passwordToCheck);
      setPasswordCheck(data);
    } catch {
      setError('No se pudieron obtener los resultados. Por favor, intenta de nuevo.');
      setPasswordCheck(null);
    } finally {
      setIsLoading(false);
    }
  }, [passwordInput]);

  useEffect(() => {
    if (savedPassword) {
      setPasswordInput(savedPassword);
      handlePasswordSubmit(savedPassword);
    }
  }, [savedPassword, handlePasswordSubmit]);

  const getScoreColor = (score: number) => {
    if (score < 2) return 'text-red-600';
    if (score < 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreText = (score: number) => {
    switch (score) {
      case 0:
        return 'Muy débil';
      case 1:
        return 'Débil';
      case 2:
        return 'Regular';
      case 3:
        return 'Fuerte';
      case 4:
        return 'Muy fuerte';
      default:
        return 'Desconocido';
    }
  };

  const getScorePercentage = (score: number) => {
    return ((score + 1) / 5) * 100;
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
                <p className="text-sm text-gray-500">Verificación de contraseñas</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/breach-guard" className="text-gray-600 hover:text-red-600 font-medium">Inicio</Link>
              <Link to="/password-check" className="text-gray-600 hover:text-red-600 font-medium">Contraseñas</Link>
              <a href="https://transacciones-nequi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 font-medium">Nequi</a>
              <a href="https://enlace-academico-escuelaing-edu-co.azurewebsites.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 font-medium">Enlace</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verifica la fortaleza de tu contraseña
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analiza si tu contraseña cumple con los estándares de seguridad recomendados y si ha aparecido en filtraciones
          </p>
        </div>

        {/* Main Analysis Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verificar Contraseña
            </h3>
            <p className="text-gray-600">
              Ingresa tu contraseña para verificar su nivel de seguridad
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <button
              onClick={() => handlePasswordSubmit()}
              disabled={!passwordInput.trim()}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verificar Contraseña
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Verificando seguridad de la contraseña...</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {passwordCheck && (
            <div className="mt-8">
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Resultado del Análisis</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Fortaleza:</span>
                  <span className={`text-sm font-medium ${getScoreColor(passwordCheck.strength.score)}`}>
                    {getScoreText(passwordCheck.strength.score)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      passwordCheck.strength.score < 2
                        ? 'bg-red-600'
                        : passwordCheck.strength.score < 4
                        ? 'bg-yellow-400'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${getScorePercentage(passwordCheck.strength.score)}%` }}
                  ></div>
                </div>
              </div>

              {passwordCheck.pwnedCount > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-red-700 font-medium">¡Contraseña comprometida!</p>
                      <p className="text-red-600">
                        Esta contraseña ha aparecido en {passwordCheck.pwnedCount.toLocaleString()} filtraciones de datos.
                        Te recomendamos cambiarla inmediatamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {passwordCheck.strength.warning && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="text-yellow-700">
                    <span className="font-medium">Advertencia: </span>
                    {passwordCheck.strength.warning}
                  </p>
                </div>
              )}

              {passwordCheck.strength.suggestions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Sugerencias de mejora:</h4>
                  <ul className="space-y-2">
                    {passwordCheck.strength.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-yellow-500 mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Tu privacidad está protegida</h4>
                <p className="text-sm text-blue-700">
                  No almacenamos las contraseñas que verificas. El análisis se realiza de forma local y segura.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Complejidad</h4>
              <p className="text-gray-600 text-sm">
                Verificamos si tu contraseña incluye una mezcla de caracteres
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Lock className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Filtraciones</h4>
              <p className="text-gray-600 text-sm">
                Comprobamos si la contraseña ha aparecido en filtraciones de datos
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fortaleza general</h4>
              <p className="text-gray-600 text-sm">
                Calculamos la fortaleza general basada en múltiples factores
              </p>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Consejos para contraseñas seguras
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Qué hacer:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Usa una combinación de letras, números y símbolos
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Crea contraseñas de al menos 12 caracteres
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Utiliza contraseñas únicas para cada servicio
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Cambia tus contraseñas regularmente
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Qué evitar:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  No uses información personal obvia
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Evita secuencias de teclado (qwerty, 123456)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  No reutilices contraseñas antiguas
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  No compartas tus contraseñas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
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
                Protegiendo tu identidad digital mediante verificación de seguridad.
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

export default PasswordChecker;
