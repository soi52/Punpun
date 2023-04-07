package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Keyword;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@DisplayName("키워드 레포지토리")
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
        assertThat(result.get(0).getId()).isEqualTo(keyword1.getId());
        assertThat(result.get(0).getContent()).isEqualTo(keyword1.getContent());
        assertThat(result.get(1).getId()).isEqualTo(keyword2.getId());
        assertThat(result.get(1).getContent()).isEqualTo(keyword2.getContent());
    }

    @Test
    @DisplayName("특정 키워드를 내용으로 찾아오기")
    void findByContent(){
        Keyword keyword1 = Keyword.builder()
                .content("test1")
                .build();
        Keyword keyword2 = Keyword.builder()
                .content("test2")
                .build();
        keywordRepository.save(keyword1);
        keywordRepository.save(keyword2);

        Optional<Keyword> result = keywordRepository.findByContent("test1");

        assertThat(result.get().getContent()).isEqualTo("test1");
    }
}