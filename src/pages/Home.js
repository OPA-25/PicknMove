// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {

//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!storedUser) {
//       navigate("/");
//     } else {
//       setUser(storedUser);
//     }
//   }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Welcome to PicknMove</h2>

//       {user && (
//         <>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Role: {user.role}</p>
//         </>
//       )}

//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

// export default Home;


//-------------------------------------------------

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Welcome to PicknMove</h2>

//       <p>You are logged in successfully.</p>

//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }

// export default Home;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

function Home() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Fetch logged-in user
    axios.get("/api/auth/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });

  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome to PicknMove</h2>

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;