package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.FavoriteMenuRequestDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.service.FavoriteMenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("favors")
public class FavoriteMenuController {
    private final FavoriteMenuService favoriteMenuService;

//    @GetMapping
//    @ResponseStatus(code = HttpStatus.OK)
//    public void getFavoriteMenu(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail) {
//        Child child = principalChildDetail.getChild();
//
//    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void insertFavoriteMenu(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @RequestBody FavoriteMenuRequestDTO favoriteMenuRequestDTO) {
        Child child = principalChildDetail.getChild();

        favoriteMenuService.insertFavoriteMenu(child.getId(), favoriteMenuRequestDTO.getMenuId());
    }

    @DeleteMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteFavoriteMenu(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @RequestBody FavoriteMenuRequestDTO favoriteMenuRequestDTO) {
        Child child = principalChildDetail.getChild();
        favoriteMenuService.deleteFavoriteMenu(child.getId(), favoriteMenuRequestDTO.getMenuId())
        ;
    }

}
