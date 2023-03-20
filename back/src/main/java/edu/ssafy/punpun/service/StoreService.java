package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Store;

import java.util.List;

public interface StoreService {
    Store findById(Long id);
    List<Store> findByNameContaining(String name);
}
