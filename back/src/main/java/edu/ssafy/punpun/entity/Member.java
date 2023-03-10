package edu.ssafy.punpun.entity;

import edu.ssafy.punpun.entity.enumurate.UserRole;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    private String name;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Image profile;
    private UserRole role;
    private Long supportedPoint;
    private Long remainPoint;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Store> stores;

    public Long chargePoint(Long point) {
        this.remainPoint += point;
        return this.remainPoint;
    }

    public Long support(Long point) {
        this.supportedPoint += point;
        this.remainPoint -= point;
        return this.remainPoint;
    }

    public void changeRole(UserRole role) {
        this.role = role;
    }
}
