package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
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

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class SupportServiceImplTest {
    @Mock
    private SupportRepository supportRepository;

    @InjectMocks
    private SupportServiceImpl supportService;

    private static Member member;
    @BeforeAll
    public static void BeforeAll(){
        member= Member.builder().build();
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

}
