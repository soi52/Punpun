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
@RequestMapping("/favors")
public class FavoriteMenuController {
    private final FavoriteMenuService favoriteMenuService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void insertFavoriteMenu(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @RequestBody FavoriteMenuRequestDTO favoriteMenuRequestDTO) {
        Child child = principalChildDetail.getChild();

        favoriteMenuService.insertFavoriteMenu(child, favoriteMenuRequestDTO.getMenuId());
    }

    @DeleteMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteFavoriteMenu(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail, @RequestBody FavoriteMenuRequestDTO favoriteMenuRequestDTO) {
        Child child = principalChildDetail.getChild();

        favoriteMenuService.deleteFavoriteMenu(child, favoriteMenuRequestDTO.getMenuId());
    }

}
