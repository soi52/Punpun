package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Keyword;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
class KeywordRepositoryTest {
    @Autowired
    private KeywordRepository keywordRepository;

    @Test
    @DisplayName("모든 키워드 찾아오기")
    void findAllKeyword() {
        //given
        Keyword keyword1 = Keyword.builder()
                .content("test1")
                .build();
        Keyword keyword2 = Keyword.builder()
                .content("test2")
                .build();
        keywordRepository.save(keyword1);
        keywordRepository.save(keyword2);
        //when
        List<Keyword> result = keywordRepository.findAll();

        //then
        Assertions.assertThat(result.get(0).getId()).isEqualTo(keyword1.getId());
        Assertions.assertThat(result.get(0).getContent()).isEqualTo(keyword1.getContent());
        Assertions.assertThat(result.get(1).getId()).isEqualTo(keyword2.getId());
        Assertions.assertThat(result.get(1).getContent()).isEqualTo(keyword2.getContent());
    }
}