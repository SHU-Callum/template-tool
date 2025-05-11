import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NotificationProvider } from './context/notification/NotificationProvider'
import { worker } from './mocks/node.ts'
import { DataProvider } from './context/data/dataProvider.tsx'
import Loading from './components/Loading.tsx'
import { AuthProvider } from './context/auth/AuthProvider.tsx'

  const App = lazy(() => import('./App.tsx'))

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
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <Suspense fallback={<Loading/>}>
              <App />
            </Suspense>
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </React.StrictMode>
  )
})

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
