// apps/clients/src/main.tsx (app local — opcional para rodar sozinho)
import React from 'react'
import ReactDOM from 'react-dom/client'
import RemoteApp from './RemoteApp'
import '@teddy/design-system/design-system.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<RemoteApp />)
