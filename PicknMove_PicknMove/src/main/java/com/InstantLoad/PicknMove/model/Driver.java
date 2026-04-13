



package com.InstantLoad.PicknMove.model;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String vehicleType;
    private String vehicleNumber;
    private Integer helperAvailable;
    private Double helperCharge;
    private Double latitude;
    private Double longitude;
    private Boolean online = false;
    private String licenseNumber;
    private String licenseImage;

    private String vehicleCategory;
    private Double payloadCapacity;

    private String vehicleImage;
	/**
	 * @return the licenseNumber
	 */
	public String getLicenseNumber() {
		return licenseNumber;
	}
	/**
	 * @param licenseNumber the licenseNumber to set
	 */
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	/**
	 * @return the licenseImage
	 */
	public String getLicenseImage() {
		return licenseImage;
	}
	/**
	 * @param licenseImage the licenseImage to set
	 */
	public void setLicenseImage(String licenseImage) {
		this.licenseImage = licenseImage;
	}
	/**
	 * @return the vehicleCategory
	 */
	public String getVehicleCategory() {
		return vehicleCategory;
	}
	/**
	 * @param vehicleCategory the vehicleCategory to set
	 */
	public void setVehicleCategory(String vehicleCategory) {
		this.vehicleCategory = vehicleCategory;
	}
	/**
	 * @return the payloadCapacity
	 */
	public Double getPayloadCapacity() {
		return payloadCapacity;
	}
	/**
	 * @param payloadCapacity the payloadCapacity to set
	 */
	public void setPayloadCapacity(Double payloadCapacity) {
		this.payloadCapacity = payloadCapacity;
	}
	/**
	 * @return the vehicleImage
	 */
	public String getVehicleImage() {
		return vehicleImage;
	}
	/**
	 * @param vehicleImage the vehicleImage to set
	 */
	public void setVehicleImage(String vehicleImage) {
		this.vehicleImage = vehicleImage;
	}
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	/**
	 * @return the vehicleType
	 */
	public String getVehicleType() {
		return vehicleType;
	}
	/**
	 * @param vehicleType the vehicleType to set
	 */
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	/**
	 * @return the vehicleNumber
	 */
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	/**
	 * @param vehicleNumber the vehicleNumber to set
	 */
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	/**
	 * @return the helperAvailable
	 */
	public Integer getHelperAvailable() {
		return helperAvailable;
	}
	/**
	 * @param helperAvailable the helperAvailable to set
	 */
	public void setHelperAvailable(Integer helperAvailable) {
		this.helperAvailable = helperAvailable;
	}
	/**
	 * @return the helperCharge
	 */
	public Double getHelperCharge() {
		return helperCharge;
	}
	/**
	 * @param helperCharge the helperCharge to set
	 */
	public void setHelperCharge(Double helperCharge) {
		this.helperCharge = helperCharge;
	}
	/**
	 * @return the latitude
	 */
	public Double getLatitude() {
		return latitude;
	}
	/**
	 * @param latitude the latitude to set
	 */
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	/**
	 * @return the longitude
	 */
	public Double getLongitude() {
		return longitude;
	}
	/**
	 * @param longitude the longitude to set
	 */
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	/**
	 * @return the online
	 */
	public Boolean getOnline() {
		return online;
	}
	/**
	 * @param online the online to set
	 */
	public void setOnline(Boolean online) {
		this.online = online;
	}
    
    
}
