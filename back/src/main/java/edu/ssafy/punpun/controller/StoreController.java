package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.StoreUpdateDTO;
import edu.ssafy.punpun.dto.response.*;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.FavoriteMenuService;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {
    private final StoreService storeService;
    private final MenuService menuService;
    private final FavoriteMenuService favoriteMenuService;

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

    @GetMapping("/search")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoDTO> getStoreSearchName(@RequestParam(name = "name", required = false) String storeName) {
        List<Store> storeList = storeService.findByNameContaining(storeName);
        List<StoreInfoDTO> storeInfoDTOList = new ArrayList<>();

        for (Store store : storeList) {
            storeInfoDTOList.add(new StoreInfoDTO(store));
        }

        return storeInfoDTOList;
    }

//    @GetMapping("/child/{storeId}")
//    @ResponseStatus(code = HttpStatus.OK)
//    public StoreDetailChildDTO getStoreDetailChild(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @PathVariable("storeId") Long storeId) {
//        Child child = principalChildDetail.getChild();
//
//        Store store = storeService.findById(storeId);
//        List<Menu> menuList = menuService.findByStore(store);
//        List<FavoriteMenu> favoriteMenuList = favoriteMenuService.findByChildAndMenu_Store(child, store);
//        List<FavoriteMenuDTO> favoriteMenuDTOList = new ArrayList<>();
//
//        if (favoriteMenuList.isEmpty()) {
//            for (Menu menu : menuList) {
//                for (FavoriteMenu favoriteMenu : favoriteMenuList) {
//                    if (menu.getId() == favoriteMenu.getMenu().getId())
//                        favoriteMenuDTOList.add(new FavoriteMenuDTO(menu, true));
//                }
//
//            }
//        } else {
//            for (Menu menu : menuList) {
//                favoriteMenuDTOList.add(new FavoriteMenuDTO(menu, false));
//            }
//        }
//        return new StoreDetailChildDTO(store, favoriteMenuDTOList);
//    }


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

//    @PatchMapping("/{storeId}")
//    @ResponseStatus(code = HttpStatus.OK)
//    public void updateStoreDetail(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable("storeId") Long id, @RequestBody StoreUpdateDTO storeUpdateDTO) {
//
//    }

    @DeleteMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable("storeId") Long id) {
        Member member = principalMemberDetail.getMember();
        storeService.deleteStoreByMember(id, member);
    }

}
