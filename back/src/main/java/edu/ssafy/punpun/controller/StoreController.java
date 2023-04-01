package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.*;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import io.swagger.annotations.ApiOperation;
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

    @ApiOperation(value = "가게 상세 정보 보기 - 사장, 후원자 입장")
    @GetMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailMemberResponseDTO getStoreDetail(@PathVariable("storeId") Long id) {
        Store store = storeService.findById(id);
        List<MenuMemberResponseDTO> menuMemberResponseDTOList = menuService.findByStore(store).stream()
                .map(MenuMemberResponseDTO::new)
                .collect(Collectors.toList());

        return new StoreDetailMemberResponseDTO(store, menuMemberResponseDTOList);
    }

    @ApiOperation(value = "가게 상세 정보 보기 - 아동 입장")
    @GetMapping("/child/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailChildResponseDTO getStoreDetailChild(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @PathVariable("storeId") Long id) {
        Child child = principalChildDetail.getChild();
        Store store = storeService.findById(id);
        List<MenuChildResponseDTO> menuChildResponseDTOList = storeService.getStoreDetailChild(store, child);

        return new StoreDetailChildResponseDTO(store, menuChildResponseDTOList);
    }

    @ApiOperation(value = "가게 검색 - 이름으로")
    @GetMapping("/search")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoResponseDTO> getStoreSearchName(@RequestParam(name = "name", required = false) String storeName) {
        List<StoreInfoResponseDTO> storeInfoResponseDTOList =
                storeService.findByNameContaining(storeName).stream()
                        .map(StoreInfoResponseDTO::new)
                        .collect(Collectors.toList());

        return storeInfoResponseDTOList;
    }

    @ApiOperation(value = "사장 소유 가게 리스트 보기")
    @GetMapping("/list")
    @ResponseStatus(code = HttpStatus.OK)
    public List<StoreInfoResponseDTO> getStoreList(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail) {
        Member member = principalMemberDetail.getMember();

        List<StoreInfoResponseDTO> storeInfoResponseDTOList = storeService.findByOwner(member).stream()
                .map(StoreInfoResponseDTO::new)
                .collect(Collectors.toList());

        return storeInfoResponseDTOList;
    }

    @ApiOperation(value = "가게 등록 - 사장 입장")
    @PostMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    // public void registerStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable ("storeId") Long storeId, @RequestParam("licenseNumber") MultipartFile image) {
    public void registerStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable ("storeId") Long storeId) {
        Member member = principalMemberDetail.getMember();
        storeService.registerStore(storeId, member);
    }

    @ApiOperation(value = "가게 등록 해제 - 사장 입장")
    @DeleteMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable("storeId") Long storeId) {
        Member member = principalMemberDetail.getMember();
        storeService.deleteStoreByMember(member, storeId);
    }

}
