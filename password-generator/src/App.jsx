import { useEffect, useState, useCallback, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllow, setIsNumberAllow] = useState(false);
  const [isSpecialCharAllow, setIsSpecialCharAllow] = useState(false);
  const [password, setPassword] = useState();
  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllow, isSpecialCharAllow])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (isNumberAllow) str += '0123456789';
    if (isSpecialCharAllow) str += '@_&'
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [isNumberAllow, isSpecialCharAllow, length])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="card">
      <div className="card-body">
        <div className="input-group mb-3">
          <input type="text" className="form-control" aria-label="pasword" defaultValue={password} aria-describedby="button-addon2" ref={passwordRef} />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={copyPassword}>Copy</button>
        </div>
        <label for="customRange3" className="form-label">Length : {length}</label>
        <input type="range" className="form-range" min="6" max="100" id="customRange3" onChange={(e) => { setLength(e.target.value) }} />
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="number" onClick={() => { setIsNumberAllow(prevValue => !prevValue) }} />
          <label className="form-check-label" for="inlineCheckbox1">Number</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="characters" onClick={() => { setIsSpecialCharAllow(prevValue => !prevValue) }} />
          <label className="form-check-label" for="inlineCheckbox2">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
