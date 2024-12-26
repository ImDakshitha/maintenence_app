package com.dakodelabs.maintenance_app.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/example")
    public String example() {
        return "This is a protected endpoint!";
    }
} 