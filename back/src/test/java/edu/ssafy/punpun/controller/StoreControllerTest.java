package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.PunpunApplication;
import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.StoreRepository;
import edu.ssafy.punpun.security.SecurityConfig;
import edu.ssafy.punpun.service.StoreService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import java.util.Optional;

@WebMvcTest(StoreController.class)
@ContextConfiguration(classes = {PunpunApplication.class, SecurityConfig.class})
//@AutoConfigureRestDocs
//@ComponentScan(basePackages = {"edu.ssafy.punpun.security"})
public class StoreControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StoreService storeService;
    @MockBean
    private StoreRepository storeRepository;

    @AfterEach
    void afterEach(){
        storeRepository.deleteAll();
    }

    @Test
    @DisplayName("가게 상세 정보 조회하기")
    void getStoreDetail() throws Exception {
        Image image1 = Image.builder()
                .name("가게 1 이미지")
                .url("https://www.hsd.co.kr/assets/images/brand/brand_img_02.jpg")
                .build();
        Store store1 = Store.builder()
                .name("store1")
                .openState(true)
                .info("가게 1 테스트용")
                .image(image1)
                .openTime("24시 운영")
                .address("상북도 구미시 옥계북로 27, 삼구트리니엔 108동 1층 108호 (옥계동)")
                .lon(128.41848477014165)
                .lat(36.13917919014956)
                .alwaysShare(true)
                .build();
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

//        Mockito.doReturn(Optional.of(store1)).when(storeRepository).findById(1L);
        doReturn(store1).when(storeService).findById(1L);

        // Set authenticated user
        Member member = Member.builder()
                .email("test@example.com")
                .build();
        Authentication authentication = new UsernamePasswordAuthenticationToken(member, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // when
        mockMvc.perform(get("/stores/{storeId}", 1L)
                .contentType(MediaType.APPLICATION_JSON))

        // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(store1.getName())))
                .andExpect(jsonPath("$.menus", hasSize(store1.getMenus().size())))
                .andExpect(jsonPath("$.menus[0].name", is(store1.getMenus().get(0).getName())))
                .andExpect(jsonPath("$.menus[1].name", is(store1.getMenus().get(1).getName())));
    }
}
