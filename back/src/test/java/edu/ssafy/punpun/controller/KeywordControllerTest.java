package edu.ssafy.punpun.controller;

import com.google.gson.Gson;
import edu.ssafy.punpun.PunpunApplication;
import edu.ssafy.punpun.config.WebConfig;
import edu.ssafy.punpun.dto.response.KeywordsDTO;
import edu.ssafy.punpun.entity.Keyword;
import edu.ssafy.punpun.repository.KeywordRepository;
import edu.ssafy.punpun.security.SecurityConfig;
import edu.ssafy.punpun.service.KeywordService;
import edu.ssafy.punpun.service.KeywordServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {SecurityConfig.class, WebConfig.class, PunpunApplication.class})
class KeywordControllerTest {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mockMvc;
    @MockBean
    private KeywordService keywordService;
    @MockBean
    private KeywordRepository keywordRepository;

    @Test
    @DisplayName("모든 키워드를 가져오기 - 컨트롤러")
    void findAllKeyword() throws Exception {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
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