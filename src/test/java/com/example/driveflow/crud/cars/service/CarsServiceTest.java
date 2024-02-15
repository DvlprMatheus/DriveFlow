package com.example.driveflow.crud.cars.service;

import com.example.driveflow.crud.cars.api.request.CarDTO;
import com.example.driveflow.crud.cars.model.CarsModel;
import com.example.driveflow.crud.cars.repository.CarsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CarsServiceTest {

    @InjectMocks
    CarsService carsService;

    @Mock
    CarsRepository carsRepository;

    CarsModel carsModel;

    @BeforeEach
    public void setUp() {
        carsModel = new CarsModel(1, "Divo", "Bugatti", 2020, "Azul");
    }

    @Test
    void findAllCarsTest() {
        List<CarsModel> cars = new ArrayList<>();
        cars.add(carsModel);

        Pageable pageable = PageRequest.of(0, 10);
        Page<CarsModel> carsPage = new PageImpl<>(cars, pageable, cars.size());
        when(carsRepository.findAll(pageable)).thenReturn(carsPage);

        Page<CarsModel> result = carsService.findAllCars(0, 10);

        assertEquals(carsPage, result);
        verify(carsRepository).findAll(pageable);
        verifyNoMoreInteractions(carsRepository);
    }

    @Test
    void findByIdCarsTest() {
        when(carsRepository.findById(carsModel.getId())).thenReturn(Optional.of(carsModel));

        Optional<CarsModel> carById = carsRepository.findById(carsModel.getId());

        assertEquals(Optional.of(carsModel), carById);
    }

    @Test
    void createCarsTest() {
        when(carsRepository.save(carsModel)).thenReturn(carsModel);

        CarsModel result = carsRepository.save(carsModel);

        assertEquals(carsModel, result);
        verify(carsRepository).save(carsModel);
        verifyNoMoreInteractions(carsRepository);
    }

    @Test
    void updateCarsTest() {
        CarDTO newCar = new CarDTO("New Model", "New Manufacturer", 2022, "New Color");

        when(carsRepository.findById(carsModel.getId())).thenReturn(Optional.of(carsModel));

        carsService.updateCars(carsModel.getId(), newCar);

        verify(carsRepository).save(carsModel);

        assertEquals("New Model", carsModel.getModel());
        assertEquals("New Manufacturer", carsModel.getManufacturer());
        assertEquals(2022, carsModel.getYear());
        assertEquals("New Color", carsModel.getColor());
    }

    @Test
    void deleteCarsTest() {
        when(carsRepository.findById(carsModel.getId())).thenReturn(Optional.of(carsModel));

        carsService.deleteCars(carsModel.getId());

        verify(carsRepository).deleteById(carsModel.getId());
    }
}
