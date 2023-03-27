package edu.ssafy.punpun.security.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ssafy.punpun.dto.response.ErrorDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        ObjectMapper objectMapper = new ObjectMapper();
        log.info("[AuthenticationEntryPoint - cmmence] 인증 실패로 response.sendError 발생");

        response.setStatus(401);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write("AuthenticationEntryPoint_commence 인증이 실패하였습니다. - ErrorCustomAuthenticationEntryPoint");
//        response.getWriter().write(objectMapper.writeValueAsString(errorDTO));
    }
}
