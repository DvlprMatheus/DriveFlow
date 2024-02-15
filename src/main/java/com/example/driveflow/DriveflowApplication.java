package com.example.driveflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.driveflow", "com.example.driveflow.crud.cars.api.exception"})
public class DriveflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriveflowApplication.class, args);
	}

}