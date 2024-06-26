import { useEffect, useState } from 'react';
import hidePassword from '../assets/hide-password.svg';
import showPasswordImg from '../assets/show-password.svg';
import { InitialErroData, InitialFormData } from '../utils/InitialFromData';
import { validateForm } from '../utils/validateInput';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(InitialFormData);
    const [errorForm, setFormError] = useState(InitialErroData);
    const [validUser, setValidUser] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const token= localStorage.getItem('token');
        if(token){
            navigate('/dashboard');
        }
    },[navigate]);

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const handleChangeFromData = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (errorForm[e.target.name]) {
            setFormError((prev) => ({
                ...prev,
                [e.target.name]: false,
            }));
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await fetch('/api/auth/login', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        localStorage.setItem('token', data.token);
                        navigate('/dashboard');
                        setValidUser(true);
                    } else {
                        setValidUser(false);
                    }
                } else {
                    setValidUser(false);
                }

            } catch (err) {
                console.log('Fetch error:', err);
                setValidUser(false);
            }

            setFormData(InitialFormData);
            setFormError(InitialErroData);
        } else {
            setFormError(formErrors);
        }
    };

    return (
        <form className="mx-auto flex flex-col item px-4 mt-24 sm:mt-2 gap-6 sm:gap-2 sm:w-[27vw] sm:px-8 sm:shadow-2xl sm:bg-white sm:rounded-lg sm:py-12" onSubmit={handleFormSubmit}>
            <h1 className="text-xl text-gray-600 sm:text-gray-700 py-4 sm:py-2 sm:text-center">Login to get Started</h1>
            <div className="flex flex-col gap-5 sm:gap-4">
                <div className="flex flex-col relative mb-4">
                    <label className={errorForm.email ? "text-red-400 sm:mb-[3px]" : "text-gray-500 sm:mb-[3px]"}>Email</label>
                    <input type="email" name='email' value={formData.email} className={`${errorForm.email ? 'border-red-400' : 'border-gray-400'} border text-gray-600 rounded-lg py-3 px-3 outline-none text-md sm:text-gray-700`} onChange={handleChangeFromData} />
                    <span className={`${errorForm.email ? '' : "hidden"} absolute top-[73px] text-left text-sm pt-1 text-red-400`}>Email is required</span>
                </div>
                <div className="flex flex-col relative">
                    <label className={errorForm.email ? "text-red-400 sm:mb-[3px]" : "text-gray-500 sm:mb-[3px]"}>Password</label>
                    <input type={showPassword ? `text` : 'password'} name='password' value={formData.password} className={`${errorForm.password ? 'border-red-400' : 'border-gray-400'} border text-gray-700 outline-none rounded-lg py-3 px-3`} onChange={handleChangeFromData} />
                    <span className={`${errorForm.password ? '' : "hidden"} absolute top-[75px] text-left text-sm text-red-400`}>Password is required</span>
                    <span className="mt-1 sm:mt-[3px] absolute right-0 top-[75px] text-right text-sm text-blue-600 cursor-pointer sm:text-sm">Forgot Password?</span>
                    {
                        showPassword ? <img src={showPasswordImg} onClick={handleShowPassword} alt="hide" className='absolute right-3 bottom-4 cursor-pointer' /> :
                            <img src={hidePassword} onClick={handleShowPassword} alt="hide" className='absolute right-3 bottom-4 cursor-pointer' />
                    }
                </div>
                <div className="mb-4 relative">
                    {
                        !validUser && (
                            <span className="absolute left-0 top-6 text-sm text-red-500 sm:top-40 sm:left-28">Invalid credentials</span>
                        )
                    }
                </div>
                <button type='submit' style={{ backgroundColor: '#306ce6' }} className="bg-blue-400 text-white rounded-3xl py-2 sm:py-[6px] mt-10 w-full sm:w-fit sm:px-16 sm:text-center self-center sm:mt-4">Login</button>
            </div>
        </form>
    )
}

export default LoginForm;
