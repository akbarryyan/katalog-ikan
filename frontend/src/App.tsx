import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ fontFamily: 'Hanken Grotesk', fontWeight: 700 }}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p style={{ fontFamily: 'Hanken Grotesk', fontWeight: 400 }}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" style={{ fontFamily: 'Hanken Grotesk', fontWeight: 300 }}>
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ fontFamily: 'Hanken Grotesk', fontWeight: 600, marginBottom: '10px' }}>
          Font Demo - Hanken Grotesk
        </h2>
        <p style={{ fontFamily: 'Hanken Grotesk', fontWeight: 100 }}>Light weight (100) - This is Hanken Grotesk font</p>
        <p style={{ fontFamily: 'Hanken Grotesk', fontWeight: 400 }}>Regular weight (400) - This is Hanken Grotesk font</p>
        <p style={{ fontFamily: 'Hanken Grotesk', fontWeight: 600 }}>Semi-bold weight (600) - This is Hanken Grotesk font</p>
        <p style={{ fontFamily: 'Hanken Grotesk', fontWeight: 900 }}>Black weight (900) - This is Hanken Grotesk font</p>
      </div>
    </>
  )
}

export default App
