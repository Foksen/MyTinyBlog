package ru.mirea.context_service;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FrontContext {
    @Id
    private final int id = 1;

    @NonNull
    private String data;

    @NonNull
    private Integer likes;
}
