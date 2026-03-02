package com.launchcode.bestcard_api.exception.handler;

import java.time.Instant;

public class ApiErrorResponse {

    private int status;
    private String message;
    private Instant timestamp;

    public ApiErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }
}
