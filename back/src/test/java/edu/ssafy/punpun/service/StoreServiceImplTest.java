package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Image;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.entity.enumurate.UserRole;
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

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StoreServiceImplTest {
    @Mock
    private StoreRepository storeRepository;

    @InjectMocks
    private StoreServiceImpl storeService;

    @Test
    @DisplayName("Service: test for Store Detail Dto")
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

        doReturn(Optional.of(store1)).when(storeRepository).findById(0L);

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

    @Test
    @DisplayName("Service: test for find Store by Name Containing")
    void findByNameContaining() {
        // given
        Store store1 = Store.builder()
                .name("store1")
                .openState(true)
                .info("가게 1 테스트용")
                .openTime("24시 운영")
                .address("상북도 구미시 옥계북로 27, 삼구트리니엔 108동 1층 108호 (옥계동)")
                .lon(128.41848477014165)
                .lat(36.13917919014956)
                .alwaysShare(true)
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
                .build();

        doReturn(List.of(store1, store2)).when(storeRepository).findByNameContaining("store");

        // when
        List<Store> results = storeService.findByNameContaining("store");
        //then 1
        Assertions.assertThat(results.get(0).getId()).isEqualTo(store1.getId());
        Assertions.assertThat(results.get(0).getName()).isEqualTo(store1.getName());
        Assertions.assertThat(results.get(0).getOpenTime()).isEqualTo(store1.getOpenTime());
        Assertions.assertThat(results.get(0).getInfo()).isEqualTo(store1.getInfo());
        Assertions.assertThat(results.get(0).getAddress()).isEqualTo(store1.getAddress());
        Assertions.assertThat(results.get(0).getLon()).isEqualTo(store1.getLon());
        Assertions.assertThat(results.get(0).getLat()).isEqualTo(store1.getLat());
        Assertions.assertThat(results.get(0).getImage()).isEqualTo(store1.getImage());
        Assertions.assertThat(results.get(0).isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        Assertions.assertThat(results.get(0).isOpenState()).isEqualTo(store1.isOpenState());
        //then 2
        Assertions.assertThat(results.get(1).getId()).isEqualTo(store2.getId());
        Assertions.assertThat(results.get(1).getName()).isEqualTo(store2.getName());
        Assertions.assertThat(results.get(1).getOpenTime()).isEqualTo(store2.getOpenTime());
        Assertions.assertThat(results.get(1).getInfo()).isEqualTo(store2.getInfo());
        Assertions.assertThat(results.get(1).getAddress()).isEqualTo(store2.getAddress());
        Assertions.assertThat(results.get(1).getLon()).isEqualTo(store2.getLon());
        Assertions.assertThat(results.get(1).getLat()).isEqualTo(store2.getLat());
        Assertions.assertThat(results.get(1).getImage()).isEqualTo(store2.getImage());
        Assertions.assertThat(results.get(1).isAlwaysShare()).isEqualTo(store2.isAlwaysShare());
        Assertions.assertThat(results.get(1).isOpenState()).isEqualTo(store2.isOpenState());
    }

    @Test
    @DisplayName("Service: test for find Store by Owner")
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

        doReturn(List.of(store1, store2)).when(storeRepository).findByOwner(member);

        // when
        List<Store> results = storeService.findByOwner(member);
        //then 1
        Assertions.assertThat(results.get(0).getId()).isEqualTo(store1.getId());
        Assertions.assertThat(results.get(0).getName()).isEqualTo(store1.getName());
        Assertions.assertThat(results.get(0).getOpenTime()).isEqualTo(store1.getOpenTime());
        Assertions.assertThat(results.get(0).getInfo()).isEqualTo(store1.getInfo());
        Assertions.assertThat(results.get(0).getAddress()).isEqualTo(store1.getAddress());
        Assertions.assertThat(results.get(0).getLon()).isEqualTo(store1.getLon());
        Assertions.assertThat(results.get(0).getLat()).isEqualTo(store1.getLat());
        Assertions.assertThat(results.get(0).getImage()).isEqualTo(store1.getImage());
        Assertions.assertThat(results.get(0).isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        Assertions.assertThat(results.get(0).isOpenState()).isEqualTo(store1.isOpenState());
        //then 2
        Assertions.assertThat(results.get(1).getId()).isEqualTo(store2.getId());
        Assertions.assertThat(results.get(1).getName()).isEqualTo(store2.getName());
        Assertions.assertThat(results.get(1).getOpenTime()).isEqualTo(store2.getOpenTime());
        Assertions.assertThat(results.get(1).getInfo()).isEqualTo(store2.getInfo());
        Assertions.assertThat(results.get(1).getAddress()).isEqualTo(store2.getAddress());
        Assertions.assertThat(results.get(1).getLon()).isEqualTo(store2.getLon());
        Assertions.assertThat(results.get(1).getLat()).isEqualTo(store2.getLat());
        Assertions.assertThat(results.get(1).getImage()).isEqualTo(store2.getImage());
        Assertions.assertThat(results.get(1).isAlwaysShare()).isEqualTo(store2.isAlwaysShare());
        Assertions.assertThat(results.get(1).isOpenState()).isEqualTo(store2.isOpenState());
    }

    @Test
    @DisplayName("Service: test for deleteStoreByMember")
    void deleteStoreByMember() {
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

        doReturn(Optional.of(store1)).when(storeRepository).findById(1L);

        // when
        storeService.deleteStoreByMember(1L, member);
        //then
        Assertions.assertThat(store1.getId()).isEqualTo(store1.getId());
        Assertions.assertThat(store1.getName()).isEqualTo(store1.getName());
        Assertions.assertThat(store1.getOpenTime()).isEqualTo(store1.getOpenTime());
        Assertions.assertThat(store1.getInfo()).isEqualTo(store1.getInfo());
        Assertions.assertThat(store1.getAddress()).isEqualTo(store1.getAddress());
        Assertions.assertThat(store1.getLon()).isEqualTo(store1.getLon());
        Assertions.assertThat(store1.getLat()).isEqualTo(store1.getLat());
        Assertions.assertThat(store1.getImage()).isEqualTo(store1.getImage());
        Assertions.assertThat(store1.isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        Assertions.assertThat(store1.isOpenState()).isEqualTo(store1.isOpenState());
        Assertions.assertThat(store1.getOwner()).isEqualTo(null);
    }

}
