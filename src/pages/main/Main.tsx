import React, { useState, useRef } from 'react';
import { Upload, Search, FileText, Shield, Globe, Users, Activity } from 'lucide-react';

export default function VirusTotalClone(){
  const [activeTab, setActiveTab] = useState<'file' | 'url' | 'search'>('file');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      alert(`Archivo ${selectedFile.name} listo para análisis (demo)`);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      alert(`URL ${urlInput} lista para análisis (demo)`);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      alert(`Buscando: ${searchInput} (demo)`);
    }
  };

  const stats = [
    { icon: FileText, label: 'Archivos analizados', value: '8,234,567,123' },
    { icon: Globe, label: 'URLs analizadas', value: '4,567,890,234' },
    { icon: Users, label: 'Usuarios registrados', value: '567,890' },
    { icon: Activity, label: 'Análisis hoy', value: '1,234,567' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VirusAnalyzer</h1>
                <p className="text-sm text-gray-500">Análisis de malware y seguridad</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Inicio</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Búsqueda</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">API</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Documentos</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Analiza archivos y URLs sospechosas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Detecta malware, virus y amenazas con más de 70 motores antivirus y 
            herramientas de análisis de URLs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('file')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'file'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Upload className="w-5 h-5 inline-block mr-2" />
              Archivo
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Globe className="w-5 h-5 inline-block mr-2" />
              URL
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Search className="w-5 h-5 inline-block mr-2" />
              Buscar
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <div>
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Arrastra y suelta un archivo aquí
                </h3>
                <p className="text-gray-600 mb-6">
                  o haz clic para seleccionar un archivo
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Seleccionar archivo
                </button>
                {selectedFile && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Archivo seleccionado:</p>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={handleFileUpload}
                      className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Analizar archivo
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Tamaño máximo: 650MB • Formatos soportados: Todos los tipos de archivo
              </div>
            </div>
          )}

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div>
              <div className="text-center mb-8">
                <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analizar URL
                </h3>
                <p className="text-gray-600">
                  Ingresa una URL para verificar si es maliciosa
                </p>
              </div>
              <div className="flex space-x-4">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://ejemplo.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleUrlSubmit}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Analizar
                </button>
              </div>
            </div>
          )}

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div>
              <div className="text-center mb-8">
                <Search className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Buscar análisis previos
                </h3>
                <p className="text-gray-600">
                  Busca por hash, nombre de archivo o URL
                </p>
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="MD5, SHA1, SHA256, nombre de archivo o URL"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Buscar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Características principales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">70+ Motores antivirus</h4>
              <p className="text-gray-600 text-sm">
                Análisis completo con múltiples motores de detección
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Análisis en tiempo real</h4>
              <p className="text-gray-600 text-sm">
                Resultados instantáneos y actualizados constantemente
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">API disponible</h4>
              <p className="text-gray-600 text-sm">
                Integra nuestro servicio en tus aplicaciones
              </p>
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
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">VirusAnalyzer</span>
              </div>
              <p className="text-gray-400">
                Protegiendo el mundo digital con análisis avanzado de malware.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Análisis de archivos</a></li>
                <li><a href="#" className="hover:text-white">Análisis de URLs</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Premium</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentación</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Soporte</a></li>
                <li><a href="#" className="hover:text-white">Comunidad</a></li>
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
            <p>&copy; 2024 VirusAnalyzer. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};