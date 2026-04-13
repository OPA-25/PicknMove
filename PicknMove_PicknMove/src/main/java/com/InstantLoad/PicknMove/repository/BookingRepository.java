




package com.InstantLoad.PicknMove.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.InstantLoad.PicknMove.model.Booking;
import com.InstantLoad.PicknMove.model.BookingStatus;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatus(BookingStatus status);

}