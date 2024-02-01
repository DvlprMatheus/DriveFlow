package com.example.driveflow.crud.cars.repository;

import com.example.driveflow.crud.cars.model.CarsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarsRepository extends JpaRepository<CarsModel, Integer> {
}
