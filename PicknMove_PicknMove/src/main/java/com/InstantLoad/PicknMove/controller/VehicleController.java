
package com.InstantLoad.PicknMove.controller;

import org.springframework.web.bind.annotation.*;
import com.InstantLoad.PicknMove.service.VehicleService;
import com.InstantLoad.PicknMove.model.Vehicle;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }

    // Add vehicle
    @PostMapping("/{driverId}/vehicle")
    public Vehicle addVehicle(
            @PathVariable Long driverId,
            @RequestBody Vehicle vehicle
    ){
        return vehicleService.addVehicle(driverId, vehicle);
    }

    // Get vehicles of driver
    @GetMapping("/{driverId}/vehicles")
    public List<Vehicle> getVehicles(@PathVariable Long driverId){
        return vehicleService.getVehiclesByDriver(driverId);
    }
 // Update vehicle
    @PutMapping("/vehicle/{vehicleId}")
    public Vehicle updateVehicle(
            @PathVariable Long vehicleId,
            @RequestBody Vehicle updatedVehicle
    ){
        return vehicleService.updateVehicle(vehicleId, updatedVehicle);
    }


    // Delete vehicle
    @DeleteMapping("/vehicle/{vehicleId}")
    public String deleteVehicle(
            @PathVariable Long vehicleId
    ){
        vehicleService.deleteVehicle(vehicleId);
        return "Vehicle deleted successfully";
    }
}