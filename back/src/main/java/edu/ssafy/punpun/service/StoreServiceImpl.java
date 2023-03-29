package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;

    @Override
    public Store findById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));
    }

    @Override
    public List<Store> findByNameContaining(String name) {
        return storeRepository.findByNameContaining(name);
    }

    @Override
    public List<Store> findByOwner(Member member) {
        return storeRepository.findByOwner(member);
    }

    @Override
    public void deleteStoreByMember(Long id, Member member) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));

        if (member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        } else {
            store.deleteOwner();
        }
    }
}
