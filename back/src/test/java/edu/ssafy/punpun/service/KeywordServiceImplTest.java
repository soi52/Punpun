package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.repository.KeywordRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class KeywordServiceImplTest {
    @Mock
    private KeywordRepository keywordRepository;
    @InjectMocks
    private KeywordServiceImpl keywordService;

    @Test
    @DisplayName("모든 키워드 가져오기 - 서비스")
    void findAllKeyword() {
        Keyword keyword1 = Keyword.builder()
                .id(1L)
                .content("test1")
                .build();
        Keyword keyword2 = Keyword.builder()
                .id(2L)
                .content("test2")
                .build();
        Mockito.doReturn(List.of(keyword1, keyword2)).when(keywordRepository).findAll();

        List<Keyword> result = keywordService.findAllKeyword();

        Assertions.assertThat(result.get(0).getId()).isEqualTo(keyword1.getId());
        Assertions.assertThat(result.get(0).getContent()).isEqualTo(keyword1.getContent());
        Assertions.assertThat(result.get(1).getId()).isEqualTo(keyword2.getId());
        Assertions.assertThat(result.get(1).getContent()).isEqualTo(keyword2.getContent());
    }
}