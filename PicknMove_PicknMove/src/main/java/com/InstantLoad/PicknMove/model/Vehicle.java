//package com.InstantLoad.PicknMove.model;
//
//
//
//import jakarta.persistence.*;
//
//@Entity
//public class Vehicle {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String vehicleNumber;
//    private String licenseNumber;
//    private String vehicleCategory;
//    private String payloadCapacity;
//    private String vehicleImage;
//    private String licenseImage;
//
//    private Long driverId;
//
//    public Vehicle(){}
//
//    public Long getId() {
//        return id;
//    }
//
//    public Long getDriverId() {
//        return driverId;
//    }
//
//    public void setDriverId(Long driverId) {
//        this.driverId = driverId;
//    }
//
//    public String getVehicleNumber() {
//        return vehicleNumber;
//    }
//
//    public void setVehicleNumber(String vehicleNumber) {
//        this.vehicleNumber = vehicleNumber;
//    }
//
//    public String getLicenseNumber() {
//        return licenseNumber;
//    }
//
//    public void setLicenseNumber(String licenseNumber) {
//        this.licenseNumber = licenseNumber;
//    }
//
//    public String getVehicleCategory() {
//        return vehicleCategory;
//    }
//
//    public void setVehicleCategory(String vehicleCategory) {
//        this.vehicleCategory = vehicleCategory;
//    }
//
//    public String getPayloadCapacity() {
//        return payloadCapacity;
//    }
//
//    public void setPayloadCapacity(String payloadCapacity) {
//        this.payloadCapacity = payloadCapacity;
//    }
//
//    public String getVehicleImage() {
//        return vehicleImage;
//    }
//
//    public void setVehicleImage(String vehicleImage) {
//        this.vehicleImage = vehicleImage;
//    }
//
//    public String getLicenseImage() {
//        return licenseImage;
//    }
//
//    public void setLicenseImage(String licenseImage) {
//        this.licenseImage = licenseImage;
//    }
//}








package com.InstantLoad.PicknMove.model;

import jakarta.persistence.*;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNumber;
    private String licenseNumber;
    private String vehicleCategory;
    private String payloadCapacity;
    private String vehicleImage;
    private String licenseImage;

    private Long driverId;

    // ✅ NEW FIELDS
    private String driverName;
    private String driverMobile;

    public Vehicle(){}

    public Long getId() {
        return id;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getVehicleCategory() {
        return vehicleCategory;
    }

    public void setVehicleCategory(String vehicleCategory) {
        this.vehicleCategory = vehicleCategory;
    }

    public String getPayloadCapacity() {
        return payloadCapacity;
    }

    public void setPayloadCapacity(String payloadCapacity) {
        this.payloadCapacity = payloadCapacity;
    }

    public String getVehicleImage() {
        return vehicleImage;
    }

    public void setVehicleImage(String vehicleImage) {
        this.vehicleImage = vehicleImage;
    }

    public String getLicenseImage() {
        return licenseImage;
    }

    public void setLicenseImage(String licenseImage) {
        this.licenseImage = licenseImage;
    }

    // ✅ NEW GETTERS & SETTERS
    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverMobile() {
        return driverMobile;
    }

    public void setDriverMobile(String driverMobile) {
        this.driverMobile = driverMobile;
    }
}