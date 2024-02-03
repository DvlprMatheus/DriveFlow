package com.example.driveflow.crud.cars.service;

import com.example.driveflow.crud.cars.api.filters.CarsFilter;
import com.example.driveflow.crud.cars.api.request.CreateCarsRequest;
import com.example.driveflow.crud.cars.api.request.UpdateCarsRequest;
import com.example.driveflow.crud.cars.api.response.CarsResponse;
import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.repository.CarsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public void saveCars(CreateCarsRequest createCarsRequest){
        CarsModel carsModel = new CarsModel();
        String model = createCarsRequest.getModel();
        String manufacturer = createCarsRequest.getManufacturer();
        int year = createCarsRequest.getYear();
        String color = createCarsRequest.getColor();

        carsModel.setModel(model);
        carsModel.setManufacturer(manufacturer);
        carsModel.setYear(year);
        carsModel.setColor(color);
        carsRepository.save(carsModel);
    }

    public UpdateCarsRequest updateCars(Integer id, UpdateCarsRequest newCar) {
        CarsModel existingCar = carsRepository.findById(id).orElse(null);

        if (existingCar != null) {
            existingCar.setModel(newCar.getModel());
            existingCar.setManufacturer(newCar.getManufacturer());
            existingCar.setYear(newCar.getYear());
            existingCar.setColor(newCar.getColor());

            carsRepository.save(existingCar);
            return newCar;
        }

        return null;
    }

    public boolean deleteCars(Integer id) {
        CarsModel existingCar = carsRepository.findById(id).orElse(null);

        if (existingCar != null) {
            carsRepository.deleteById(id);
            return true;
        }

        return false;
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
        List<CarsModel> filteredCars = carsRepository.findAll(carsModelSpecification);
        return filteredCars.stream().map(CarsResponse::new).collect(Collectors.toList());
    }
}