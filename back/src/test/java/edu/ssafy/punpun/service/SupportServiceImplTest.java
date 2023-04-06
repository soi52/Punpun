package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.SupportRequestDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
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

import java.time.LocalDate;
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
                .supportDate(LocalDate.now())
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .id(1L)
                        .name("test1")
                        .build())
                .menu(Menu.builder()
                        .id(1L)
                        .name("menuTest1")
                        .price(7500L)
                        .build())
                .build();

        Support support2=Support.builder()
                .supportDate(LocalDate.now())
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .id(2L)
                        .name("test2")
                        .build())
                .menu(Menu.builder()
                        .id(2L)
                        .name("menuTest2")
                        .price(8000L)
                        .build())
                .build();

        Support support3=Support.builder()
                .supportDate(LocalDate.now())
                .supportState(SupportState.SUPPORT)
                .supporter(member)
                .store(Store.builder()
                        .id(1L)
                        .name("test3")
                        .build())
                .menu(Menu.builder()
                        .id(1L)
                        .name("menuTest1")
                        .price(7500L)
                        .build())
                .build();

        SupportResponseDTO supportResponseDTO=new SupportResponseDTO(support1.getSupportDate(),support1.getStore().getId(), 2L, support1.getStore().getName(),  support1.getMenu().getId(), support1.getMenu().getName(), support1.getMenu().getPrice());
        SupportResponseDTO supportResponseDTO2=new SupportResponseDTO(support2.getSupportDate(),support2.getStore().getId(), 1L, support2.getStore().getName(),  support2.getMenu().getId(), support2.getMenu().getName(), support2.getMenu().getPrice());
        doReturn(List.of(supportResponseDTO ,supportResponseDTO2)).when(supportRepository).findSupport(member);

        List<SupportResponseDTO> supportList=supportService.findSupport(member);

        Assertions.assertEquals(supportList.get(0).getDate(), support1.getSupportDate().toString());
        Assertions.assertEquals(supportList.get(0).getStoreId(), support1.getStore().getId());
        Assertions.assertEquals(supportList.get(0).getSponsorCount(), 2L);
        Assertions.assertEquals(supportList.get(0).getStoreName(), support1.getStore().getName());
        Assertions.assertEquals(supportList.get(0).getMenuId(), support1.getMenu().getId());
        Assertions.assertEquals(supportList.get(0).getMenuName(), support1.getMenu().getName());
        Assertions.assertEquals(supportList.get(0).getMenuPrice(), support1.getMenu().getPrice());

        Assertions.assertEquals(supportList.get(1).getDate(), support2.getSupportDate().toString());
        Assertions.assertEquals(supportList.get(1).getStoreId(), support2.getStore().getId());
        Assertions.assertEquals(supportList.get(1).getSponsorCount(), 1L);
        Assertions.assertEquals(supportList.get(1).getStoreName(), support2.getStore().getName());
        Assertions.assertEquals(supportList.get(1).getMenuId(), support2.getMenu().getId());
        Assertions.assertEquals(supportList.get(1).getMenuName(), support2.getMenu().getName());
        Assertions.assertEquals(supportList.get(1).getMenuPrice(), support2.getMenu().getPrice());
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
    @DisplayName("사장님 나눔 - 서비스")
    void saveSupportOwner(){
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
        SupportRequestDTO supportRequestDTO=new SupportRequestDTO(0L, List.of(1L, 2L), List.of(2L,1L));

        doReturn(Optional.of(member2)).when(memberRepository).findById(member2.getId());
        doReturn(Optional.of(menu1)).when(menuRepository).findById(menu1.getId());
        doReturn(Optional.of(menu2)).when(menuRepository).findById(menu2.getId());
        supportService.saveSupport(member2, supportRequestDTO, 1  );

        Assertions.assertEquals(member2.getRemainPoint(), 5000L);
        Assertions.assertEquals(member2.getSupportedPoint(), 0L);
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
