package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.StoreDetailDTO;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreController {
    private final StoreService storeService;

    @GetMapping("/{storeId}")
    @ResponseStatus(code = HttpStatus.OK)
    public StoreDetailDTO getStoreDetail(@PathVariable("storeId") Long id) {
        Store store = storeService.findById(id);
        System.out.println(store);
//        StoreDetailDTO storeDetailDTO = new StoreDetailDTO(store, );
        return null;
    }
}
