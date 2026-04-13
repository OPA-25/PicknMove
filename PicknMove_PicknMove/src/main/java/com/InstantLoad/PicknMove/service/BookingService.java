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
//
//
//
//
//
//package com.InstantLoad.PicknMove.service;
//
//import org.springframework.stereotype.Service;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap; // ✅ ADDED
//
//import com.InstantLoad.PicknMove.repository.BookingRepository;
//import com.InstantLoad.PicknMove.repository.DriverRepository;
//import com.InstantLoad.PicknMove.model.Booking;
//import com.InstantLoad.PicknMove.model.BookingStatus;
//
//@Service
//public class BookingService {
//
//    private final BookingRepository bookingRepo;
//    private final DriverRepository driverRepo;
//    private final NotificationService notificationService;
//
//    public BookingService(
//            BookingRepository bookingRepo,
//            DriverRepository driverRepo,
//            NotificationService notificationService
//    ) {
//        this.bookingRepo = bookingRepo;
//        this.driverRepo = driverRepo;
//        this.notificationService = notificationService;
//    }
//
//    // CREATE BOOKING
//    public Booking createBooking(Booking booking) {
//        booking.setStatus(BookingStatus.CREATED);
//        Booking savedBooking = bookingRepo.save(booking);
//
//        // Notify all drivers about new booking
//        notificationService.broadcastNewBooking(savedBooking);
//        return savedBooking;
//    }
//
//    // GET CREATED BOOKINGS
//    public List<Booking> getCreatedBookings() {
//        return bookingRepo.findByStatus(BookingStatus.CREATED);
//    }
//
//    // ✅ NEW: Get single booking by ID
//    public Booking getBookingById(Long id) {
//        return bookingRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
//    }
//
//    // DRIVER ACCEPT BOOKING
//    public Booking acceptBooking(Long id, Long driverId) {
//        Booking booking = bookingRepo.findById(id).orElseThrow();
//        
//        // Check if already accepted
//        if (booking.getDriverId() != null) {
//            throw new RuntimeException("Booking already accepted");
//        }
//
//        booking.setDriverId(driverId);
//        booking.setStatus(BookingStatus.ACCEPTED);
//        Booking savedBooking = bookingRepo.save(booking);
//
//        // 🔔 SEND NOTIFICATION TO CUSTOMER (FIXED)
//        Map<String, Object> response = new HashMap<String, Object>();
//        response.put("bookingId", savedBooking.getId().toString()); // ✅ IMPORTANT
//        response.put("status", "ACCEPTED");
//        response.put("message", "Driver accepted your ride and will reach soon");
//        response.put("eta", 5);
//
//        notificationService.sendToCustomer(
//                savedBooking.getCustomerId(),
//                response
//        );
//
//        return savedBooking;
//    }
//
//    // UPDATE STATUS
//    public Booking updateStatus(Long id, BookingStatus status) {
//        Booking booking = bookingRepo.findById(id).orElseThrow();
//
//        booking.setStatus(status);
//        Booking savedBooking = bookingRepo.save(booking);
//
//        // Notify customer based on status
//        switch (status) {
//            case PICKED_UP:
//
//                Map<String, Object> pickupResponse = new HashMap<String, Object>();
//                pickupResponse.put("bookingId", savedBooking.getId().toString());
//                pickupResponse.put("status", "PICKED_UP");
//                pickupResponse.put("message", "Goods picked up successfully");
//
//                notificationService.sendToCustomer(
//                        savedBooking.getCustomerId(),
//                        pickupResponse
//                );
//                break;
//
//            case COMPLETED:
//
//                Map<String, Object> completedResponse = new HashMap<String, Object>();
//                completedResponse.put("bookingId", savedBooking.getId().toString());
//                completedResponse.put("status", "COMPLETED");
//                completedResponse.put("message", "Goods delivered successfully");
//
//                notificationService.sendToCustomer(
//                        savedBooking.getCustomerId(),
//                        completedResponse
//                );
//                break; 
//        }
//
//        return savedBooking;
//    }
//}













package com.InstantLoad.PicknMove.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import com.InstantLoad.PicknMove.repository.BookingRepository;
import com.InstantLoad.PicknMove.repository.DriverRepository;
import com.InstantLoad.PicknMove.model.Booking;
import com.InstantLoad.PicknMove.model.BookingStatus;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final DriverRepository driverRepo;
    private final NotificationService notificationService;

    public BookingService(
            BookingRepository bookingRepo,
            DriverRepository driverRepo,
            NotificationService notificationService
    ) {
        this.bookingRepo = bookingRepo;
        this.driverRepo = driverRepo;
        this.notificationService = notificationService;
    }

    // ================= CREATE BOOKING =================
    public Booking createBooking(Booking booking) {
        booking.setStatus(BookingStatus.CREATED);
        Booking savedBooking = bookingRepo.save(booking);

        // Notify all drivers about new booking
        notificationService.broadcastNewBooking(savedBooking);

        return savedBooking;
    }

    // ================= GET CREATED BOOKINGS =================
    public List<Booking> getCreatedBookings() {
        return bookingRepo.findByStatus(BookingStatus.CREATED);
    }

    // ================= GET BOOKING BY ID =================
    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    // ================= ACCEPT BOOKING =================
    public Booking acceptBooking(Long id, Long driverId) {

        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        // Prevent double acceptance
        if (booking.getDriverId() != null) {
            throw new RuntimeException("Booking already accepted");
        }

        booking.setDriverId(driverId);
        booking.setStatus(BookingStatus.ACCEPTED);

        Booking savedBooking = bookingRepo.save(booking);

        // ================= FIX: SEND FULL CUSTOMER DATA =================
        Map<String, Object> response = new HashMap<>();

        response.put("bookingId", savedBooking.getId().toString());
        response.put("status", "ACCEPTED");
        response.put("message", "Driver accepted your ride and will reach soon");
        response.put("eta", 5);

        // 🔥 IMPORTANT FIX: include customer details (if available in Booking table)
        response.put("customerName", savedBooking.getCustomerName());
        response.put("customerPhone", savedBooking.getCustomerPhone());

        notificationService.sendToCustomer(
                savedBooking.getCustomerId(),
                response
        );

        return savedBooking;
    }

    // ================= UPDATE STATUS =================
    public Booking updateStatus(Long id, BookingStatus status) {

        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        booking.setStatus(status);

        Booking savedBooking = bookingRepo.save(booking);

        switch (status) {

            case PICKED_UP -> {
                Map<String, Object> pickupResponse = new HashMap<>();

                pickupResponse.put("bookingId", savedBooking.getId().toString());
                pickupResponse.put("status", "PICKED_UP");
                pickupResponse.put("message", "Goods picked up successfully");

                // optional: customer info
                pickupResponse.put("customerName", savedBooking.getCustomerName());
                pickupResponse.put("customerPhone", savedBooking.getCustomerPhone());

                notificationService.sendToCustomer(
                        savedBooking.getCustomerId(),
                        pickupResponse
                );
            }

            case COMPLETED -> {
                Map<String, Object> completedResponse = new HashMap<>();

                completedResponse.put("bookingId", savedBooking.getId().toString());
                completedResponse.put("status", "COMPLETED");
                completedResponse.put("message", "Goods delivered successfully");

                // optional: customer info
                completedResponse.put("customerName", savedBooking.getCustomerName());
                completedResponse.put("customerPhone", savedBooking.getCustomerPhone());

                notificationService.sendToCustomer(
                        savedBooking.getCustomerId(),
                        completedResponse
                );
            }
        }

        return savedBooking;
    }
}