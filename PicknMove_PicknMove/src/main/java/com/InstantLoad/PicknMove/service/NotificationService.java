




package com.InstantLoad.PicknMove.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class NotificationService {

    private final SimpMessagingTemplate template;

    public NotificationService(SimpMessagingTemplate template) {
        this.template = template;
    }

    // Send to specific customer
    public void sendToCustomer(Long customerId, Object message) {
        template.convertAndSend("/topic/customer/" + customerId, message);
    }

    // Send to specific driver
    public void sendToDriver(Long driverId, Object message) {
        template.convertAndSend("/topic/driver/" + driverId, message);
    }

    // Broadcast new booking to all drivers
    public void broadcastNewBooking(Object booking) {
        template.convertAndSend("/topic/driver/new-booking", booking);
    }
}
