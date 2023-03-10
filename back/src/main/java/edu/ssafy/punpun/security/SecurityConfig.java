package edu.ssafy.punpun.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Slf4j
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        //임시로 처리
        http.authorizeRequests()
                .antMatchers("/**")
                .permitAll();

        http.formLogin().disable();
        http.httpBasic().disable();
        http.csrf().disable();
        http.cors().disable();
        http.headers()
                .frameOptions()
                .sameOrigin();
        return http.build();
    }
}
