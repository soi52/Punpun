package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.MenuRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class MenuServiceImplTest {

    @Mock
    private MenuRepository menuRepository;
    @InjectMocks
    private MenuServiceImpl menuService;

    @Test
    @DisplayName("test for Menu Service Impl findByStore")
    void findByStore() {
        // given
        Store store1 = Store.builder().build();
        Menu menu1 = Menu.builder()
                .name("메뉴 1 - 가게 1")
                .price(5000L)
                .sponsoredCount(1L)
                .store(store1)
                .build();
        Menu menu2 = Menu.builder()
                .name("메뉴 2 - 가게 1")
                .price(7000L)
                .sponsoredCount(2L)
                .store(store1)
                .build();

        menuRepository.save(menu1);
        menuRepository.save(menu2);

        Mockito.doReturn(List.of(menu1, menu2)).when(menuRepository).findByStore(store1);

        // when
        List<Menu> results = menuRepository.findByStore(store1);

        //then
        Assertions.assertThat(results.get(0).getId()).isEqualTo(menu1.getId());
        Assertions.assertThat(results.get(0).getPrice()).isEqualTo(menu1.getPrice());
        Assertions.assertThat(results.get(0).getSponsoredCount()).isEqualTo(menu1.getSponsoredCount());
        Assertions.assertThat(results.get(0).getStore()).isEqualTo(menu1.getStore());
        Assertions.assertThat(results.get(1).getId()).isEqualTo(menu2.getId());
        Assertions.assertThat(results.get(1).getPrice()).isEqualTo(menu2.getPrice());
        Assertions.assertThat(results.get(1).getSponsoredCount()).isEqualTo(menu2.getSponsoredCount());
        Assertions.assertThat(results.get(1).getStore()).isEqualTo(menu2.getStore());

    }
}
