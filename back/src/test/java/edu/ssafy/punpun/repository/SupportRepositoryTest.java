package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
public class SupportRepositoryTest {

    @Autowired
    private SupportRepository supportRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private MenuRepository menuRepository;

    private static Member member;

    @BeforeAll
    public static void BeforeAll(){
        member=Member.builder().build();
    }

    @Test
    @DisplayName("후원자의 모든 후원 내역 찾아오기")
    void findSupport(){
        Store store1= Store.builder()
                .name("test1")
                .build();
        Store store2= Store.builder()
                .name("test2")
                .build();
        Menu menu1= Menu.builder()
                .name("menuTest1")
                .price(7500L)
                .build();
        Menu menu2= Menu.builder()
                .name("menuTest2")
                .price(8000L)
                .build();

        Support support1=Support.builder()
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(store1)
                .menu(menu1)
                .build();

        Support support2=Support.builder()
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(store2)
                .menu(menu2)
                .build();

        memberRepository.save(member);
        storeRepository.save(store1);
        storeRepository.save(store2);
        menuRepository.save(menu1);
        menuRepository.save(menu2);

        supportRepository.save(support1);
        supportRepository.save(support2);

        List<Support> supportList=supportRepository.findBySupporter(member);

        Assertions.assertEquals(supportList.get(0).getId(), support1.getId());
        Assertions.assertEquals(supportList.get(0).getSupportState(), support1.getSupportState());
        Assertions.assertEquals(supportList.get(0).getCreatedDateTime(), support1.getCreatedDateTime());
        Assertions.assertEquals(supportList.get(0).getStore().getName(), support1.getStore().getName());
        Assertions.assertEquals(supportList.get(0).getMenu().getId(), support1.getMenu().getId());
        Assertions.assertEquals(supportList.get(0).getMenu().getName(), support1.getMenu().getName());
        Assertions.assertEquals(supportList.get(0).getMenu().getPrice(), support1.getMenu().getPrice());

        Assertions.assertEquals(supportList.get(1).getId(), support2.getId());
        Assertions.assertEquals(supportList.get(1).getSupportState(), support2.getSupportState());
        Assertions.assertEquals(supportList.get(1).getCreatedDateTime(), support2.getCreatedDateTime());
        Assertions.assertEquals(supportList.get(1).getStore().getName(), support2.getStore().getName());
        Assertions.assertEquals(supportList.get(1).getMenu().getId(), support2.getMenu().getId());
        Assertions.assertEquals(supportList.get(1).getMenu().getName(), support2.getMenu().getName());
        Assertions.assertEquals(supportList.get(1).getMenu().getPrice(), support2.getMenu().getPrice());
    }
}
