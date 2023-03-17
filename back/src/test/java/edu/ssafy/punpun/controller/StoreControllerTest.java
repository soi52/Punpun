package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.PunpunApplication;
import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.StoreRepository;
import edu.ssafy.punpun.security.SecurityConfig;
import edu.ssafy.punpun.service.StoreService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

@WebMvcTest(StoreController.class)
@ContextConfiguration(classes = {PunpunApplication.class, SecurityConfig.class})
public class StoreControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StoreService storeService;
    @MockBean
    private StoreRepository storeRepository;

    @Test
    @DisplayName("test for Store Detail Dto")
    void findById() throws Exception {
        // given
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

        Mockito.doReturn(Optional.of(store1)).when(storeRepository).findById(0L);

    }
}
