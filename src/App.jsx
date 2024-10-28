import { useState } from 'react'
import './App.css'
import Froms from './Components/Forms'
import Desh from './Components/Desh'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Froms /> */}
      <Desh />
    </>
  )
}

export default App
