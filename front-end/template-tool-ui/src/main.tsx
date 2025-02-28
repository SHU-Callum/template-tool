import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './context/notification/NotificationProvider'
import { worker } from './mocks/node.ts'

async function configureMocking() {
  const mockAPIs: boolean = import.meta.env.VITE_MOCK_API  === 'true'
if (mockAPIs) {
  console.log('Starting the mock service worker')
  worker.start()
}
else {
  console.log('Mock API is disabled')
}
}

configureMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </React.StrictMode>
  )
})

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
