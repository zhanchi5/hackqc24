/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */
import {AiOutlineMail} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {ChangeEvent, useEffect, useState} from "react";
// import {login} from "../redux/Actions/authActions";
import {useNavigate} from "react-router-dom";

const Login = () =>
{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  // const {my_profile, error} = useSelector(state => state.authReducer)
  // const [credentialError, setCredentialError] = useState('');
  const [formData, setFormData] = useState({username: "", password: ""});
  const {username, password} = formData
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = (e: { preventDefault: () => void; }) =>
  {
    e.preventDefault()
    // dispatch(login(username, password))
  }
  useEffect(() =>
  {
    // if(error !== null)
    // {
    //   setCredentialError("Your credentials are incrrect")
    // }
    if(token)
    {
      navigate("/")
    }
  }, [dispatch,]);

  return(
      <section className=" py-20">
        <div className="container px-12 py-12 w-full h-full ">
          <div className="flex justify-center items-center flex-wrap h-full  text-gray-800">
            <div className="w-6/12">
              <a href="/">
                <img

                    // src="/rent.png"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="Phone image"
                />
              </a>
            </div>
            <div className="w-3/12">
              <form onSubmit={onSubmit}>
                {/*-- Email input --*/}
                <div className="mb-6">
                  <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Utilisateur"
                      value={username}
                      required={true}
                      onChange={e=>onChange(e)}
                      id="username" name="username"
                  />
                </div>

                {/*Password input */}
                <div className="mb-6">
                  <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="mot de passe"
                      value={password}
                      minLength={6}
                      name="password"
                      required={true}
                      onChange={e =>onChange(e)}
                  />
                </div>
                {/*{error && <b className="flex text-red-500 text-center mb-2 mt-0">{credentialError}</b>}*/}

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                  </div>
                  <a  href="#" className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Mot de passe oublié?</a>

                </div>
                {/*signup button*/}
                <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-teal-600 text-white font-medium text-sm leading-snug uppercase rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light">Sign In</button>

                <div  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>
                <a
                    className="px-7 py-3  mb-3 bg-gray-100 font-normal text-sm leading-snug uppercase rounded-xl shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                    href="/register"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                >
                  <AiOutlineMail className="mr-3" size={20}/>
                  Nous joindre
                </a>

              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
export default Login


//
// import './css/login.css'
// import { Link } from 'react-router-dom'
//
// function Login()
// {
//   return (
//       <header style={HeaderStyle}>
//         <div className="text-center m-5-auto">
//           <h2>Sign in to us</h2>
//           <form action="/home" style={LoginFormStyle}>
//             <p>
//               <label>Username or email address</label><br/>
//               <input type="text" name="first_name" required/>
//             </p>
//             <p>
//               <label>Password</label>
//               <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
//               <br/>
//               <input type="password" name="password" required/>
//             </p>
//             <p>
//               <button id="sub_btn" type="submit">Login</button>
//             </p>
//           </form>
//           <footer>
//             <p>First time? <Link to="/register">Create an account</Link>.</p>
//             <p><Link to="/">Back to Homepage</Link>.</p>
//           </footer>
//         </div>
//       </header>
//   )
// }
//
// const HeaderStyle = {
//   width: "100%",
//   height: "100vh",
//   margin: 0,
//   padding: 0,
//   background: `url(/bg1.jpg")`,
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   backgroundAttachment: "fixed"
// }
//
// const LoginFormStyle = {
//   backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust the alpha (fourth) value for transparency
//   padding: '20px',
//   borderRadius: '10px', // Optional: add border radius for a nicer look
// };
//
// export default Login