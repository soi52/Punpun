package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.*;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {
    private final StoreService storeService;
    private final MenuService menuService;

    @GetMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailMemberResponseDTO getStoreDetail(@PathVariable("storeId") Long id) {
        Store store = storeService.findById(id);
        List<MenuResponseDTO> menuResponseDTOList = menuService.findByStore(store).stream()
                .map(MenuResponseDTO::new)
                .collect(Collectors.toList());

        return new StoreDetailMemberResponseDTO(store, menuResponseDTOList);
    }

    @GetMapping("/child/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailChildResponseDTO getStoreDetailChild(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @PathVariable("storeId") Long id) {
        Child child = principalChildDetail.getChild();
        Store store = storeService.findById(id);
        List<FavoriteMenuDTO> favoriteMenuDTOList = storeService.getStoreDetailChild(store, child);

        return new StoreDetailChildResponseDTO(store, favoriteMenuDTOList);
    }

    @GetMapping("/search")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoResponseDTO> getStoreSearchName(@RequestParam(name = "name", required = false) String storeName) {
        List<StoreInfoResponseDTO> storeInfoResponseDTOList =
                storeService.findByNameContaining(storeName).stream()
                        .map(StoreInfoResponseDTO::new)
                        .collect(Collectors.toList());

        return storeInfoResponseDTOList;
    }

    @GetMapping("/list")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoResponseDTO> getStoreList(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
        Member member = principalMemberDetail.getMember();

        List<StoreInfoResponseDTO> storeInfoResponseDTOList = storeService.findByOwner(member).stream()
                .map(StoreInfoResponseDTO::new)
                .collect(Collectors.toList());

        return storeInfoResponseDTOList;
    }

    @DeleteMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable("storeId") Long storeId) {
        Member member = principalMemberDetail.getMember();
        storeService.deleteStoreByMember(member, storeId);
    }

}
