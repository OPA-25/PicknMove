// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Register from "./pages/Register";
// import Login from "./pages/Login";

// import CustomerHome from "./pages/customer/CustomerHome";
// import DriverHome from "./pages/driver/DriverHome";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* CUSTOMER */}
//         <Route path="/customer/home" element={<CustomerHome />} />

//         {/* DRIVER */}
//         <Route path="/driver/home" element={<DriverHome />} />

//         <Route path="*" element={<h2>404 Page Not Found</h2>} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import CustomerHome from "./pages/customer/CustomerHome";
import DriverHome from "./pages/driver/DriverHome";

/* ✅ ADDED IMPORTS */
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AddVehicle from "./pages/driver/AddVehicle";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER */}
        <Route path="/customer/home" element={<CustomerHome />} />

        {/* DRIVER */}
        <Route path="/driver/home" element={<DriverHome />} />

        /* ✅ ADDED NEW ROUTES */
        <Route path="/customer/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/driver/driverdashboard" element={<DriverDashboard />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />

      </Routes>
    </Router>
  );
}

export default App;