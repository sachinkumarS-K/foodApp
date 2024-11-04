import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import validate from '../utils/validate';
import axios from 'axios';
import Spinner from "../components/Loader/Spinner.jsx"
const SignIn = () => {

    const navigate = useNavigate()
     const { user, setUser,onChangeHandler , baseUrl ,loder,setLoader } = useContext(UserContext)
     const [formData, setFormData] = useState({
          email: "",
          password: ""
     });


     async function SignInUser() {
         setLoader(true);
        try {
            const res = await axios.post(`${baseUrl}users/login`, { userName: formData.userName, email: formData.email, password: formData.password });

            setUser((pre) => {
                return {
                    ...pre,
                    name: res.data.data.userName,
                    img: res.data.data.img,
                    id: res.data.data.id
                }
            })

            localStorage.setItem("token", res.data.data.refreshToken);
            localStorage.setItem("name", res.data.data.userName)
            localStorage.setItem("id", res.data.data._id)
            localStorage.setItem("img" , res.data.data.img)

            navigate("/browse")

        }catch (error) {
            console.error("There was an error logging in:", error);
         }
         setLoader(!loder);
    }

     async function submitHandler(event) {
    event.preventDefault();

         const res = validate( formData.email, formData.password, "signup");

         if (res) return

         SignInUser();


    }

    if (loder) {
        return <Spinner/>
    }

  return (
      <div>

          <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto lg:py-10">

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" onChange={(e) => onChangeHandler(e,setFormData)} name="email" value={formData.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:tracking-wide " placeholder="userName@gmail.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" value={formData.password} name="password" id="password" onChange={(e) => onChangeHandler(e,setFormData)} placeholder="•••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                          </div>
                      </div>
                      <p  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                  </div>
                  <button type="submit" className="w-full text-black border  bg-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center ">Sign in</button>
                  <p className="text-sm font-medium text-gray-500 ">
                      Don’t have an account yet? <NavLink to={"/signUp"} className="font-medium text-primary-600 hover:underline 0">Sign up</NavLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default SignIn
