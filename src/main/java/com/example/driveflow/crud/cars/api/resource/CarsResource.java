package com.example.driveflow.crud.cars.api.resource;

import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.service.CarsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;

@RestController
@RequestMapping("/cars")
@Slf4j
public class CarsResource {
    @Autowired
    private CarsService carsService;

    @GetMapping("/all")
    public List<CarsModel> findAllCars(){
//    public DeferredResult<ResponseEntity<List<CarsModel>>> findAllCars(){
//        final DeferredResult<ResponseEntity<List<CarsModel>>> dr = new DeferredResult<>();
//        dr.setResult(ResponseEntity.ok().body(carsService.findAllCars()));
//        return dr;
        return carsService.findAllCars();
    }

    @PostMapping("/save")
    public CarsModel saveCars(@RequestBody CarsModel carsModel){
        return carsService.saveCars(carsModel);
    }
}
