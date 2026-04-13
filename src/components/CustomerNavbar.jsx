


// // import { Link, useNavigate } from "react-router-dom";
// // import styles from "./CustomerNavbar.css";

// // function CustomerNavbar() {

// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/login");
// //   };

// //   return (
// //     <nav style={{
// //       display: "flex",
// //       justifyContent: "space-between",
// //       alignItems: "center",
// //       padding: "10px 20px",
// //       backgroundColor: "#1976d2",
// //       color: "white"
// //     }}>
// //       <h3 style={{ margin: 0 }}>🚛 PicknMove</h3>

// //       <div>

// //         <Link
// //           to="/customer/home"
// //           style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
// //         >
// //           Home
// //         </Link>

// //         <Link
// //           to="/customer/booking"
// //           style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
// //         >
// //           Book Vehicle
// //         </Link>

// //         <Link
// //           to="/customer/customerdashboard"
// //           style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
// //         >
// //           My Bookings
// //         </Link>

// //         <button
// //           onClick={handleLogout}
// //           style={{
// //             background: "white",
// //             color: "#1976d2",
// //             border: "none",
// //             padding: "6px 12px",
// //             cursor: "pointer",
// //             borderRadius: "4px"
// //           }}
// //         >
// //           Logout
// //         </button>

// //       </div>
// //     </nav>
// //   );
// // }

// // export default CustomerNavbar;



// import { Link, useNavigate } from "react-router-dom";
// import styles from "./CustomerNavbar.module.css"; // ".module.css"

// function CustomerNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className={styles.CustomerNavbar}>
//       <h3 className={styles.CustomerNavbar__logo}>🚛 PicknMove</h3>

//       <div className={styles.CustomerNavbar__links}>
//         <Link
//           to="/customer/home"
//           className={styles.CustomerNavbar__link}
//         >
//           Home
//         </Link>
//         <Link
//           to="/customer/booking"
//           className={styles.CustomerNavbar__link}
//         >
//           Book Vehicle
//         </Link>
//         <Link
//           to="/customer/customerdashboard"
//           className={styles.CustomerNavbar__link}
//         >
//           My Bookings
//         </Link>
//         <button
//           onClick={handleLogout}
//           className={styles.CustomerNavbar__logoutBtn}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default CustomerNavbar;







import { Link, useNavigate } from "react-router-dom";
import styles from "./CustomerNavbar.module.css"; 

function CustomerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className={styles.CustomerNavbar}>
      <h3 className={styles.CustomerNavbar__logo}>🚛 PicknMove</h3>

      <div className={styles.CustomerNavbar__links}>
        <Link
          to="/customer/home"
          className={styles.CustomerNavbar__link}
        >
          Home
        </Link>
        <Link
          to="/customer/booking"
          className={styles.CustomerNavbar__link}
        >
          Book Vehicle
        </Link>
        <Link
          to="/customer/customerdashboard"
          className={styles.CustomerNavbar__link}
        >
          My Bookings
        </Link>
        <button
          onClick={handleLogout}
          className={styles.CustomerNavbar__logoutBtn}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default CustomerNavbar;