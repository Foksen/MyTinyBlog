package ru.mirea.context_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/context")
public class FrontContextController {

    @Autowired
    private FrontContextService service;

    @GetMapping
    public ResponseEntity<?> getFrontContext() {
        return ResponseEntity.ok(service.getFrontContext());
    }

    @PostMapping("/react")
    public ResponseEntity<?> change(@RequestBody boolean positive) {
        return ResponseEntity.ok().build();
    }
}
