




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await axios.post(
//         "http://localhost:9090/api/auth/login",
//         formData
//       );

//       const token = response.data.token;
//       const role = response.data.role;

//       // Save token + role
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       console.log("Token stored:", token);
//       console.log("Role stored:", role);

//       // ✅ Fetch logged in user details
//       const userResponse = await axios.get(
//         "http://localhost:9090/api/auth/me",
//         {
//           headers: {
//             Authorization: "Bearer " + token
//           }
//         }
//       );

//       // ✅ DEBUG: Check backend response
//       console.log("User API response:", userResponse.data);

//       // Save full user object
//       localStorage.setItem("user", JSON.stringify(userResponse.data));

//       // ✅ DEBUG: Check what is stored in localStorage
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       console.log("User saved in localStorage:", storedUser);

//       if (!storedUser || !storedUser.id) {
//         console.log("WARNING: Driver ID missing from backend response");
//       } else {
//         console.log("Driver ID found:", storedUser.id);
//       }

//       // Redirect based on role
//       if (role === "CUSTOMER") {
//         navigate("/customer/home");
//       } else if (role === "DRIVER") {
//         navigate("/driver/home");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Invalid Email or Password");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>

//       <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
//         Create Account
//       </p>
//     </div>
//   );
// }

// export default Login;




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        formData
      );

      const token = response.data.token;
      const role = response.data.role;

      // Save token + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      console.log("Token stored:", token);
      console.log("Role stored:", role);

      // ✅ Fetch logged in user details
      const userResponse = await axios.get(
        "http://localhost:9090/api/auth/me",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      // ✅ DEBUG: Check backend response
      console.log("User API response:", userResponse.data);

      // Save full user object
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      // ✅ DEBUG: Check what is stored in localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("User saved in localStorage:", storedUser);

      if (!storedUser || !storedUser.id) {
        console.log("WARNING: Driver ID missing from backend response");
      } else {
        console.log("Driver ID found:", storedUser.id);
      }

      // Redirect based on role
      if (role === "CUSTOMER") {
        navigate("/customer/home");
      } else if (role === "DRIVER") {
        navigate("/driver/home");
      }

    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-container">
        <div className="login-left">
          <div className="brand-badge">PicknMove</div>

          <h1 className="login-title">
            Smart freight movement starts here
          </h1>

          <p className="login-subtitle">
            Track shipments, manage deliveries, and connect customers with drivers
            through one secure logistics dashboard.
          </p>

          <div className="login-highlights">
            <div className="highlight-card">
              <span className="highlight-number">24/7</span>
              <span className="highlight-text">Shipment visibility</span>
            </div>

            <div className="highlight-card">
              <span className="highlight-number">Fast</span>
              <span className="highlight-text">Driver and customer access</span>
            </div>

            <div className="highlight-card">
              <span className="highlight-number">Secure</span>
              <span className="highlight-text">Role-based authentication</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <div className="login-card-header">
              <h2>Login</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            <p
              onClick={() => navigate("/register")}
              className="register-text"
            >
              Create Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;