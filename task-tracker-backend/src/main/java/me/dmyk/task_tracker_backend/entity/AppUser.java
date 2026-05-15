package me.dmyk.task_tracker_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;


@Entity
public class User {

    @Id

    private Long id;
    private String name;
    private String email;
    private String password;
    private LocalDateTime createdAt = LocalDateTime.now();

}
