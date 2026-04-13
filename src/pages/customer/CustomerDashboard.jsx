// //-------------------final-----------------------


// // src/pages/customer/CustomerDashboard.jsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { Link, useNavigate } from "react-router-dom";
// import CustomerNavbar from "../../components/CustomerNavbar";
// import styles from "../../components/CustomerNavbar.module.css";
// import "./CustomerDashboard.css";

// function CustomerDashboard() {
//   const [pickup, setPickup] = useState("");
//   const [drop, setDrop] = useState("");
//   const [pickupCoords, setPickupCoords] = useState(null);
//   const [dropCoords, setDropCoords] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [distanceKm, setDistanceKm] = useState(0);
//   const [vehicleType, setVehicleType] = useState("3 Wheeler Cargo");
//   const [helpers, setHelpers] = useState(0);
//   const [estimatedFare, setEstimatedFare] = useState(0);
//   const [bookingId, setBookingId] = useState(null);
//   const [driverPosition, setDriverPosition] = useState(null);
//   const [driverETA, setDriverETA] = useState(0);
//   const [rideStatus, setRideStatus] = useState("IDLE");
//   const [showDropLocation, setShowDropLocation] = useState(false);
//   const [wsConnected, setWsConnected] = useState(false);

//   // 🔥 USER DETAILS (Usually from Auth Context/LocalStorage)
//   const [customerName, setCustomerName] = useState("John Doe");
//   const [customerPhone, setCustomerPhone] = useState("+91 9876543210");

//   // 🔥 PAYMENT STATES
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [driverDetails, setDriverDetails] = useState(null);

//   // 🔥 NEW: ASSIGNED DRIVER DETAILS ON ACCEPT
//   const [assignedDriverDetails, setAssignedDriverDetails] = useState(null);

//   // WebSocket refs
//   const stompClient = useRef(null);
//   const subscriptionsRef = useRef(new Map());
//   const cgCenter = [21.2514, 81.6296];

//   const vehicleRates = {
//     "3 Wheeler Cargo": 15,
//     "EV 4 Wheeler": 18,
//     "4 Wheeler": 20,
//     "Mini Truck": 25,
//     "Small Truck": 35
//   };

//   const helperChargePerPerson = 200;

//   // Icons
//   const pickupIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     iconSize: [35, 35],
//   });

//   const dropIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
//     iconSize: [35, 35],
//   });

//   const driverIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
//     iconSize: [40, 40],
//   });

//   // 🔥 LOAD CUSTOMER DETAILS FROM LOCAL STORAGE / LOGIN DATA
//   useEffect(() => {
//     try {
//       const storedUser =
//         JSON.parse(localStorage.getItem("user")) ||
//         JSON.parse(localStorage.getItem("customer")) ||
//         JSON.parse(localStorage.getItem("currentUser"));

//       if (storedUser) {
//         setCustomerName(
//           storedUser.name ||
//             storedUser.customerName ||
//             storedUser.fullName ||
//             "John Doe"
//         );
//         setCustomerPhone(
//           storedUser.phone ||
//             storedUser.mobile ||
//             storedUser.customerPhone ||
//             "+91 9876543210"
//         );
//       }
//     } catch (error) {
//       console.log("User data not found in localStorage, using fallback values");
//     }
//   }, []);

//   // ================= WEBSOCKET SETUP =================
//   useEffect(() => {
//     console.log("🔌 Customer WebSocket connecting...");

//     const socket = new SockJS("http://localhost:9090/ws");
//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 3000,
//       heartbeatIncoming: 10000,
//       heartbeatOutgoing: 10000,
//       debug: (str) => console.log("[WS DEBUG]", str),
//       onConnect: () => {
//         console.log("✅ Customer WebSocket CONNECTED");
//         setWsConnected(true);
//       },
//       onDisconnect: () => {
//         console.log("🔌 Customer WebSocket DISCONNECTED");
//         setWsConnected(false);
//       },
//       onStompError: (frame) => {
//         console.error("❌ STOMP ERROR:", frame.headers["message"]);
//         setWsConnected(false);
//       }
//     });

//     stompClient.current = client;
//     client.activate();

//     return () => {
//       console.log("🔌 Customer WebSocket cleanup");
//       if (stompClient.current) {
//         subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
//         subscriptionsRef.current.clear();
//         stompClient.current.deactivate();
//       }
//     };
//   }, []);

//   // 🔥 UPDATED: CREATE BOOKING (Sending Name and Mobile to Backend)
//   const createBooking = async () => {
//     if (!pickupCoords || !dropCoords || distanceKm === 0) {
//       alert("Please calculate route first!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:9090/api/bookings",
//         {
//           customerId: 1,
//           customerName: customerName,
//           customerPhone: customerPhone,
//           pickupLocation: pickup,
//           dropLocation: drop,
//           pickupLat: pickupCoords[0],
//           pickupLng: pickupCoords[1],
//           dropLat: dropCoords[0],
//           dropLng: dropCoords[1],
//           distance: distanceKm,
//           vehicleType,
//           helpersRequested: helpers,
//           totalAmount: parseFloat(estimatedFare),
//           status: "CREATED"
//         },
//         {
//           headers: { "Content-Type": "application/json" }
//         }
//       );

//       console.log("✅ Booking created:", res.data);
//       const newBookingId = res.data.id;
//       setBookingId(newBookingId);
//       setRideStatus("WAITING");
//       setAssignedDriverDetails(null);

//       if (stompClient.current?.connected) {
//         subscribeToBooking(newBookingId);
//       }

//       alert(`✅ Booking #${newBookingId} created! Waiting for driver...`);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed: " + (error.response?.data || error.message));
//     }
//   };

//   const subscribeToBooking = useCallback((bookingId) => {
//     console.log(`🔥 IMMEDIATELY SUBSCRIBING to booking ${bookingId}`);

//     subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
//     subscriptionsRef.current.clear();

//     const statusSub = stompClient.current.subscribe(
//       `/topic/ride-status/${bookingId}`,
//       (message) => {
//         try {
//           const data = JSON.parse(message.body);
//           console.log("📩 Customer received ride status:", data);

//           setRideStatus(data.status || "WAITING");

//           if (data.status === "ACCEPTED") {
//             setDriverETA(data.eta || 5);

//             if (data.driverDetails) {
//               setAssignedDriverDetails(data.driverDetails);
//             }

//             alert(
//               `🚚 Driver accepted! ETA: ${data.eta || 5} min${
//                 data.driverDetails?.name
//                   ? `\n👨‍✈️ Driver: ${data.driverDetails.name}`
//                   : ""
//               }${
//                 data.driverDetails?.phone
//                   ? `\n📱 Phone: ${data.driverDetails.phone}`
//                   : ""
//               }`
//             );
//           } else if (data.status === "PICKED_UP") {
//             setShowDropLocation(true);
//             alert("✅ Goods picked up!");
//           } else if (data.status === "COMPLETED") {
//             alert("🎉 Ride completed! Please make payment to complete the trip.");
//             setDriverDetails(data.driverDetails);
//             setShowPaymentModal(true);
//           }
//         } catch (error) {
//           console.error("❌ Status parse error:", error);
//         }
//       }
//     );

//     const locationSub = stompClient.current.subscribe(
//       `/topic/driver-location/${bookingId}`,
//       (message) => {
//         try {
//           const data = JSON.parse(message.body);
//           setDriverPosition([data.lat, data.lng]);
//         } catch (error) {
//           console.error("❌ Location parse error:", error);
//         }
//       }
//     );

//     subscriptionsRef.current.set("status", statusSub);
//     subscriptionsRef.current.set("location", locationSub);
//   }, []);

//   useEffect(() => {
//     if (
//       bookingId &&
//       stompClient.current?.connected &&
//       subscriptionsRef.current.size === 0
//     ) {
//       subscribeToBooking(bookingId);
//     }
//   }, [bookingId, subscribeToBooking]);

//   // ================= PAYMENT FUNCTIONS =================
//   const handlePaymentMethodChange = (method) => {
//     setSelectedPaymentMethod(method);
//     setPaymentStatus("");
//   };

//   const processCashPayment = async () => {
//     try {
//       setPaymentStatus("processing");
//       await axios.post(`http://localhost:9090/api/payments/${bookingId}/cash`, {
//         bookingId,
//         amount: estimatedFare,
//         paymentMethod: "CASH",
//         status: "PAID"
//       });
//       setPaymentStatus("completed");
//       setRideStatus("IDLE");
//       setBookingId(null);
//       setDriverPosition(null);
//       setAssignedDriverDetails(null);
//       setShowPaymentModal(false);
//       alert("✅ Cash payment confirmed! Thank you for using PicknMove! 🚚");
//     } catch (error) {
//       setPaymentStatus("failed");
//       alert("Payment processing failed. Please try again.");
//     }
//   };

//   const processUpiPayment = async () => {
//     if (!upiId) {
//       alert("Please enter UPI ID");
//       return;
//     }
//     try {
//       setPaymentStatus("processing");
//       await axios.post(`http://localhost:9090/api/payments/${bookingId}/upi`, {
//         bookingId,
//         amount: estimatedFare,
//         paymentMethod: "UPI",
//         upiId,
//         status: "PAID"
//       });
//       setPaymentStatus("completed");
//       setRideStatus("IDLE");
//       setBookingId(null);
//       setDriverPosition(null);
//       setAssignedDriverDetails(null);
//       setShowPaymentModal(false);
//       alert("✅ UPI payment successful! Thank you for using PicknMove! 🚚");
//     } catch (error) {
//       setPaymentStatus("failed");
//       alert("UPI payment failed. Please check UPI ID and try again.");
//     }
//   };

//   const closePaymentModal = () => {
//     setShowPaymentModal(false);
//     setPaymentStatus("");
//     setUpiId("");
//     setSelectedPaymentMethod("cash");
//   };

//   // ================= HELPERS =================
//   const searchLocation = async (place) => {
//     try {
//       const res = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           place
//         )}, Chhattisgarh`
//       );
//       if (!res.data[0]) return null;
//       return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
//     } catch (error) {
//       return null;
//     }
//   };

//   const calculateRoute = async () => {
//     if (!pickup || !drop) {
//       alert("Please enter pickup and drop locations!");
//       return;
//     }
//     const pick = await searchLocation(pickup);
//     const dropPoint = await searchLocation(drop);

//     if (!pick || !dropPoint) {
//       alert("Could not find locations. Try 'Raipur' or 'Bhilai'");
//       return;
//     }

//     setPickupCoords(pick);
//     setDropCoords(dropPoint);

//     try {
//       const routeRes = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${pick[1]},${pick[0]};${dropPoint[1]},${dropPoint[0]}?overview=full&geometries=geojson`
//       );
//       const routeData = routeRes.data.routes[0];
//       const km = routeData.distance / 1000;
//       setDistanceKm(km);
//       setRoute(routeData.geometry.coordinates.map((coord) => [coord[1], coord[0]]));
//       calculateFare(km, vehicleType, helpers);
//     } catch (error) {
//       alert("Could not calculate route");
//     }
//   };

//   const calculateFare = (km, vehicle, helperCount) => {
//     const baseRate = vehicleRates[vehicle] || 15;
//     const total = km * baseRate + helperCount * helperChargePerPerson;
//     setEstimatedFare(total.toFixed(0));
//   };

//   const handleVehicleChange = (e) => {
//     const value = e.target.value;
//     setVehicleType(value);
//     if (distanceKm > 0) calculateFare(distanceKm, value, helpers);
//   };

//   const handleHelperChange = (e) => {
//     const value = parseInt(e.target.value) || 0;
//     setHelpers(value);
//     if (distanceKm > 0) calculateFare(distanceKm, vehicleType, value);
//   };

//   // ================= UI =================
//   return (
//     <div style={{ minHeight: "100vh" }} className="customer-dashboard-page">
//       <CustomerNavbar />

//       <div
//         style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
//         className="customer-dashboard-wrapper"
//       >
//         <div
//           style={{
//             background: wsConnected ? "#e8f5e8" : "#ffebee",
//             padding: "12px",
//             borderRadius: "8px",
//             marginBottom: "20px",
//             borderLeft: `5px solid ${wsConnected ? "#4CAF50" : "#f44336"}`,
//             fontFamily: "monospace"
//           }}
//           className="dashboard-live-panel"
//         >
//           <strong>🔍 LIVE STATUS:</strong>
//           WS: {wsConnected ? "🟢 CONNECTED" : "🔴 DISCONNECTED"} |
//           Booking: {bookingId || "None"} |
//           Status: <strong>{rideStatus}</strong> |
//           Driver: {driverPosition ? "📍 LIVE" : "❌ NONE"}
//         </div>

//         <h2
//           style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}
//           className="dashboard-main-title"
//         >
//           PicknMove Logistics 🚚
//         </h2>

//         {rideStatus === "IDLE" && (
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "25px",
//               borderRadius: "15px",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
//             }}
//             className="booking-panel"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 gap: "15px",
//                 marginBottom: "20px",
//                 flexWrap: "wrap"
//               }}
//               className="location-input-row"
//             >
//               <input
//                 placeholder="Pickup (e.g., Raipur Station)"
//                 value={pickup}
//                 onChange={(e) => setPickup(e.target.value)}
//                 style={{
//                   padding: "15px",
//                   width: "300px",
//                   borderRadius: "10px",
//                   border: "2px solid #ddd",
//                   fontSize: "16px"
//                 }}
//                 className="dashboard-input"
//               />
//               <input
//                 placeholder="Drop (e.g., Bhilai)"
//                 value={drop}
//                 onChange={(e) => setDrop(e.target.value)}
//                 style={{
//                   padding: "15px",
//                   width: "300px",
//                   borderRadius: "10px",
//                   border: "2px solid #ddd",
//                   fontSize: "16px"
//                 }}
//                 className="dashboard-input"
//               />
//             </div>

//             <button
//               onClick={calculateRoute}
//               style={{
//                 padding: "15px 35px",
//                 background: "#2196F3",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "12px",
//                 fontSize: "18px",
//                 cursor: "pointer"
//               }}
//             >
//               📍 Calculate Route & Fare
//             </button>

//             {distanceKm > 0 && (
//               <>
//                 <div
//                   style={{ margin: "25px 0", textAlign: "center" }}
//                   className="booking-details-block"
//                 >
//                   <h3>Distance: {distanceKm.toFixed(1)} km</h3>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: "20px",
//                       justifyContent: "center",
//                       flexWrap: "wrap"
//                     }}
//                   >
//                     <div>
//                       <label style={{ display: "block", fontWeight: "bold" }}>
//                         Vehicle
//                       </label>
//                       <select
//                         value={vehicleType}
//                         onChange={handleVehicleChange}
//                         style={{
//                           padding: "12px",
//                           width: "250px",
//                           borderRadius: "8px"
//                         }}
//                       >
//                         <option value="3 Wheeler Cargo">
//                           3-Wheeler Cargo (₹15/km)
//                         </option>
//                         <option value="EV 4 Wheeler">
//                           EV 4 Wheeler (₹18/km)
//                         </option>
//                         <option value="4 Wheeler">4 Wheeler (₹20/km)</option>
//                         <option value="Mini Truck">Mini Truck (₹25/km)</option>
//                         <option value="Small Truck">Small Truck (₹35/km)</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label style={{ display: "block", fontWeight: "bold" }}>
//                         Helpers
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         max="4"
//                         value={helpers}
//                         onChange={handleHelperChange}
//                         style={{
//                           padding: "12px",
//                           width: "100px",
//                           borderRadius: "8px"
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ textAlign: "center", margin: "30px 0" }}>
//                   <h1 style={{ color: "#4CAF50", fontSize: "48px" }}>
//                     ₹{estimatedFare}
//                   </h1>
//                   <p>Total Estimated Fare (including helpers)</p>
//                 </div>

//                 <button
//                   onClick={createBooking}
//                   style={{
//                     padding: "20px 50px",
//                     background: "#FF5722",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "15px",
//                     fontSize: "22px",
//                     fontWeight: "bold",
//                     cursor: "pointer"
//                   }}
//                 >
//                   🚚 CONFIRM & CREATE BOOKING
//                 </button>
//               </>
//             )}
//           </div>
//         )}

//         {/* LIVE TRACKING PANEL */}
        

//         {assignedDriverDetails && (
//   <div
//     style={{
//       marginTop: "20px",
//       background: "rgba(255,255,255,0.18)",
//       padding: "18px",
//       borderRadius: "18px",
//       maxWidth: "420px",
//       marginLeft: "auto",
//       marginRight: "auto",
//       textAlign: "left"
//     }}
//   >
//     <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
//       👨‍✈️ Driver Details
//     </div>

//     <div><strong>Name:</strong> {assignedDriverDetails.name}</div>
//     <div><strong>Phone:</strong> {assignedDriverDetails.phone}</div>

//     {/* ✅ ADD THIS LINE (MAIN FIX) */}
//     <div>
//       <strong>Vehicle No:</strong>{" "}
//       {assignedDriverDetails.vehicleNumber || "N/A"}
//     </div>

//     <div>
//       <strong>Vehicle:</strong>{" "}
//       {assignedDriverDetails.vehicle || "N/A"}
//     </div>

//     <div>
//       <strong>License:</strong>{" "}
//       {assignedDriverDetails.license || "N/A"}
//     </div>
//   </div>
// )}

//         {/* PAYMENT MODAL */}
//         {showPaymentModal && (
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "rgba(0,0,0,0.8)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 10000
//             }}
//           >
//             <div
//               style={{
//                 background: "white",
//                 borderRadius: "25px",
//                 padding: "40px",
//                 maxWidth: "500px",
//                 width: "90%",
//                 textAlign: "center"
//               }}
//             >
//               <h2>💳 Complete Payment</h2>
//               <div
//                 style={{
//                   background: "#f8f9fa",
//                   padding: "25px",
//                   borderRadius: "20px",
//                   border: "3px solid #4CAF50"
//                 }}
//               >
//                 <h3 style={{ color: "#4CAF50", fontSize: "36px" }}>
//                   ₹{estimatedFare}
//                 </h3>
//                 {driverDetails && (
//                   <div style={{ marginTop: "10px", fontSize: "14px" }}>
//                     <strong>Driver:</strong> {driverDetails.name}
//                     <br />
//                     <strong>Phone:</strong> {driverDetails.phone}
//                   </div>
//                 )}
//               </div>

//               <div
//                 style={{
//                   margin: "20px 0",
//                   display: "flex",
//                   gap: "10px",
//                   justifyContent: "center"
//                 }}
//               >
//                 <div
//                   onClick={() => handlePaymentMethodChange("cash")}
//                   style={{
//                     padding: "15px",
//                     border: `2px solid ${
//                       selectedPaymentMethod === "cash" ? "#4CAF50" : "#ddd"
//                     }`,
//                     borderRadius: "10px",
//                     cursor: "pointer"
//                   }}
//                 >
//                   💵 Cash
//                 </div>
//                 <div
//                   onClick={() => handlePaymentMethodChange("upi")}
//                   style={{
//                     padding: "15px",
//                     border: `2px solid ${
//                       selectedPaymentMethod === "upi" ? "#4CAF50" : "#ddd"
//                     }`,
//                     borderRadius: "10px",
//                     cursor: "pointer"
//                   }}
//                 >
//                   🏧 UPI
//                 </div>
//               </div>

//               {selectedPaymentMethod === "upi" && (
//                 <input
//                   type="text"
//                   placeholder="Enter UPI ID"
//                   value={upiId}
//                   onChange={(e) => setUpiId(e.target.value)}
//                   style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//                 />
//               )}

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   justifyContent: "center"
//                 }}
//               >
//                 <button
//                   onClick={
//                     selectedPaymentMethod === "cash"
//                       ? processCashPayment
//                       : processUpiPayment
//                   }
//                   style={{
//                     padding: "15px 30px",
//                     background: "#4CAF50",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "10px"
//                   }}
//                 >
//                   PAY NOW
//                 </button>
//                 <button
//                   onClick={closePaymentModal}
//                   style={{
//                     padding: "15px 30px",
//                     background: "#6c757d",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "10px"
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MAP CONTAINER */}
//         <div className="map-shell">
//           <MapContainer
//             center={pickupCoords || cgCenter}
//             zoom={pickupCoords ? 13 : 8}
//             style={{ height: "600px", borderRadius: "25px", marginTop: "20px" }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {pickupCoords && <Marker position={pickupCoords} icon={pickupIcon} />}
//             {showDropLocation && dropCoords && (
//               <Marker position={dropCoords} icon={dropIcon} />
//             )}
//             {driverPosition && (
//               <Marker position={driverPosition} icon={driverIcon} />
//             )}
//             {route.length > 0 && (
//               <Polyline positions={route} color="#FF5722" weight={8} />
//             )}
//           </MapContainer>
//         </div>
//       </div>
//       <style>{`
//         @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
//       `}</style>
//     </div>
//   );
// }

// export default CustomerDashboard;




// //-------------------final-----------------------



//-------------------final-----------------------


// src/pages/customer/CustomerDashboard.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import styles from "../../components/CustomerNavbar.module.css";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [distanceKm, setDistanceKm] = useState(0);
  const [vehicleType, setVehicleType] = useState("3 Wheeler Cargo");
  const [helpers, setHelpers] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [driverETA, setDriverETA] = useState(0);
  const [rideStatus, setRideStatus] = useState("IDLE");
  const [showDropLocation, setShowDropLocation] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  // 🔥 USER DETAILS (Usually from Auth Context/LocalStorage)
  const [customerName, setCustomerName] = useState("John Doe");
  const [customerPhone, setCustomerPhone] = useState("+91 9876543210");

  // 🔥 PAYMENT STATES
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [upiId, setUpiId] = useState("");
  const [driverDetails, setDriverDetails] = useState(null);

  // 🔥 NEW: ASSIGNED DRIVER DETAILS ON ACCEPT
  const [assignedDriverDetails, setAssignedDriverDetails] = useState(null);

  // WebSocket refs
  const stompClient = useRef(null);
  const subscriptionsRef = useRef(new Map());
  const cgCenter = [21.2514, 81.6296];

  const vehicleRates = {
    "3 Wheeler Cargo": 15,
    "EV 4 Wheeler": 18,
    "4 Wheeler": 20,
    "Mini Truck": 25,
    "Small Truck": 35
  };

  const helperChargePerPerson = 200;

  // Icons
  const pickupIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  const dropIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
    iconSize: [35, 35],
  });

  const driverIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
    iconSize: [40, 40],
  });

  // 🔥 LOAD CUSTOMER DETAILS FROM LOCAL STORAGE / LOGIN DATA
  useEffect(() => {
    try {
      const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("customer")) ||
        JSON.parse(localStorage.getItem("currentUser"));

      if (storedUser) {
        setCustomerName(
          storedUser.name ||
            storedUser.customerName ||
            storedUser.fullName ||
            "John Doe"
        );
        setCustomerPhone(
          storedUser.phone ||
            storedUser.mobile ||
            storedUser.customerPhone ||
            "+91 9876543210"
        );
      }
    } catch (error) {
      console.log("User data not found in localStorage, using fallback values");
    }
  }, []);

  // ================= WEBSOCKET SETUP =================
  useEffect(() => {
    console.log("🔌 Customer WebSocket connecting...");

    const socket = new SockJS("http://localhost:9090/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (str) => console.log("[WS DEBUG]", str),
      onConnect: () => {
        console.log("✅ Customer WebSocket CONNECTED");
        setWsConnected(true);
      },
      onDisconnect: () => {
        console.log("🔌 Customer WebSocket DISCONNECTED");
        setWsConnected(false);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP ERROR:", frame.headers["message"]);
        setWsConnected(false);
      }
    });

    stompClient.current = client;
    client.activate();

    return () => {
      console.log("🔌 Customer WebSocket cleanup");
      if (stompClient.current) {
        subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
        subscriptionsRef.current.clear();
        stompClient.current.deactivate();
      }
    };
  }, []);

  // 🔥 UPDATED: CREATE BOOKING (Sending Name and Mobile to Backend)
  const createBooking = async () => {
    if (!pickupCoords || !dropCoords || distanceKm === 0) {
      alert("Please calculate route first!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9090/api/bookings",
        {
          customerId: 1,
          customerName: customerName,
          customerPhone: customerPhone,
          pickupLocation: pickup, 
          dropLocation: drop,
          pickupLat: pickupCoords[0],
          pickupLng: pickupCoords[1],
          dropLat: dropCoords[0],
          dropLng: dropCoords[1],
          distance: distanceKm,
          vehicleType,
          helpersRequested: helpers,
          totalAmount: parseFloat(estimatedFare),
          status: "CREATED"
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("✅ Booking created:", res.data);
      const newBookingId = res.data.id;
      setBookingId(newBookingId);
      setRideStatus("WAITING");
      setAssignedDriverDetails(null);

      if (stompClient.current?.connected) {
        subscribeToBooking(newBookingId);
      }

      alert(`✅ Booking #${newBookingId} created! Waiting for driver...`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed: " + (error.response?.data || error.message));
    }
  };

  const subscribeToBooking = useCallback((bookingId) => {
    console.log(`🔥 IMMEDIATELY SUBSCRIBING to booking ${bookingId}`);

    subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
    subscriptionsRef.current.clear();

    const statusSub = stompClient.current.subscribe(
      `/topic/ride-status/${bookingId}`,
      (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log("📩 Customer received ride status:", data);

          setRideStatus(data.status || "WAITING");

          if (data.status === "ACCEPTED") {
            setDriverETA(data.eta || 5);

            if (data.driverDetails) {
              setAssignedDriverDetails(data.driverDetails);
            }

            alert(
              `🚚 Driver accepted! ETA: ${data.eta || 5} min${
                data.driverDetails?.name
                  ? `\n👨‍✈️ Driver: ${data.driverDetails.name}`
                  : ""
              }${
                data.driverDetails?.phone
                  ? `\n📱 Phone: ${data.driverDetails.phone}`
                  : ""
              }`
            );
          } else if (data.status === "PICKED_UP") {
            setShowDropLocation(true);
            alert("✅ Goods picked up!");
          } else if (data.status === "COMPLETED") {
            alert("🎉 Ride completed! Please make payment to complete the trip.");
            setDriverDetails(data.driverDetails);
            setShowPaymentModal(true);
          }
        } catch (error) {
          console.error("❌ Status parse error:", error);
        }
      }
    );

    const locationSub = stompClient.current.subscribe(
      `/topic/driver-location/${bookingId}`,
      (message) => {
        try {
          const data = JSON.parse(message.body);
          setDriverPosition([data.lat, data.lng]);
        } catch (error) {
          console.error("❌ Location parse error:", error);
        }
      }
    );

    subscriptionsRef.current.set("status", statusSub);
    subscriptionsRef.current.set("location", locationSub);
  }, []);

  useEffect(() => {
    if (
      bookingId &&
      stompClient.current?.connected &&
      subscriptionsRef.current.size === 0
    ) {
      subscribeToBooking(bookingId);
    }
  }, [bookingId, subscribeToBooking]);

  // ================= PAYMENT FUNCTIONS =================
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentStatus("");
  };

  const processCashPayment = async () => {
    try {
      setPaymentStatus("processing");
      await axios.post(`http://localhost:9090/api/payments/${bookingId}/cash`, {
        bookingId,
        amount: estimatedFare,
        paymentMethod: "CASH",
        status: "PAID"
      });
      setPaymentStatus("completed");
      setRideStatus("IDLE");
      setBookingId(null);
      setDriverPosition(null);
      setAssignedDriverDetails(null);
      setShowPaymentModal(false);
      alert("✅ Cash payment confirmed! Thank you for using PicknMove! 🚚");
    } catch (error) {
      setPaymentStatus("failed");
      alert("Payment processing failed. Please try again.");
    }
  };

  const processUpiPayment = async () => {
    if (!upiId) {
      alert("Please enter UPI ID");
      return;
    }
    try {
      setPaymentStatus("processing");
      await axios.post(`http://localhost:9090/api/payments/${bookingId}/upi`, {
        bookingId,
        amount: estimatedFare,
        paymentMethod: "UPI",
        upiId,
        status: "PAID"
      });
      setPaymentStatus("completed");
      setRideStatus("IDLE");
      setBookingId(null);
      setDriverPosition(null);
      setAssignedDriverDetails(null);
      setShowPaymentModal(false);
      alert("✅ UPI payment successful! Thank you for using PicknMove! 🚚");
    } catch (error) {
      setPaymentStatus("failed");
      alert("UPI payment failed. Please check UPI ID and try again.");
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStatus("");
    setUpiId("");
    setSelectedPaymentMethod("cash");
  };

  // ================= HELPERS =================
  const searchLocation = async (place) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}, Chhattisgarh`
      );
      if (!res.data[0]) return null;
      return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
    } catch (error) {
      return null;
    }
  };

  const calculateRoute = async () => {
    if (!pickup || !drop) {
      alert("Please enter pickup and drop locations!");
      return;
    }
    const pick = await searchLocation(pickup);
    const dropPoint = await searchLocation(drop);

    if (!pick || !dropPoint) {
      alert("Could not find locations. Try 'Raipur' or 'Bhilai'");
      return;
    }

    setPickupCoords(pick);
    setDropCoords(dropPoint);

    try {
      const routeRes = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${pick[1]},${pick[0]};${dropPoint[1]},${dropPoint[0]}?overview=full&geometries=geojson`
      );
      const routeData = routeRes.data.routes[0];
      const km = routeData.distance / 1000;
      setDistanceKm(km);
      setRoute(routeData.geometry.coordinates.map((coord) => [coord[1], coord[0]]));
      calculateFare(km, vehicleType, helpers);
    } catch (error) {
      alert("Could not calculate route");
    }
  };

  const calculateFare = (km, vehicle, helperCount) => {
    const baseRate = vehicleRates[vehicle] || 15;
    const total = km * baseRate + helperCount * helperChargePerPerson;
    setEstimatedFare(total.toFixed(0));
  };

  const handleVehicleChange = (e) => {
    const value = e.target.value;
    setVehicleType(value);
    if (distanceKm > 0) calculateFare(distanceKm, value, helpers);
  };

  const handleHelperChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setHelpers(value);
    if (distanceKm > 0) calculateFare(distanceKm, vehicleType, value);
  };

  // ================= UI =================
  return (
    <div style={{ minHeight: "100vh" }} className="customer-dashboard-page">
      <CustomerNavbar />

      <div
        style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
        className="customer-dashboard-wrapper"
      >
        <div
          style={{
            background: wsConnected ? "#e8f5e8" : "#ffebee",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            borderLeft: `5px solid ${wsConnected ? "#4CAF50" : "#f44336"}`,
            fontFamily: "monospace"
          }}
          className="dashboard-live-panel"
        >
          <strong>🔍 LIVE STATUS:</strong>
          WS: {wsConnected ? "🟢 CONNECTED" : "🔴 DISCONNECTED"} |
          Booking: {bookingId || "None"} |
          Status: <strong>{rideStatus}</strong> |
          Driver: {driverPosition ? "📍 LIVE" : "❌ NONE"}
        </div>

        <h2
          style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}
          className="dashboard-main-title"
        >
          PicknMove Logistics 🚚
        </h2>

        {rideStatus === "IDLE" && (
          <div
            style={{
              background: "#f9f9f9",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
            className="booking-panel"
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
                flexWrap: "wrap"
              }}
              className="location-input-row"
            >
              <input
                placeholder="Pickup (e.g., Raipur Station)"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                style={{
                  padding: "15px",
                  width: "300px",
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                  fontSize: "16px"
                }}
                className="dashboard-input"
              />
              <input
                placeholder="Drop (e.g., Bhilai)"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                style={{
                  padding: "15px",
                  width: "300px",
                  borderRadius: "10px",
                  border: "2px solid #ddd",
                  fontSize: "16px"
                }}
                className="dashboard-input"
              />
            </div>

            <button
              onClick={calculateRoute}
              style={{
                padding: "15px 35px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              📍 Calculate Route & Fare
            </button>

            {distanceKm > 0 && (
              <>
                <div
                  style={{ margin: "25px 0", textAlign: "center" }}
                  className="booking-details-block"
                >
                  <h3>Distance: {distanceKm.toFixed(1)} km</h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      flexWrap: "wrap"
                    }}
                  >
                    <div>
                      <label style={{ display: "block", fontWeight: "bold" }}>
                        Vehicle
                      </label>
                      <select
                        value={vehicleType}
                        onChange={handleVehicleChange}
                        style={{
                          padding: "12px",
                          width: "250px",
                          borderRadius: "8px"
                        }}
                      >
                        <option value="3 Wheeler Cargo">
                          3-Wheeler Cargo (₹15/km)
                        </option>
                        <option value="EV 4 Wheeler">
                          EV 4 Wheeler (₹18/km)
                        </option>
                        <option value="4 Wheeler">4 Wheeler (₹20/km)</option>
                        <option value="Mini Truck">Mini Truck (₹25/km)</option>
                        <option value="Small Truck">Small Truck (₹35/km)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: "bold" }}>
                        Helpers
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="4"
                        value={helpers}
                        onChange={handleHelperChange}
                        style={{
                          padding: "12px",
                          width: "100px",
                          borderRadius: "8px"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center", margin: "30px 0" }}>
                  <h1 style={{ color: "#4CAF50", fontSize: "48px" }}>
                    ₹{estimatedFare}
                  </h1>
                  <p>Total Estimated Fare (including helpers)</p>
                </div>

                <button
                  onClick={createBooking}
                  style={{
                    padding: "20px 50px",
                    background: "#FF5722",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    fontSize: "22px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  🚚 CONFIRM & CREATE BOOKING
                </button>
              </>
            )}
          </div>
        )}

        {/* LIVE TRACKING PANEL */}
        

        {assignedDriverDetails && (
  <div
    style={{
      marginTop: "20px",
      background: "rgba(255,255,255,0.18)",
      padding: "18px",
      borderRadius: "18px",
      maxWidth: "420px",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "left"
    }}
  >
    <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
      👨‍✈️ Driver Details
    </div>

    <div><strong>Name:</strong> {assignedDriverDetails.name}</div>
    <div><strong>Phone:</strong> {assignedDriverDetails.phone}</div>

    {/* ✅ ADD THIS LINE (MAIN FIX) */}
    <div>
      <strong>Vehicle No:</strong>{" "}
      {assignedDriverDetails.vehicleNumber || "N/A"}
    </div>

    <div>
      <strong>Vehicle:</strong>{" "}
      {assignedDriverDetails.vehicle || "N/A"}
    </div>

    <div>
      <strong>License:</strong>{" "}
      {assignedDriverDetails.license || "N/A"}
    </div>
  </div>
)}

        {/* PAYMENT MODAL */}
        {showPaymentModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10000
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "25px",
                padding: "40px",
                maxWidth: "500px",
                width: "90%",
                textAlign: "center"
              }}
            >
              <h2>💳 Complete Payment</h2>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "25px",
                  borderRadius: "20px",
                  border: "3px solid #4CAF50"
                }}
              >
                <h3 style={{ color: "#4CAF50", fontSize: "36px" }}>
                  ₹{estimatedFare}
                </h3>
                {driverDetails && (
                  <div style={{ marginTop: "10px", fontSize: "14px" }}>
                    <strong>Driver:</strong> {driverDetails.name}
                    <br />
                    <strong>Phone:</strong> {driverDetails.phone}
                  </div>
                )}
              </div>

              <div
                style={{
                  margin: "20px 0",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center"
                }}
              >
                <div
                  onClick={() => handlePaymentMethodChange("cash")}
                  style={{
                    padding: "15px",
                    border: `2px solid ${
                      selectedPaymentMethod === "cash" ? "#4CAF50" : "#ddd"
                    }`,
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  💵 Cash
                </div>
                <div
                  onClick={() => handlePaymentMethodChange("upi")}
                  style={{
                    padding: "15px",
                    border: `2px solid ${
                      selectedPaymentMethod === "upi" ? "#4CAF50" : "#ddd"
                    }`,
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  🏧 UPI
                </div>
              </div>

              {selectedPaymentMethod === "upi" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center"
                }}
              >
                <button
                  onClick={
                    selectedPaymentMethod === "cash"
                      ? processCashPayment
                      : processUpiPayment
                  }
                  style={{
                    padding: "15px 30px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "10px"
                  }}
                >
                  PAY NOW
                </button>
                <button
                  onClick={closePaymentModal}
                  style={{
                    padding: "15px 30px",
                    background: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "10px"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAP CONTAINER */}
        <div className="map-shell">
          <MapContainer
            center={pickupCoords || cgCenter}
            zoom={pickupCoords ? 13 : 8}
            style={{ height: "600px", borderRadius: "25px", marginTop: "20px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {pickupCoords && <Marker position={pickupCoords} icon={pickupIcon} />}
            {showDropLocation && dropCoords && (
              <Marker position={dropCoords} icon={dropIcon} />
            )}
            {driverPosition && (
              <Marker position={driverPosition} icon={driverIcon} />
            )}
            {route.length > 0 && (
              <Polyline positions={route} color="#FF5722" weight={8} />
            )}
          </MapContainer>
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}

export default CustomerDashboard;




//-------------------final-----------------------



