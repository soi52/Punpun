package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ssafy.punpun.dto.request.MenuRegisterRequestDTO;
import edu.ssafy.punpun.dto.request.MenuUpdateRequestDTO;
import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.dto.response.*;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.testutil.WIthCustomOwner;
import edu.ssafy.testutil.WIthCustomSupporter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StoreController.class)
@DisplayName("가게 컨트롤러 테스트")
public class StoreControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StoreService storeService;
    @MockBean
    private MenuService menuService;

    @Test
    @WIthCustomChild
    @DisplayName("get - 가게 정보 상세 보기")
    void getStoreDetail() throws Exception {
        Store store = Store.builder()
                .id(1L)
                .build();
        doReturn(store).when(storeService).findById(1L);
        Menu menu1 = Menu.builder()
                .id(1L)
                .store(store)
                .build();
        Menu menu2 = Menu.builder()
                .id(2L)
                .store(store)
                .build();
        doReturn(List.of(menu1, menu2)).when(menuService).findByStore(store);

        List<MenuMemberResponseDTO> menuMemberResponseDTOList = new ArrayList<>();
        menuMemberResponseDTOList.add(new MenuMemberResponseDTO(menu1));
        menuMemberResponseDTOList.add(new MenuMemberResponseDTO(menu2));
        StoreDetailMemberResponseDTO storeDetailMemberResponseDTO = new StoreDetailMemberResponseDTO(store, menuMemberResponseDTOList);
        String output = new ObjectMapper().writeValueAsString(storeDetailMemberResponseDTO);

        mockMvc.perform(get("/stores/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Test
    @WIthCustomChild
    @DisplayName("get - 가게 정보 상세 보기 _ 아동")
    void getStoreDetailChild() throws Exception {
        Store store = Store.builder()
                .id(1L)
                .build();
        doReturn(store).when(storeService).findById(1L);
        Menu menu1 = Menu.builder()
                .id(1L)
                .store(store)
                .build();
        MenuChildResponseDTO menuChildResponseDTO = new MenuChildResponseDTO(menu1, true);
        doReturn(List.of(menuChildResponseDTO)).when(storeService).getStoreDetailChild(any(Store.class), any(Child.class));

        StoreDetailChildResponseDTO storeDetailChildResponseDTO = new StoreDetailChildResponseDTO(store, List.of(menuChildResponseDTO));
        String output = new ObjectMapper().writeValueAsString(storeDetailChildResponseDTO);

        mockMvc.perform(get("/stores/child/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Nested
    @DisplayName("get - 현 위치 기준 주변 가게 불러오기")
    public class getStoreDistanceTest {

        @Test
        @WIthCustomChild
        @DisplayName("Java")
        void getStoreDistanceTest1() throws Exception {
            Store store1 = Store.builder()
                    .id(1L)
                    .name("스타벅스 구미 인동점")
                    .lon(128.420817F)
                    .lat(36.106961F)
                    .build();
            Store store2 = Store.builder()
                    .id(2L)
                    .name("카페 에이유")
                    .lon(128.420650F)
                    .lat(36.107156F)
                    .build();
            doReturn(List.of(store1, store2)).when(storeService).getStoreDistanceTestJava(128.421046F, 36.106795F);

            List<StoreInfoResponseDTO> storeInfoResponseDTOList = new ArrayList<>();
            storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store1));
            storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store2));
            String output = new ObjectMapper().writeValueAsString(storeInfoResponseDTOList);

            mockMvc.perform(get("/stores/distTestTime/128.421046/36.106795?mode=java")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomSupporter
        @DisplayName("Postgres")
        void getStoreDistanceTest2() throws Exception {
            Store store1 = Store.builder()
                    .name("스타벅스 구미 인동점")
                    .lon(128.420817F)
                    .lat(36.106961F)
                    .build();
            Store store2 = Store.builder()
                    .name("카페 에이유")
                    .lon(128.420650F)
                    .lat(36.107156F)
                    .build();
            doReturn(List.of(store1, store2)).when(storeService).getStoreDistanceTestPostgres(128.421046F, 36.106795F);

            List<StoreInfoResponseDTO> storeInfoResponseDTOList = new ArrayList<>();
            storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store1));
            storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store2));
            String output = new ObjectMapper().writeValueAsString(storeInfoResponseDTOList);

            mockMvc.perform(get("/stores/distTestTime/128.421046/36.106795?mode=postgres")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomSupporter
        @DisplayName("get - 현 위치 기준 주변 가게 불러오기 : Postgres")
        void getStoreDistanceTest4() throws Exception {
            Store store1 = Store.builder()
                    .name("스타벅스 구미 인동점")
                    .lon(128.420817F)
                    .lat(36.106961F)
                    .build();
            Store store2 = Store.builder()
                    .name("카페 에이유")
                    .lon(128.420650F)
                    .lat(36.107156F)
                    .build();

            List<StoreDistResponseDTO> storeDistResponseDTOList = new ArrayList<>();
            storeDistResponseDTOList.add(new StoreDistResponseDTO(store1, true));
            storeDistResponseDTOList.add(new StoreDistResponseDTO(store2, false));

            doReturn(storeDistResponseDTOList).when(storeService).getStoreDistancePostgres(128.421046F, 36.106795F);

            String output = new ObjectMapper().writeValueAsString(storeDistResponseDTOList);

            mockMvc.perform(get("/stores/distTest/128.421046/36.106795?mode=postgres")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }

        @Test
        @WIthCustomSupporter
        @DisplayName("Spark")
        void getStoreDistanceTest3() throws Exception {
            Store store1 = Store.builder()
                    .name("스타벅스 구미 인동점")
                    .lon(128.420817F)
                    .lat(36.106961F)
                    .build();
            Store store2 = Store.builder()
                    .name("카페 에이유")
                    .lon(128.420650F)
                    .lat(36.107156F)
                    .build();
            List<StoreDistResponseDTO> storeDistResponseDTOList = new ArrayList<>();
            storeDistResponseDTOList.add(new StoreDistResponseDTO(store1, true));
            storeDistResponseDTOList.add(new StoreDistResponseDTO(store2, false));
            String output = new ObjectMapper().writeValueAsString(storeDistResponseDTOList);

            doReturn(storeDistResponseDTOList).when(storeService).getStoreDistance(128.421046F, 36.106795F);

            mockMvc.perform(get("/stores/dist/128.421046/36.106795")
                            .with(csrf()))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(content().string(output))
                    .andDo(print());
        }

    }

    @Test
    @WIthCustomChild
    @DisplayName("get - 가게 이름으로 가게 검색 하기")
    void getStoreSearchName() throws Exception {
        Store store1 = Store.builder()
                .id(1L)
                .name("store1")
                .build();
        Store store2 = Store.builder()
                .id(2L)
                .name("store2")
                .build();
        doReturn(List.of(store1, store2)).when(storeService).findByNameContaining("store");

        List<StoreInfoResponseDTO> storeInfoResponseDTOList = new ArrayList<>();
        storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store1));
        storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store2));
        String output = new ObjectMapper().writeValueAsString(storeInfoResponseDTOList);

        mockMvc.perform(get("/stores/search?name=store")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("get - 사장이 소유한 가게 리스트 보기")
    void getStoreList() throws Exception {
        Member member = Member.builder().build();
        Store store1 = Store.builder()
                .owner(member)
                .build();
        Store store2 = Store.builder()
                .owner(member)
                .build();
        doReturn(List.of(store1, store2)).when(storeService).findByOwner(any(Member.class));

        List<StoreInfoResponseDTO> storeInfoResponseDTOList = new ArrayList<>();
        storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store1));
        storeInfoResponseDTOList.add(new StoreInfoResponseDTO(store2));
        String output = new ObjectMapper().writeValueAsString(storeInfoResponseDTOList);

        mockMvc.perform(get("/stores/list")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(content().string(output))
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("post - 가게 등록 하기 - 사장")
    void registerStore() throws Exception {
        doNothing().when(storeService).registerStore(eq(1L), any(Member.class));

        mockMvc.perform(post("/stores/1")
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("put - 가게 상세 정보 수정 - 사장 입장")
    void updateStoreDetail1() throws Exception {
        StoreDetailRequestDTO storeDTO = new StoreDetailRequestDTO();
        storeDTO.setStoreName("Test Store");
        storeDTO.setStoreOpenTime("9:00AM - 5:00PM");
        storeDTO.setStoreInfo("This is a test store.");
        storeDTO.setStoreAddress("123 Main St.");
        storeDTO.setStorePhoneNumber("555-1234");
        storeDTO.setStoreAlwaysShare(false);
        String storeDTOJson = new ObjectMapper().writeValueAsString(storeDTO);
        MockMultipartFile storeInfo = new MockMultipartFile("storeInfo", "storeInfo", "application/json", storeDTOJson.getBytes(StandardCharsets.UTF_8));
        MockMultipartFile storeImage = new MockMultipartFile("storeImage", "test.png", "image/png", "test".getBytes());

        doNothing().when(storeService).updateStoreDetail(eq(1L), any(Member.class), any(StoreDetailRequestDTO.class), any(MultipartFile.class));

        mockMvc.perform(MockMvcRequestBuilders.multipart("/stores/1")
                        .file(storeImage)
                        .file(storeInfo)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("delete - 사장이 소유한 가게 등록 해제")
    void deleteStore() throws Exception {
        doNothing().when(storeService).deleteStoreByMember(eq(1L), any(Member.class));

        mockMvc.perform(delete("/stores/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("post - 가게 메뉴 추가 - 사장")
    void registerMenuDetail() throws Exception {
        MenuRegisterRequestDTO menuDTO = new MenuRegisterRequestDTO();
        menuDTO.setStoreId(1L);
        menuDTO.setMenuName("menuName");
        menuDTO.setMenuPrice(1000L);
        String menuDTOJson = new ObjectMapper().writeValueAsString(menuDTO);
        MockMultipartFile menuRegist = new MockMultipartFile("menuRegist", "menuRegist", "application/json", menuDTOJson.getBytes(StandardCharsets.UTF_8));
        MockMultipartFile menuImage = new MockMultipartFile("menuImage", "test.png", "image/png", "test".getBytes());

        doNothing().when(menuService).registerMenuDetail(eq(1L), eq("menuName"), eq(1000L), any(MultipartFile.class), any(Member.class));

        mockMvc.perform(MockMvcRequestBuilders.multipart("/stores/menu")
                        .file(menuRegist)
                        .file(menuImage)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("put - 가게 메뉴 정보 수정 - 사장 입장")
    void updateMenuDetail() throws Exception {
        MenuUpdateRequestDTO menuDTO = new MenuUpdateRequestDTO();
        menuDTO.setMenuId(1L);
        menuDTO.setMenuName("menuName");
        menuDTO.setMenuPrice(1000L);
        String menuDTOJson = new ObjectMapper().writeValueAsString(menuDTO);
        MockMultipartFile menuRegist = new MockMultipartFile("menuUpdate", "menuUpdate", "application/json", menuDTOJson.getBytes(StandardCharsets.UTF_8));
        MockMultipartFile menuImage = new MockMultipartFile("menuImage", "test.png", "image/png", "test".getBytes());

        doNothing().when(menuService).updateMenuDetail(eq(1L), any(MenuUpdateRequestDTO.class), any(MultipartFile.class), any(Member.class));

        mockMvc.perform(MockMvcRequestBuilders.multipart("/stores/menu/1")
                        .file(menuRegist)
                        .file(menuImage)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @WIthCustomOwner
    @DisplayName("delete - 가게에 등록된 메뉴 삭제 - 사장 입장")
    void deleteMenu() throws Exception {
        doNothing().when(menuService).deleteMenu(eq(1L), any(Member.class));

        mockMvc.perform(delete("/stores/menu/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

}
