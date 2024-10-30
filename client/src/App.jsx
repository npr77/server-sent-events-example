import { useState } from 'react'
import EventLog from './EventLog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EventLog />
    </>
  )
}

export default App
