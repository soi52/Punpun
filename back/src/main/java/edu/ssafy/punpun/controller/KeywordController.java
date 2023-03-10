package edu.ssafy.punpun.controller;

import edu.ssafy.punpun.dto.response.KeywordsDTO;
import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.service.KeywordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/keywords")
public class KeywordController {
    private final KeywordService keywordService;

    @GetMapping
    public KeywordsDTO findAllKeyword() {
        List<Keyword> keywords = keywordService.findAllKeyword();

        List<String> list = keywords.stream()
                .map(Keyword::getContent)
                .collect(Collectors.toList());

        return new KeywordsDTO(list);
    }
}
