package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DisplayName("가게 레포지토리 테스트")
public class StoreRepositoryTest {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private MemberRepository memberRepository;

    @AfterEach
    void afterEach() {
        storeRepository.deleteAll();
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("Repository: test for Store Detail Dto")
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

        storeRepository.save(store1);

        // when
        Optional<Store> result = storeRepository.findById(store1.getId());
        //then
        assertThat(result.get().getId()).isEqualTo(store1.getId());
        assertThat(result.get().getName()).isEqualTo(store1.getName());
        assertThat(result.get().getOpenTime()).isEqualTo(store1.getOpenTime());
        assertThat(result.get().getInfo()).isEqualTo(store1.getInfo());
        assertThat(result.get().getAddress()).isEqualTo(store1.getAddress());
        assertThat(result.get().getLon()).isEqualTo(store1.getLon());
        assertThat(result.get().getLat()).isEqualTo(store1.getLat());
        assertThat(result.get().getImage()).isEqualTo(store1.getImage());
        assertThat(result.get().isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        assertThat(result.get().isOpenState()).isEqualTo(store1.isOpenState());
    }

//    @Test
//    @DisplayName("Repository: test for Store Distance")
//    void findByEarthDistancePostgres() {
//        // given
//        Store store1 = Store.builder()
//                .name("스타벅스 구미 인동점")
//                .lon(128.420817)
//                .lat(36.106961)
//                .alwaysShare(true)
//                .build();
//        Store store2 = Store.builder()
//                .name("카페 에이유")
//                .lon(128.420650)
//                .lat(36.107156)
//                .build();
//        Store store3 = Store.builder()
//                .name("텐동 고마츠")
//                .lon(128.331800)
//                .lat(36.127264)
//                .build();
//        storeRepository.save(store1);
//        storeRepository.save(store2);
//        storeRepository.save(store3);
//
//        // when
//        Float longitude = 128.421046F;
//        Float latitude = 36.106795F;
//        Integer radius = 200;
//        List<Store> results = storeRepository.findByEarthDistancePostgres(longitude, latitude, radius);
//
//        //then
//        assertThat(results.size()).isEqualTo(2);
//    }

    @Test
    @DisplayName("Repository: test for find Store Name Containing")
    void findByNameContaining() {
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
        Image image2 = Image.builder()
                .name("가게 2 이미지")
                .url("https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20221226_265%2F1672042800597yPllP_PNG%2F20220927_111345.png")
                .build();
        Store store2 = Store.builder()
                .name("store2")
                .openState(true)
                .info("가게 2 테스트용")
                .image(image2)
                .openTime("24시 운영")
                .address("경북 구미시 인동중앙로1길 12")
                .lon(128.419606)
                .lat(36.107291)
                .alwaysShare(true)
                .build();

        storeRepository.save(store1);
        storeRepository.save(store2);

        // when
        List<Store> results = storeRepository.findByNameContaining("store");
        //then 1
        assertThat(results.get(0).getId()).isEqualTo(store1.getId());
        assertThat(results.get(0).getName()).isEqualTo(store1.getName());
        assertThat(results.get(0).getOpenTime()).isEqualTo(store1.getOpenTime());
        assertThat(results.get(0).getInfo()).isEqualTo(store1.getInfo());
        assertThat(results.get(0).getAddress()).isEqualTo(store1.getAddress());
        assertThat(results.get(0).getLon()).isEqualTo(store1.getLon());
        assertThat(results.get(0).getLat()).isEqualTo(store1.getLat());
        assertThat(results.get(0).getImage()).isEqualTo(store1.getImage());
        assertThat(results.get(0).isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        assertThat(results.get(0).isOpenState()).isEqualTo(store1.isOpenState());
        //then 2
        assertThat(results.get(1).getId()).isEqualTo(store2.getId());
        assertThat(results.get(1).getName()).isEqualTo(store2.getName());
        assertThat(results.get(1).getOpenTime()).isEqualTo(store2.getOpenTime());
        assertThat(results.get(1).getInfo()).isEqualTo(store2.getInfo());
        assertThat(results.get(1).getAddress()).isEqualTo(store2.getAddress());
        assertThat(results.get(1).getLon()).isEqualTo(store2.getLon());
        assertThat(results.get(1).getLat()).isEqualTo(store2.getLat());
        assertThat(results.get(1).getImage()).isEqualTo(store2.getImage());
        assertThat(results.get(1).isAlwaysShare()).isEqualTo(store2.isAlwaysShare());
        assertThat(results.get(1).isOpenState()).isEqualTo(store2.isOpenState());
    }

    @Test
    @DisplayName("Repository: test for find Store by Owner")
    void findByOwner() {
        // given
        Member member = Member.builder()
                .name("memberTest")
                .email("memberTest@email.com")
                .phoneNumber("01000000000")
                .role(UserRole.OWNER)
                .build();
        Store store1 = Store.builder()
                .name("store1")
                .openState(true)
                .info("가게 1 테스트용")
                .openTime("24시 운영")
                .address("상북도 구미시 옥계북로 27, 삼구트리니엔 108동 1층 108호 (옥계동)")
                .lon(128.41848477014165)
                .lat(36.13917919014956)
                .alwaysShare(true)
                .owner(member)
                .build();
        Store store2 = Store.builder()
                .name("store2")
                .openState(true)
                .info("가게 2 테스트용")
                .openTime("24시 운영")
                .address("경북 구미시 인동중앙로1길 12")
                .lon(128.419606)
                .lat(36.107291)
                .alwaysShare(true)
                .owner(member)
                .build();

        memberRepository.save(member);
        storeRepository.save(store1);
        storeRepository.save(store2);

        // when
        List<Store> results = storeRepository.findByOwner(member);
        //then 1
        assertThat(results.get(0).getId()).isEqualTo(store1.getId());
        assertThat(results.get(0).getName()).isEqualTo(store1.getName());
        assertThat(results.get(0).getOpenTime()).isEqualTo(store1.getOpenTime());
        assertThat(results.get(0).getInfo()).isEqualTo(store1.getInfo());
        assertThat(results.get(0).getAddress()).isEqualTo(store1.getAddress());
        assertThat(results.get(0).getLon()).isEqualTo(store1.getLon());
        assertThat(results.get(0).getLat()).isEqualTo(store1.getLat());
        assertThat(results.get(0).getImage()).isEqualTo(store1.getImage());
        assertThat(results.get(0).isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        assertThat(results.get(0).isOpenState()).isEqualTo(store1.isOpenState());
        //then 2
        assertThat(results.get(1).getId()).isEqualTo(store2.getId());
        assertThat(results.get(1).getName()).isEqualTo(store2.getName());
        assertThat(results.get(1).getOpenTime()).isEqualTo(store2.getOpenTime());
        assertThat(results.get(1).getInfo()).isEqualTo(store2.getInfo());
        assertThat(results.get(1).getAddress()).isEqualTo(store2.getAddress());
        assertThat(results.get(1).getLon()).isEqualTo(store2.getLon());
        assertThat(results.get(1).getLat()).isEqualTo(store2.getLat());
        assertThat(results.get(1).getImage()).isEqualTo(store2.getImage());
        assertThat(results.get(1).isAlwaysShare()).isEqualTo(store2.isAlwaysShare());
        assertThat(results.get(1).isOpenState()).isEqualTo(store2.isOpenState());
    }

}
