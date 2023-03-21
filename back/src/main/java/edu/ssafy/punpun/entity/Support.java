package edu.ssafy.punpun.entity;

import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Support extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "support_id")
    private Long id;
    private SupportType supportType;
    private SupportState supportState;
    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member supporter;
    // 아동이 예약할 때 식당의 메뉴들의 수량을 간편하게 조회하기 위해서
    @ManyToOne(targetEntity = Store.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;
    @ManyToOne(targetEntity = Menu.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;
    @OneToMany(mappedBy = "support", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<SupportReservation> supportReservations;

    public void setSupportType(SupportType supportType) {
        this.supportType = supportType;
    }
}
