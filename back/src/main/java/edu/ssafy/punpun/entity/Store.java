package edu.ssafy.punpun.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Store extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String licenseNumber;
    private String name;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Image image;
    private boolean openState;
    private String openTime;
    private String info;
    private String address;
    private double lon;
    private double lat;
    private String phoneNumber;
    private boolean alwaysShare;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member owner;
    @OneToMany(mappedBy = "store")
    @ToString.Exclude
    private List<Menu> menus;
    @OneToMany(mappedBy = "store")
    @ToString.Exclude
    private List<Support> supports;
    @OneToMany(mappedBy = "store")
    @ToString.Exclude
    private List<Review> reviews;
}
