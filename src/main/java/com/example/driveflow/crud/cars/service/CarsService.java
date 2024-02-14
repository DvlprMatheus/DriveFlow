package com.example.driveflow.crud.cars.service;

import com.example.driveflow.crud.cars.api.exception.CarsServiceException;
import com.example.driveflow.crud.cars.api.filters.CarsFilter;
import com.example.driveflow.crud.cars.api.request.CreateCarsRequest;
import com.example.driveflow.crud.cars.api.request.UpdateCarsRequest;
import com.example.driveflow.crud.cars.api.response.CarsResponse;
import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.repository.CarsRepository;
import com.example.driveflow.crud.cars.utils.StringUtils;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Validated
@Slf4j
public class CarsService {

    @Autowired
    private CarsRepository carsRepository;

    public Page<CarsModel> findAllCars(@PositiveOrZero int page,
                                       @Positive @Max(10) int size) {
        log.info("Displaying cars registered");
        return carsRepository.findAll(PageRequest.of(page, size));
    }

    public List<CarsResponse> getCarFiltered(CarsFilter carsFilter) {
        Specification<CarsModel> carsModelSpecification = null;
        if (carsFilter != null){
            carsModelSpecification = Specification.where(
                            CarsRepository.Specs.byYear(carsFilter.getYear()))
                    .and(CarsRepository.Specs.byModel(carsFilter.getModel()))
                    .and(CarsRepository.Specs.byManufacturer(carsFilter.getManufacturer()))
                    .and(CarsRepository.Specs.byColor(carsFilter.getColor()));
        }
        log.info("Check done successfully");
        List<CarsModel> filteredCars = carsRepository.findAll(carsModelSpecification);
        return filteredCars.stream().map(CarsResponse::new).collect(Collectors.toList());
    }

    public CarsModel findByIdCars(Integer id) {
        log.info("Checking if the car is registered...");
        return carsRepository.findById(id).orElseThrow(() -> new CarsServiceException("Car with ID " + id + " not found."));
    }

    public CarsModel createCars(CreateCarsRequest createCarsRequest){
        try {
            CarsModel carsModel = new CarsModel();

            log.info("Allocating all the information...");
            carsModel.setModel(StringUtils.firstLetter(createCarsRequest.getModel()));
            carsModel.setManufacturer(createCarsRequest.getManufacturer());
            carsModel.setYear(createCarsRequest.getYear());
            carsModel.setColor(StringUtils.firstLetter(createCarsRequest.getColor()));

            log.info("The car successfully registered!");
            carsRepository.save(carsModel);
            return carsModel;
        } catch (Exception ex) {
            log.error("An error occurred while registering the car", ex);
            throw new CarsServiceException("Error registering the car: " + ex.getMessage(), ex);
        }
    }

    public CarsModel updateCars(Integer id, UpdateCarsRequest newCar) {
        try {
            CarsModel existingCar = carsRepository.findById(id).orElse(null);

            log.info("Checking if the car is registered...");
            if (existingCar != null) {
                existingCar.setModel(StringUtils.firstLetter(newCar.getModel()));
                existingCar.setManufacturer(newCar.getManufacturer());
                existingCar.setYear(newCar.getYear());
                existingCar.setColor(StringUtils.firstLetter(newCar.getColor()));

                log.info("Updating information...");
                carsRepository.save(existingCar);
                return existingCar;
            } else {
                throw new CarsServiceException("An error occurred while updating the car.");
            }
        } catch (Exception e) {
            log.error("Car with id " + id + " not found.");
            throw new CarsServiceException("Car with id " + id + " not found.", e);
        }
    }

    public void deleteCars(Integer id) {
        try {
            Optional<CarsModel> optionalCar = carsRepository.findById(id);
            if (optionalCar.isPresent()) {
                log.info("Deleting information for car with ID: {}", id);
                carsRepository.deleteById(id);
            } else {
                log.error("An error occurred while deleting the car with ID " + id + ".");
                throw new CarsServiceException("Car with ID " + id + " not found.");
            }
        } catch (Exception e) {
            throw new CarsServiceException("An error occurred while deleting the car with ID " + id + ".", e);
        }
    }
}