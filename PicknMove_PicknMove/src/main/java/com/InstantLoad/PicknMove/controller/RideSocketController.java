//
//
//
//
//
//
//package com.InstantLoad.PicknMove.controller;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.stereotype.Controller;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//
//import java.util.Map;
//import java.util.HashMap;
//
//@Controller
//public class RideSocketController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public RideSocketController(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @MessageMapping("/ride/status")
//    public void rideStatus(Map<String, Object> payload) {
//        System.out.println("📨 STATUS RECEIVED: " + payload);
//
//        String bookingId = payload.get("bookingId").toString();
//
//        // ✅ Explicit Map creation (no ambiguity)
//        Map<String, Object> response = new HashMap<String, Object>();
//        response.putAll(payload);
//
//        // ✅ CAST TO OBJECT (MAIN FIX)
//        messagingTemplate.convertAndSend(
//                "/topic/ride-status/" + bookingId,
//                (Object) response
//        );
//    }
//
//    @MessageMapping("/ride/driver-location")
//    public void driverLocation(Map<String, Object> payload) {
//        System.out.println("📍 LOCATION RECEIVED: " + payload);
//
//        String bookingId = payload.get("bookingId").toString();
//
//        Map<String, Object> response = new HashMap<String, Object>();
//        response.putAll(payload);
//
//        messagingTemplate.convertAndSend(
//                "/topic/driver-location/" + bookingId,
//                (Object) response
//        );
//    }
//
//    @MessageMapping("/booking/new")
//    public void newBooking(Map<String, Object> payload) {
//        System.out.println("🆕 NEW BOOKING: " + payload);
//
//        Map<String, Object> response = new HashMap<String, Object>();
//        response.putAll(payload);
//
//        messagingTemplate.convertAndSend(
//                "/topic/driver/new-booking",
//                (Object) response
//        );
//    }
//}





package com.InstantLoad.PicknMove.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Map;
import java.util.HashMap;

@Controller
public class RideSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public RideSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/ride/status")
    public void rideStatus(Map<String, Object> payload) {
        System.out.println("📨 STATUS RECEIVED: " + payload);

        // ✅ DEBUG START (ADDED - NO REMOVAL)
        try {
            Object driverDetailsObj = payload.get("driverDetails");

            if (driverDetailsObj != null) {
                Map<String, Object> driverDetails = (Map<String, Object>) driverDetailsObj;

                System.out.println("🚚 DriverDetails FULL: " + driverDetails);

                if (driverDetails.get("vehicleNumber") != null) {
                    System.out.println("✅ VEHICLE NUMBER RECEIVED: " + driverDetails.get("vehicleNumber"));
                } else {
                    System.out.println("❌ VEHICLE NUMBER MISSING IN driverDetails");
                }

                // 🔍 EXTRA CHECK (snake_case issue)
                if (driverDetails.get("vehicle_number") != null) {
                    System.out.println("⚠️ FOUND vehicle_number (snake_case): " + driverDetails.get("vehicle_number"));
                }

            } else {
                System.out.println("❌ driverDetails OBJECT MISSING IN PAYLOAD");
            }
        } catch (Exception e) {
            System.out.println("❌ ERROR READING driverDetails: " + e.getMessage());
        }
        // ✅ DEBUG END

        String bookingId = payload.get("bookingId").toString();

        // ✅ Explicit Map creation (no ambiguity)
        Map<String, Object> response = new HashMap<String, Object>();
        response.putAll(payload);

        // ✅ CAST TO OBJECT (MAIN FIX - already present)
        messagingTemplate.convertAndSend(
                "/topic/ride-status/" + bookingId,
                (Object) response
        );
    }

    @MessageMapping("/ride/driver-location")
    public void driverLocation(Map<String, Object> payload) {
        System.out.println("📍 LOCATION RECEIVED: " + payload);

        String bookingId = payload.get("bookingId").toString();

        Map<String, Object> response = new HashMap<String, Object>();
        response.putAll(payload);

        messagingTemplate.convertAndSend(
                "/topic/driver-location/" + bookingId,
                (Object) response
        );
    }

    @MessageMapping("/booking/new")
    public void newBooking(Map<String, Object> payload) {
        System.out.println("🆕 NEW BOOKING: " + payload);

        Map<String, Object> response = new HashMap<String, Object>();
        response.putAll(payload);

        messagingTemplate.convertAndSend(
                "/topic/driver/new-booking",
                (Object) response
        );
    }
}