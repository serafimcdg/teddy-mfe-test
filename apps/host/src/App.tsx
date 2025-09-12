import React, { Suspense } from 'react'
import './index.css'
// @ts-ignore
const CustomersRoot = React.lazy(() => import('clients/CustomersRoot'))
// @ts-ignore
import { Button, Card } from '@teddy/design-system'

function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="font-bold text-xl">teddy open finance</div>
    </header>
  )
}

export default function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      Teste host
        TESTE JOAO
        teste 2
      <footer className="py-10 text-center text-sm text-gray-500">
        <Button variant="secondary">Ação do Host</Button>
      </footer>
    </div>
  )
}
