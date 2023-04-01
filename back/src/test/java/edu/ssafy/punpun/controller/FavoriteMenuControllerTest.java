package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import edu.ssafy.punpun.dto.request.FavoriteMenuRequestDTO;
import edu.ssafy.punpun.dto.response.FavoriteMenuResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.service.FavoriteMenuService;
import edu.ssafy.testutil.WIthCustomChild;
import org.hibernate.result.Output;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
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
    @DisplayName("get - 아이가 좋아하는 메뉴 리스트")
    void getFavoriteMenuChild() throws Exception {
        // given
        Store store1 = Store.builder()
                .id(1L)
                .name("store1")
                .build();
        Menu menu1 = Menu.builder()
                .id(1L)
                .name("menu1")
                .store(store1)
                .build();
        Store store2 = Store.builder()
                .id(2L)
                .name("store2")
                .build();
        Menu menu2 = Menu.builder()
                .id(1L)
                .name("menu2")
                .store(store2)
                .build();

        doReturn(List.of(menu1, menu2)).when(favoriteMenuService).getFavoriteMenuChild(any(Child.class));

        List<FavoriteMenuResponseDTO> favoriteMenuResponseDTOList = new ArrayList<>();
        favoriteMenuResponseDTOList.add(new FavoriteMenuResponseDTO(store1, menu1));
        favoriteMenuResponseDTOList.add(new FavoriteMenuResponseDTO(store2, menu2));
        String output = new ObjectMapper().writeValueAsString(favoriteMenuResponseDTOList);

        // when
        // then
        mockMvc.perform(get("/favors")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Test
    @WIthCustomChild
    @DisplayName("post - 좋아하는 메뉴 추가하기")
    void insertFavoriteMenu() throws Exception {
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
