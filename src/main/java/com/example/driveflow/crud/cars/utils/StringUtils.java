package com.example.driveflow.crud.cars.utils;

public class StringUtils {
    public static String firstLetter(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        String[] words = str.toLowerCase().split("\\s+");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)));
                result.append(word.substring(1));
                result.append(" ");
            }
        }
        return result.toString().trim();
    }
}
