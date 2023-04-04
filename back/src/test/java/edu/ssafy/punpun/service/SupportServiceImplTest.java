package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.exception.PointLackException;
import edu.ssafy.punpun.repository.MemberRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.SupportRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SupportServiceImplTest {
    @Mock
    private SupportRepository supportRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private MenuRepository menuRepository;

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
        doReturn(List.of(support1,support2)).when(supportRepository).findBySupporter(member);

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
    void saveSupport(){
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
        SupportRequestDTO supportRequestDTO=new SupportRequestDTO(23000L, List.of(1L, 2L), List.of(2L,1L));

        Long usePoint = 23000L;

        doReturn(Optional.of(member)).when(memberRepository).findById(member.getId());
        doReturn(Optional.of(menu1)).when(menuRepository).findById(menu1.getId());
        doReturn(Optional.of(menu2)).when(menuRepository).findById(menu2.getId());
        supportService.saveSupport(member, supportRequestDTO, 0  );

        Assertions.assertEquals(member.getRemainPoint(), 2000L);
        Assertions.assertEquals(member.getSupportedPoint(), usePoint);
        verify(menuService, times(supportRequestDTO.getMenuId().size())).addSponsoredCount(anyLong(), anyLong());
        verify(supportRepository, times(3)).save(any(Support.class));
    }

    @Test
    @DisplayName("후원 결제 포인트 부족 예외처리 - 서비스")
    void saveSupportException(){

        Member member2= Member.builder()
                .supportedPoint(0L)
                .remainPoint(5000L)
                .build();

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

        SupportRequestDTO supportRequestDTO=new SupportRequestDTO(23000L, List.of(1L, 2L), List.of(2L,1L));

        doReturn(Optional.of(member2)).when(memberRepository).findById(member2.getId());
        doReturn(Optional.of(menu1)).when(menuRepository).findById(menu1.getId());
        doReturn(Optional.of(menu2)).when(menuRepository).findById(menu2.getId());

        assertThatThrownBy(() -> supportService.saveSupport(member2, supportRequestDTO, 0))
                .isInstanceOf(PointLackException.class);
    }

    @Test
    @DisplayName("나눔 리스트 - 서비스")
    void findShareList(){
        supportService.findShareList(null, null, 0, null);
        verify(supportRepository, times(1)).findShareList(null, null, 0, null);
    }
}
