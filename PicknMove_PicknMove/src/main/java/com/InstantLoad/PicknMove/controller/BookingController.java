


package com.InstantLoad.PicknMove.controller;

import org.springframework.web.bind.annotation.*;
import com.InstantLoad.PicknMove.service.BookingService;
import com.InstantLoad.PicknMove.model.Booking;
import com.InstantLoad.PicknMove.model.BookingStatus;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")  // ✅ FIXED: Specific origin (no "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/created")
    public List<Booking> getCreated() {
        return bookingService.getCreatedBookings();
    }

    // ✅ NEW: GET single booking by ID
    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PutMapping("/{id}/accept/{driverId}")
    public Booking accept(@PathVariable Long id, @PathVariable Long driverId) {
        return bookingService.acceptBooking(id, driverId);
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status
    ) {
        return bookingService.updateStatus(id, status);
    }
}
