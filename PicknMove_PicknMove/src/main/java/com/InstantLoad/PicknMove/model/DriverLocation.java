package com.InstantLoad.PicknMove.model;







public class DriverLocation {
    private Long bookingId;
    private Double lat;
    private Double lng;

    // Constructors, getters, setters
    public DriverLocation() {}

    public DriverLocation(Long bookingId, Double lat, Double lng) {
        this.bookingId = bookingId;
        this.lat = lat;
        this.lng = lng;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    
    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }
    
    public Double getLng() { return lng; }
    public void setLng(Double lng) { this.lng = lng; }
}


