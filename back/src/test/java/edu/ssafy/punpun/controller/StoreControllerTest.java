package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ssafy.punpun.dto.response.*;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import edu.ssafy.testutil.WIthCustomChild;
import edu.ssafy.testutil.WIthCustomOwner;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

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
    @DisplayName("delete - 사장이 소유한 가게 등록 해제")
    void deleteStore() throws Exception {
        doNothing().when(storeService).deleteStoreByMember(any(Member.class), eq(1L));

        mockMvc.perform(delete("/stores/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

}
