import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
type LoginProps = {
  onEnter?: (name: string) => void;
};

export default function Login({ onEnter }: Readonly<LoginProps>) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleEnter = () => {
    if (name.trim() && onEnter) {
      onEnter(name);
      sessionStorage.setItem('userName', name);
      navigate('/clientes');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1
          className="font-sans font-normal text-[36px] leading-[100%] tracking-[0] text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            letterSpacing: '0',
            opacity: 1,
            fontSize: '36px',
          }}
        >
          Olá, seja bem-vindo!
        </h1>
        <input
          className="border border-zinc-300 rounded-[4px] px-4 py-2 font-sans font-normal text-[20px] bg-white"
          style={{
            width: '521px',
            height: '60px',
            borderRadius: '4px',
            opacity: 1,
          }}
          placeholder="Digite o seu nome:"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="font-sans font-bold text-[24px] leading-[100%] tracking-[0] bg-[#EC6724] text-white rounded-[4px]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontStyle: 'bold',
            letterSpacing: '0',
            width: '521px',
            height: '60px',
            borderRadius: '4px',
            opacity: 1,
          }}
          onClick={handleEnter}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
