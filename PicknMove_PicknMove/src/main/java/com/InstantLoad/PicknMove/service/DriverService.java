
























package com.InstantLoad.PicknMove.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.InstantLoad.PicknMove.model.Driver;
import com.InstantLoad.PicknMove.repository.DriverRepository;

@Service
public class DriverService {

    private final DriverRepository driverRepo;

    // Constructor Injection
    public DriverService(DriverRepository driverRepo) {
        this.driverRepo = driverRepo;
    }

    // 1️⃣ Save Driver (Register Driver)
    public Driver saveDriver(Driver driver) {
        return driverRepo.save(driver);
    }

    // 2️⃣ Get Driver By ID
    public Driver getDriver(Long id) {

        return driverRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Driver not found with id: " + id)
                );
    }

    // 3️⃣ Update Driver Location (Latitude & Longitude)
    public Driver updateLocation(Long id, Double lat, Double lng) {

        Driver driver = driverRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Driver not found with id: " + id)
                );

        driver.setLatitude(lat);
        driver.setLongitude(lng);

        return driverRepo.save(driver);
    }

    // 4️⃣ Add Vehicle Details To Driver
    public Driver addVehicle(Long id, Driver vehicleData) {

        Driver driver = driverRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Driver not found with id: " + id)
                );

        // Vehicle Information
        driver.setVehicleNumber(vehicleData.getVehicleNumber());
        driver.setLicenseNumber(vehicleData.getLicenseNumber());
        driver.setVehicleCategory(vehicleData.getVehicleCategory());
        driver.setPayloadCapacity(vehicleData.getPayloadCapacity());

        // Images
        driver.setVehicleImage(vehicleData.getVehicleImage());
        driver.setLicenseImage(vehicleData.getLicenseImage());

        return driverRepo.save(driver);
    }

    // 5️⃣ Get Driver Vehicle Details
    public Driver getDriverVehicle(Long id) {

        Driver driver = driverRepo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Driver not found with id: " + id)
                );

        return driver;
    }

    // 6️⃣ Get All Drivers
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

}