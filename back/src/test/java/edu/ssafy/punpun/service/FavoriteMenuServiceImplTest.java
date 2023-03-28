package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.StoreRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@DisplayName("좋아하는 메뉴 서비스")
public class FavoriteMenuServiceImplTest {
    @Mock
    private FavoriteMenuRepository favoriteMenuRepository;

    @InjectMocks
    private FavoriteMenuServiceImpl favoriteMenuService;

    @Test
    @DisplayName("Service: test for favoriteMenu find by Child And Menu And Store")
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

        doReturn(List.of(favoriteMenu1, favoriteMenu2)).when(favoriteMenuRepository).findByChildAndMenu_Store(child1, store1);

        //when
        List<FavoriteMenu> results = favoriteMenuService.findByChildAndMenu_Store(child1, store1);

        //then
        Assertions.assertThat(results.get(0).getId()).isEqualTo(favoriteMenu1.getId());
        Assertions.assertThat(results.get(0).getMenu()).isEqualTo(favoriteMenu1.getMenu());
        Assertions.assertThat(results.get(0).getChild()).isEqualTo(favoriteMenu1.getChild());
        Assertions.assertThat(results.get(1).getId()).isEqualTo(favoriteMenu2.getId());
        Assertions.assertThat(results.get(1).getMenu()).isEqualTo(favoriteMenu2.getMenu());
        Assertions.assertThat(results.get(1).getChild()).isEqualTo(favoriteMenu2.getChild());
    }

//    @Test
//    @DisplayName("Service: test for favoriteMenu Insert")
//    void insertFavoriteMenu() {
//        // given
//        Child child1 = Child.builder()
//                .name("childTest")
//                .email("childTest@email.com")
//                .role(UserRole.CHILD)
//                .phoneNumber("01000000000")
//                .build();
//        Menu menu1 = Menu.builder()
//                .name("menu1")
//                .price(1000L)
//                .build();
//
//        //when
//        favoriteMenuService.insertFavoriteMenu(child1.getId(), menu1.getId());
//
//        Optional<FavoriteMenu> favoriteMenuList = favoriteMenuRepository.findByChildAndMenu(child1,menu1);
//
//        //then
//        Assertions.assertThat(favoriteMenuList.get().getChild()).isEqualTo(child1);
//        Assertions.assertThat(favoriteMenuList.get().getMenu()).isEqualTo(menu1);
//    }
//
//    @Test
//    @DisplayName("Service: test for favoriteMenu Delete")
//    void deleteFavoriteMenu() {
//        // given
//        Child child1 = Child.builder()
//                .name("childTest")
//                .email("childTest@email.com")
//                .role(UserRole.CHILD)
//                .phoneNumber("01000000000")
//                .build();
//        Menu menu1 = Menu.builder()
//                .name("menu1")
//                .price(1000L)
//                .build();
//        FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
//                .child(child1)
//                .menu(menu1)
//                .build();
//
//        //when
//        favoriteMenuService.deleteFavoriteMenu(child1.getId(), menu1.getId());
//
//        //then
//        verify(favoriteMenuRepository).delete(favoriteMenu1);
//    }

}
