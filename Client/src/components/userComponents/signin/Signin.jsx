import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
const Signin = () => {
  const [credentials,setCredentials]=useState({email:"",password:""});
  const handleSubmit=()=>{

  }

  const onChange=()=>{

  }
  return (
    <div className='mt-10'>
      
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-100 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            type="email"
            value={credentials.email}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            type="password"
            value={credentials.password}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p className='text-sm'>
            Create an account:{" "}
            <Link to={"/signup"} className="text-blue-500">
              Signup here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signin
