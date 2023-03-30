package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.request.FavoriteMenuRequestDTO;
import edu.ssafy.punpun.dto.response.FavoriteMenuChildDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.service.FavoriteMenuService;
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
@RequestMapping("/favors")
public class FavoriteMenuController {
    private final FavoriteMenuService favoriteMenuService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<FavoriteMenuChildDTO> getFavoriteMenuChild(@AuthenticationPrincipal PrincipalChildDetail principalChildDetail) {
        Child child = principalChildDetail.getChild();

        List<FavoriteMenuChildDTO> favoriteMenuChildDTOList = favoriteMenuService.getFavoriteMenuChild(child).stream()
                .map(menu -> {
                    return new FavoriteMenuChildDTO(menu.getStore(), menu);
                })
                .collect(Collectors.toList());

        return favoriteMenuChildDTOList;
    }

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
