package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

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
    @DisplayName("좋아하는 메뉴 추가")
    void insertFavoriteMenu() {
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
    @DisplayName("좋아하는 메뉴 삭제")
    void deleteFavoriteMenu() {
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

}
