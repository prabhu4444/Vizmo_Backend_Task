import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-row justify-between">
        <h3>Vizmo backend task</h3>
        <div>
        <p>login </p>
        <p>register</p>
        </div>
      </div>
      <div className="flex flex-row ">
        <img src="" alt="" />
        <div>
        <h2></h2>
        <p></p>
        </div>
      </div>
      <div className="flex flex-row ">
        <img src="" alt="" />
        <div>
        <h2></h2>
        <p></p>
        </div>
      </div>
      <div className="flex flex-row ">
        <img src="" alt="" />
        <div>
        <h2></h2>
        <p></p>
        </div>
      </div>

    </>
  )
}

export default App
