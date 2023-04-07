package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@DisplayName("메뉴 레포지토리 테스트")
public class MenuRepositoryTest {

    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private StoreRepository storeRepository;

    @Test
    @DisplayName("test for Store Detail Dto - Menu")
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

        storeRepository.save(store1);
        menuRepository.save(menu1);
        menuRepository.save(menu2);

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
