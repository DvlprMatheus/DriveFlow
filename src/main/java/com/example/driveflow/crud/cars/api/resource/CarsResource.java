package com.example.driveflow.crud.cars.api.resource;

import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.service.CarsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@Slf4j
public class CarsResource {
    @Autowired
    private CarsService carsService;

    @GetMapping("/all")
    public ResponseEntity<List<CarsModel>> findAllCars(){
       return new ResponseEntity<>(carsService.findAllCars(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarsModel> findByIdCars(@PathVariable Integer id) {
        CarsModel carsModel = carsService.findByIdCars(id);

            if (carsModel != null) {
                return new ResponseEntity<>(carsModel, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    }

    @PostMapping("/save")
    public ResponseEntity<CarsModel> saveCars(@RequestBody CarsModel carsModel){
        return new ResponseEntity<>(carsService.saveCars(carsModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarsModel> updateCars(@PathVariable Integer id, @RequestBody CarsModel newCar){
        CarsModel updatedCar = carsService.updateCars(id, newCar);

        if (updatedCar != null){
            return new ResponseEntity<>(updatedCar, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCars(@PathVariable Integer id){
        carsService.deleteCars(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}