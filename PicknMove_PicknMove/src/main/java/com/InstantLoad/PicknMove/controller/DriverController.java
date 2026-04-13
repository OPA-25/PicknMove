



























package com.InstantLoad.PicknMove.controller;

import org.springframework.web.bind.annotation.*;
import com.InstantLoad.PicknMove.service.DriverService;
import com.InstantLoad.PicknMove.model.Driver;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    // Update driver live location
    @PutMapping("/{id}/location")
    public Driver updateLocation(
            @PathVariable Long id,
            @RequestParam Double lat,
            @RequestParam Double lng
    ) {
        return driverService.updateLocation(id, lat, lng);
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public Driver getDriver(@PathVariable Long id) {
        return driverService.getDriver(id);
    }
}