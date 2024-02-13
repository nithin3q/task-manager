import React, { useEffect,useState } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const [seconds, setSeconds ] = useState(3);
    useEffect(() => {
      const interval= setInterval(()=>{
        setSeconds((prevseconds) =>prevseconds-1
        )
      },1000)
       return ()=>clearInterval(interval)
    },[])
    
    useEffect(() => {
        localStorage.removeItem("auth");
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, []);

  return (
    <div className='logout-main'>
    <h1>Logout Successful!</h1>
    <p>You will be redirected to the landing page in {seconds} {seconds === 1 ? 'second' : 'seconds'}...</p>
  </div>
  )
}

export default Logout
