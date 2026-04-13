// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     role: "CUSTOMER"
//   });

//   const handleChange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:9090/api/auth/register", user);

//       alert("User Registered Successfully");

//       // ✅ Redirect to login page
//       navigate("/login");

//     } catch (error) {
//       console.error(error);
//       alert("Registration Failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />

//         {/* <input
//           name="phone"
//           placeholder="Phone"
//           onChange={handleChange}
//           required
//         /> */}

//         <input
//   name="mobile"
//   placeholder="Mobile"
//   onChange={handleChange}
//   required
// />

//         <select
//           name="role"
//           value={user.role}
//           onChange={handleChange}
//         >
//           <option value="CUSTOMER">Customer</option>
//           <option value="DRIVER">Driver</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/api/auth/register", user);

      alert("User Registered Successfully");

      // ✅ Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay"></div>

      <div className="register-container">
        <div className="register-left">
          <div className="register-badge">PicknMove</div>

          <h1 className="register-title">
            Create your logistics account
          </h1>

          <p className="register-subtitle">
            Join the platform to manage bookings, coordinate deliveries, and
            access real-time transportation operations from one place.
          </p>

          <div className="register-highlights">
            <div className="register-highlight-card">
              <span className="register-highlight-number">Fast</span>
              <span className="register-highlight-text">Simple onboarding for new users</span>
            </div>

            <div className="register-highlight-card">
              <span className="register-highlight-number">Live</span>
              <span className="register-highlight-text">Connected shipment and driver workflow</span>
            </div>

            <div className="register-highlight-card">
              <span className="register-highlight-number">Role</span>
              <span className="register-highlight-text">Customer and driver access support</span>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="register-card">
            <div className="register-card-header">
              <h2>Register</h2>
              <p>Fill in your details to create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
              /> */}

              <div className="register-input-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-group">
                <label htmlFor="role">Select Role</label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="DRIVER">Driver</option>
                </select>
              </div>

              <button type="submit" className="register-btn">
                Register
              </button>
            </form>

            <p
              className="register-login-text"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;