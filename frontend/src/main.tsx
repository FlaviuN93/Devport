import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import { ErrorDisplay } from './components/UI/ErrorDisplay.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={ErrorDisplay} onReset={() => window.location.reload()}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
)
