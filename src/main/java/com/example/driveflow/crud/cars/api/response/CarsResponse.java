package com.example.driveflow.crud.cars.api.response;

import com.example.driveflow.crud.cars.model.CarsModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarsResponse {
    private Integer id;
    private String model;
    private String manufacturer;
    private int year;
    private String color;

    public CarsResponse(CarsModel carsModel) {
        this.id = carsModel.getId();
        this.model = carsModel.getModel();
        this.manufacturer = carsModel.getManufacturer();
        this.year = carsModel.getYear();
        this.color = carsModel.getColor();
    }
}
