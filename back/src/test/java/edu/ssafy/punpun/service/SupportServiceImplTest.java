package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import edu.ssafy.punpun.repository.SupportRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class SupportServiceImplTest {
    @Mock
    private SupportRepository supportRepository;

    @InjectMocks
    private SupportServiceImpl supportService;

    @Mock
    private MenuServiceImpl menuService;

    private static Member member;
    @BeforeAll
    public static void BeforeAll(){
        member= Member.builder()
                .supportedPoint(0L)
                .remainPoint(25000L)
                .build();
    }

    @Test
    @DisplayName("후원자의 모든 후원 내역 찾아오기 - 서비스")
    void findSupport(){
        Support support1=Support.builder()
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .name("test1")
                        .build())
                .menu(Menu.builder()
                        .name("menuTest1")
                        .price(7500L)
                        .build())
                .build();

        Support support2=Support.builder()
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .name("test2")
                        .build())
                .menu(Menu.builder()
                        .name("menuTest2")
                        .price(8000L)
                        .build())
                .build();
        Mockito.doReturn(List.of(support1,support2)).when(supportRepository).findBySupporter(member);

        List<Support> supportList=supportService.findSupport(member);

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

    @Test
    @DisplayName("후원 결제 - 서비스")
    void supportPayment(){
        Menu menu1=Menu.builder()
                .id(1L)
                .name("menuTest1")
                .price(7500L)
                .build();
        Menu menu2=Menu.builder()
                .id(2L)
                .name("menuTest2")
                .price(8000L)
                .build();
        Support support1=Support.builder()
                .supportType(SupportType.SUPPORT)
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .name("test1")
                        .build())
                .menu(menu1)
                .build();

        Support support2=Support.builder()
                .supportType(SupportType.SUPPORT)
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .name("test2")
                        .build())
                .menu(menu2)
                .build();
        List<Support> supports =new LinkedList<>();
        supports.add(support1);
        supports.add(support2);

        List<Long> menuId=new LinkedList<>();
        menuId.add(menu1.getId());
        menuId.add(menu2.getId());

        List<Long> menuCount=new LinkedList<>(Arrays.asList(2L, 1L));
        Long usePoint = 23000L;

        supportService.supportPayment(supports, menuId, menuCount, member, usePoint);

        Assertions.assertEquals(member.getRemainPoint(), 2000L);
        Assertions.assertEquals(member.getSupportedPoint(), usePoint);
        Mockito.verify(menuService, Mockito.times(supports.size())).addSponsoredCount(Mockito.anyLong(), Mockito.anyLong());
        Mockito.verify(supportRepository, Mockito.times(3)).save(Mockito.any(Support.class));
    }
}
