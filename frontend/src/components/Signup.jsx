import React, { useContext, useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import validate from '../utils/validate';
const Signup = () => {
    const navigate = useNavigate();
    const {onChangeHandler,baseUrl} = useContext(UserContext)

    const [formData, setFormData] = useState({
          userName: "",
          email: "",
          password: ""
    });

    async function SignUpUser() {
        try {
            const res = await axios.post(`${baseUrl}users/register`, { userName: formData.userName, email: formData.email, password: formData.password });

            localStorage.setItem("token", res.data.data.refreshToken);
            localStorage.setItem("name", res.data.data.userName)
            localStorage.setItem("id", res.data.data._id)
            localStorage.setItem("img" , res.data.data.img)

            navigate("/browse")
        }catch (error) {
            console.error("There was an error logging in:", error);
         }
    }

     async function submitHandler(event) {
        event.preventDefault();

         const res = validate(formData.userName, formData.email, formData.password, "signup");

         if (res) return

         SignUpUser();


}

  return (
    <div>
        <section >
  <div className="flex flex-col items-center justify-center px-6 py-12 md:my-14 mx-auto lg:py-0">

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" autoComplete='on' onSubmit={submitHandler} >
                 <div>
                      <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your Full Name</label>
                      <input type="text" onChange={(e) => onChangeHandler(e,setFormData)} name="userName" id="userName" placeholder="Name..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" onChange={(e) => onChangeHandler(e,setFormData)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="userName@gmail.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" onChange={(e) => onChangeHandler(e,setFormData)} name="password" id="password" placeholder="••••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                  </div>

                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm ">
                        <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <p className="font-medium inline-block ">Terms and Conditions</p></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-black border  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                  <p className="text-sm pt-0   font-medium  text-gray-500 ">
                      Already have an account? <NavLink className="px-3" to={"/signIn"} >Login here</NavLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Signup
