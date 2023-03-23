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
@ToString
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private String name;
    private String email;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Image profile;
    private UserRole role;
    @Builder.Default
    private Long supportedPoint = 0L;
    @Builder.Default
    private Long remainPoint = 0L;
    @OneToMany(mappedBy = "owner", cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
    @ToString.Exclude
    private List<Store> stores;
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH})
    @ToString.Exclude
    private List<Support> supports;

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
