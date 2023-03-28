package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.MenuDTO;
import edu.ssafy.punpun.dto.response.StoreDetailDTO;
import edu.ssafy.punpun.dto.response.StoreInfoDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {
    private final StoreService storeService;
    private final MenuService menuService;

    @GetMapping("/test")
    @ResponseStatus(code = HttpStatus.OK)
//    public ResponseEntity<?> testforAuthenticationPrincipal(@ApiIgnore @AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
    public ResponseEntity<?> testforAuthenticationPrincipal(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
        Member member = principalMemberDetail.getMember();
        return new ResponseEntity<String>(member.getEmail(), HttpStatus.OK);
    }

    @GetMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailDTO getStoreDetail(@PathVariable("storeId") Long id) {
        Store store = storeService.findById(id);
        List<MenuDTO> menuDTOList = new ArrayList<>();
        List<Menu> menuList = menuService.findByStore(store);

        for (Menu menu : menuList) {
            menuDTOList.add(new MenuDTO(menu));
        }

        return new StoreDetailDTO(store, menuDTOList);
    }

    @GetMapping("/list")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoDTO> getStoreList(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
        Member member = principalMemberDetail.getMember();

        List<Store> storeList = storeService.findByOwner(member);
        List<StoreInfoDTO> storeInfoDTOList = new ArrayList<>();

        for (Store store : storeList) {
            storeInfoDTOList.add(new StoreInfoDTO(store));
        }

        return storeInfoDTOList;
    }

//    @GetMapping("/search")
//    @ResponseStatus(code = HttpStatus.OK)
//    public
}
