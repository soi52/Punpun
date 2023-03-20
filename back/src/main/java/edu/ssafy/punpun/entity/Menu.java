package edu.ssafy.punpun.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "menu_id")
    private Long id;
    private String name;
    private Long price;
    private Long sponsoredCount;
    @OneToMany(fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<FavoriteMenu> favoriteMenus;
    @OneToMany(fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Support> supports;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;
    @OneToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Image image;
    @OneToMany(mappedBy = "menu")
    @ToString.Exclude
    private List<Reservation> reservations;
}
