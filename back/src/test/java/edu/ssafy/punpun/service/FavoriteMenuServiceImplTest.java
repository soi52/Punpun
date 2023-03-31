package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.exception.DuplicateFavoriteMenuException;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("좋아하는 메뉴 서비스")
public class FavoriteMenuServiceImplTest {
    @Mock
    private FavoriteMenuRepository favoriteMenuRepository;
    @Mock
    private MenuRepository menuRepository;

    @InjectMocks
    private FavoriteMenuServiceImpl favoriteMenuService;
    
    @Test
    @DisplayName("좋아하는 메뉴 리스트")
    void getFavoriteMenuChild() {
        // given
        Child child1 = Child.builder()
                .name("childTest")
                .email("childTest@email.com")
                .role(UserRole.CHILD)
                .phoneNumber("01000000000")
                .build();
        Menu menu1 = Menu.builder()
                .id(1L)
                .name("menu1")
                .build();
        Menu menu2 = Menu.builder()
                .id(1L)
                .name("menu2")
                .build();
        FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu1)
                .build();
        FavoriteMenu favoriteMenu2 = FavoriteMenu.builder()
                .child(child1)
                .menu(menu2)
                .build();
        doReturn(List.of(favoriteMenu1, favoriteMenu2)).when(favoriteMenuRepository).findByChild(child1);

        //when
        List<Menu> results = favoriteMenuService.getFavoriteMenuChild(child1);

        //then
        assertThat(results.get(0).getId()).isEqualTo(menu1.getId());
        assertThat(results.get(0).getName()).isEqualTo(menu1.getName());
        assertThat(results.get(1).getId()).isEqualTo(menu2.getId());
        assertThat(results.get(1).getName()).isEqualTo(menu2.getName());
    }

    @Nested
    @DisplayName("좋아하는 메뉴 추가")
    public class insertFavoriteMenu {

        @Test
        @DisplayName("좋아하는 메뉴 추가")
        void insertFavoriteMenu1() {
            // given
            Child child1 = Child.builder()
                    .name("childTest")
                    .email("childTest@email.com")
                    .role(UserRole.CHILD)
                    .phoneNumber("01000000000")
                    .build();
            Menu menu1 = Menu.builder()
                    .id(1L)
                    .name("menu1")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu1)).when(menuRepository).findById(1L);

            //when
            favoriteMenuService.insertFavoriteMenu(child1, menu1.getId());

            //then
            verify(favoriteMenuRepository, times(1)).save(any());
        }

        @Test
        @DisplayName("좋아하는 메뉴 추가 - 중복 확인")
        void insertFavoriteMenu2() {
            // given
            Child child1 = Child.builder()
                    .name("childTest")
                    .email("childTest@email.com")
                    .role(UserRole.CHILD)
                    .phoneNumber("01000000000")
                    .build();
            Menu menu1 = Menu.builder()
                    .id(1L)
                    .name("menu1")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu1)).when(menuRepository).findById(1L);
            doThrow(DuplicateFavoriteMenuException.class).when(favoriteMenuRepository).findByChildAndMenu(child1, menu1);

            // when
            // then
            assertThatThrownBy(() -> favoriteMenuService.insertFavoriteMenu(child1, menu1.getId()))
                    .isInstanceOf(DuplicateFavoriteMenuException.class);
        }
    }


    @Nested
    @DisplayName("좋아하는 메뉴 삭제")
    public class deleteFavoriteMenu {
        @Test
        @DisplayName("좋아하는 메뉴 삭제 - 정상 동작")
        void deleteFavoriteMenu1() {
            // given
            Child child1 = Child.builder()
                    .name("childTest")
                    .email("childTest@email.com")
                    .role(UserRole.CHILD)
                    .phoneNumber("01000000000")
                    .build();
            Menu menu1 = Menu.builder()
                    .id(1L)
                    .name("menu1")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu1)).when(menuRepository).findById(1L);

            FavoriteMenu favoriteMenu1 = FavoriteMenu.builder()
                    .child(child1)
                    .menu(menu1)
                    .build();
            doReturn(Optional.of(favoriteMenu1)).when(favoriteMenuRepository).findByChildAndMenu(child1, menu1);

            //when
            favoriteMenuService.deleteFavoriteMenu(child1, menu1.getId());

            //then
            verify(favoriteMenuRepository, times(1)).delete(any());
        }

        @Test
        @DisplayName("좋아하는 메뉴 삭제 - 오류")
        void deleteFavoriteMenu2() {
            // given
            Child child1 = Child.builder()
                    .name("childTest")
                    .email("childTest@email.com")
                    .role(UserRole.CHILD)
                    .phoneNumber("01000000000")
                    .build();
            Menu menu1 = Menu.builder()
                    .id(1L)
                    .name("menu1")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu1)).when(menuRepository).findById(1L);

            //when
            // then
            assertThatThrownBy(() -> favoriteMenuService.deleteFavoriteMenu(child1, menu1.getId()))
                    .isInstanceOf(IllegalArgumentException.class);
        }
    }
}
