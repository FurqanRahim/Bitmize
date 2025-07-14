import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const Authpage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)
    
    return (
        <>
            {isLoginForm ? <LoginForm/> : <RegisterForm/>}
        </>
    )
}

export default Authpage