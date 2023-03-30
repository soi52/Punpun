package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class FavoriteMenuRepositoryTest {

    @Autowired
    private FavoriteMenuRepository favoriteMenuRepository;
    @Autowired
    private ChildRepository childRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private StoreRepository storeRepository;

    @AfterEach
    void afterEach() {
        favoriteMenuRepository.deleteAll();
        childRepository.deleteAll();
        menuRepository.deleteAll();
        storeRepository.deleteAll();
    }

    @Test
    @DisplayName("Repository: test for favoriteMenu find by Child")
    void findByChild() {
        //given
        Child child1 = Child.builder()
                .name("childTest")
                .email("childTest@email.com")
                .role(UserRole.CHILD)
                .phoneNumber("01000000000")
                .build();
        Menu menu1 = Menu.builder()
                .name("menu1")
                .price(1000L)
                .build();
        Menu menu2 = Menu.builder()
                .name("menu2")
                .price(2000L)
                .build();
        FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu1)
                .build();
        FavoriteMenu favoriteMenu2 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu2)
                .build();

        childRepository.save(child1);
        menuRepository.save(menu1);
        menuRepository.save(menu2);
        favoriteMenuRepository.save(favoriteMenu1);
        favoriteMenuRepository.save(favoriteMenu2);

        //when
        List<FavoriteMenu> results = favoriteMenuRepository.findByChild(child1);

        //then
        Assertions.assertThat(results.get(0).getId()).isEqualTo(favoriteMenu1.getId());
        Assertions.assertThat(results.get(0).getMenu()).isEqualTo(favoriteMenu1.getMenu());
        Assertions.assertThat(results.get(0).getChild()).isEqualTo(favoriteMenu1.getChild());
        Assertions.assertThat(results.get(1).getId()).isEqualTo(favoriteMenu2.getId());
        Assertions.assertThat(results.get(1).getMenu()).isEqualTo(favoriteMenu2.getMenu());
        Assertions.assertThat(results.get(1).getChild()).isEqualTo(favoriteMenu2.getChild());
    }


    @Test
    @DisplayName("Repository: test for favoriteMenu find by Child And Menu")
    void findByChildAndMenu() {
        // given
        Child child1 = Child.builder()
                .name("childTest")
                .email("childTest@email.com")
                .role(UserRole.CHILD)
                .phoneNumber("01000000000")
                .build();
        Menu menu1 = Menu.builder()
                .name("menu1")
                .price(1000L)
                .build();
        FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu1)
                .build();

        childRepository.save(child1);
        menuRepository.save(menu1);
        favoriteMenuRepository.save(favoriteMenu1);

        //when
        Optional<FavoriteMenu> result = favoriteMenuRepository.findByChildAndMenu(child1, menu1);

        //then
        Assertions.assertThat(result.get().getId()).isEqualTo(favoriteMenu1.getId());
        Assertions.assertThat(result.get().getMenu()).isEqualTo(favoriteMenu1.getMenu());
        Assertions.assertThat(result.get().getChild()).isEqualTo(favoriteMenu1.getChild());
    }

    @Test
    @DisplayName("Repository: test for favoriteMenu find by Child And Menu And Store")
    void findByChildAndMenu_Store() {
        // given
        Child child1 = Child.builder()
                .name("childTest")
                .email("childTest@email.com")
                .role(UserRole.CHILD)
                .phoneNumber("01000000000")
                .build();
        Store store1 = Store.builder().build();
        Menu menu1 = Menu.builder()
                .name("menu1")
                .price(1000L)
                .store(store1)
                .build();
        Menu menu2 = Menu.builder()
                .name("menu2")
                .price(2000L)
                .store(store1)
                .build();
        FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu1)
                .build();
        FavoriteMenu favoriteMenu2 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu2)
                .build();

        childRepository.save(child1);
        storeRepository.save(store1);
        menuRepository.save(menu1);
        menuRepository.save(menu2);
        favoriteMenuRepository.save(favoriteMenu1);
        favoriteMenuRepository.save(favoriteMenu2);

        //when
        List<FavoriteMenu> results = favoriteMenuRepository.findByChildAndMenu_Store(child1, store1);

        //then
        Assertions.assertThat(results.get(0).getId()).isEqualTo(favoriteMenu1.getId());
        Assertions.assertThat(results.get(0).getMenu()).isEqualTo(favoriteMenu1.getMenu());
        Assertions.assertThat(results.get(0).getChild()).isEqualTo(favoriteMenu1.getChild());
        Assertions.assertThat(results.get(1).getId()).isEqualTo(favoriteMenu2.getId());
        Assertions.assertThat(results.get(1).getMenu()).isEqualTo(favoriteMenu2.getMenu());
        Assertions.assertThat(results.get(1).getChild()).isEqualTo(favoriteMenu2.getChild());
    }

}
