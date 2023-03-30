package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.FavoriteMenuDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;

import java.util.List;

public interface StoreService {
    Store findById(Long id);
    List<FavoriteMenuDTO> getStoreDetailChild(Store store, Child child);
    List<Store> findByNameContaining(String name);
    List<Store> findByOwner(Member member);
    void deleteStoreByMember(Member member, Long storeId);
}
