	package com.InstantLoad.PicknMove.repository;
	
	import org.springframework.data.jpa.repository.JpaRepository;
	import com.InstantLoad.PicknMove.model.Driver;
	import java.util.List;
	
	public interface DriverRepository extends JpaRepository<Driver, Long> {
	
	    List<Driver> findByOnlineTrue();
	
	}