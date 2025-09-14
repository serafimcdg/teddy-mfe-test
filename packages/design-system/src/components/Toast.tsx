import React from 'react';
import erradoIcon from '../icons/errado.png';
import corretoIcon from '../icons/correto.png';
import { ToastProps } from '../types/toast';

const Toast: React.FC<ToastProps> = ({ type, message, visible, onClose }) => {
  if (!visible) return null;

  const icon = type === 'success' ? corretoIcon : erradoIcon;
  const bgColor = 'rgba(0,0,0,0.25)';
  const modalBg = 'rgba(0,0,0,0.85)';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: bgColor,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 1,
    }}>
      <div style={{
        background: modalBg,
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        padding: '32px 48px',
        minWidth: 340,
        color: '#fff',
        fontWeight: 500,
        fontSize: 20,
        gap: 22,
      }}>
        <img src={icon} alt={type} style={{ width: 40, height: 40 }} />
        <span style={{ flex: 1 }}>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              cursor: 'pointer',
              marginLeft: 18,
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export { Toast };
export default Toast;
