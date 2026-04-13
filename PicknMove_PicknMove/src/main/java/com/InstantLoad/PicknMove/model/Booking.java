//
//
//
//
//package com.InstantLoad.PicknMove.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//public class Booking {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private Long customerId;
//    private Long driverId;
//
//    // Pickup & Drop
//    private String pickupLocation;
//    private String dropLocation;
//
//    // Coordinates
//    private Double pickupLat;
//    private Double pickupLng;
//    private Double dropLat;
//    private Double dropLng;
//
//    private Double distance;
//    private String vehicleType;
//    private Integer helpersRequested;
//    private Double totalAmount;
//
//    // ✅ ENUM STATUS
//    @Enumerated(EnumType.STRING)
//    private BookingStatus status;
//
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getCustomerId() {
//        return customerId;
//    }
//
//    public void setCustomerId(Long customerId) {
//        this.customerId = customerId;
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
//    public String getPickupLocation() {
//        return pickupLocation;
//    }
//
//    public void setPickupLocation(String pickupLocation) {
//        this.pickupLocation = pickupLocation;
//    }
//
//    public String getDropLocation() {
//        return dropLocation;
//    }
//
//    public void setDropLocation(String dropLocation) {
//        this.dropLocation = dropLocation;
//    }
//
//    public Double getPickupLat() {
//        return pickupLat;
//    }
//
//    public void setPickupLat(Double pickupLat) {
//        this.pickupLat = pickupLat;
//    }
//
//    public Double getPickupLng() {
//        return pickupLng;
//    }
//
//    public void setPickupLng(Double pickupLng) {
//        this.pickupLng = pickupLng;
//    }
//
//    public Double getDropLat() {
//        return dropLat;
//    }
//
//    public void setDropLat(Double dropLat) {
//        this.dropLat = dropLat;
//    }
//
//    public Double getDropLng() {
//        return dropLng;
//    }
//
//    public void setDropLng(Double dropLng) {
//        this.dropLng = dropLng;
//    }
//
//    public Double getDistance() {
//        return distance;
//    }
//
//    public void setDistance(Double distance) {
//        this.distance = distance;
//    }
//
//    public String getVehicleType() {
//        return vehicleType;
//    }
//
//    public void setVehicleType(String vehicleType) {
//        this.vehicleType = vehicleType;
//    }
//
//    public Integer getHelpersRequested() {
//        return helpersRequested;
//    }
//
//    public void setHelpersRequested(Integer helpersRequested) {
//        this.helpersRequested = helpersRequested;
//    }
//
//    public Double getTotalAmount() {
//        return totalAmount;
//    }
//
//    public void setTotalAmount(Double totalAmount) {
//        this.totalAmount = totalAmount;
//    }
//
//    // ✅ FIXED GETTER
//    public BookingStatus getStatus() {
//        return status;
//    }
//
//    // ✅ FIXED SETTER
//    public void setStatus(BookingStatus status) {
//        this.status = status;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//}







package com.InstantLoad.PicknMove.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    // ✅ ADD THIS (NEW FIELDS)
    private String customerName;
    private String customerPhone;

    private Long driverId;

    // Pickup & Drop
    private String pickupLocation;
    private String dropLocation;

    // Coordinates
    private Double pickupLat;
    private Double pickupLng;
    private Double dropLat;
    private Double dropLng;

    private Double distance;
    private String vehicleType;
    private Integer helpersRequested;
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();

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
	 * @return the customerId
	 */
	public Long getCustomerId() {
		return customerId;
	}

	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	/**
	 * @return the customerName
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * @param customerName the customerName to set
	 */
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * @return the customerPhone
	 */
	public String getCustomerPhone() {
		return customerPhone;
	}

	/**
	 * @param customerPhone the customerPhone to set
	 */
	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}

	/**
	 * @return the driverId
	 */
	public Long getDriverId() {
		return driverId;
	}

	/**
	 * @param driverId the driverId to set
	 */
	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}

	/**
	 * @return the pickupLocation
	 */
	public String getPickupLocation() {
		return pickupLocation;
	}

	/**
	 * @param pickupLocation the pickupLocation to set
	 */
	public void setPickupLocation(String pickupLocation) {
		this.pickupLocation = pickupLocation;
	}

	/**
	 * @return the dropLocation
	 */
	public String getDropLocation() {
		return dropLocation;
	}

	/**
	 * @param dropLocation the dropLocation to set
	 */
	public void setDropLocation(String dropLocation) {
		this.dropLocation = dropLocation;
	}

	/**
	 * @return the pickupLat
	 */
	public Double getPickupLat() {
		return pickupLat;
	}

	/**
	 * @param pickupLat the pickupLat to set
	 */
	public void setPickupLat(Double pickupLat) {
		this.pickupLat = pickupLat;
	}

	/**
	 * @return the pickupLng
	 */
	public Double getPickupLng() {
		return pickupLng;
	}

	/**
	 * @param pickupLng the pickupLng to set
	 */
	public void setPickupLng(Double pickupLng) {
		this.pickupLng = pickupLng;
	}

	/**
	 * @return the dropLat
	 */
	public Double getDropLat() {
		return dropLat;
	}

	/**
	 * @param dropLat the dropLat to set
	 */
	public void setDropLat(Double dropLat) {
		this.dropLat = dropLat;
	}

	/**
	 * @return the dropLng
	 */
	public Double getDropLng() {
		return dropLng;
	}

	/**
	 * @param dropLng the dropLng to set
	 */
	public void setDropLng(Double dropLng) {
		this.dropLng = dropLng;
	}

	/**
	 * @return the distance
	 */
	public Double getDistance() {
		return distance;
	}

	/**
	 * @param distance the distance to set
	 */
	public void setDistance(Double distance) {
		this.distance = distance;
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
	 * @return the helpersRequested
	 */
	public Integer getHelpersRequested() {
		return helpersRequested;
	}

	/**
	 * @param helpersRequested the helpersRequested to set
	 */
	public void setHelpersRequested(Integer helpersRequested) {
		this.helpersRequested = helpersRequested;
	}

	/**
	 * @return the totalAmount
	 */
	public Double getTotalAmount() {
		return totalAmount;
	}

	/**
	 * @param totalAmount the totalAmount to set
	 */
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	/**
	 * @return the status
	 */
	public BookingStatus getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(BookingStatus status) {
		this.status = status;
	}

	/**
	 * @return the createdAt
	 */
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	/**
	 * @param createdAt the createdAt to set
	 */
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    // getters & setters (keep yours OR Lombok @Data handles it)
    
}