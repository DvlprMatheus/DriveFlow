package com.example.driveflow.crud.cars.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCarsRequest {
    private String model;
    private String manufacturer;
    private Integer year;
    private String color;
}