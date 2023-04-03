package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.MenuRegisterRequestDTO;
import edu.ssafy.punpun.dto.request.MenuUpdateRequestDTO;
import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
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
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @ApiOperation(value = "가게 상세 정보 수정 - 사장 입장")
    @RequestMapping(value = "/{storeId}" , method = RequestMethod.PUT , consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.OK)
    public void updateStoreDetail(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable ("storeId") Long storeId,
                                  @RequestPart("storeInfo") StoreDetailRequestDTO storeDetailRequestDTO, @RequestPart(name = "storeImage", required = false) MultipartFile image) throws IOException {
        Member member = principalMemberDetail.getMember();
        storeService.updateStoreDetail(storeId, member, storeDetailRequestDTO, image);
    }

    @ApiOperation(value = "가게 등록 해제 - 사장 입장")
    @DeleteMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteStore(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable("storeId") Long storeId) {
        Member member = principalMemberDetail.getMember();
        storeService.deleteStoreByMember(storeId, member);
    }


    @ApiOperation(value = "가게 메뉴 추가 - 사장 입장")
    @PostMapping("/menu")
    @RequestMapping(value = "/menu" , method = RequestMethod.POST , consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.CREATED)
    public void registerMenuDetail(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail,
                                   @RequestParam("menuRegist") MenuRegisterRequestDTO menuRegisterRequestDTO,
                                   @RequestParam(name = "menuImage", required = false) MultipartFile image) {
        Member member = principalMemberDetail.getMember();

        Long storeId = menuRegisterRequestDTO.getStoreId();
        String name = menuRegisterRequestDTO.getMenuName();
        Long price = menuRegisterRequestDTO.getMenuPrice();

        menuService.registerMenuDetail(storeId, name, price, image, member);
    }

    @ApiOperation(value = "가게 메뉴 정보 수정 - 사장 입장")
    @RequestMapping(value = "/menu/{menuId}" , method = RequestMethod.PUT , consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(code = HttpStatus.OK)
    public void updateMenuDetail(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail,
                                 @PathVariable ("menuId") Long menuId,
                                 @RequestParam("menuUpdate") MenuUpdateRequestDTO menuUpdateRequestDTO,
                                 @RequestParam(name = "menuImage", required = false) MultipartFile image) {
        Member member = principalMemberDetail.getMember();
        menuService.updateMenuDetail(menuId, menuUpdateRequestDTO, image, member);
    }

    @ApiOperation(value = "가게에 등록된 메뉴 삭제 - 사장 입장")
    @DeleteMapping("/menu/{menuId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteMenu(@AuthenticationPrincipal PrincipalMemberDetail principalMemberDetail, @PathVariable ("menuId") Long menuId) {
        Member member = principalMemberDetail.getMember();
        menuService.deleteMenu(menuId, member);
    }

}
