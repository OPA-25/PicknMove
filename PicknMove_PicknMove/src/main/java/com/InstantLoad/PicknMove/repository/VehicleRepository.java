package com.InstantLoad.PicknMove.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.InstantLoad.PicknMove.model.Vehicle;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByDriverId(Long driverId);

}
