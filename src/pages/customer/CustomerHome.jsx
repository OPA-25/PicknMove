

// import { useEffect, useState } from "react";
// import CustomerNavbar from "../../components/CustomerNavbar";

// function CustomerHome() {

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   return (
//     <>
//       <CustomerNavbar />

//       <div style={{ padding: "20px" }}>
//         <h2>Welcome {user?.name} 🚛</h2>
//         <p>Mobile: {user?.mobile}</p>
//         <p>You can book vehicles for transport and shifting.</p>
//       </div>
//     </>
//   );
// }

// export default CustomerHome;



// import { useEffect, useState } from "react";
// import CustomerNavbar from "../../components/CustomerNavbar";
// import styles from "./CustomerHome.module.css";

// function CustomerHome() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   return (
//     <div className={styles.CustomerHome}>
//       <CustomerNavbar />
      
//       <div className={styles.container}>
//         {/* Welcome Section */}
//         <div className={styles.welcomeSection}>
//           <div className={styles.welcomeCard}>
//             <h1 className={styles.welcomeTitle}>
//               Hello, <span className={styles.userName}>{user?.name || "Customer"}</span>
//             </h1>
//             <div className={styles.userDetails}>
//               <div className={styles.detailItem}>
//                 📱 {user?.mobile || "N/A"}
//               </div>
//             </div>
//             <p className={styles.welcomeText}>
//               Book vehicles for transport and shifting with ease.
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className={styles.actionsSection}>
//           <div className={styles.actionGrid}>
//             <button className={styles.actionButton}>
//               🚚 Book Vehicle
//             </button>
//             <button className={styles.actionButton}>
//               📋 My Bookings
//             </button>
//           </div>
//         </div>

//         {/* Info Cards */}
//         <div className={styles.infoSection}>
//           <div className={styles.infoGrid}>
//             <div className={styles.infoCard}>
//               <div className={styles.cardIcon}>📍</div>
//               <h3>Live Tracking</h3>
//               <p>Track your vehicle in real-time</p>
//             </div>
//             <div className={styles.infoCard}>
//               <div className={styles.cardIcon}>💰</div>
//               <h3>Transparent Fare</h3>
//               <p>No hidden charges</p>
//             </div>
//             <div className={styles.infoCard}>
//               <div className={styles.cardIcon}>⭐</div>
//               <h3>Verified Drivers</h3>
//               <p>Safe & reliable service</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerHome;





import { useEffect, useState } from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import styles from "./CustomerHome.module.css";


function CustomerHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className={styles.CustomerHome}>
      <CustomerNavbar />
      
      <div className={styles.container}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeCard}>
            <h1 className={styles.welcomeTitle}>
              Hello, <span className={styles.userName}>{user?.name || "Customer"}</span>
            </h1>
            <div className={styles.userDetails}>
              <div className={styles.detailItem}>
                📱 {user?.mobile || "N/A"}
              </div>
              <div className={styles.detailItem}>
                ✅ Verified Account
              </div>
            </div>
            <p className={styles.welcomeText}>
              Your reliable partner for logistics. Book vehicles for transport, shifting, and freight with real-time tracking.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsSection}>
          <div className={styles.actionGrid}>
            <button className={styles.actionButton}>
              🚚 Book Vehicle
            </button>
            <button className={styles.actionButton}>
              📋 My Bookings
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📍</div>
              <h3>Live Tracking</h3>
              <p>Monitor your cargo's journey in real-time with GPS integration.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>💰</div>
              <h3>Transparent Fare</h3>
              <p>Instant pricing with zero hidden costs or surprise surcharges.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>⭐</div>
              <h3>Verified Drivers</h3>
              <p>Background-checked professionals ensuring safe delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;