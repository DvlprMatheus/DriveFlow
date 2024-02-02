package com.example.driveflow.crud.cars.api.filters;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CarsFilter {
    private String model;
    private String manufacturer;
    private Integer year;
    private String color;
}
