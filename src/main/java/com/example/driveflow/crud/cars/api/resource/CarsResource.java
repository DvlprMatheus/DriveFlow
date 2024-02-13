package com.example.driveflow.crud.cars.api.resource;

import com.example.driveflow.crud.cars.api.exception.CarsServiceException;
import com.example.driveflow.crud.cars.api.filters.CarsFilter;
import com.example.driveflow.crud.cars.api.request.CreateCarsRequest;
import com.example.driveflow.crud.cars.api.request.UpdateCarsRequest;
import com.example.driveflow.crud.cars.api.response.CarsResponse;
import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.service.CarsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/cars")
@Slf4j
public class CarsResource {
    @Autowired
    private CarsService carsService;

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<Page<CarsModel>> findAllCars(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size) {
        log.info("Looking for registered cars...");
        return ResponseEntity.ok(carsService.findAllCars(page, size));
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<CarsResponse>> getCarFiltered(
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String manufacturer,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String color) {

        log.info("Checking parameters...");
        CarsFilter carsFilter = new CarsFilter(model, manufacturer, year, color);
        List<CarsResponse> filteredCars = carsService.getCarFiltered(carsFilter);

        return ResponseEntity.ok().body(filteredCars);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<CarsModel> findByIdCars(@PathVariable Integer id) {
        CarsModel carsModel = carsService.findByIdCars(id);

        log.info("The car was found");
        return new ResponseEntity<>(carsModel, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<CarsModel> createCars(@Valid @RequestBody CreateCarsRequest createCarsRequest){
        log.info("Registering the car...");
        CarsModel carsModel = carsService.createCars(createCarsRequest);
        return new ResponseEntity<>(carsModel, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseEntity<CarsModel> updateCars(@PathVariable Integer id, @Valid @RequestBody UpdateCarsRequest newCar) {
            CarsModel carsModel = carsService.updateCars(id, newCar);
            log.info("The car updated successfully!");
            return new ResponseEntity<>(carsModel, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCars(@PathVariable Integer id){
        carsService.deleteCars(id);

        log.info("The car deleted successfully!");
        return new ResponseEntity<>("The car deleted successfully!", HttpStatus.OK);

    }

    @RestControllerAdvice
    public static class ValidationExceptionHandler {
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException e) {
            String errorMessage = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
            log.error(errorMessage);
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @RestControllerAdvice
    public static class ServiceExceptionHandler {
        @ExceptionHandler(CarsServiceException.class)
        public ResponseEntity<String> handleCarsServiceException(CarsServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}