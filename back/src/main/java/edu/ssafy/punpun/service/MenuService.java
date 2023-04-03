package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.MenuUpdateRequestDTO;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.entity.Store;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MenuService {
    List<Menu> findByStore(Store store);
    void registerMenuDetail(Long storeId, String name, Long price, MultipartFile image, Member member);
    void updateMenuDetail(Long menuId, MenuUpdateRequestDTO menuUpdateRequestDTO, MultipartFile image, Member member);
    void deleteMenu(Long menuId, Member member);
    void addSponsoredCount(Long id, Long menuCount);
}
