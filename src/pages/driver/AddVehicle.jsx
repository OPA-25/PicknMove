






// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";

// function AddVehicle() {

//   const [user, setUser] = useState(null);

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [vehicleCategory, setVehicleCategory] = useState("");
//   const [payloadCapacity, setPayloadCapacity] = useState("");
//   const [vehicleImage, setVehicleImage] = useState("");
//   const [licenseImage, setLicenseImage] = useState("");

//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {

//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       console.log("No user found in localStorage");
//       return;
//     }

//     const parsedUser = JSON.parse(storedUser);

//     console.log("Logged in driver:", parsedUser);

//     if (parsedUser && parsedUser.id) {
//       setUser(parsedUser);
//       fetchVehicles(parsedUser.id);
//     } else {
//       console.log("Driver ID missing in localStorage");
//     }

//   }, []);

//   // ============================
//   // Fetch Vehicles
//   // ============================
//   const fetchVehicles = async (driverId) => {

//     if (!driverId) {
//       console.log("Driver ID not found");
//       return;
//     }

//     try {

//       const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);

//       if (!response.ok) {
//         console.log("Failed to fetch vehicles");
//         return;
//       }

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setVehicles(data);
//       } else {
//         setVehicles([]);
//       }

//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }

//   };

//   // ============================
//   // Add Vehicle
//   // ============================
//   const addVehicle = async () => {

//     if (!user || !user.id) {
//       alert("Driver not logged in properly");
//       console.log("User object:", user);
//       return;
//     }

//     if (
//       vehicleNumber === "" ||
//       licenseNumber === "" ||
//       vehicleCategory === "" ||
//       payloadCapacity === ""
//     ) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage
//     };

//     console.log("Sending vehicle data:", payload);
//     console.log("Driver ID:", user.id);

//     try {

//       const response = await fetch(
//         `http://localhost:9090/api/drivers/${user.id}/vehicle`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {

//         alert("Vehicle Added Successfully 🚚");

//         setVehicleNumber("");
//         setLicenseNumber("");
//         setVehicleCategory("");
//         setPayloadCapacity("");
//         setVehicleImage("");
//         setLicenseImage("");

//         fetchVehicles(user.id);

//       } else {

//         const errorText = await response.text();
//         console.log("Server error:", errorText);
//         alert("Vehicle could not be added");

//       }

//     } catch (error) {

//       console.error("Add vehicle error:", error);
//       alert("Server error while adding vehicle");

//     }

//   };

//   return (
//     <div>

//       <DriverNavbar />

//       <div style={{ padding: "30px" }}>

//         <h2>Add Vehicle</h2>

//         <input
//           placeholder="Vehicle Number"
//           value={vehicleNumber}
//           onChange={(e) => setVehicleNumber(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="License Number"
//           value={licenseNumber}
//           onChange={(e) => setLicenseNumber(e.target.value)}
//         />

//         <br /><br />

//         <select
//           value={vehicleCategory}
//           onChange={(e) => setVehicleCategory(e.target.value)}
//         >
//           <option value="">Select Vehicle Category</option>
//           <option>3-Wheeler 500kg</option>
//           <option>4-Wheeler EV 1200kg</option>
//           <option>4-Wheeler 1500kg</option>
//           <option>Mini Truck 2 Ton</option>
//           <option>Truck 4 Ton</option>
//         </select>

//         <br /><br />

//         <input
//           placeholder="Payload Capacity"
//           value={payloadCapacity}
//           onChange={(e) => setPayloadCapacity(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="Vehicle Image URL"
//           value={vehicleImage}
//           onChange={(e) => setVehicleImage(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="License Image URL"
//           value={licenseImage}
//           onChange={(e) => setLicenseImage(e.target.value)}
//         />

//         <br /><br />

//         <button onClick={addVehicle}>
//           Submit Vehicle
//         </button>

//         <hr />

//         <h2>Your Added Vehicles</h2>

//         {vehicles.length === 0 ? (
//           <p>No vehicle added yet</p>
//         ) : (
//           vehicles.map((v) => (
//             <div
//               key={v.id}
//               style={{
//                 border: "1px solid gray",
//                 padding: "15px",
//                 marginBottom: "10px"
//               }}
//             >

//               <p><b>Vehicle Number:</b> {v.vehicleNumber}</p>
//               <p><b>Category:</b> {v.vehicleCategory}</p>
//               <p><b>Payload:</b> {v.payloadCapacity}</p>
//               <p><b>License:</b> {v.licenseNumber}</p>

//               {v.vehicleImage && (
//                 <img
//                   src={v.vehicleImage}
//                   alt="vehicle"
//                   width="120"
//                 />
//               )}

//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   );
// }

// export default AddVehicle;


















// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";

// function AddVehicle() {

//   const [user, setUser] = useState(null);

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [vehicleCategory, setVehicleCategory] = useState("");
//   const [payloadCapacity, setPayloadCapacity] = useState("");
//   const [vehicleImage, setVehicleImage] = useState("");
//   const [licenseImage, setLicenseImage] = useState("");

//   const [vehicles, setVehicles] = useState([]);

//   // NEW STATE FOR EDIT
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {

//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       console.log("No user found in localStorage");
//       return;
//     }

//     const parsedUser = JSON.parse(storedUser);

//     if (parsedUser && parsedUser.id) {
//       setUser(parsedUser);
//       fetchVehicles(parsedUser.id);
//     }

//   }, []);

//   // ============================
//   // Fetch Vehicles
//   // ============================
//   const fetchVehicles = async (driverId) => {

//     try {

//       const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);

//       if (!response.ok) return;

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setVehicles(data);
//       }

//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }

//   };

//   // ============================
//   // ADD VEHICLE
//   // ============================
//   const addVehicle = async () => {

//     if (!user || !user.id) {
//       alert("Driver not logged in properly");
//       return;
//     }

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage
//     };

//     try {

//       const response = await fetch(
//         `http://localhost:9090/api/drivers/${user.id}/vehicle`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {

//         alert("Vehicle Added Successfully 🚚");

//         resetForm();
//         fetchVehicles(user.id);

//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };

//   // ============================
//   // UPDATE VEHICLE
//   // ============================
//   const updateVehicle = async () => {

//     if (!editingId) return;

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage
//     };

//     try {

//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${editingId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {

//         alert("Vehicle Updated Successfully ✅");

//         setEditingId(null);
//         resetForm();
//         fetchVehicles(user.id);

//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };

//   // ============================
//   // DELETE VEHICLE
//   // ============================
//   const deleteVehicle = async (id) => {

//     const confirmDelete = window.confirm("Are you sure?");

//     if (!confirmDelete) return;

//     try {

//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${id}`,
//         {
//           method: "DELETE"
//         }
//       );

//       if (response.ok) {

//         alert("Vehicle Deleted 🗑️");
//         fetchVehicles(user.id);

//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };

//   // ============================
//   // EDIT BUTTON CLICK
//   // ============================
//   const handleEdit = (vehicle) => {

//     setEditingId(vehicle.id);

//     setVehicleNumber(vehicle.vehicleNumber);
//     setLicenseNumber(vehicle.licenseNumber);
//     setVehicleCategory(vehicle.vehicleCategory);
//     setPayloadCapacity(vehicle.payloadCapacity);
//     setVehicleImage(vehicle.vehicleImage);
//     setLicenseImage(vehicle.licenseImage);

//   };

//   // ============================
//   // RESET FORM
//   // ============================
//   const resetForm = () => {

//     setVehicleNumber("");
//     setLicenseNumber("");
//     setVehicleCategory("");
//     setPayloadCapacity("");
//     setVehicleImage("");
//     setLicenseImage("");

//   };

//   return (
//     <div>

//       <DriverNavbar />

//       <div style={{ padding: "30px" }}>

//         <h2>Add Vehicle</h2>

//         <input
//           placeholder="Vehicle Number"
//           value={vehicleNumber}
//           onChange={(e) => setVehicleNumber(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="License Number"
//           value={licenseNumber}
//           onChange={(e) => setLicenseNumber(e.target.value)}
//         />

//         <br /><br />

//         <select
//           value={vehicleCategory}
//           onChange={(e) => setVehicleCategory(e.target.value)}
//         >
//           <option value="">Select Vehicle Category</option>
//           <option>3-Wheeler 500kg</option>
//           <option>4-Wheeler EV 1200kg</option>
//           <option>4-Wheeler 1500kg</option>
//           <option>Mini Truck 2 Ton</option>
//           <option>Truck 4 Ton</option>
//         </select>

//         <br /><br />

//         <input
//           placeholder="Payload Capacity"
//           value={payloadCapacity}
//           onChange={(e) => setPayloadCapacity(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="Vehicle Image URL"
//           value={vehicleImage}
//           onChange={(e) => setVehicleImage(e.target.value)}
//         />

//         <br /><br />

//         <input
//           placeholder="License Image URL"
//           value={licenseImage}
//           onChange={(e) => setLicenseImage(e.target.value)}
//         />

//         <br /><br />

//         {/* BUTTON CHANGE */}
//         {editingId ? (
//           <button onClick={updateVehicle}>
//             Update Vehicle
//           </button>
//         ) : (
//           <button onClick={addVehicle}>
//             Submit Vehicle
//           </button>
//         )}

//         <hr />

//         <h2>Your Added Vehicles</h2>

//         {vehicles.length === 0 ? (
//           <p>No vehicle added yet</p>
//         ) : (
//           vehicles.map((v) => (
//             <div
//               key={v.id}
//               style={{
//                 border: "1px solid gray",
//                 padding: "15px",
//                 marginBottom: "10px"
//               }}
//             >

//               <p><b>Vehicle Number:</b> {v.vehicleNumber}</p>
//               <p><b>Category:</b> {v.vehicleCategory}</p>
//               <p><b>Payload:</b> {v.payloadCapacity}</p>
//               <p><b>License:</b> {v.licenseNumber}</p>

//               {v.vehicleImage && (
//                 <img
//                   src={v.vehicleImage}
//                   alt="vehicle"
//                   width="120"
//                 />
//               )}

//               <br /><br />

//               <button
//                 onClick={() => handleEdit(v)}
//                 style={{ marginRight: "10px" }}
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteVehicle(v.id)}
//               >
//                 Delete
//               </button>

//             </div>
//           ))
//         )}

//       </div>

//     </div>
//   );
// }

// export default AddVehicle;








// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";
// import styles from "./AddVehicle.module.css";

// function AddVehicle() {
//   const [user, setUser] = useState(null);
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [vehicleCategory, setVehicleCategory] = useState("");
//   const [payloadCapacity, setPayloadCapacity] = useState("");
//   const [vehicleImage, setVehicleImage] = useState("");
//   const [licenseImage, setLicenseImage] = useState("");
//   const [vehicles, setVehicles] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       console.log("No user found in localStorage");
//       return;
//     }
//     const parsedUser = JSON.parse(storedUser);
//     if (parsedUser && parsedUser.id) {
//       setUser(parsedUser);
//       fetchVehicles(parsedUser.id);
//     }
//   }, []);

//   const fetchVehicles = async (driverId) => {
//     try {
//       const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);
//       if (!response.ok) return;
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setVehicles(data);
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   const addVehicle = async () => {
//     if (!user || !user.id) {
//       alert("Driver not logged in properly");
//       return;
//     }
//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage
//     };
//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/${user.id}/vehicle`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );
//       if (response.ok) {
//         alert("Vehicle Added Successfully 🚚");
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateVehicle = async () => {
//     if (!editingId) return;
//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage
//     };
//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${editingId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );
//       if (response.ok) {
//         alert("Vehicle Updated Successfully ✅");
//         setEditingId(null);
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteVehicle = async (id) => {
//     const confirmDelete = window.confirm("Are you sure?");
//     if (!confirmDelete) return;
//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${id}`,
//         {
//           method: "DELETE"
//         }
//       );
//       if (response.ok) {
//         alert("Vehicle Deleted 🗑️");
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = (vehicle) => {
//     setEditingId(vehicle.id);
//     setVehicleNumber(vehicle.vehicleNumber);
//     setLicenseNumber(vehicle.licenseNumber);
//     setVehicleCategory(vehicle.vehicleCategory);
//     setPayloadCapacity(vehicle.payloadCapacity);
//     setVehicleImage(vehicle.vehicleImage);
//     setLicenseImage(vehicle.licenseImage);
//   };

//   const resetForm = () => {
//     setVehicleNumber("");
//     setLicenseNumber("");
//     setVehicleCategory("");
//     setPayloadCapacity("");
//     setVehicleImage("");
//     setLicenseImage("");
//   };

//   return (
//     <div className={styles.AddVehiclePage}>
//       <DriverNavbar />

//       <div className={styles.mainContainer}>
//         {/* Form Section */}
//         <div className={styles.formSection}>
//           <h2 className={styles.title}>
//             {editingId ? "📝 Edit Vehicle" : "🚚 Add New Vehicle"}
//           </h2>

//           <div className={styles.formGrid}>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.inputField}
//                 placeholder="Vehicle Number (e.g. MH 12 AB 1234)"
//                 value={vehicleNumber}
//                 onChange={(e) => setVehicleNumber(e.target.value)}
//               />
//             </div>

//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.inputField}
//                 placeholder="License Number"
//                 value={licenseNumber}
//                 onChange={(e) => setLicenseNumber(e.target.value)}
//               />
//             </div>

//             <div className={styles.inputGroup}>
//               <select
//                 className={styles.selectField}
//                 value={vehicleCategory}
//                 onChange={(e) => setVehicleCategory(e.target.value)}
//               >
//                 <option value="">Select Vehicle Category</option>
//                 <option>3-Wheeler 500kg</option>
//                 <option>4-Wheeler EV 1200kg</option>
//                 <option>4-Wheeler 1500kg</option>
//                 <option>Mini Truck 2 Ton</option>
//                 <option>Truck 4 Ton</option>
//               </select>
//             </div>

//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.inputField}
//                 placeholder="Payload Capacity"
//                 value={payloadCapacity}
//                 onChange={(e) => setPayloadCapacity(e.target.value)}
//               />
//             </div>

//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.inputField}
//                 placeholder="Vehicle Image URL"
//                 value={vehicleImage}
//                 onChange={(e) => setVehicleImage(e.target.value)}
//               />
//             </div>

//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.inputField}
//                 placeholder="License Image URL"
//                 value={licenseImage}
//                 onChange={(e) => setLicenseImage(e.target.value)}
//               />
//             </div>

//             {editingId ? (
//               <button className={`${styles.submitBtn} ${styles.updateBtn}`} onClick={updateVehicle}>
//                 Update Vehicle Details
//               </button>
//             ) : (
//               <button className={styles.submitBtn} onClick={addVehicle}>
//                 Register Vehicle
//               </button>
//             )}
//           </div>
//         </div>

//         <hr style={{ opacity: 0.1, margin: "40px 0" }} />

//         {/* List Section */}
//         <h2 className={styles.listTitle}>Your Registered Vehicles</h2>

//         {vehicles.length === 0 ? (
//           <div className={styles.emptyState}>
//             <p>No vehicles found. Register your first vehicle above.</p>
//           </div>
//         ) : (
//           <div className={styles.vehicleGrid}>
//             {vehicles.map((v) => (
//               <div key={v.id} className={styles.vehicleCard}>
//                 <div className={styles.imageWrapper}>
//                   {v.vehicleImage ? (
//                     <img src={v.vehicleImage} alt="vehicle" className={styles.vehicleImg} />
//                   ) : (
//                     <span className={styles.noImage}>🚚</span>
//                   )}
//                 </div>

//                 <div className={styles.cardContent}>
//                   <p><b>Vehicle No:</b> {v.vehicleNumber}</p>
//                   <p><b>Category:</b> {v.vehicleCategory}</p>
//                   <p><b>Capacity:</b> {v.payloadCapacity}</p>
//                   <p><b>License:</b> {v.licenseNumber}</p>

//                   <div className={styles.cardActions}>
//                     <button className={styles.editBtn} onClick={() => handleEdit(v)}>
//                       Edit
//                     </button>
//                     <button className={styles.deleteBtn} onClick={() => deleteVehicle(v.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddVehicle;












// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";
// import styles from "./AddVehicle.module.css";

// function AddVehicle() {
//   const [user, setUser] = useState(null);

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [vehicleCategory, setVehicleCategory] = useState("");
//   const [payloadCapacity, setPayloadCapacity] = useState("");
//   const [vehicleImage, setVehicleImage] = useState("");
//   const [licenseImage, setLicenseImage] = useState("");

//   // ✅ NEW STATES
//   const [driverName, setDriverName] = useState("");
//   const [driverMobile, setDriverMobile] = useState("");

//   const [vehicles, setVehicles] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return;

//     const parsedUser = JSON.parse(storedUser);

//     if (parsedUser && parsedUser.id) {
//       setUser(parsedUser);

//       // ✅ AUTO SET FROM LOGIN DATA
//       setDriverName(parsedUser.name || "");
//       setDriverMobile(parsedUser.mobile || "");

//       fetchVehicles(parsedUser.id);
//     }
//   }, []);

//   const fetchVehicles = async (driverId) => {
//     try {
//       const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);
//       if (!response.ok) return;
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setVehicles(data);
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   const addVehicle = async () => {
//     if (!user || !user.id) {
//       alert("Driver not logged in properly");
//       return;
//     }

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage,
//       driverName,      // ✅ added
//       driverMobile     // ✅ added
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/${user.id}/vehicle`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Added Successfully 🚚");
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateVehicle = async () => {
//     if (!editingId) return;

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage,
//       driverName,
//       driverMobile
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${editingId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Updated Successfully ✅");
//         setEditingId(null);
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteVehicle = async (id) => {
//     const confirmDelete = window.confirm("Are you sure?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${id}`,
//         {
//           method: "DELETE"
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Deleted 🗑️");
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = (vehicle) => {
//     setEditingId(vehicle.id);
//     setVehicleNumber(vehicle.vehicleNumber);
//     setLicenseNumber(vehicle.licenseNumber);
//     setVehicleCategory(vehicle.vehicleCategory);
//     setPayloadCapacity(vehicle.payloadCapacity);
//     setVehicleImage(vehicle.vehicleImage);
//     setLicenseImage(vehicle.licenseImage);

//     // ✅ SET DRIVER DATA
//     setDriverName(vehicle.driverName || "");
//     setDriverMobile(vehicle.driverMobile || "");
//   };

//   const resetForm = () => {
//     setVehicleNumber("");
//     setLicenseNumber("");
//     setVehicleCategory("");
//     setPayloadCapacity("");
//     setVehicleImage("");
//     setLicenseImage("");
//   };

//   return (
//     <div className={styles.AddVehiclePage}>
//       <DriverNavbar />

//       <div className={styles.mainContainer}>
//         <div className={styles.formSection}>
//           <h2 className={styles.title}>
//             {editingId ? "📝 Edit Vehicle" : "🚚 Add New Vehicle"}
//           </h2>

//           <div className={styles.formGrid}>

//             {/* ✅ NEW INPUTS */}
//             <input
//               className={styles.inputField}
//               placeholder="Driver Name"
//               value={driverName}
//               onChange={(e) => setDriverName(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Driver Mobile"
//               value={driverMobile}
//               onChange={(e) => setDriverMobile(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Vehicle Number"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="License Number"
//               value={licenseNumber}
//               onChange={(e) => setLicenseNumber(e.target.value)}
//             />

//             <select
//               className={styles.selectField}
//               value={vehicleCategory}
//               onChange={(e) => setVehicleCategory(e.target.value)}
//             >
//               <option value="">Select Vehicle Category</option>
//               <option>3-Wheeler 500kg</option>
//               <option>4-Wheeler EV 1200kg</option>
//               <option>4-Wheeler 1500kg</option>
//               <option>Mini Truck 2 Ton</option>
//               <option>Truck 4 Ton</option>
//             </select>

//             <input
//               className={styles.inputField}
//               placeholder="Payload Capacity"
//               value={payloadCapacity}
//               onChange={(e) => setPayloadCapacity(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Vehicle Image URL"
//               value={vehicleImage}
//               onChange={(e) => setVehicleImage(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="License Image URL"
//               value={licenseImage}
//               onChange={(e) => setLicenseImage(e.target.value)}
//             />

//             {editingId ? (
//               <button className={`${styles.submitBtn} ${styles.updateBtn}`} onClick={updateVehicle}>
//                 Update Vehicle Details
//               </button>
//             ) : (
//               <button className={styles.submitBtn} onClick={addVehicle}>
//                 Register Vehicle
//               </button>
//             )}
//           </div>
//         </div>

//         <hr style={{ opacity: 0.1, margin: "40px 0" }} />

//         <h2 className={styles.listTitle}>Your Registered Vehicles</h2>

//         <div className={styles.vehicleGrid}>
//           {vehicles.map((v) => (
//             <div key={v.id} className={styles.vehicleCard}>
//               <div className={styles.cardContent}>
//                 <p><b>Driver:</b> {v.driverName}</p>
//                 <p><b>Mobile:</b> {v.driverMobile}</p>
//                 <p><b>Vehicle No:</b> {v.vehicleNumber}</p>
//                 <p><b>Category:</b> {v.vehicleCategory}</p>
//                 <p><b>Capacity:</b> {v.payloadCapacity}</p>
//                 <p><b>License:</b> {v.licenseNumber}</p>

//                 <button onClick={() => handleEdit(v)}>Edit</button>
//                 <button onClick={() => deleteVehicle(v.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddVehicle;











// import { useEffect, useState } from "react";
// import DriverNavbar from "../../components/DriverNavbar";
// import styles from "./AddVehicle.module.css";

// function AddVehicle() {
//   const [user, setUser] = useState(null);

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [vehicleCategory, setVehicleCategory] = useState("");
//   const [payloadCapacity, setPayloadCapacity] = useState("");
//   const [vehicleImage, setVehicleImage] = useState("");
//   const [licenseImage, setLicenseImage] = useState("");

//   const [driverName, setDriverName] = useState("");
//   const [driverMobile, setDriverMobile] = useState("");

//   const [vehicles, setVehicles] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return;

//     const parsedUser = JSON.parse(storedUser);

//     if (parsedUser && parsedUser.id) {
//       setUser(parsedUser);

//       setDriverName(parsedUser.name || "");
//       setDriverMobile(parsedUser.mobile || "");

//       fetchVehicles(parsedUser.id);
//     }
//   }, []);

//   const fetchVehicles = async (driverId) => {
//     try {
//       const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);
//       if (!response.ok) return;
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setVehicles(data);
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   const addVehicle = async () => {
//     if (!user || !user.id) {
//       alert("Driver not logged in properly");
//       return;
//     }

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage,
//       driverName,
//       driverMobile
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/${user.id}/vehicle`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Added Successfully 🚚");
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateVehicle = async () => {
//     if (!editingId) return;

//     const payload = {
//       vehicleNumber,
//       licenseNumber,
//       vehicleCategory,
//       payloadCapacity,
//       vehicleImage,
//       licenseImage,
//       driverName,
//       driverMobile
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${editingId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Updated Successfully ✅");
//         setEditingId(null);
//         resetForm();
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteVehicle = async (id) => {
//     const confirmDelete = window.confirm("Are you sure?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:9090/api/drivers/vehicle/${id}`,
//         {
//           method: "DELETE"
//         }
//       );

//       if (response.ok) {
//         alert("Vehicle Deleted 🗑️");
//         fetchVehicles(user.id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = (vehicle) => {
//     setEditingId(vehicle.id);
//     setVehicleNumber(vehicle.vehicleNumber);
//     setLicenseNumber(vehicle.licenseNumber);
//     setVehicleCategory(vehicle.vehicleCategory);
//     setPayloadCapacity(vehicle.payloadCapacity);
//     setVehicleImage(vehicle.vehicleImage);
//     setLicenseImage(vehicle.licenseImage);
//     setDriverName(vehicle.driverName || "");
//     setDriverMobile(vehicle.driverMobile || "");
//   };

//   const resetForm = () => {
//     setVehicleNumber("");
//     setLicenseNumber("");
//     setVehicleCategory("");
//     setPayloadCapacity("");
//     setVehicleImage("");
//     setLicenseImage("");
//   };

//   return (
//     <div className={styles.AddVehiclePage}>
//       <DriverNavbar />

//       <div className={styles.mainContainer}>
//         <div className={styles.formSection}>
//           <h2 className={styles.title}>
//             {editingId ? "📝 Edit Vehicle" : "🚚 Add New Vehicle"}
//           </h2>

//           <div className={styles.formGrid}>

//             <input
//               className={styles.inputField}
//               placeholder="Driver Name"
//               value={driverName}
//               onChange={(e) => setDriverName(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Driver Mobile"
//               value={driverMobile}
//               onChange={(e) => setDriverMobile(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Vehicle Number"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="License Number"
//               value={licenseNumber}
//               onChange={(e) => setLicenseNumber(e.target.value)}
//             />

//             <select
//               className={styles.selectField}
//               value={vehicleCategory}
//               onChange={(e) => setVehicleCategory(e.target.value)}
//             >
//               <option value="">Select Vehicle Category</option>
//               <option>3-Wheeler 500kg</option>
//               <option>4-Wheeler EV 1200kg</option>
//               <option>4-Wheeler 1500kg</option>
//               <option>Mini Truck 2 Ton</option>
//               <option>Truck 4 Ton</option>
//             </select>

//             <input
//               className={styles.inputField}
//               placeholder="Payload Capacity"
//               value={payloadCapacity}
//               onChange={(e) => setPayloadCapacity(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="Vehicle Image URL"
//               value={vehicleImage}
//               onChange={(e) => setVehicleImage(e.target.value)}
//             />

//             <input
//               className={styles.inputField}
//               placeholder="License Image URL"
//               value={licenseImage}
//               onChange={(e) => setLicenseImage(e.target.value)}
//             />

//             {editingId ? (
//               <button className={`${styles.submitBtn} ${styles.updateBtn}`} onClick={updateVehicle}>
//                 Update Vehicle Details
//               </button>
//             ) : (
//               <button className={styles.submitBtn} onClick={addVehicle}>
//                 Register Vehicle
//               </button>
//             )}
//           </div>
//         </div>

//         <hr style={{ opacity: 0.1, margin: "40px 0" }} />

//         <h2 className={styles.listTitle}>Your Registered Vehicles</h2>

//         {vehicles.length === 0 ? (
//           <div className={styles.emptyState}>
//             <p>No vehicles found. Register your first vehicle above.</p>
//           </div>
//         ) : (
//           <div className={styles.vehicleGrid}>
//             {vehicles.map((v) => (
//               <div key={v.id} className={styles.vehicleCard}>

//                 {/* ✅ VEHICLE IMAGE FIXED */}
//                 <div className={styles.imageWrapper}>
//                   {v.vehicleImage ? (
//                     <img
//                       src={v.vehicleImage}
//                       alt="Vehicle"
//                       className={styles.vehicleImg}
//                       onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
//                     />
//                   ) : (
//                     <span className={styles.noImage}>🚚</span>
//                   )}
//                 </div>

//                 <div className={styles.cardContent}>
//                   <p><b>Driver:</b> {v.driverName}</p>
//                   <p><b>Mobile:</b> {v.driverMobile}</p>
//                   <p><b>Vehicle No:</b> {v.vehicleNumber}</p>
//                   <p><b>Category:</b> {v.vehicleCategory}</p>
//                   <p><b>Capacity:</b> {v.payloadCapacity}</p>
//                   <p><b>License:</b> {v.licenseNumber}</p>

//                   {/* OPTIONAL LICENSE IMAGE */}
//                   {v.licenseImage && (
//                     <img
//                       src={v.licenseImage}
//                       alt="License"
//                       className={styles.licenseImg}
//                     />
//                   )}

//                   <div className={styles.cardActions}>
//                     <button className={styles.editBtn} onClick={() => handleEdit(v)}>
//                       Edit
//                     </button>
//                     <button className={styles.deleteBtn} onClick={() => deleteVehicle(v.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddVehicle;










//------------------------------final=-----------------------------------------------------

import { useEffect, useState } from "react";
import DriverNavbar from "../../components/DriverNavbar";
import styles from "./AddVehicle.module.css";

function AddVehicle() {
  const [user, setUser] = useState(null);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [payloadCapacity, setPayloadCapacity] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [licenseImage, setLicenseImage] = useState("");

  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser && parsedUser.id) {
      setUser(parsedUser);

      setDriverName(parsedUser.name || "");
      setDriverMobile(parsedUser.mobile || "");

      fetchVehicles(parsedUser.id);
    }
  }, []);

  const fetchVehicles = async (driverId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/drivers/${driverId}/vehicles`);
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data)) {
        setVehicles(data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const addVehicle = async () => {
    if (!user || !user.id) {
      alert("Driver not logged in properly");
      return;
    }

    const payload = {
      vehicleNumber,
      licenseNumber,
      vehicleCategory,
      payloadCapacity,
      vehicleImage,
      licenseImage,
      driverName,
      driverMobile
    };

    try {
      const response = await fetch(
        `http://localhost:9090/api/drivers/${user.id}/vehicle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert("Vehicle Added Successfully 🚚");
        resetForm();
        fetchVehicles(user.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehicle = async () => {
    if (!editingId) return;

    const payload = {
      vehicleNumber,
      licenseNumber,
      vehicleCategory,
      payloadCapacity,
      vehicleImage,
      licenseImage,
      driverName,
      driverMobile
    };

    try {
      const response = await fetch(
        `http://localhost:9090/api/drivers/vehicle/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert("Vehicle Updated Successfully ✅");
        setEditingId(null);
        resetForm();
        fetchVehicles(user.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:9090/api/drivers/vehicle/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        alert("Vehicle Deleted 🗑️");
        fetchVehicles(user.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setVehicleNumber(vehicle.vehicleNumber);
    setLicenseNumber(vehicle.licenseNumber);
    setVehicleCategory(vehicle.vehicleCategory);
    setPayloadCapacity(vehicle.payloadCapacity);
    setVehicleImage(vehicle.vehicleImage);
    setLicenseImage(vehicle.licenseImage);
    setDriverName(vehicle.driverName || "");
    setDriverMobile(vehicle.driverMobile || "");
  };

  const resetForm = () => {
    setVehicleNumber("");
    setLicenseNumber("");
    setVehicleCategory("");
    setPayloadCapacity("");
    setVehicleImage("");
    setLicenseImage("");
  };

  return (
    <div className={styles.AddVehiclePage}>
      <DriverNavbar />

      <div className={styles.mainContainer}>
        <div className={styles.formSection}>
          <h2 className={styles.title}>
            {editingId ? "📝 Edit Vehicle" : "🚚 Add New Vehicle"}
          </h2>

          <div className={styles.formGrid}>

            <input
              className={styles.inputField}
              placeholder="Driver Name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />

            <input
              className={styles.inputField}
              placeholder="Driver Mobile"
              value={driverMobile}
              onChange={(e) => setDriverMobile(e.target.value)}
            />

            <input
              className={styles.inputField}
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />

            <input
              className={styles.inputField}
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />

            <select
              className={styles.selectField}
              value={vehicleCategory}
              onChange={(e) => setVehicleCategory(e.target.value)}
            >
              <option value="">Select Vehicle Category</option>
              <option>3-Wheeler 500kg</option>
              <option>4-Wheeler EV 1200kg</option>
              <option>4-Wheeler 1500kg</option>
              <option>Mini Truck 2 Ton</option>
              <option>Truck 4 Ton</option>
            </select>

            <input
              className={styles.inputField}
              placeholder="Payload Capacity"
              value={payloadCapacity}
              onChange={(e) => setPayloadCapacity(e.target.value)}
            />

            <input
              className={styles.inputField}
              placeholder="Vehicle Image URL"
              value={vehicleImage}
              onChange={(e) => setVehicleImage(e.target.value)}
            />

            <input
              className={styles.inputField}
              placeholder="License Image URL"
              value={licenseImage}
              onChange={(e) => setLicenseImage(e.target.value)}
            />

            {editingId ? (
              <button className={`${styles.submitBtn} ${styles.updateBtn}`} onClick={updateVehicle}>
                Update Vehicle Details
              </button>
            ) : (
              <button className={styles.submitBtn} onClick={addVehicle}>
                Register Vehicle
              </button>
            )}
          </div>
        </div>

        <hr style={{ opacity: 0.1, margin: "40px 0" }} />

        <h2 className={styles.listTitle}>Your Registered Vehicles</h2>

        {vehicles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No vehicles found. Register your first vehicle above.</p>
          </div>
        ) : (
          <div className={styles.vehicleGrid}>
            {vehicles.map((v) => (
              <div key={v.id} className={styles.vehicleCard}>

                {/* ✅ ONLY VEHICLE IMAGE
                <div className={styles.imageWrapper}>
                  {v.vehicleImage ? (
                    <img
                      src={v.vehicleImage}
                      alt="Vehicle"
                      className={styles.vehicleImg}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                    />
                  ) : (
                    <span className={styles.noImage}>🚚</span>
                  )}
                </div> */}

                {/* ✅ ONLY VEHICLE IMAGE */}
                <div className={styles.imageWrapper}>
                  {v.vehicleImage ? (
                    <img
                      src={v.vehicleImage}
                      alt="Vehicle"
                      className={styles.vehicleImg}
                      onError={(e) => {
                        e.target.onerror = null; // 🔥 prevents infinite loop
                        e.target.src = "/truck.jpg"; // fallback image
                      }}
                    />
                  ) : (
                    <span className={styles.noImage}>🚚</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <p><b>Driver:</b> {v.driverName}</p>
                  <p><b>Mobile:</b> {v.driverMobile}</p>
                  <p><b>Vehicle No:</b> {v.vehicleNumber}</p>
                  <p><b>Category:</b> {v.vehicleCategory}</p>
                  <p><b>Capacity:</b> {v.payloadCapacity}</p>
                  <p><b>License:</b> {v.licenseNumber}</p>

                  <div className={styles.cardActions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(v)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteVehicle(v.id)}>
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddVehicle;




//------------------------------final=-----------------------------------------------------
