package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.request.StoreDetailRequestDTO;
import edu.ssafy.punpun.dto.response.MenuChildResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StoreService {
    Store findById(Long id);
    List<MenuChildResponseDTO> getStoreDetailChild(Store store, Child child);
    List<Store> getStoreDistanceJava(double lon, double lat, String sort);
//    Page<Store> getStoreDistance(float lon, float lat, String sort, PageRequest page);
    List<Store> findByNameContaining(String name);
    List<Store> findByOwner(Member member);
    void registerStore(Long storeId, Member member);
    void updateStoreDetail(Long storeId, Member member, StoreDetailRequestDTO storeDetailRequestDTO, MultipartFile image);
    void deleteStoreByMember(Long storeId, Member member);

}
