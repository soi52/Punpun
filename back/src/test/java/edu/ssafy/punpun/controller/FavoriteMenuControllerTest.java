package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.FavoriteMenuRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.service.FavoriteMenuService;
import edu.ssafy.testutil.WIthCustomChild;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FavoriteMenuController.class)
@DisplayName("좋아하는 메뉴 컨트롤러 테스트")
public class FavoriteMenuControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private FavoriteMenuService favoriteMenuService;

    @Test
    @WIthCustomChild
    @DisplayName("post - 좋아하는 메뉴 추가하기")
    void insertFavoriteMenu() throws Exception {
        Child child = Child.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.CHILD)
                .build();
        Menu menu = Menu.builder()
                .id(1L)
                .build();

        doNothing().when(favoriteMenuService).insertFavoriteMenu(any(Child.class), eq(1L));

        FavoriteMenuRequestDTO favoriteMenuRequestDTO = new FavoriteMenuRequestDTO(1L);
        String input = new Gson().toJson(favoriteMenuRequestDTO);

        mockMvc.perform(post("/favors")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(input))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @WIthCustomChild
    @DisplayName("delete - 좋아하는 메뉴 삭제하기")
    void deleteFavoriteMenu() throws Exception {
        doNothing().when(favoriteMenuService).deleteFavoriteMenu(any(Child.class), eq(1L));

        FavoriteMenuRequestDTO favoriteMenuRequestDTO = new FavoriteMenuRequestDTO(1L);
        String input = new Gson().toJson(favoriteMenuRequestDTO);

        mockMvc.perform(delete("/favors")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(input))
                .andExpect(status().isOk())
                .andDo(print());
    }

}
