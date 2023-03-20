package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.MenuDTO;
import edu.ssafy.punpun.dto.response.StoreDetailDTO;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.service.MenuService;
import edu.ssafy.punpun.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
}
