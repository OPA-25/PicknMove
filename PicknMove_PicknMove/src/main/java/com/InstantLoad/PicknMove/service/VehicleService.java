//
//
//
//
//
//
//
//
//
//
//
//package com.InstantLoad.PicknMove.service;
//
//import org.springframework.stereotype.Service;
//import com.InstantLoad.PicknMove.repository.VehicleRepository;
//import com.InstantLoad.PicknMove.model.Vehicle;
//
//import java.util.List;
//
//@Service
//public class VehicleService {
//
//    private final VehicleRepository vehicleRepository;
//
//    public VehicleService(VehicleRepository vehicleRepository){
//        this.vehicleRepository = vehicleRepository;
//    }
//
//    // ADD VEHICLE WITH DRIVER ID
//    public Vehicle addVehicle(Long driverId, Vehicle vehicle){
//
//        // attach driver id
//        vehicle.setDriverId(driverId);
//
//        return vehicleRepository.save(vehicle);
//    }
//
//    // GET VEHICLES OF DRIVER
//    public List<Vehicle> getVehiclesByDriver(Long driverId){
//        return vehicleRepository.findByDriverId(driverId);
//    }
//    
// // UPDATE VEHICLE
//    public Vehicle updateVehicle(Long vehicleId, Vehicle updatedVehicle){
//
//        Vehicle existingVehicle = vehicleRepository.findById(vehicleId)
//                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
//
//        existingVehicle.setVehicleNumber(updatedVehicle.getVehicleNumber());
//        existingVehicle.setLicenseNumber(updatedVehicle.getLicenseNumber());
//        existingVehicle.setVehicleCategory(updatedVehicle.getVehicleCategory());
//        existingVehicle.setPayloadCapacity(updatedVehicle.getPayloadCapacity());
//        existingVehicle.setVehicleImage(updatedVehicle.getVehicleImage());
//        existingVehicle.setLicenseImage(updatedVehicle.getLicenseImage());
//
//        return vehicleRepository.save(existingVehicle);
//    }
//
//
//    // DELETE VEHICLE
//    public void deleteVehicle(Long vehicleId){
//
//        vehicleRepository.deleteById(vehicleId);
//    }
//}











package com.InstantLoad.PicknMove.service;

import org.springframework.stereotype.Service;
import com.InstantLoad.PicknMove.repository.VehicleRepository;
import com.InstantLoad.PicknMove.model.Vehicle;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    // ADD VEHICLE WITH DRIVER ID
    public Vehicle addVehicle(Long driverId, Vehicle vehicle){

        vehicle.setDriverId(driverId);

        return vehicleRepository.save(vehicle);
    }

    // GET VEHICLES OF DRIVER
    public List<Vehicle> getVehiclesByDriver(Long driverId){
        return vehicleRepository.findByDriverId(driverId);
    }

    // UPDATE VEHICLE
    public Vehicle updateVehicle(Long vehicleId, Vehicle updatedVehicle){

        Vehicle existingVehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        existingVehicle.setVehicleNumber(updatedVehicle.getVehicleNumber());
        existingVehicle.setLicenseNumber(updatedVehicle.getLicenseNumber());
        existingVehicle.setVehicleCategory(updatedVehicle.getVehicleCategory());
        existingVehicle.setPayloadCapacity(updatedVehicle.getPayloadCapacity());
        existingVehicle.setVehicleImage(updatedVehicle.getVehicleImage());
        existingVehicle.setLicenseImage(updatedVehicle.getLicenseImage());

        // ✅ UPDATE NEW FIELDS ALSO
        existingVehicle.setDriverName(updatedVehicle.getDriverName());
        existingVehicle.setDriverMobile(updatedVehicle.getDriverMobile());

        return vehicleRepository.save(existingVehicle);
    }

    // DELETE VEHICLE
    public void deleteVehicle(Long vehicleId){
        vehicleRepository.deleteById(vehicleId);
    }
}