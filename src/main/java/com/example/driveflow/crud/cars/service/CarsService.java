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

    public CarsModel findByIdCars(Integer id) {
        return carsRepository.findById(id).orElse(null);
    }

    public CarsModel saveCars(CarsModel carsModel){
        return carsRepository.save(carsModel);
    }

    public CarsModel updateCars(Integer id, CarsModel newCar) {
        CarsModel existingCar = carsRepository.findById(id).orElse(null);

        if (existingCar != null) {
            existingCar.setModel(newCar.getModel());
            existingCar.setManufacturer(newCar.getManufacturer());
            existingCar.setYear(newCar.getYear());
            existingCar.setColor(newCar.getColor());

            return carsRepository.save(existingCar);
        }

        return null;
    }

    public void deleteCars(Integer id) {
        carsRepository.deleteById(id);
    }
}