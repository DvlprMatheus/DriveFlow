package com.example.driveflow.crud.cars.api.exception;

public class CarsServiceException extends RuntimeException {
        public CarsServiceException(String message) {
            super(message);
        }

        public CarsServiceException(String message, Throwable cause) {
            super(message, cause);
        }
}