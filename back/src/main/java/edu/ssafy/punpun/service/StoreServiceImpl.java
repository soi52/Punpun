package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Store;
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
        return storeRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @Override
    public List<Store> findByNameContaining(String name) {
        return storeRepository.findByNameContaining(name);
    }
}
