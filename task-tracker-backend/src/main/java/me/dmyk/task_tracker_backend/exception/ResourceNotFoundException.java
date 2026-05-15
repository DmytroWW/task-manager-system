package me.dmyk.task_tracker_backend.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(Long id) {
        super(String.format("User not found with id:%s",id));
    }
}
