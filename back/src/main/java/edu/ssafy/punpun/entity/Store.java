package edu.ssafy.punpun.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Store extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private boolean deleted;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member owner;
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Menu> menus;
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Support> supports;
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Review> reviews;

    public void appendReview(Review review) {
        this.reviews.add(review);
    }
    public void registOwner(Member member, String licenseNumber) {
        this.owner = member;
        this.licenseNumber = licenseNumber;
    }
    public void deleteOwner() { this.owner = null; }
    public void updateStoreDetail(String name, String openTime, String info, String address, String phoneNumber, boolean alwaysShare) {
        this.name = name;
        this.openTime = openTime;
        this.info = info;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.alwaysShare = alwaysShare;
    }
    public void updateImage(Image image) {
        this.image = image;
    }

}
