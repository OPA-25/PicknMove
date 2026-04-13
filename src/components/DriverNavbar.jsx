// import { useNavigate } from "react-router-dom";

// function DriverNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <div style={styles.navbar}>
//       <h3 style={{ margin: 0 }}>Driver Panel</h3>

//       <div>
//         <button style={styles.button} onClick={() => navigate("/driver/home")}>
//           Home
//         </button>
//         <button style={styles.button} onClick={() => navigate("/driver/driverdashboard")}>
//           Booking
//         </button>
//         <button style={styles.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 30px",
//     backgroundColor: "#222",
//     color: "#fff"
//   },
//   button: {
//     marginRight: "10px",
//     padding: "8px 15px",
//     cursor: "pointer"
//   },
//   logoutButton: {
//     padding: "8px 15px",
//     cursor: "pointer",
//     backgroundColor: "red",
//     color: "white",
//     border: "none"
//   }
// };

// export default DriverNavbar;



// import { useNavigate } from "react-router-dom";
// import styles from "./DriverNavbar.module.css"; // <-- import this

// function DriverNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <div className={styles.DriverNavbar}>
//       <h3 className={styles.DriverNavbar__title}>Driver Panel</h3>

//       <div className={styles.DriverNavbar__buttons}>
//         <button
//           className={styles.DriverNavbar__button}
//           onClick={() => navigate("/driver/home")}
//         >
//           Home
//         </button>
//         <button
//           className={styles.DriverNavbar__button}
//           onClick={() => navigate("/driver/driverdashboard")}
//         >
//           Booking
//         </button>
//         <button
//           className={styles.DriverNavbar__logoutBtn}
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DriverNavbar;



import { useNavigate } from "react-router-dom";
import styles from "./DriverNavbar.module.css"; 

function DriverNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.DriverNavbar}>
      <h3 className={styles.DriverNavbar__title}>Driver Panel</h3>

      <div className={styles.DriverNavbar__buttons}>
        <button
          className={styles.DriverNavbar__button}
          onClick={() => navigate("/driver/home")}
        >
          Home
        </button>
        <button
          className={styles.DriverNavbar__button}
          onClick={() => navigate("/driver/driverdashboard")}
        >
          Booking
        </button>
        <button
          className={styles.DriverNavbar__logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DriverNavbar;