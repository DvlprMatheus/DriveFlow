package com.example.driveflow.crud.cars.service;

import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.repository.CarsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CarsService {
    @Autowired
    private CarsRepository carsRepository;

    public List<CarsModel> findAllCars(){
        return carsRepository.findAll();
    }

    public CarsModel saveCars(CarsModel carsModel){
        return carsRepository.save(carsModel);
    }
}