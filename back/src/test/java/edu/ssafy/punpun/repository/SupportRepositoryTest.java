package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.Support;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
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

    @BeforeEach
    public void BeforeEach(){
        supportRepository.deleteAll();
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
                .supportType(SupportType.SUPPORT)
                .supportDate(LocalDate.now())
                .supporter(member)
                .store(store1)
                .menu(menu1)
                .build();

        Support support2=Support.builder()
                .supportType(SupportType.SUPPORT)
                .supportDate(LocalDate.now())
                .supporter(member)
                .store(store2)
                .menu(menu2)
                .build();

        Support support3=Support.builder()
                .supportType(SupportType.SUPPORT)
                .supportDate(LocalDate.now())
                .supporter(member)
                .store(store1)
                .menu(menu1)
                .build();

        memberRepository.save(member);
        storeRepository.save(store1);
        storeRepository.save(store2);
        menuRepository.save(menu1);
        menuRepository.save(menu2);

        supportRepository.save(support1);
        supportRepository.save(support2);
        supportRepository.save(support3);

        List<SupportResponseDTO> supportList=supportRepository.findSupport(member);

        Assertions.assertEquals(supportList.get(0).getDate(), support1.getSupportDate().toString());
        Assertions.assertEquals(supportList.get(0).getStoreName(), support1.getStore().getName());
        Assertions.assertEquals(supportList.get(0).getMenuId(), support1.getMenu().getId());
        Assertions.assertEquals(supportList.get(0).getMenuName(), support1.getMenu().getName());
        Assertions.assertEquals(supportList.get(0).getMenuPrice(), support1.getMenu().getPrice());
        Assertions.assertEquals(supportList.get(0).getSponsorCount(), 2);

        Assertions.assertEquals(supportList.get(1).getDate(), support2.getSupportDate().toString());
        Assertions.assertEquals(supportList.get(1).getStoreName(), support2.getStore().getName());
        Assertions.assertEquals(supportList.get(1).getMenuId(), support2.getMenu().getId());
        Assertions.assertEquals(supportList.get(1).getMenuName(), support2.getMenu().getName());
        Assertions.assertEquals(supportList.get(1).getMenuPrice(), support2.getMenu().getPrice());
        Assertions.assertEquals(supportList.get(1).getSponsorCount(), 1);
    }

    @Test
    @DisplayName("사장님의 나눔 목록 보여주기")
    void findShareList(){
        Store store= Store.builder().build();
        Menu menu1= Menu.builder()
                .name("menuTest1")
                .build();
        Menu menu2= Menu.builder()
                .name("menuTest2")
                .build();
        Menu menu3= Menu.builder()
                .name("menuTest3")
                .build();
        Menu menu4= Menu.builder()
                .name("menuTest4")
                .build();

        memberRepository.save(member);
        storeRepository.save(store);
        menuRepository.save(menu1);
        menuRepository.save(menu2);
        menuRepository.save(menu3);
        menuRepository.save(menu4);

        LocalDate date=LocalDate.now();

        saveSupportTable(SupportState.SUPPORT, SupportType.SHARE, store, menu1, date );
        saveSupportTable(SupportState.END, SupportType.SHARE, store, menu1, date );
        saveSupportTable(SupportState.END, SupportType.SHARE, store, menu2, date );
        saveSupportTable(SupportState.BOOKING, SupportType.SHARE, store, menu2, date );
        saveSupportTable(SupportState.SUPPORT, SupportType.SHARE, store, menu3, date );
        saveSupportTable(SupportState.SUPPORT, SupportType.SUPPORT, store, menu4, date );


        List<Menu> menus1=List.of(menu1, menu2, menu3);
        List<Long> totalCount1=List.of(2L,2L,1L);
        List<Long> useCount1=List.of(1L,1L,0L);

        Page<ShareResponseDTO> shareResponseDTOPage=supportRepository.findShareList(store.getId(), SupportType.SHARE, 0, LocalDate.now());
        Assertions.assertEquals(shareResponseDTOPage.getContent().size(), 3);

        List<ShareResponseDTO> shareResponseDTOS=shareResponseDTOPage.getContent();

        for(int i=0; i<menus1.size(); i++){
            Assertions.assertEquals(shareResponseDTOS.get(i).getSupportType(), SupportType.SHARE);
            Assertions.assertEquals(shareResponseDTOS.get(i).getMenuId(), menus1.get(i).getId());
            Assertions.assertEquals(shareResponseDTOS.get(i).getSupportDate(), date.toString());
            Assertions.assertEquals(shareResponseDTOS.get(i).getMenuName(), menus1.get(i).getName());
            Assertions.assertEquals(shareResponseDTOS.get(i).getTotalCount(), totalCount1.get(i));
            Assertions.assertEquals(shareResponseDTOS.get(i).getUseCount(), useCount1.get(i));
        }

        List<Menu> menus2=List.of(menu1, menu2, menu3);
        List<Long> totalCount2=List.of(2L,2L, 1L);
        List<Long> useCount2=List.of(1L,1L, 0L);

        Page<ShareResponseDTO> shareResponseDTOPage2=supportRepository.findShareList(store.getId(), SupportType.SHARE, 0, null);
        Assertions.assertEquals(shareResponseDTOPage2.getContent().size(), 3);

        List<ShareResponseDTO> shareResponseDTOS2=shareResponseDTOPage2.getContent();

        for(int i=0; i<menus2.size(); i++){
            Assertions.assertEquals(shareResponseDTOS2.get(i).getSupportType(), SupportType.SHARE);
            Assertions.assertEquals(shareResponseDTOS2.get(i).getMenuId(), menus2.get(i).getId());
            Assertions.assertEquals(shareResponseDTOS2.get(i).getSupportDate(), date.toString());
            Assertions.assertEquals(shareResponseDTOS2.get(i).getMenuName(), menus2.get(i).getName());
            Assertions.assertEquals(shareResponseDTOS2.get(i).getTotalCount(), totalCount2.get(i));
            Assertions.assertEquals(shareResponseDTOS2.get(i).getUseCount(), useCount2.get(i));
        }
    }

    private void saveSupportTable(SupportState supportState, SupportType supportType, Store store, Menu menu, LocalDate date){
        Support support=Support.builder()
                .supportState(supportState)
                .supportType(supportType)
                .supporter(member)
                .supportDate(date)
                .store(store)
                .menu(menu)
                .build();

        supportRepository.save(support);
    }
}
