package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class StoreRepositoryTest {
    @Autowired
    private StoreRepository storeRepository;

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
                .openTime("24시 운영")
                .info("가게 1 테스트용")
                .address("상북도 구미시 옥계북로 27, 삼구트리니엔 108동 1층 108호 (옥계동)")
                .lon(128.41848477014165)
                .lat(36.13917919014956)
                .alwaysShare(true)
                .image(image1)
                .build();

        storeRepository.save(store1);

        // when
        Optional<Store> result = storeRepository.findById(1L);
        //then
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());
//        Assertions.assertThat(result.get().getId()).isEqualTo(store1.getId());

    }

    @Test
    @DisplayName("test for find Store Name")
    void findByNameContaining() {
        // given
        // when
        // then
    }
}
