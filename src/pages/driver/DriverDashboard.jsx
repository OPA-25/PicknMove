
// // //-------------------final-----------------------







// // src/pages/driver/DriverDashboard.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import DriverNavbar from "../../components/DriverNavbar";
// import "./DriverDashboard.css";

// function DriverDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [activeBookingId, setActiveBookingId] = useState(null);
//   const [activeBooking, setActiveBooking] = useState(null);
//   const [pickupCoords, setPickupCoords] = useState(null);
//   const [dropCoords, setDropCoords] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [showDropLocation, setShowDropLocation] = useState(false);
//   const [eta, setEta] = useState(0);
//   const [wsConnected, setWsConnected] = useState(false);
//   const [locationPermission, setLocationPermission] = useState(false);
//   const [paymentNotification, setPaymentNotification] = useState(null);
//   const [lastCompletedBookingId, setLastCompletedBookingId] = useState(null);

//   // ✅ VEHICLE STATES
//   const [vehicles, setVehicles] = useState([]);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [driverId, setDriverId] = useState(null);

//   const stompClient = useRef(null);
//   const subscriptionsRef = useRef(new Map());
//   const locationIntervalRef = useRef(null);
//   const cgCenter = [21.2514, 81.6296];

//   // ================= LOAD DRIVER =================
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return;

//     try {
//       const parsedUser = JSON.parse(storedUser);

//       if (parsedUser?.id) {
//         setDriverId(parsedUser.id);
//         fetchVehicles(parsedUser.id);
//       }
//     } catch (error) {
//       console.error("User parse error:", error);
//     }
//   }, []);

//   const fetchVehicles = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:9090/api/drivers/${id}/vehicles`);

//       console.log("Vehicles fetched:", res.data);

//       if (res.data && res.data.length > 0) {
//         console.log("🚚 FIRST VEHICLE FULL:", res.data[0]);
//         console.log("🚚 FIRST VEHICLE NUMBER:", res.data[0].vehicleNumber);
//       } else {
//         console.log("❌ NO VEHICLES OR EMPTY LIST");
//       }

//       // ✅ SAFE ARRAY
//       const vehicleList = Array.isArray(res.data) ? res.data : [];

//       // ✅ FINAL FIX (HANDLE ANY FIELD MISMATCH)
//       const formattedVehicles = vehicleList.map((v) => ({
//         ...v,
//         vehicleNumber: v.vehicleNumber || v.vehicle_number || "N/A",
//         driverName: v.driverName || v.driver_name || "N/A",
//         driverMobile: v.driverMobile || v.driver_mobile || "N/A",
//       }));

//       console.log("✅ FORMATTED VEHICLES:", formattedVehicles);

//       // ✅ SET STATE (ONLY ONCE — IMPORTANT)
//       setVehicles(formattedVehicles);

//       if (formattedVehicles.length > 0) {
//         setSelectedVehicle(formattedVehicles[0]);
//       } else {
//         setSelectedVehicle(null);
//       }

//     } catch (error) {
//       console.error("Vehicle fetch error:", error);
//       setVehicles([]);
//       setSelectedVehicle(null);
//     }
//   };

//   // ================= ICONS =================
//   const pickupIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     iconSize: [35, 35],
//   });

//   const dropIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
//     iconSize: [35, 35],
//   });

//   // ================= WEBSOCKET =================
//   useEffect(() => {
//     const socket = new SockJS("http://localhost:9090/ws");

//     const client = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 3000,
//       onConnect: () => {
//         setWsConnected(true);
//       },
//       onDisconnect: () => {
//         setWsConnected(false);
//       },
//       onStompError: (frame) => {
//         console.error("STOMP Error:", frame);
//         setWsConnected(false);
//       }
//     });

//     stompClient.current = client;
//     client.activate();

//     return () => {
//       if (stompClient.current) {
//         subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
//         subscriptionsRef.current.clear();
//         stompClient.current.deactivate();
//       }
//     };
//   }, []);

//   // ================= BOOKINGS =================
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:9090/api/bookings/created");
//       setBookings(res.data);
//     } catch (error) {
//       console.error("Fetch bookings error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // ================= NEW BOOKINGS SUB =================
//   useEffect(() => {
//     if (!stompClient.current?.connected) return;

//     const newBookingSub = stompClient.current.subscribe("/topic/driver/new-booking", (message) => {
//       try {
//         console.log("New booking message:", message.body);
//         fetchBookings();
//       } catch (error) {
//         console.error("New booking parse error:", error);
//       }
//     });

//     subscriptionsRef.current.set("newBookings", newBookingSub);

//     return () => {
//       if (newBookingSub) newBookingSub.unsubscribe();
//     };
//   }, [wsConnected]);

//   // ================= LOCATION UPDATES =================
//   useEffect(() => {
//     if (!activeBookingId) return;

//     let permissionRequested = false;

//     const requestLocationPermission = () => {
//       return new Promise((resolve) => {
//         if (!navigator.geolocation) {
//           console.error("❌ Geolocation not supported");
//           resolve(false);
//           return;
//         }

//         navigator.geolocation.getCurrentPosition(
//           () => {
//             console.log("✅ Location permission GRANTED");
//             setLocationPermission(true);
//             resolve(true);
//           },
//           (error) => {
//             console.log("❌ Location permission status:", error.code, error.message);

//             if (error.code === 1 && !permissionRequested) {
//               permissionRequested = true;
//               alert(
//                 "📍 Location Access Required for Live Tracking\n\n" +
//                   "Please allow location access in your browser.\n\n" +
//                   "Driver location updates paused until permitted."
//               );
//               resolve(false);
//               return;
//             }

//             if (error.code === 3) {
//               console.log("⌛ Initial location request timed out, will retry with fallback.");
//               resolve(true);
//               return;
//             }

//             resolve(false);
//           },
//           {
//             enableHighAccuracy: false,
//             timeout: 15000,
//             maximumAge: 60000
//           }
//         );
//       });
//     };

//     const sendLocationUpdate = (lat, lng) => {
//       const data = {
//         bookingId: activeBookingId.toString(),
//         lat,
//         lng,
//         timestamp: new Date().toISOString()
//       };

//       if (stompClient.current && stompClient.current.connected) {
//         stompClient.current.publish({
//           destination: "/app/ride/driver-location",
//           body: JSON.stringify(data)
//         });
//         console.log("📍 Location sent:", lat, lng);
//       }
//     };

//     const getCurrentLocation = (options) => {
//       return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, options);
//       });
//     };

//     const startLocationUpdates = async () => {
//       const permissionGranted = await requestLocationPermission();

//       if (!permissionGranted) {
//         console.log("⏳ Waiting for location permission...");
//         return;
//       }

//       let firstLocationSent = false;

//       try {
//         const position = await getCurrentLocation({
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000
//         });

//         sendLocationUpdate(position.coords.latitude, position.coords.longitude);
//         setLocationPermission(true);
//         firstLocationSent = true;
//       } catch (error) {
//         console.log("⚠️ High accuracy failed:", error.code, error.message);

//         if (error.code === 3 || error.code === 2) {
//           try {
//             const fallbackPosition = await getCurrentLocation({
//               enableHighAccuracy: false,
//               timeout: 20000,
//               maximumAge: 60000
//             });

//             sendLocationUpdate(
//               fallbackPosition.coords.latitude,
//               fallbackPosition.coords.longitude
//             );
//             setLocationPermission(true);
//             firstLocationSent = true;
//             console.log("✅ Fallback location success");
//           } catch (fallbackError) {
//             console.log("❌ Fallback location also failed:", fallbackError.code, fallbackError.message);
//           }
//         }
//       }

//       locationIntervalRef.current = setInterval(() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             sendLocationUpdate(position.coords.latitude, position.coords.longitude);
//             setLocationPermission(true);
//           },
//           (error) => {
//             if (error.code === 3) {
//               console.log("⌛ Location timeout, retrying next cycle...");
//             } else if (error.code === 2) {
//               console.log("⚠️ Location unavailable:", error.message);
//             } else if (error.code === 1) {
//               console.log("❌ Location permission denied");
//               setLocationPermission(false);
//             } else {
//               console.log("Location update skipped:", error.message);
//             }
//           },
//           {
//             enableHighAccuracy: false,
//             timeout: 15000,
//             maximumAge: 20000
//           }
//         );
//       }, firstLocationSent ? 5000 : 8000);
//     };

//     startLocationUpdates();

//     return () => {
//       if (locationIntervalRef.current) {
//         clearInterval(locationIntervalRef.current);
//       }
//     };
//   }, [activeBookingId]);

//   // ================= ACCEPT =================
//   const acceptBooking = async (bookingId) => {
//     try {
//       if (!driverId) {
//         alert("Driver not loaded");
//         return;
//       }

//       if (!selectedVehicle) {
//         alert("No vehicle available. Please add/select a vehicle first.");
//         return;
//       }

//       await axios.put(`http://localhost:9090/api/bookings/${bookingId}/accept/${driverId}`);
//       await fetchBookings();

//       const bookingRes = await axios.get(`http://localhost:9090/api/bookings/${bookingId}`);
//       const bookingData = bookingRes.data;

//       setActiveBooking(bookingData);
//       setActiveBookingId(bookingId);

//       // ✅ FIXED: ENSURE CUSTOMER DETAILS ARE VISIBLE + DRIVER DETAILS SENT
//       console.log("🚀 SENDING DRIVER DETAILS + ENSURING CUSTOMER VISIBILITY:", {
//         vehicleNumber: selectedVehicle?.vehicleNumber,
//         fullVehicle: selectedVehicle,
//         bookingCustomerName: bookingData.customerName,
//         bookingCustomerPhone: bookingData.customerPhone
//       });

//       if (stompClient.current?.connected) {
//         stompClient.current.publish({
//           destination: "/app/ride/status",
//           body: JSON.stringify({
//             bookingId,
//             status: "ACCEPTED",
//             driverId,
//             eta: 5,
//             // ✅ ENSURE CUSTOMER DETAILS ARE SENT BACK (for visibility)
//             customerName: bookingData.customerName || "N/A",
//             customerPhone: bookingData.customerPhone || "N/A",
//             driverDetails: {
//               name: selectedVehicle?.driverName || "N/A",
//               phone: selectedVehicle?.driverMobile || "N/A",
//               vehicle: selectedVehicle?.vehicleCategory || "N/A",
//               license: selectedVehicle?.licenseNumber || "N/A",
//               // ✅ CRITICAL FIX: Vehicle number visibility
//               vehicleNumber: selectedVehicle?.vehicleNumber ?? "NOT_SENT",
//               vehicleCategory: selectedVehicle?.vehicleCategory || "N/A",
//               driverMobile: selectedVehicle?.driverMobile || "N/A"
//             }
//           })
//         });
//       }

//       alert("✅ Booking Accepted");
//     } catch (error) {
//       console.error("Accept booking error:", error);
//       alert("Failed to accept booking");
//     }
//   };

//   // ================= PICKUP =================
//   const pickupComplete = async () => {
//     try {
//       await axios.put(`http://localhost:9090/api/bookings/${activeBookingId}/status?status=PICKED_UP`);

//       setShowDropLocation(true);

//       const routeRes = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${activeBooking.pickupLng},${activeBooking.pickupLat};${activeBooking.dropLng},${activeBooking.dropLat}?overview=full&geometries=geojson`
//       );

//       const routeData = routeRes.data.routes[0];
//       setRoute(routeData.geometry.coordinates.map((c) => [c[1], c[0]]));
//       setEta(Math.round(routeData.duration / 60));

//       // ✅ FIXED: SEND CUSTOMER DETAILS WITH PICKUP STATUS
//       stompClient.current?.publish({
//         destination: "/app/ride/status",
//         body: JSON.stringify({
//           bookingId: activeBookingId,
//           status: "PICKED_UP",
//           driverId,
//           customerName: activeBooking.customerName || "N/A",
//           customerPhone: activeBooking.customerPhone || "N/A"
//         })
//       });

//       alert("✅ Pickup Complete");
//     } catch (error) {
//       console.error("Pickup error:", error);
//       alert("Pickup update failed");
//     }
//   };

//   // ================= COMPLETE =================
//   const completeRide = async () => {
//     try {
//       await axios.put(`http://localhost:9090/api/bookings/${activeBookingId}/status?status=COMPLETED`);

//       // ✅ FIXED: SEND FULL DETAILS WITH COMPLETION (INCLUDING CUSTOMER INFO)
//       stompClient.current?.publish({
//         destination: "/app/ride/status",
//         body: JSON.stringify({
//           bookingId: activeBookingId,
//           status: "COMPLETED",
//           driverId,
//           customerName: activeBooking.customerName || "N/A",
//           customerPhone: activeBooking.customerPhone || "N/A",
//           driverDetails: {
//             name: selectedVehicle?.driverName || "N/A",
//             phone: selectedVehicle?.driverMobile || "N/A",
//             vehicle: selectedVehicle?.vehicleCategory || "N/A",
//             license: selectedVehicle?.licenseNumber || "N/A",
//             // ✅ CRITICAL: Vehicle number
//             vehicleNumber: selectedVehicle?.vehicleNumber || "NOT_SENT",
//             vehicleCategory: selectedVehicle?.vehicleCategory || "N/A",
//             driverMobile: selectedVehicle?.driverMobile || "N/A"
//           }
//         })
//       });

//       setLastCompletedBookingId(activeBookingId);
//       setActiveBooking(null);
//       setActiveBookingId(null);
//       setRoute([]);
//       setShowDropLocation(false);
//       setPickupCoords(null);
//       setDropCoords(null);
//       setEta(0);
//       setLocationPermission(false);

//       alert("🎉 Ride Completed");
//       fetchBookings();
//     } catch (error) {
//       console.error("Complete ride error:", error);
//       alert("Ride completion failed");
//     }
//   };

//   // ================= MAP COORDS =================
//   useEffect(() => {
//     if (activeBooking) {
//       setPickupCoords([activeBooking.pickupLat, activeBooking.pickupLng]);
//       setDropCoords([activeBooking.dropLat, activeBooking.dropLng]);
//     }
//   }, [activeBooking]);

//   // ================= PAYMENT POLLING =================
//   useEffect(() => {
//     const bookingToCheck = activeBookingId || lastCompletedBookingId;
//     if (!bookingToCheck) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:9090/api/payments/${bookingToCheck}/status`
//         );

//         if (res.data && res.data.status === "PAID") {
//           setPaymentNotification({
//             message: res.data.message || "Payment Received",
//             amount: res.data.amount || 0
//           });

//           clearInterval(interval);
//         }
//       } catch (error) {
//         console.log("Payment polling error:", error.message);
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeBookingId, lastCompletedBookingId]);

//   return (
//     <div className="driver-dashboard">
//       <DriverNavbar />

//       <div className="dashboard-container">
//         <div className="debug-panel">
//           <strong>🚚 DRIVER STATUS:</strong>
//           {" "}WS: {wsConnected ? "🟢 CONNECTED" : "🔴 DISCONNECTED"} |
//           {" "}Active: {activeBookingId || "None"} |
//           {" "}Location: {locationPermission ? "🟢 GRANTED" : "🔴 DENIED"} |
//           {" "}Bookings: {bookings.length}
//         </div>

//         <div className="driver-info-gradient">
//           <div className="driver-info-card-enhanced">
//             <h3 className="driver-name-large">
//               👨‍✈️ {selectedVehicle?.driverName || "Driver Name"}
//             </h3>

//             <p className="driver-contact">
//               📱 {selectedVehicle?.driverMobile || "No mobile available"}
//             </p>

//             <select
//               className="vehicle-dropdown"
//               value={selectedVehicle?.id || ""}
//               onChange={(e) => {
//                 const id = parseInt(e.target.value, 10);
//                 const v = vehicles.find((vehicle) => vehicle.id === id);
//                 if (v) {
//                   setSelectedVehicle(v);
//                 }
//               }}
//               disabled={vehicles.length === 0}
//             >
//               <option value="">
//                 {vehicles.length === 0 ? "-- No vehicles available --" : "-- Select Vehicle --"}
//               </option>

//               {vehicles.map((v) => (
//                 <option key={v.id} value={v.id}>
//                   {v.vehicleNumber} - {v.vehicleCategory || "Unknown"} | {v.licenseNumber || "No License"}
//                 </option>
//               ))}
//             </select>

//             <p className="driver-vehicle">
//               {selectedVehicle ? (
//                 <>
//                   🚚 {selectedVehicle.vehicleNumber} | {selectedVehicle.vehicleCategory} | {selectedVehicle.licenseNumber}
//                 </>
//               ) : (
//                 "⚠️ No vehicle selected / loaded"
//               )}
//             </p>
//           </div>
//         </div>

//         <h2 className="dashboard-title">Driver Dashboard 🚚</h2>

//         {activeBooking && (
//           <div className="active-ride-detailed">
//             <div className="ride-header-detailed">
//               <h2>🚚 Active Ride #{activeBooking.id}</h2>
//               <div className="ride-meta">
//                 {/* ✅ FIXED: PROMINENT CUSTOMER DISPLAY */}
//                 <p><strong>👤 Customer:</strong> <span style={{fontSize: '18px', fontWeight: 'bold'}}>{activeBooking.customerName || "N/A"}</span></p>
//                 <p><strong>📱 Phone:</strong> <span style={{fontSize: '18px', fontWeight: 'bold'}}>{activeBooking.customerPhone || "N/A"}</span></p>
//                 <p><strong>Customer ID:</strong> {activeBooking.customerId}</p>
//                 <p><strong>Pickup:</strong> {activeBooking.pickupLocation}</p>
//                 <p><strong>Vehicle:</strong> {selectedVehicle?.vehicleNumber || "N/A"}</p>
//                 <p><strong>Category:</strong> {selectedVehicle?.vehicleCategory || "N/A"}</p>
//               </div>
//             </div>

//             {!showDropLocation && (
//               <button
//                 className="btn btn-orange-large"
//                 onClick={pickupComplete}
//               >
//                 ✅ Pickup Complete
//               </button>
//             )}

//             {showDropLocation && (
//               <div className="ride-complete-section">
//                 <div className="drop-info">
//                   {/* ✅ FIXED: EXTRA PROMINENT CUSTOMER DISPLAY */}
//                   <div style={{background: '#e8f5e8', padding: '15px', borderRadius: '10px', marginBottom: '15px'}}>
//                     <p style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0'}}>
//                       👤 Customer Contact
//                     </p>
//                     <p style={{fontSize: '18px', margin: '5px 0'}}><strong>Name:</strong> {activeBooking.customerName || "N/A"}</p>
//                     <p style={{fontSize: '18px', margin: '5px 0'}}><strong>📱 Mobile:</strong> {activeBooking.customerPhone || "N/A"}</p>
//                   </div>

//                   <p><strong>📍 Drop:</strong> {activeBooking.dropLocation}</p>

//                   <div className="eta-display">
//                     <span className="eta-large">{eta} minutes</span>
//                     <span className="eta-label">ETA to Destination</span>
//                   </div>

//                   <div className="amount-display">
//                     💰 ₹{activeBooking.totalAmount?.toFixed(0) || activeBooking.amount?.toFixed(0)}
//                     <span className="amount-label">Expected Payment</span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">🚚 Vehicle No:</span>
//                     <span className="detail-value">{selectedVehicle?.vehicleNumber || "N/A"}</span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">📦 Category:</span>
//                     <span className="detail-value">{selectedVehicle?.vehicleCategory || "N/A"}</span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">🪪 License:</span>
//                     <span className="detail-value">{selectedVehicle?.licenseNumber || "N/A"}</span>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-blue-complete"
//                   onClick={completeRide}
//                 >
//                   🎉 Complete Ride & Wait for Payment
//                 </button>

//                 {!locationPermission && (
//                   <div className="location-warning">
//                     ⚠️ Location permission needed for live tracking
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         <div className="bookings-section-detailed">
//           <h3 className="section-title">📋 Available Bookings ({bookings.length})</h3>

//           {bookings.length === 0 ? (
//             <div className="empty-bookings">
//               <h3>🎉 No bookings right now</h3>
//               <p>Waiting for new ride requests...</p>
//             </div>
//           ) : (
//             <div className="bookings-grid-rich">
//               {bookings.map((b) => (
//                 <div key={b.id} className="booking-card-detailed">
//                   <div className="booking-header">
//                     <h4>Booking #{b.id}</h4>
//                   </div>

//                   <div className="booking-route-detailed">
//                     <div className="pickup-detailed">
//                       <span className="location-icon-large">📍</span>
//                       <span>{b.pickupLocation}</span>
//                     </div>

//                     <div className="route-arrow-large">→</div>

//                     <div className="drop-detailed">
//                       <span className="location-icon-large">📍</span>
//                       <span>{b.dropLocation}</span>
//                     </div>
//                   </div>

//                   <div className="booking-details-rich">
//                     {/* ✅ FIXED: PROMINENT CUSTOMER DISPLAY IN BOOKING CARDS */}
//                     <div className="detail-row" style={{background: '#e8f5e8', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
//                       <span className="detail-label" style={{fontSize: '16px', fontWeight: 'bold'}}>👤 Customer:</span>
//                       <span className="detail-value" style={{fontSize: '16px', fontWeight: 'bold'}}>{b.customerName || "N/A"}</span>
//                     </div>

//                     <div className="detail-row" style={{background: '#e3f2fd', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
//                       <span className="detail-label" style={{fontSize: '16px', fontWeight: 'bold'}}>📱 Mobile:</span>
//                       <span className="detail-value" style={{fontSize: '16px', fontWeight: 'bold'}}>{b.customerPhone || "N/A"}</span>
//                     </div>

//                     <div className="detail-row">
//                       <span className="detail-label">📏 Distance:</span>
//                       <span className="detail-value">{b.distance?.toFixed(1)} km</span>
//                     </div>

//                     <div className="detail-row">
//                       <span className="detail-label">💰 Amount:</span>
//                       <span className="detail-value">₹{b.totalAmount || b.amount}</span>
//                     </div>

//                     <div className="detail-row">
//                       <span className="detail-label">🚚 Vehicle:</span>
//                       <span className="detail-value">{b.vehicleType}</span>
//                     </div>

//                     <div className="detail-row">
//                       <span className="detail-label">👥 Helpers:</span>
//                       <span className="detail-value">{b.helpersRequested || 0}</span>
//                     </div>
//                   </div>

//                   <button
//                     className={`btn btn-accept-large ${activeBookingId ? "btn-disabled-large" : ""}`}
//                     onClick={() => acceptBooking(b.id)}
//                     disabled={activeBookingId || !selectedVehicle}
//                   >
//                     {activeBookingId
//                       ? "🚫 Already on Ride"
//                       : !selectedVehicle
//                       ? "⚠️ No Vehicle Available"
//                       : "✅ ACCEPT BOOKING"}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {activeBooking && (
//           <>
//             <h3 className="map-title">🗺️ Navigation Map</h3>
//             <div className="map-section-enhanced">
//               <div className="map-container-enhanced">
//                 <MapContainer
//                   center={pickupCoords || cgCenter}
//                   zoom={12}
//                   style={{ height: "100%" }}
//                   className="leaflet-map-enhanced"
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   {pickupCoords && <Marker position={pickupCoords} icon={pickupIcon} />}
//                   {showDropLocation && dropCoords && <Marker position={dropCoords} icon={dropIcon} />}
//                   {route.length > 0 && <Polyline positions={route} color="#2196F3" weight={6} />}
//                 </MapContainer>
//               </div>
//             </div>
//           </>
//         )}

//         {paymentNotification && (
//           <div className="payment-notification-rich">
//             <div className="notification-header-rich">
//               <span>💰</span>
//               <h3>Payment Received</h3>
//             </div>
//             <p>{paymentNotification.message}</p>
//             <div className="payment-amount-large">
//               ₹{paymentNotification.amount}
//             </div>
//             <button
//               className="btn btn-payment-dismiss"
//               onClick={() => setPaymentNotification(null)}
//             >
//               OK
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DriverDashboard;


// //-------------------final-----------------------












// //-------------------final confirm-----------------------


// src/pages/driver/DriverDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import DriverNavbar from "../../components/DriverNavbar";
import "./DriverDashboard.css";

function DriverDashboard() {
  const [bookings, setBookings] = useState([]);
  const [activeBookingId, setActiveBookingId] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [showDropLocation, setShowDropLocation] = useState(false);
  const [eta, setEta] = useState(0);
  const [wsConnected, setWsConnected] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [paymentNotification, setPaymentNotification] = useState(null);
  const [lastCompletedBookingId, setLastCompletedBookingId] = useState(null);

  // ✅ VEHICLE STATES
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [driverId, setDriverId] = useState(null);

  const stompClient = useRef(null);
  const subscriptionsRef = useRef(new Map());
  const locationIntervalRef = useRef(null);
  const cgCenter = [21.2514, 81.6296];

  // ================= LOAD DRIVER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser?.id) {
        setDriverId(parsedUser.id);
        fetchVehicles(parsedUser.id);
      }
    } catch (error) {
      console.error("User parse error:", error);
    }
  }, []);

  const fetchVehicles = async (id) => {
    try {
      const res = await axios.get(`http://localhost:9090/api/drivers/${id}/vehicles`);

      console.log("Vehicles fetched:", res.data);

      if (res.data && res.data.length > 0) {
        console.log("🚚 FIRST VEHICLE FULL:", res.data[0]);
        console.log("🚚 FIRST VEHICLE NUMBER:", res.data[0].vehicleNumber);
      } else {
        console.log("❌ NO VEHICLES OR EMPTY LIST");
      }

      // ✅ SAFE ARRAY
      const vehicleList = Array.isArray(res.data) ? res.data : [];

      // ✅ FINAL FIX (HANDLE ANY FIELD MISMATCH)
      const formattedVehicles = vehicleList.map((v) => ({
        ...v,
        vehicleNumber: v.vehicleNumber || v.vehicle_number || "N/A",
        driverName: v.driverName || v.driver_name || "N/A",
        driverMobile: v.driverMobile || v.driver_mobile || "N/A",
      }));

      console.log("✅ FORMATTED VEHICLES:", formattedVehicles);

      // ✅ SET STATE (ONLY ONCE — IMPORTANT)
      setVehicles(formattedVehicles);

      if (formattedVehicles.length > 0) {
        setSelectedVehicle(formattedVehicles[0]);
      } else {
        setSelectedVehicle(null);
      }

    } catch (error) {
      console.error("Vehicle fetch error:", error);
      setVehicles([]);
      setSelectedVehicle(null);
    }
  };

  // ================= ICONS =================
  const pickupIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  const dropIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684809.png",
    iconSize: [35, 35],
  });

  // ================= WEBSOCKET =================
  useEffect(() => {
    const socket = new SockJS("http://localhost:9090/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
      onConnect: () => {
        setWsConnected(true);
      },
      onDisconnect: () => {
        setWsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
        setWsConnected(false);
      }
    });

    stompClient.current = client;
    client.activate();

    return () => {
      if (stompClient.current) {
        subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
        subscriptionsRef.current.clear();
        stompClient.current.deactivate();
      }
    };
  }, []);

  // ================= BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/bookings/created");
      setBookings(res.data);
    } catch (error) {
      console.error("Fetch bookings error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= NEW BOOKINGS SUB =================
  useEffect(() => {
    if (!stompClient.current?.connected) return;

    const newBookingSub = stompClient.current.subscribe("/topic/driver/new-booking", (message) => {
      try {
        console.log("New booking message:", message.body);
        fetchBookings();
      } catch (error) {
        console.error("New booking parse error:", error);
      }
    });

    subscriptionsRef.current.set("newBookings", newBookingSub);

    return () => {
      if (newBookingSub) newBookingSub.unsubscribe();
    };
  }, [wsConnected]);

  // ================= LOCATION UPDATES =================
  useEffect(() => {
    if (!activeBookingId) return;

    let permissionRequested = false;

    const requestLocationPermission = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          console.error("❌ Geolocation not supported");
          resolve(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          () => {
            console.log("✅ Location permission GRANTED");
            setLocationPermission(true);
            resolve(true);
          },
          (error) => {
            console.log("❌ Location permission status:", error.code, error.message);

            if (error.code === 1 && !permissionRequested) {
              permissionRequested = true;
              alert(
                "📍 Location Access Required for Live Tracking\n\n" +
                "Please allow location access in your browser.\n\n" +
                "Driver location updates paused until permitted."
              );
              resolve(false);
              return;
            }

            if (error.code === 3) {
              console.log("⌛ Initial location request timed out, will retry with fallback.");
              resolve(true);
              return;
            }

            resolve(false);
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 60000
          }
        );
      });
    };

    const sendLocationUpdate = (lat, lng) => {
      const data = {
        bookingId: activeBookingId.toString(),
        lat,
        lng,
        timestamp: new Date().toISOString()
      };

      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.publish({
          destination: "/app/ride/driver-location",
          body: JSON.stringify(data)
        });
        console.log("📍 Location sent:", lat, lng);
      }
    };

    const getCurrentLocation = (options) => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    const startLocationUpdates = async () => {
      const permissionGranted = await requestLocationPermission();

      if (!permissionGranted) {
        console.log("⏳ Waiting for location permission...");
        return;
      }

      let firstLocationSent = false;

      try {
        const position = await getCurrentLocation({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        });

        sendLocationUpdate(position.coords.latitude, position.coords.longitude);
        setLocationPermission(true);
        firstLocationSent = true;
      } catch (error) {
        console.log("⚠️ High accuracy failed:", error.code, error.message);

        if (error.code === 3 || error.code === 2) {
          try {
            const fallbackPosition = await getCurrentLocation({
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 60000
            });

            sendLocationUpdate(
              fallbackPosition.coords.latitude,
              fallbackPosition.coords.longitude
            );
            setLocationPermission(true);
            firstLocationSent = true;
            console.log("✅ Fallback location success");
          } catch (fallbackError) {
            console.log("❌ Fallback location also failed:", fallbackError.code, fallbackError.message);
          }
        }
      }

      locationIntervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendLocationUpdate(position.coords.latitude, position.coords.longitude);
            setLocationPermission(true);
          },
          (error) => {
            if (error.code === 3) {
              console.log("⌛ Location timeout, retrying next cycle...");
            } else if (error.code === 2) {
              console.log("⚠️ Location unavailable:", error.message);
            } else if (error.code === 1) {
              console.log("❌ Location permission denied");
              setLocationPermission(false);
            } else {
              console.log("Location update skipped:", error.message);
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 20000
          }
        );
      }, firstLocationSent ? 5000 : 8000);
    };

    startLocationUpdates();

    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, [activeBookingId]);

  // ================= ACCEPT =================
  const acceptBooking = async (bookingId) => {
    try {
      if (!driverId) {
        alert("Driver not loaded");
        return;
      }

      if (!selectedVehicle) {
        alert("No vehicle available. Please add/select a vehicle first.");
        return;
      }

      await axios.put(`http://localhost:9090/api/bookings/${bookingId}/accept/${driverId}`);
      await fetchBookings();

      const bookingRes = await axios.get(`http://localhost:9090/api/bookings/${bookingId}`);
      const bookingData = bookingRes.data;

      setActiveBooking(bookingData);
      setActiveBookingId(bookingId);

      // ✅ FIXED: ENSURE CUSTOMER DETAILS ARE VISIBLE + DRIVER DETAILS SENT
      console.log("🚀 SENDING DRIVER DETAILS + ENSURING CUSTOMER VISIBILITY:", {
        vehicleNumber: selectedVehicle?.vehicleNumber,
        fullVehicle: selectedVehicle,
        bookingCustomerName: bookingData.customerName,
        bookingCustomerPhone: bookingData.customerPhone
      });

      if (stompClient.current?.connected) {
        stompClient.current.publish({
          destination: "/app/ride/status",
          body: JSON.stringify({
            bookingId,
            status: "ACCEPTED",
            driverId,
            eta: 5,
            // ✅ ENSURE CUSTOMER DETAILS ARE SENT BACK (for visibility)
            customerName: bookingData.customerName || "N/A",
            customerPhone: bookingData.customerPhone || "N/A",
            driverDetails: {
              name: selectedVehicle?.driverName || "N/A",
              phone: selectedVehicle?.driverMobile || "N/A",
              vehicle: selectedVehicle?.vehicleCategory || "N/A",
              license: selectedVehicle?.licenseNumber || "N/A",
              // ✅ CRITICAL FIX: Vehicle number visibility
              vehicleNumber: selectedVehicle?.vehicleNumber ?? "NOT_SENT",
              vehicleCategory: selectedVehicle?.vehicleCategory || "N/A",
              driverMobile: selectedVehicle?.driverMobile || "N/A"
            }
          })
        });
      }

      alert("✅ Booking Accepted");
    } catch (error) {
      console.error("Accept booking error:", error);
      alert("Failed to accept booking");
    }
  };

  // ================= PICKUP =================
  const pickupComplete = async () => {
    try {
      await axios.put(`http://localhost:9090/api/bookings/${activeBookingId}/status?status=PICKED_UP`);

      setShowDropLocation(true);

      const routeRes = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${activeBooking.pickupLng},${activeBooking.pickupLat};${activeBooking.dropLng},${activeBooking.dropLat}?overview=full&geometries=geojson`
      );

      const routeData = routeRes.data.routes[0];
      setRoute(routeData.geometry.coordinates.map((c) => [c[1], c[0]]));
      setEta(Math.round(routeData.duration / 60));

      // ✅ FIXED: SEND CUSTOMER DETAILS WITH PICKUP STATUS
      stompClient.current?.publish({
        destination: "/app/ride/status",
        body: JSON.stringify({
          bookingId: activeBookingId,
          status: "PICKED_UP",
          driverId,
          customerName: activeBooking.customerName || "N/A",
          customerPhone: activeBooking.customerPhone || "N/A"
        })
      });

      alert("✅ Pickup Complete");
    } catch (error) {
      console.error("Pickup error:", error);
      alert("Pickup update failed");
    }
  };

  // ================= COMPLETE =================
  const completeRide = async () => {
    try {
      await axios.put(`http://localhost:9090/api/bookings/${activeBookingId}/status?status=COMPLETED`);

      // ✅ FIXED: SEND FULL DETAILS WITH COMPLETION (INCLUDING CUSTOMER INFO)
      stompClient.current?.publish({
        destination: "/app/ride/status",
        body: JSON.stringify({
          bookingId: activeBookingId,
          status: "COMPLETED",
          driverId,
          customerName: activeBooking.customerName || "N/A",
          customerPhone: activeBooking.customerPhone || "N/A",
          driverDetails: {
            name: selectedVehicle?.driverName || "N/A",
            phone: selectedVehicle?.driverMobile || "N/A",
            vehicle: selectedVehicle?.vehicleCategory || "N/A",
            license: selectedVehicle?.licenseNumber || "N/A",
            // ✅ CRITICAL: Vehicle number
            vehicleNumber: selectedVehicle?.vehicleNumber || "NOT_SENT",
            vehicleCategory: selectedVehicle?.vehicleCategory || "N/A",
            driverMobile: selectedVehicle?.driverMobile || "N/A"
          }
        })
      });

      setLastCompletedBookingId(activeBookingId);
      setActiveBooking(null);
      setActiveBookingId(null);
      setRoute([]);
      setShowDropLocation(false);
      setPickupCoords(null);
      setDropCoords(null);
      setEta(0);
      setLocationPermission(false);

      alert("🎉 Ride Completed");
      fetchBookings();
    } catch (error) {
      console.error("Complete ride error:", error);
      alert("Ride completion failed");
    }
  };

  // ================= MAP COORDS =================
  useEffect(() => {
    if (activeBooking) {
      setPickupCoords([activeBooking.pickupLat, activeBooking.pickupLng]);
      setDropCoords([activeBooking.dropLat, activeBooking.dropLng]);
    }
  }, [activeBooking]);

  // ================= PAYMENT POLLING =================
  useEffect(() => {
    const bookingToCheck = activeBookingId || lastCompletedBookingId;
    if (!bookingToCheck) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/payments/${bookingToCheck}/status`
        );

        if (res.data && res.data.status === "PAID") {
          setPaymentNotification({
            message: res.data.message || "Payment Received",
            amount: res.data.amount || 0
          });

          clearInterval(interval);
        }
      } catch (error) {
        console.log("Payment polling error:", error.message);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBookingId, lastCompletedBookingId]);

  return (
    <div className="driver-dashboard">
      <DriverNavbar />

      <div className="dashboard-container">
        <div className="debug-panel">
          <strong>🚚 DRIVER STATUS:</strong>
          {" "}WS: {wsConnected ? "🟢 CONNECTED" : "🔴 DISCONNECTED"} |
          {" "}Active: {activeBookingId || "None"} |
          {" "}Location: {locationPermission ? "🟢 GRANTED" : "🔴 DENIED"} |
          {" "}Bookings: {bookings.length}
        </div>

        <div className="driver-info-gradient">
          <div className="driver-info-card-enhanced">
            <h3 className="driver-name-large">
              👨‍✈️ {selectedVehicle?.driverName || "Driver Name"}
            </h3>

            <p className="driver-contact">
              📱 {selectedVehicle?.driverMobile || "No mobile available"}
            </p>

            <select
              className="vehicle-dropdown"
              value={selectedVehicle?.id || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value, 10);
                const v = vehicles.find((vehicle) => vehicle.id === id);
                if (v) {
                  setSelectedVehicle(v);
                }
              }}
              disabled={vehicles.length === 0}
            >
              <option value="">
                {vehicles.length === 0 ? "-- No vehicles available --" : "-- Select Vehicle --"}
              </option>

              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.vehicleNumber} - {v.vehicleCategory || "Unknown"} | {v.licenseNumber || "No License"}
                </option>
              ))}
            </select>

            <p className="driver-vehicle">
              {selectedVehicle ? (
                <>
                  🚚 {selectedVehicle.vehicleNumber} | {selectedVehicle.vehicleCategory} | {selectedVehicle.licenseNumber}
                </>
              ) : (
                "⚠️ No vehicle selected / loaded"
              )}
            </p>
          </div>
        </div>

        <h2 className="dashboard-title">Driver Dashboard 🚚</h2>

        {activeBooking && (
          <div className="active-ride-detailed">
            <div className="ride-header-detailed">
              <h2>🚚 Active Ride #{activeBooking.id}</h2>
              <div className="ride-meta">
                {/* ✅ FIXED: PROMINENT CUSTOMER DISPLAY */}
                <p>
                  <strong>👤 Customer:</strong>{" "}
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {activeBooking.customerName ?? "Unknown Customer"}
                  </span>
                </p>

                <p>
                  <strong>📱 Phone:</strong>{" "}
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {activeBooking.customerPhone ?? "No Phone"}
                  </span>
                </p>


                <p><strong>Pickup:</strong> {activeBooking.pickupLocation}</p>
                <p><strong>Vehicle:</strong> {selectedVehicle?.vehicleNumber || "N/A"}</p>
                <p><strong>Category:</strong> {selectedVehicle?.vehicleCategory || "N/A"}</p>
              </div>
            </div>

            {!showDropLocation && (
              <button
                className="btn btn-orange-large"
                onClick={pickupComplete}
              >
                ✅ Pickup Complete
              </button>
            )}

            {showDropLocation && (
              <div className="ride-complete-section">
                <div className="drop-info">
                  {/* ✅ FIXED: EXTRA PROMINENT CUSTOMER DISPLAY */}
                  {/* <div style={{background: '#e8f5e8', padding: '15px', borderRadius: '10px', marginBottom: '15px'}}>
                    <p style={{fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0'}}>
                      👤 Customer Contact
                    </p>
                    <p style={{fontSize: '18px', margin: '5px 0'}}><strong>Name:</strong> {activeBooking.customerName || "N/A"}</p>
                    <p style={{fontSize: '18px', margin: '5px 0'}}><strong>📱 Mobile:</strong> {activeBooking.customerPhone || "N/A"}</p>
                  </div> */}
                  <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                      👤 Customer Contact
                    </p>
                    {/* <p style={{ fontSize: '18px', margin: '5px 0' }}>
                      <strong>Name:</strong> {activeBooking.customerName ?? "Unknown"}
                    </p>
                    <p style={{ fontSize: '18px', margin: '5px 0' }}>
                      <strong>📱 Mobile:</strong> {activeBooking.customerPhone ?? "No Phone"}
                    </p> */}
                    <p style={{ fontSize: '18px', margin: '5px 0' }}>
                      <strong>Name:</strong> {activeBooking?.customerName || "Unknown"}
                    </p>

                    <p style={{ fontSize: '18px', margin: '5px 0' }}>
                      <strong>📱 Mobile:</strong> {activeBooking?.customerPhone || "No Phone"}
                    </p>
                  </div>
                  <p><strong>📍 Drop:</strong> {activeBooking.dropLocation}</p>

                  <div className="eta-display">
                    <span className="eta-large">{eta} minutes</span>
                    <span className="eta-label">ETA to Destination</span>
                  </div>

                  <div className="amount-display">
                    {/* 💰 ₹{activeBooking.totalAmount?.toFixed(0) || activeBooking.amount?.toFixed(0)} */}
                    {/* {(activeBooking.totalAmount ?? activeBooking.amount ?? 0).toFixed(0)} */}
                    💰 ₹{(activeBooking.totalAmount ?? activeBooking.amount ?? 0).toFixed(0)}
                    <span className="amount-label">Expected Payment</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">🚚 Vehicle No:</span>
                    <span className="detail-value">{selectedVehicle?.vehicleNumber || "N/A"}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">📦 Category:</span>
                    <span className="detail-value">{selectedVehicle?.vehicleCategory || "N/A"}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">🪪 License:</span>
                    <span className="detail-value">{selectedVehicle?.licenseNumber || "N/A"}</span>
                  </div>
                </div>

                <button
                  className="btn btn-blue-complete"
                  onClick={completeRide}
                >
                  🎉 Complete Ride & Wait for Payment
                </button>

                {!locationPermission && (
                  <div className="location-warning">
                    ⚠️ Location permission needed for live tracking
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bookings-section-detailed">
          <h3 className="section-title">
            📋 Available Bookings ({bookings.length})
          </h3>

          {bookings.length === 0 ? (
            <div className="empty-bookings">
              <h3>🎉 No bookings right now</h3>
              <p>Waiting for new ride requests...</p>
            </div>
          ) : (
            <div className="bookings-grid-rich">
              {bookings.map((b) => (
                <div key={b.id} className="booking-card-detailed">
                  <div className="booking-header">
                    <h4>Booking #{b.id}</h4>
                  </div>

                  <div className="booking-route-detailed">
                    <div className="pickup-detailed">
                      <span className="location-icon-large">📍</span>
                      <span>{b.pickupLocation}</span>
                    </div>

                    <div className="route-arrow-large">→</div>

                    <div className="drop-detailed">
                      <span className="location-icon-large">📍</span>
                      <span>{b.dropLocation}</span>
                    </div>
                  </div>

                  <div className="booking-details-rich">

                    {/* 🔥 FINAL FIX: SAFE CUSTOMER NAME */}
                    <div
                      className="detail-row"
                      style={{
                        background: "#e8f5e8",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "10px"
                      }}
                    >
                      <span
                        className="detail-label"
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        👤 Customer:
                      </span>
                      <span
                        className="detail-value"
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        {/* {b.customerName ||
                          b.name ||
                          b.customer_name ||
                          "Unknown Customer"} */}
                        {b.customerName ?? "Unknown Customer"}
                      </span>
                    </div>

                    {/* 🔥 FINAL FIX: SAFE CUSTOMER PHONE */}
                    <div
                      className="detail-row"
                      style={{
                        background: "#e3f2fd",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "10px"
                      }}
                    >
                      <span
                        className="detail-label"
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        📱 Mobile:
                      </span>
                      <span
                        className="detail-value"
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                      >
                        {/* {b.customerPhone ||
                          b.phone ||
                          b.mobile ||
                          b.customer_mobile ||
                          "No Phone"} */}
                        {b.customerPhone ?? "No Phone"}
                      </span>
                    </div>

                    {/* EXISTING DATA */}
                    <div className="detail-row">
                      <span className="detail-label">📏 Distance:</span>
                      <span className="detail-value">
                        {/* {b.distance?.toFixed(1)} km */}
                        {b.distance ? b.distance.toFixed(1) : "0.0"} km
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">💰 Amount:</span>
                      <span className="detail-value">
                        {/* ₹{b.totalAmount || b.amount} */}
                        ₹{b.totalAmount ?? b.amount ?? 0}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">🚚 Vehicle:</span>
                      {/* <span className="detail-value">{b.vehicleType}</span> */}
                      <span className="detail-value">
                        {b.vehicleType || "Not specified"}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">👥 Helpers:</span>
                      <span className="detail-value">
                        {b.helpersRequested || 0}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`btn btn-accept-large ${activeBookingId ? "btn-disabled-large" : ""
                      }`}
                    onClick={() => acceptBooking(b.id)}
                    disabled={activeBookingId || !selectedVehicle}
                  >
                    {activeBookingId
                      ? "🚫 Already on Ride"
                      : !selectedVehicle
                        ? "⚠️ No Vehicle Available"
                        : "✅ ACCEPT BOOKING"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {activeBooking && (
          <>
            <h3 className="map-title">🗺️ Navigation Map</h3>
            <div className="map-section-enhanced">
              <div className="map-container-enhanced">
                <MapContainer
                  center={pickupCoords || cgCenter}
                  zoom={12}
                  style={{ height: "100%" }}
                  className="leaflet-map-enhanced"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {pickupCoords && <Marker position={pickupCoords} icon={pickupIcon} />}
                  {showDropLocation && dropCoords && <Marker position={dropCoords} icon={dropIcon} />}
                  {route.length > 0 && <Polyline positions={route} color="#2196F3" weight={6} />}
                </MapContainer>
              </div>
            </div>
          </>
        )}

        {paymentNotification && (
          <div className="payment-notification-rich">
            <div className="notification-header-rich">
              <span>💰</span>
              <h3>Payment Received</h3>
            </div>
            <p>{paymentNotification.message}</p>
            <div className="payment-amount-large">
              ₹{paymentNotification.amount}
            </div>
            <button
              className="btn btn-payment-dismiss"
              onClick={() => setPaymentNotification(null)}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;



// //-------------------final confirm-----------------------
