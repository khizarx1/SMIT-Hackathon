import React from 'react'
import Routes from './pages/Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <Routes />
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName={({ type }) => {
                    let base = 'custom-toast';
                    if (type === 'success') return `${base} success-toast`;
                    if (type === 'error') return `${base} error-toast`;
                    if (type === 'info') return `${base} info-toast`;
                    return base;
                }}
            />
        </>
    )
}

export default App