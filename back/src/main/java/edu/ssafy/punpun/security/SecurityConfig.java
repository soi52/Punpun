package edu.ssafy.punpun.security;

import edu.ssafy.punpun.security.oauth2.OAuth2AuthenticationSuccessHandler;
import edu.ssafy.punpun.security.oauth2.PrincipalOAuth2UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Slf4j
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final PrincipalOAuth2UserService principalOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        //임시로 처리
        http.authorizeRequests()
                .antMatchers("/**")
                .permitAll();
//                .and()
//                //설정된 값 이외의 나머지 URL, 인증된 사용자, 로그인한 사용자만 볼 수 있음;
//                .anyRequest().authenticated();

        http.formLogin().disable();
        http.httpBasic().disable();
        http.csrf().disable();
        http.cors().disable();
        http.headers()
                .frameOptions()
                .sameOrigin();

        // JWT 인증에는 기본적으로 session을 사용하지 않기 때문에 STATELESS
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.oauth2Login()
                .userInfoEndpoint()
                // 	userInfoEndpoint()로 가져온 사용자 정보를 처리할 때 사용
                .userService(principalOAuth2UserService);
//                .and()
//                .successHandler()
//                .failureHandler();


        return http.build();
    }
}
