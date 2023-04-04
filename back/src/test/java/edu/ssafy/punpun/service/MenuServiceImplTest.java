package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.MenuUpdateRequestDTO;
import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.exception.NotDeleteEntityException;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.ImageRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.StoreRepository;
import edu.ssafy.punpun.s3.S3Uploader;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MenuServiceImplTest {

    @Mock
    private MenuRepository menuRepository;
    @Mock
    private StoreRepository storeRepository;
    @Mock
    private ImageRepository imageRepository;
    @Mock
    private S3Uploader s3Uploader;
    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MenuServiceImpl menuService;

    @Test
    @DisplayName("test for Menu Service Impl findByStore")
    void findByStore() {
        // given
        Store store1 = Store.builder().build();
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

        menuRepository.save(menu1);
        menuRepository.save(menu2);

        Mockito.doReturn(List.of(menu1, menu2)).when(menuRepository).findByStore(store1);

        // when
        List<Menu> results = menuRepository.findByStore(store1);

        //then
        Assertions.assertThat(results.get(0).getId()).isEqualTo(menu1.getId());
        Assertions.assertThat(results.get(0).getPrice()).isEqualTo(menu1.getPrice());
        Assertions.assertThat(results.get(0).getSponsoredCount()).isEqualTo(menu1.getSponsoredCount());
        Assertions.assertThat(results.get(0).getStore()).isEqualTo(menu1.getStore());
        Assertions.assertThat(results.get(1).getId()).isEqualTo(menu2.getId());
        Assertions.assertThat(results.get(1).getPrice()).isEqualTo(menu2.getPrice());
        Assertions.assertThat(results.get(1).getSponsoredCount()).isEqualTo(menu2.getSponsoredCount());
        Assertions.assertThat(results.get(1).getStore()).isEqualTo(menu2.getStore());

    }

    @Nested
    @DisplayName("메뉴 등록하기")
    public class registerMenuDetail {
        @Test
        @DisplayName("메뉴 등록하기 - 정상 동작, 이미지가 없는 경우")
        void registerMenuDetail1() {
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

            // when
            menuService.registerMenuDetail(1L, "test1", 8000L, null, member);

            // then
            verify(menuRepository, times(1)).save(any(Menu.class));
        }

        @Test
        @DisplayName("메뉴 등록하기 - 정상 동작, 이미지가 있는 경우")
        void registerMenuDetail2() throws IOException {
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
            final String filePath = "src/test/resources/testImage/" + fileName + "." + contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile image = new MockMultipartFile(
                    "menuImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            Map<String, String> map = new HashMap<>();
            doReturn(map).when(s3Uploader).upload(image, "menuImage");

            // when
            menuService.registerMenuDetail(1L, "test1", 8000L, image, member);

            // then
            verify(imageRepository, times(1)).save(any(Image.class));
            verify(menuRepository, times(1)).save(any(Menu.class));
        }

        @Test
        @DisplayName("메뉴 등록하기 - 오류, 메뉴에 해당하는 가게가 없는 경우")
        void registerMenuDetail3() throws IOException {            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            doReturn(Optional.empty()).when(storeRepository).findById(1L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/" + fileName + "." + contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile image = new MockMultipartFile(
                    "menuImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );

            // when
            // then
            assertThatThrownBy(() -> menuService.registerMenuDetail(1L, "test1", 8000L, image, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("메뉴 등록하기 - 오류, 가게의 주인이 아닌 경우")
        void registerMenuDetail4() throws IOException {
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
            Store store = Store.builder()
                    .id(1L)
                    .owner(member1)
                    .build();
            doReturn(Optional.of(store)).when(storeRepository).findById(1L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/" + fileName + "." + contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile image = new MockMultipartFile(
                    "menuImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );

            // when
            // then
            assertThatThrownBy(() -> menuService.registerMenuDetail(1L, "test1", 8000L, image, member2))
                    .isInstanceOf(NotStoreOwnerException.class);
        }

    }

    @Nested
    @DisplayName("메뉴 수정하기")
    public class updateMenuDetail {

        @Test
        @DisplayName("메뉴 수정하기 - 정상 동작, 기존 이미지가 없는 경우, 입력 이미지가 없는 경우")
        void updateMenuDetail1() {
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
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            MenuUpdateRequestDTO menuUpdateRequestDTO = new MenuUpdateRequestDTO(1L, "test1", 2000L);

            // when
            menuService.updateMenuDetail(1L, menuUpdateRequestDTO, null, member);

            // then
            assertThat(menu.getName()).isEqualTo("test1");
            assertThat(menu.getPrice()).isEqualTo(2000L);
            assertThat(menu.getImage()).isNull();
        }

        @Test
        @DisplayName("메뉴 수정하기 - 정상 동작, 기존 이미지가 없는 경우, 입력 이미지가 있는 경우")
        void updateMenuDetail2() throws IOException {
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
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            MenuUpdateRequestDTO menuUpdateRequestDTO = new MenuUpdateRequestDTO(1L, "test1", 2000L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/" + fileName + "." + contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile fileImage = new MockMultipartFile(
                    "menuImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            StoreDetailRequestDTO storeDetailRequestDTO = new StoreDetailRequestDTO();
            Map<String, String> map = new HashMap<>();
            doReturn(map).when(s3Uploader).upload(fileImage, "menuImage");

            // when
            menuService.updateMenuDetail(1L, menuUpdateRequestDTO, fileImage, member);

            // then
            assertThat(menu.getName()).isEqualTo("test1");
            assertThat(menu.getPrice()).isEqualTo(2000L);
            assertThat(menu.getImage()).isNotNull();
            verify(imageRepository, times(1)).save(any(Image.class));
        }

        @Test
        @DisplayName("메뉴 수정하기 - 정상 동작, 기존 이미지가 있는 경우, 입력 이미지가 없는 경우")
        void updateMenuDetail3() {
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
            Image image = Image.builder().build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .image(image)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            MenuUpdateRequestDTO menuUpdateRequestDTO = new MenuUpdateRequestDTO(1L, "test1", 2000L);

            // when
            menuService.updateMenuDetail(1L, menuUpdateRequestDTO, null, member);

            // then
            assertThat(menu.getName()).isEqualTo("test1");
            assertThat(menu.getPrice()).isEqualTo(2000L);
        }

        @Test
        @DisplayName("메뉴 수정하기 - 정상 동작, 기존 이미지가 있는 경우, 입력 이미지가 있는 경우")
        void updateMenuDetail4() throws IOException {
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
            Image image = Image.builder()
                    .id(1L)
                    .name("testImage").build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .image(image)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);
            doReturn(Optional.of(image)).when(imageRepository).findById(menu.getImage().getId());
            MenuUpdateRequestDTO menuUpdateRequestDTO = new MenuUpdateRequestDTO(1L, "test1", 2000L);

            final String fileName = "testImage1"; //파일명
            final String contentType = "png"; //파일타입
            final String filePath = "src/test/resources/testImage/" + fileName + "." + contentType; //파일경로
            FileInputStream fileInputStream = new FileInputStream(new File(filePath));
            MockMultipartFile fileImage = new MockMultipartFile(
                    "menuImage", //name
                    fileName + "." + contentType, //originalFilename
                    contentType,
                    fileInputStream
            );
            Map<String, String> map = new HashMap<>();
            doReturn(map).when(s3Uploader).upload(fileImage, "menuImage");

            // when
            menuService.updateMenuDetail(1L, menuUpdateRequestDTO, fileImage, member);

            // then
            assertThat(menu.getName()).isEqualTo("test1");
            assertThat(menu.getPrice()).isEqualTo(2000L);
            assertThat(menu.getImage().getName()).isNotEqualTo("testImage");
        }

        @Test
        @DisplayName("메뉴 수정하기 - 오류, 해당하는 메뉴가 없는 경우")
        void updateMenuDetail5() {            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            doReturn(Optional.empty()).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.updateMenuDetail(1L, any(MenuUpdateRequestDTO.class), null, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("메뉴 수정하기 - 오류, 메뉴에 해당하는 가게가 없는 경우")
        void updateMenuDetail6() {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.updateMenuDetail(1L, any(MenuUpdateRequestDTO.class), null, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

    }

    @Nested
    @DisplayName("메뉴 삭제하기")
    public class deleteMenu {
        @Test
        @DisplayName("메뉴 삭제하기 - 정상 동작")
        void deleteMenu1() {
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
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .favoriteMenus(new ArrayList<>())
                    .supports(new ArrayList<>())
                    .reservations(new ArrayList<>())
                    .build();

            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            menuService.deleteMenu(1L, member);

            // then
            verify(menuRepository, times(1)).delete(menu);
        }

        @Test
        @DisplayName("메뉴 삭제하기 - 오류, 해당하는 메뉴가 없는 경우")
        void deleteMenu2() {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            doReturn(Optional.empty()).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.deleteMenu(1L, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("메뉴 삭제하기 - 오류, 메뉴에 해당하는 가게가 없는 경우")
        void deleteMenu3() {
            // given
            Member member = Member.builder()
                    .id(1L)
                    .name("memberTest")
                    .role(UserRole.OWNER)
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.deleteMenu(1L, member))
                    .isInstanceOf(IllegalArgumentException.class);
        }

        @Test
        @DisplayName("메뉴 삭제하기 - 오류, 후원 내역이 있는 경우, 나눔이 있는 경우")
        void deleteMenu4() {
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
            Support support = Support.builder()
                    .id(1L)
                    .build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .supports(List.of(support))
                    .favoriteMenus(new ArrayList<>())
                    .reservations(new ArrayList<>())
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.deleteMenu(1L, member))
                    .isInstanceOf(NotDeleteEntityException.class);
        }

        @Test
        @DisplayName("메뉴 삭제하기 - 오류, 예약이 있는 경우")
        void deleteMenu5() {
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
            Reservation reservation = Reservation.builder().build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .reservations(List.of(reservation))
                    .supports(new ArrayList<>())
                    .favoriteMenus(new ArrayList<>())
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.deleteMenu(1L, member))
                    .isInstanceOf(NotDeleteEntityException.class);
        }

        @Test
        @DisplayName("메뉴 삭제하기 - 오류, 좋아하는 메뉴로 등록된 경우")
        void deleteMenu6() {
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
            FavoriteMenu favoriteMenu = FavoriteMenu.builder().build();
            Menu menu = Menu.builder()
                    .id(1L)
                    .name("test")
                    .price(1000L)
                    .store(store)
                    .favoriteMenus(List.of(favoriteMenu))
                    .reservations(new ArrayList<>())
                    .supports(new ArrayList<>())
                    .build();
            doReturn(Optional.of(menu)).when(menuRepository).findById(1L);

            // when
            // then
            assertThatThrownBy(() -> menuService.deleteMenu(1L, member))
                    .isInstanceOf(NotDeleteEntityException.class);
        }

    }


    @Test
    @DisplayName("메뉴 id로 메뉴 가져오기 - 서비스")
    void addSponsoredCount() {
        // given
        Store store = Store.builder().build();
        Menu menu = Menu.builder()
                .id(1L)
                .name("test1")
                .price(8000L)
                .sponsoredCount(1L)
                .store(store)
                .build();

        Mockito.doReturn(Optional.of(menu)).when(menuRepository).findById(menu.getId());

        // when
        menuService.addSponsoredCount(menu.getId(), 2L);

        //then
        Assertions.assertThat(menu.getId()).isEqualTo(menu.getId());
        Assertions.assertThat(menu.getName()).isEqualTo(menu.getName());
        Assertions.assertThat(menu.getPrice()).isEqualTo(menu.getPrice());
        Assertions.assertThat(menu.getSponsoredCount()).isEqualTo(3L);
        Assertions.assertThat(menu.getStore()).isEqualTo(menu.getStore());
    }
}
