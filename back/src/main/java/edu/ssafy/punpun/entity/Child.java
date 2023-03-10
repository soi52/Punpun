package edu.ssafy.punpun.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Child extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "child_id")
    private Long id;
    private String name;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image profile;
    private String area;
    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;
    @OneToMany
    @ToString.Exclude
    private List<Reservation> reservations;
    @OneToMany
    @ToString.Exclude
    private List<FavoriteMenu> favoriteMenus;
}
