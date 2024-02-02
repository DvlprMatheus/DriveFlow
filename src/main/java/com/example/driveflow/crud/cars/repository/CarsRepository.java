package com.example.driveflow.crud.cars.repository;

import com.example.driveflow.crud.cars.model.CarsModel;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CarsRepository extends JpaRepository<CarsModel, Integer>, JpaSpecificationExecutor<CarsModel> {
    interface Specs {
        static Specification<CarsModel> byModel(String model) {
            if(model != null) {
                return ((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("model"), model));
            }

            return null;
        }

        static Specification<CarsModel> byManufacturer(String manufacturer) {
            if(manufacturer != null) {
                return ((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("manufacturer"), manufacturer));
            }

            return null;
        }

        static Specification<CarsModel> byYear(Integer year) {
            if(year != null) {
                return ((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("year"), year));
            }

            return null;
        }

        static Specification<CarsModel> byColor(String color) {
            if(color != null) {
                return ((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("color"), color));
            }

            return null;
        }
    }
}
