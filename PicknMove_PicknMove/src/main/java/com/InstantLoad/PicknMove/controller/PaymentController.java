//package com.InstantLoad.PicknMove.controller;
//
//
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/payments")
//@CrossOrigin(origins = "*") // allow frontend (React)
//public class PaymentController {
//
//    // 💵 CASH PAYMENT
//    @PostMapping("/{bookingId}/cash")
//    public ResponseEntity<?> payByCash(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("💵 Cash Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        return ResponseEntity.ok("Cash Payment Successful");
//    }
//
//    // 🏧 UPI PAYMENT
//    @PostMapping("/{bookingId}/upi")
//    public ResponseEntity<?> payByUpi(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("🏧 UPI Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        return ResponseEntity.ok("UPI Payment Successful");
//    }
//}



//
//package com.InstantLoad.PicknMove.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/payments")
//
//// 🔥 FIX: replace "*" with specific origin
//@CrossOrigin(origins = "http://localhost:3000")
//public class PaymentController {
//
//    // 💵 CASH PAYMENT
//    @PostMapping("/{bookingId}/cash")
//    public ResponseEntity<?> payByCash(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("💵 Cash Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        return ResponseEntity.ok("Cash Payment Successful");
//    }
//
//    // 🏧 UPI PAYMENT
//    @PostMapping("/{bookingId}/upi")
//    public ResponseEntity<?> payByUpi(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("🏧 UPI Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        return ResponseEntity.ok("UPI Payment Successful");
//    }
//}










//
//
//package com.InstantLoad.PicknMove.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
//@RestController
//@RequestMapping("/api/payments")
//@CrossOrigin(origins = "http://localhost:3000")
//public class PaymentController {
//
//    // 🔥 IN-MEMORY STORAGE (bookingId → payment message)
//    private static final Map<Long, String> paymentStatusMap = new ConcurrentHashMap<>();
//
//    // 💵 CASH PAYMENT
//    @PostMapping("/{bookingId}/cash")
//    public ResponseEntity<?> payByCash(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("💵 Cash Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        Object amountObj = payload.get("amount");
//        String amount = amountObj != null ? amountObj.toString() : "0";
//
//        // 🔥 SAVE STATUS
//        String message = "Customer gave cash ₹" + amount;
//        paymentStatusMap.put(bookingId, message);
//
//        return ResponseEntity.ok("Cash Payment Successful");
//    }
//
//    // 🏧 UPI PAYMENT
//    @PostMapping("/{bookingId}/upi")
//    public ResponseEntity<?> payByUpi(
//            @PathVariable Long bookingId,
//            @RequestBody Map<String, Object> payload) {
//
//        System.out.println("🏧 UPI Payment Received");
//        System.out.println("Booking ID: " + bookingId);
//        System.out.println("Payload: " + payload);
//
//        Object amountObj = payload.get("amount");
//        String amount = amountObj != null ? amountObj.toString() : "0";
//
//        String message = "Customer paid via UPI ₹" + amount;
//        paymentStatusMap.put(bookingId, message);
//
//        return ResponseEntity.ok("UPI Payment Successful");
//    }
//
//    // 🔥 DRIVER FETCH PAYMENT STATUS
//    @GetMapping("/{bookingId}/status")
//    public ResponseEntity<?> getPaymentStatus(@PathVariable Long bookingId) {
//
//        String message = paymentStatusMap.get(bookingId);
//
//        if (message == null) {
//            return ResponseEntity.ok(Map.of("status", "PENDING"));
//        }
//
//        return ResponseEntity.ok(Map.of(
//                "status", "PAID",
//                "message", message
//        ));
//    }
//}


















package com.InstantLoad.PicknMove.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    // 🔥 IN-MEMORY STORAGE (bookingId → payment message)
    private static final Map<Long, String> paymentStatusMap = new ConcurrentHashMap<>();

    // 💵 CASH PAYMENT
    @PostMapping("/{bookingId}/cash")
    public ResponseEntity<?> payByCash(
            @PathVariable Long bookingId,
            @RequestBody Map<String, Object> payload) {

        System.out.println("💵 Cash Payment Received");
        System.out.println("Booking ID: " + bookingId);
        System.out.println("Payload: " + payload);

        Object amountObj = payload.get("amount");
        String amount = amountObj != null ? amountObj.toString() : "0";

        // 🔥 SAVE STATUS
        String message = "Customer gave cash ₹" + amount;
        paymentStatusMap.put(bookingId, message);

        return ResponseEntity.ok("Cash Payment Successful");
    }

    // 🏧 UPI PAYMENT
    @PostMapping("/{bookingId}/upi")
    public ResponseEntity<?> payByUpi(
            @PathVariable Long bookingId,
            @RequestBody Map<String, Object> payload) {

        System.out.println("🏧 UPI Payment Received");
        System.out.println("Booking ID: " + bookingId);
        System.out.println("Payload: " + payload);

        Object amountObj = payload.get("amount");
        String amount = amountObj != null ? amountObj.toString() : "0";

        String message = "Customer paid via UPI ₹" + amount;
        paymentStatusMap.put(bookingId, message);

        return ResponseEntity.ok("UPI Payment Successful");
    }

    // 🔥 DRIVER FETCH PAYMENT STATUS
    @GetMapping("/{bookingId}/status")
    public ResponseEntity<?> getPaymentStatus(@PathVariable Long bookingId) {

        String message = paymentStatusMap.get(bookingId);

        if (message == null) {
            return ResponseEntity.ok(Map.of("status", "PENDING"));
        }

        // 🔥 ADDED: EXTRACT AMOUNT FROM MESSAGE
        String amount = "0";
        try {
            amount = message.replaceAll("[^0-9]", ""); // keep only numbers
        } catch (Exception e) {
            amount = "0";
        }

        return ResponseEntity.ok(Map.of(
                "status", "PAID",
                "message", message,
                "amount", amount   // 🔥 ADDED FIELD
        ));
    }
}