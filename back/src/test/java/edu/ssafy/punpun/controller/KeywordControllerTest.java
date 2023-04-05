package edu.ssafy.punpun.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ssafy.punpun.dto.response.KeywordsDTO;
import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.service.KeywordService;
import edu.ssafy.testutil.WIthCustomChild;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("키워드 컨트롤러 테스트")
@WebMvcTest(KeywordController.class)
class KeywordControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private KeywordService keywordService;

    @Test
    @WIthCustomChild
    @DisplayName("모든 키워드 가져오기")
    void getAllKeywords() throws Exception {
        Keyword keyword1 = Keyword.builder()
                .id(1L)
                .content("keyword1")
                .build();
        Keyword keyword2 = Keyword.builder()
                .id(2L)
                .content("keyword2")
                .build();
        List<Keyword> result = List.of(keyword1, keyword2);
        doReturn(result).when(keywordService).findAllKeyword();


        List<String> contents = result.stream()
                .map(Keyword::getContent)
                .collect(Collectors.toList());
        KeywordsDTO keywordsDTO = new KeywordsDTO(contents);
        String output = new ObjectMapper().writeValueAsString(keywordsDTO);

        mockMvc.perform(get("/keywords")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(output))
                .andDo(print());
    }
}