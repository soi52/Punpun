package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.repository.StoreRepository;
import org.apache.zookeeper.Op;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class StoreServiceImplTest {
    @Mock
    private StoreRepository storeRepository;

    @InjectMocks
    private StoreServiceImpl storeService;

    @Test
    @DisplayName("test for Store Detail Dto")
    void findById() {
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
//        storeRepository.save(store1);

        Mockito.doReturn(Optional.of(store1)).when(storeRepository).findById(0L);

        // when
        Store result = storeService.findById(0L);

        //then
        Assertions.assertThat(result.getId()).isEqualTo(store1.getId());
        Assertions.assertThat(result.getName()).isEqualTo(store1.getName());
        Assertions.assertThat(result.getOpenTime()).isEqualTo(store1.getOpenTime());
        Assertions.assertThat(result.getInfo()).isEqualTo(store1.getInfo());
        Assertions.assertThat(result.getAddress()).isEqualTo(store1.getAddress());
        Assertions.assertThat(result.getLon()).isEqualTo(store1.getLon());
        Assertions.assertThat(result.getLat()).isEqualTo(store1.getLat());
        Assertions.assertThat(result.getImage()).isEqualTo(store1.getImage());
        Assertions.assertThat(result.isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        Assertions.assertThat(result.isOpenState()).isEqualTo(store1.isOpenState());
    }
}
