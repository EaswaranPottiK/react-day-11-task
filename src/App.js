import logo from './logo.svg';
import './App.css';
import { useCallback, useRef, useState } from 'react';

function App() {

  const [passLen, setPassLen] = useState(12)
  const [includeNumber,setIncludeNumber] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [password, setPassword] = useState('')

  const passRef = useRef(null)

  const genPassword = useCallback(()=>{
    
    let splChar = '!@#$%^&*()_+-+*/~'
    let number = '1234567890'

    let finalSet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM'
    if (includeNumber){
      finalSet += number
    }
    if (splChar){
      finalSet += splChar
    }

    let newPass = ''
    for (let i=0;i<passLen;i++){
      newPass += finalSet[Math.floor(Math.random()*finalSet.length)]
    }

    console.log(finalSet)
    setPassword(newPass)

  },[passLen, includeNumber, specialChar])

  function copyText(){
    if(passRef.current){
      passRef.current.select();
      document.execCommand("copy")
    }
  }

  
  return (
    <div style={{display:'flex',flexDirection:'column',width:'40%',margin:'auto',marginTop:'10%'}}>

      <div>
        <label>Password Length &nbsp;</label>
        <input type='number' value={passLen} onChange={(e)=>{setPassLen(e.target.value)}} style={{width:'35px',height:'25px'}}/>
      </div>

      <br></br>
      <div>
        <label>Include Numbers</label>
        <input type='checkbox' value={includeNumber} onChange={(e)=>{setIncludeNumber(!includeNumber)}}/>
      </div>
      
      <br></br>
      <div>
        <label>Include Special Characters</label>
        <input type='checkbox' value={specialChar} onChange={(e)=>{setSpecialChar(!specialChar)}}/>
      </div>

      <br></br>
      <button onClick={genPassword} style={{cursor:'pointer', maxWidth:'180px',paddingTop:'8px',paddingBottom:'8px',backgroundColor:'#4caf50',border:'none',borderRadius:'6px',fontSize:'16px',color:'white'}}>Generate Password</button>

      <br></br>
      {
        password && (
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <textarea value={password} readOnly ref={passRef} style={{width:'20vw',height:'5vh'}}></textarea>
            <button onClick={copyText}  style={{cursor:'pointer', maxWidth:'180px',paddingTop:'8px',paddingBottom:'8px',backgroundColor:'skyblue',border:'none',borderRadius:'6px',fontSize:'16px',color:'white'}} >Copy To Clipboard</button>
          </div>
        )
      }

    </div>
  );
}

export default App;
