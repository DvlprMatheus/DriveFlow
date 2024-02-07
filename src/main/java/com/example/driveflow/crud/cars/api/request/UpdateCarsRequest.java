package com.example.driveflow.crud.cars.api.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCarsRequest {
    @NotBlank(message = "Car model is required.")
    private String model;

    @NotBlank(message = "Car manufacturer is required.")
    private String manufacturer;

    @NotNull(message = "Car year is required.")
    private Integer year;

    @NotBlank(message = "Car color is required.")
    private String color;
}
