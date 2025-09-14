import React, { useEffect, useState } from 'react';
import spinner from '../../icons/spinner.png';
import { LoaderSpinnerProps } from '../../types/loaderSpinner';

export default function LoaderSpinner({ visible = true, timeout }: LoaderSpinnerProps) {
  const [show, setShow] = useState(visible);
  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => setShow(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);
  useEffect(() => {
    setShow(visible);
  }, [visible]);
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.25)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 1,
    }}>
      <img
        src={spinner}
        alt="Carregando..."
        style={{
          width: 64,
          height: 64,
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
