'use client'
import React, {useState} from 'react'
import axios from 'axios'

const Auth = () => {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');


    const signUpFunc = async (e) => {
        e.preventDefault();
        try {
            console.log(username)
            console.log(password)
            const res =await axios.post('http://localhost:8081/auth/signup', {
                username: username,
                password: password
            });
            if(res.data.message === 'user already exist') {
                alert(res.data.message)
                console.log("i am failed")
            }
            else {
                
                console.log("i am failed")
            }
        } catch(err) {
            console.log("error while signup post call", err)
        }

    }
    return (
        <div>
            <div classNameName="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" className="block text-sm/6 font-medium text-gray-900">Username</label>
                            <div className="mt-2">
                                <input value={username} onChange={(e)=> setUsername(e.target.value)} type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                               <label for="email" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <input type="password" value={password}  onChange={(e)=> setPassword(e.target.value)} name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div classNameName='flex'>
                            <button type="submit" onClick={signUpFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            <button type="submit" onClick={signUpFunc} className="m-3 flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
