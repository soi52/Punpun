package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.dto.response.MenuChildResponseDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.*;
import edu.ssafy.punpun.s3.S3Uploader;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("가게 서비스 테스트")
public class StoreServiceImplTest {
    @Mock
    private StoreRepository storeRepository;
    @Mock
    private MenuRepository menuRepository;
    @Mock
    private FavoriteMenuRepository favoriteMenuRepository;
    @Mock
    private ImageRepository imageRepository;
    @Mock
    private S3Uploader s3Uploader;
    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private StoreServiceImpl storeService;

    @Test
    @DisplayName("가게 상세 정보 보기")
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

        // then
        assertThat(result.getId()).isEqualTo(store1.getId());
        assertThat(result.getName()).isEqualTo(store1.getName());
        assertThat(result.getOpenTime()).isEqualTo(store1.getOpenTime());
        assertThat(result.getInfo()).isEqualTo(store1.getInfo());
        assertThat(result.getAddress()).isEqualTo(store1.getAddress());
        assertThat(result.getLon()).isEqualTo(store1.getLon());
        assertThat(result.getLat()).isEqualTo(store1.getLat());
        assertThat(result.getImage()).isEqualTo(store1.getImage());
        assertThat(result.isAlwaysShare()).isEqualTo(store1.isAlwaysShare());
        assertThat(result.isOpenState()).isEqualTo(store1.isOpenState());
    }

    @Test
    @DisplayName("가게 상세 정보 보기 - 아동")
    void getStoreDetailChild() {
        // given
        Child child = Child.builder().build();
        Store store = Store.builder()
                .id(1L)
                .name("store1")
                .build();
        Menu menu1 = Menu.builder()
                .id(1L)
                .name("menu1")
                .price(10000L)
                .store(store)
                .build();
        Menu menu2 = Menu.builder()
                .id(2L)
                .name("menu2")
                .price(10000L)
                .store(store)
                .build();
        FavoriteMenu favoriteMenu = FavoriteMenu.builder()
                .child(child)
                .menu(menu1)
                .build();

        doReturn(List.of(menu1, menu2)).when(menuRepository).findByStore(store);
        doReturn(Optional.of(favoriteMenu)).when(favoriteMenuRepository).findByChildAndMenu(child, menu1);

        // when
        List<MenuChildResponseDTO> results = storeService.getStoreDetailChild(store, child);

        // then
        assertThat(results.get(0).getMenuId()).isEqualTo(menu1.getId());
        assertThat(results.get(0).getMenuName()).isEqualTo(menu1.getName());
        assertThat(results.get(0).getMenuPrice()).isEqualTo(menu1.getPrice());
        assertThat(results.get(0).isFavoriteMenu()).isEqualTo(true);
        assertThat(results.get(1).getMenuId()).isEqualTo(menu2.getId());
        assertThat(results.get(1).getMenuName()).isEqualTo(menu2.getName());
        assertThat(results.get(1).getMenuPrice()).isEqualTo(menu2.getPrice());
        assertThat(results.get(1).isFavoriteMenu()).isEqualTo(false);
    }

    @Test
    @DisplayName("검색어(가게 이름)가 포함된 가게 찾기")
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
        // then 1
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
        // then 2
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
    @DisplayName("사장님 기준으로 가게 찾기")
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
        // then 1
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
        // then 2
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

    @Nested
    @DisplayName("가게 등록 하기 - 사장")
    public class registerStore {

        @Test
        @DisplayName("가게 등록 하기 - 정상 동작")
        void registerStore1() {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.SUPPORTER)
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .build();

            doReturn(Optional.of(member)).when(memberRepository).findById(1L);
            doReturn(Optional.of(store)).when(storeRepository).findById(1L);

            // when
            storeService.registerStore(1L, member);
            // then
            assertThat(store.getOwner().getId()).isEqualTo(1L);
            assertThat(store.getLicenseNumber()).isEqualTo("117-12-12345");
            assertThat(member.getRole()).isEqualTo(UserRole.OWNER);
        }

        @Test
        @DisplayName("가게 등록 하기 - 오류, 가게가 존재하지 않는 경우")
        void registerStore2() {
            // given
            Member member = Member.builder()
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();

            doReturn(Optional.empty()).when(storeRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> storeService.registerStore(1L, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("가게 등록 하기 - 오류, 이미 사장이 있는 가게인 경우")
        void registerStore3() {
            // given
            Member member1 = Member.builder()
                    .id(1L)
                    .name("member1")
                    .role(UserRole.OWNER)
                    .build();
            Member member2 = Member.builder()
                    .id(2L)
                    .name("member2")
                    .role(UserRole.OWNER)
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .owner(member1)
                    .build();

            doReturn(Optional.of(store)).when(storeRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> storeService.registerStore(1L, member2 ))
                    .isInstanceOf(NotStoreOwnerException.class);
        }

    }

    @Nested
    @DisplayName("가게 상세 정보 수정 - 사장")
    public class updateStoreDetail {
        // TODO : Docker 연결 혹은 S3 Mock 사용

        @Test
        @DisplayName("가게 상세 정보 수정 - 정상 동작, 기존 이미지 없는 경우")
        void updateStoreDetail1() throws IOException {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .owner(member)
                    .build();
            doReturn(Optional.of(store)).when(storeRepository).findById(1L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/"+fileName+"."+contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile image = new MockMultipartFile(
                    "storeImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            StoreDetailRequestDTO storeDetailRequestDTO = new StoreDetailRequestDTO();
            Map<String, String> map = new HashMap<>();
            doReturn(map).when(s3Uploader).upload(image, "storeImage");

            // when
            storeService.updateStoreDetail(1L, member, storeDetailRequestDTO, image);

            // then
            verify(imageRepository, times(1)).save(any(Image.class));
            assertThat(store.getImage()).isNotNull();
        }

        @Test
        @DisplayName("가게 상세 정보 수정 - 정상 동작, 기존 이미지가 있는 경우")
        void updateStoreDetail2() throws IOException {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Image image = Image.builder()
                    .id(1L)
                    .name("testImage")
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .owner(member)
                    .image(image)
                    .build();
            doReturn(Optional.of(store)).when(storeRepository).findById(1L);
            doReturn(Optional.of(image)).when(imageRepository).findById(1L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/"+fileName+"."+contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile fileImage = new MockMultipartFile(
                    "storeImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            StoreDetailRequestDTO storeDetailRequestDTO = new StoreDetailRequestDTO();
            Map<String, String> map = new HashMap<>();
            doReturn(map).when(s3Uploader).upload(fileImage, "storeImage");

            // when
            storeService.updateStoreDetail(1L, member, storeDetailRequestDTO, fileImage);

            // then
            verify(imageRepository, times(0)).save(any(Image.class));
            assertThat(store.getImage()).isNotNull();
            assertThat(store.getImage().getName()).isNotEqualTo("testImage");
        }

        @Test
        @DisplayName("가게 상세 정보 수정 - 가게가 존재하지 않는 경우")
        void updateStoreDetail3() throws IOException {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            doReturn(Optional.empty()).when(storeRepository).findById(1L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/"+fileName+"."+contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile fileImage = new MockMultipartFile(
                    "storeImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );

            // when
            // then
            assertThatThrownBy(() -> storeService.updateStoreDetail(1L, member, any(StoreDetailRequestDTO.class), fileImage))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("가게 상세 정보 수정 - 가게entity에 저장된 이미지와 entity가 맞지 않는 경우")
        void updateStoreDetail4() throws IOException {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Image image = Image.builder()
                    .id(1L)
                    .build();
            Store store = Store.builder()
                    .id(1L)
                    .owner(member)
                    .image(image)
                    .build();
            doReturn(Optional.of(store)).when(storeRepository).findById(1L);
            doReturn(Optional.empty()).when(imageRepository).findById(store.getImage().getId());

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/"+fileName+"."+contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile fileImage = new MockMultipartFile(
                    "storeImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            StoreDetailRequestDTO storeDetailRequestDTO = new StoreDetailRequestDTO();

            // when
            // then
            assertThatThrownBy(() -> storeService.updateStoreDetail(1L, member, storeDetailRequestDTO, fileImage))
                    .isInstanceOf(IllegalArgumentException.class);
        }

    }

    @Nested
    @DisplayName("가게 사장이 가게 삭제 하기 _ 가게 등록 해제")
    public class deleteStoreByMember {
        @Test
        @DisplayName("가게 등록 해제 - 정상 동작")
        void deleteStoreByMember1() {
            // given
            Member member = Member.builder()
                    .name("memberTest")
                    .email("memberTest@email.com")
                    .phoneNumber("01000000000")
                    .role(UserRole.OWNER)
                    .build();
            Store store1 = Store.builder()
                    .id(1L)
                    .name("store1")
                    .openState(true)
                    .info("가게 1 테스트용")
                    .openTime("24시 운영")
                    .address("상북도 구미시 옥계북로 27, 삼구트리니엔 108동 1층 108호 (옥계동)")
                    .lon(128.41848477014165)
                    .lat(36.13917919014956)
                    .alwaysShare(true)
                    .owner(member)
                    .supports(new ArrayList<>())
                    .build();

            doReturn(Optional.of(store1)).when(storeRepository).findById(1L);

            // when
            storeService.deleteStoreByMember(1L, member);
            // then
            assertThat(store1.getId()).isEqualTo(1L);
            assertThat(store1.getOwner()).isEqualTo(null);
        }

        @Test
        @DisplayName("가게 등록 해제 - 가게가 없는 경우")
        void deleteStoreByMember2() {
            // given
            Member member = Member.builder()
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Store store1 = Store.builder()
                    .id(1L)
                    .name("store1")
                    .owner(member)
                    .build();

            doReturn(Optional.empty()).when(storeRepository).findById(2L);

            // when
            // then
            assertThatThrownBy(() -> storeService.deleteStoreByMember(2L, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("가게 등록 해제 - 가게에 주인이 등록되어 있지 않은 경우")
        void deleteStoreByMember3() {
            // given
            Member member1 = Member.builder()
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Store store1 = Store.builder()
                    .id(1L)
                    .name("store1")
                    .build();

            doReturn(Optional.of(store1)).when(storeRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> storeService.deleteStoreByMember(1L, member1))
                    .isInstanceOf(NotStoreOwnerException.class);
        }

        @Test
        @DisplayName("가게 등록 해제 - 가게 주인이 아닌 경우")
        void deleteStoreByMember4() {
            // given
            Member member1 = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Member member2 = Member.builder()
                    .id(2L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Store store1 = Store.builder()
                    .id(1L)
                    .name("store1")
                    .owner(member2)
                    .build();

            doReturn(Optional.of(store1)).when(storeRepository).findById(eq(1L));

            // when
            // then
            assertThatCode(() -> storeService.deleteStoreByMember(1L, member1))
                    .isInstanceOf(NotStoreOwnerException.class);
        }
    }
}
