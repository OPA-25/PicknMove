







// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";
// import { useNavigate } from "react-router-dom";

// function DriverHome() {

//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const goToAddVehicle = () => {
//     navigate("/add-vehicle");
//   };

//   return (
//     <div>

//       <DriverNavbar />

//       <div style={{ padding: "30px" }}>

//         <h2>Welcome {user?.name} 🚗</h2>
//         <p>Mobile: {user?.mobile}</p>
//         <p>You are successfully logged in as DRIVER.</p>

//         <hr />

//         <h3>Driver Vehicle Management</h3>

//         <button 
//           onClick={goToAddVehicle}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Add Vehicle 🚚
//         </button>

//       </div>

//     </div>
//   );
// }

// export default DriverHome;


// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";
// import { useNavigate } from "react-router-dom";
// import styles from "./DriverHome.module.css";

// function DriverHome() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const goToAddVehicle = () => {
//     navigate("/add-vehicle");
//   };

//   return (
//     <div className={styles.DriverHome}>
//       <DriverNavbar />
      
//       <div className={styles.container}>
//         {/* Welcome Section */}
//         <div className={styles.welcomeSection}>
//           <div className={styles.welcomeCard}>
//             <div className={styles.welcomeHeader}>
//               <div className={styles.welcomeIcon}></div>
//               <h1 className={styles.welcomeTitle}>
//                 Welcome, <span className={styles.userName}>{user?.name || "Driver"}</span>
//               </h1>
//             </div>
            
//             <div className={styles.userInfo}>
//               <div className={styles.infoRow}>
//                 <span className={styles.infoLabel}>📱</span>
//                 <span className={styles.infoValue}>{user?.mobile || "N/A"}</span>
//               </div>
//               <div className={styles.statusBadge}>DRIVER</div>
//             </div>
            
//             <p className={styles.welcomeText}>
//               Manage your vehicles and accept ride requests.
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className={styles.actionsSection}>
//           <div className={styles.actionCard}>
//             <div className={styles.actionIcon}>🚚</div>
//             <h3 className={styles.actionTitle}>Vehicle Management</h3>
//             <p className={styles.actionText}>Add, edit, and manage your transport vehicles</p>
//             <button 
//               onClick={goToAddVehicle}
//               className={styles.primaryButton}
//             >
//               Add Vehicle
//             </button>
//           </div>
          
//           <div className={styles.actionGrid}>
//             <div className={styles.quickAction}>
//               <div className={styles.quickIcon}>📋</div>
//               <span>Dashboard</span>
//             </div>
//             <div className={styles.quickAction}>
//               <div className={styles.quickIcon}>💰</div>
//               <span>Earnings</span>
//             </div>
//             <div className={styles.quickAction}>
//               <div className={styles.quickIcon}>⭐</div>
//               <span>Ratings</span>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className={styles.statsSection}>
//           <div className={styles.statsGrid}>
//             <div className={styles.statCard}>
//               <div className={styles.statNumber}>0</div>
//               <div className={styles.statLabel}>Active Rides</div>
//             </div>
//             <div className={styles.statCard}>
//               <div className={styles.statNumber}>₹0</div>
//               <div className={styles.statLabel}>Today's Earnings</div>
//             </div>
//             <div className={styles.statCard}>
//               <div className={styles.statNumber}>4.8</div>
//               <div className={styles.statLabel}>Rating</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DriverHome;









import { useEffect, useState } from "react";
import DriverNavbar from "../../components/DriverNavbar";
import { useNavigate } from "react-router-dom";
import styles from "./DriverHome.module.css";

function DriverHome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const goToAddVehicle = () => {
    navigate("/add-vehicle");
  };

  return (
    <div className={styles.DriverHome}>
      <DriverNavbar />
      
      <div className={styles.container}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeHeader}>
              <div className={styles.welcomeIcon}></div>
              <h1 className={styles.welcomeTitle}>
                Welcome, <span className={styles.userName}>{user?.name || "Driver"}</span>
              </h1>
            </div>
            
            <div className={styles.userInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>📱</span>
                <span className={styles.infoValue}>{user?.mobile || "N/A"}</span>
              </div>
              <div className={styles.statusBadge}>DRIVER</div>
            </div>
            
            <p className={styles.welcomeText}>
              Manage your vehicles and accept ride requests.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsSection}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>🚚</div>
            <h3 className={styles.actionTitle}>Vehicle Management</h3>
            <p className={styles.actionText}>Add, edit, and manage your transport vehicles</p>
            <button 
              onClick={goToAddVehicle}
              className={styles.primaryButton}
            >
              Add Vehicle
            </button>
          </div>
          
          <div className={styles.actionGrid}>
            <div className={styles.quickAction}>
              <div className={styles.quickIcon}>📋</div>
              <span>Dashboard</span>
            </div>
            <div className={styles.quickAction}>
              <div className={styles.quickIcon}>💰</div>
              <span>Earnings</span>
            </div>
            <div className={styles.quickAction}>
              <div className={styles.quickIcon}>⭐</div>
              <span>Ratings</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Active Rides</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>₹0</div>
              <div className={styles.statLabel}>Today's Earnings</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>4.8</div>
              <div className={styles.statLabel}>Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverHome;