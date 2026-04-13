package com.InstantLoad.PicknMove.controller;



import com.InstantLoad.PicknMove.model.DriverLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class LocationWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/driver-location")
    public void sendLocation(DriverLocation location) {

        messagingTemplate.convertAndSend(
                "/topic/location/" + location.getBookingId(),
                location
        );
    }
}