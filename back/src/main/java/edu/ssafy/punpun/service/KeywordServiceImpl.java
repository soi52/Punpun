package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService {
    private final KeywordRepository keywordRepository;

    @Override
    public List<Keyword> findAllKeyword() {
        return keywordRepository.findAll();
    }
}
