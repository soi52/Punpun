package edu.ssafy.punpun.security;

import edu.ssafy.punpun.security.oauth2.PrincipalOAuth2UserService;
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

    private final PrincipalOAuth2UserService principalOAuth2UserService;
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

        http.oauth2Login()
                .userInfoEndpoint()
                // 	userInfoEndpoint()로 가져온 사용자 정보를 처리할 때 사용
                .userService(principalOAuth2UserService);

        return http.build();
    }
}
