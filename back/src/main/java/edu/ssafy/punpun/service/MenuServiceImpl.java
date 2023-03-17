package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Menu;
import edu.ssafy.punpun.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    @Override
    public List<Menu> findByStore_Id(Long id) {
        return menuRepository.findByStore_Id(id);
    }
}
