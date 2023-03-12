package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.PunpunApplication;
import edu.ssafy.punpun.dto.response.KeywordsDTO;
import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.repository.KeywordRepository;
import edu.ssafy.punpun.security.SecurityConfig;
import edu.ssafy.punpun.service.KeywordService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(KeywordController.class)
@ContextConfiguration(classes = {PunpunApplication.class, SecurityConfig.class})
class KeywordControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private KeywordService keywordService;
    @MockBean
    private KeywordRepository keywordRepository;

    @Test
    @DisplayName("모든 키워드를 가져오기 - 컨트롤러")
    void findAllKeyword() throws Exception {
        Keyword keyword1 = Keyword.builder()
                .id(1L)
                .content("test1")
                .build();
        Keyword keyword2 = Keyword.builder()
                .id(2L)
                .content("test2")
                .build();
        doReturn(List.of(keyword1, keyword2)).when(keywordRepository).findAll();
        doReturn(List.of(keyword1, keyword2)).when(keywordService).findAllKeyword();

        KeywordsDTO output = new KeywordsDTO(List.of("test1", "test2"));
        String str = new Gson().toJson(output);

        mockMvc.perform(get("/keywords"))
                .andExpect(status().isOk())
                .andExpect(content().string(str))
                .andDo(print());
    }
}