package com.example.driveflow.crud.cars.api.resource;

import com.example.driveflow.crud.cars.api.filters.CarsFilter;
import com.example.driveflow.crud.cars.api.request.CreateCarsRequest;
import com.example.driveflow.crud.cars.api.request.UpdateCarsRequest;
import com.example.driveflow.crud.cars.api.response.CarsResponse;
import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.service.CarsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static java.lang.String.format;

@RestController
@RequestMapping("/cars")
@Slf4j
public class CarsResource {
    @Autowired
    private CarsService carsService;

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<CarsModel>> findAllCars(){
       log.info("Looking for registered cars...");
       return ResponseEntity.ok(carsService.findAllCars());
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
    public ResponseEntity<?> findByIdCars(@PathVariable Integer id) {
        CarsModel carsModel = carsService.findByIdCars(id);

            if (carsModel != null) {
                log.info("The car was found");
                return new ResponseEntity<>(carsModel, HttpStatus.OK);
            } else {
                log.error(format("The car with the ID %d was not found", id));
                return new ResponseEntity<>("The car was not found!", HttpStatus.NOT_FOUND);
            }
    }

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> createCars(@Valid @RequestBody CreateCarsRequest createCarsRequest){
        log.info("Registering the car...");
        carsService.createCars(createCarsRequest);
        return new ResponseEntity<>("The car successfully registered!", HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCars(@PathVariable Integer id, @Valid @RequestBody UpdateCarsRequest newCar) throws ChangeSetPersister.NotFoundException {
        UpdateCarsRequest updatedCar = carsService.updateCars(id, newCar);

        if (updatedCar != null){
            log.info("The car updated successfully!");
            return new ResponseEntity<>("The car updated successfully!", HttpStatus.CREATED);
        } else {
            log.error(format("The car with the ID %d was not found", id));
            return new ResponseEntity<>("The car was not found!", HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCars(@PathVariable Integer id){
        boolean verify = carsService.deleteCars(id);

        if (verify){
            log.info("The car deleted successfully!");
            return new ResponseEntity<>("The car deleted successfully!", HttpStatus.OK);
        } else {
            log.error(format("The car with the ID %d was not found", id));
            return new ResponseEntity<>("The car was not found!", HttpStatus.NOT_FOUND);
        }
    }

    @RestControllerAdvice
    public static class GlobalExceptionHandler {
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException e) {
            String errorMessage = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}