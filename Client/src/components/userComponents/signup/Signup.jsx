import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


const Signup = () => {
  const navigate=useNavigate();
  const [apiData, setApiData] = useState({});
  const [alert, setAlert] = useState({ message: "", status: "" });
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contact: "",
    lat: null,
    lon: null,
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await res.json();
      console.log(response)
      setAlert({ message: response.message, status: response.success?"success":"error" });
      // if(response.success){
      //   navigate("/")
      // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getLocation = async () => {
      const success = async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=c36f43855b7a475f81728aff6c6be569`
          );
          const response = await res.json();
          setApiData(response.features[0].properties);
        
          setCredentials((prev) => ({ ...prev, lat, lon }));
        } catch (e) {
          setAlert({ message:"Failed to get your current location !", status: "error" });
          console.error(e);
        }
      };

      const failed = () => {
        setAlert({ message:"Failed to get your current location !", status: "error" });
        console.error("Geolocation failed");
      };

      navigator.geolocation.getCurrentPosition(success, failed);
    };

    getLocation();
  }, []);

  useEffect(() => {
    setCredentials((prev) => ({
      ...prev,
      address: apiData.address_line1 || "",
      city: apiData.city || "",
      state: apiData.state || "",
      pincode: Number(apiData.postcode) || "",
    }));
  }, [apiData]);

  
  return (
    <div className="mt-10">
       <Snackbar
        open={Boolean(alert.message)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={()=>setAlert({ message: "", status: "" })}
        className="w-1/2 mx-auto my-4"
      >
        <Alert variant="filled" severity={alert.status}>
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="grid  bg-neutral-100 mx-auto w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md"
      >
        <div className="mb-4 col-span-12">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            name="username"
            onChange={onChange}
            placeholder="Enter your username"
            type="text"
            value={credentials.username}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 col-span-12">
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

        <div className="mb-4 col-span-12">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            name="address"
            onChange={onChange}
            placeholder="Enter your address"
            type="text"
            value={credentials.address}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 col-span-6">
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            State
          </label>
          <input
            name="state"
            onChange={onChange}
            placeholder="Enter your state"
            type="text"
            value={credentials.state}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 col-span-6">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            name="city"
            onChange={onChange}
            placeholder="Enter your city"
            type="text"
            value={credentials.city}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 col-span-6">
          <label
            htmlFor="pincode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Pincode
          </label>
          <input
            name="pincode"
            onChange={onChange}
            placeholder="Enter your pincode"
            type="number"
            value={credentials.pincode}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 col-span-6">
          <label
            htmlFor="contact"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contact
          </label>
          <input
            name="contact"
            onChange={onChange}
            placeholder="Enter your contact"
            type="number"
            value={credentials.contact}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 col-span-12">
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

        <div className="flex flex-col items-center justify-between col-span-12">
          <button
            type="submit"
            className="bg-black text-white text-sm hover:bg-neutral-700 font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p className="text-sm">
            Already have an account:{" "}
            <Link to={"/signin"} className="text-blue-500">
              SignIn here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
