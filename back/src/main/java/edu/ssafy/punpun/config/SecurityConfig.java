package edu.ssafy.punpun.config;

import edu.ssafy.punpun.security.exception.CustomAccessDeniedHandler;
import edu.ssafy.punpun.security.exception.CustomAuthenticationEntryPoint;
import edu.ssafy.punpun.security.jwt.JwtAuthenticationFilter;
import edu.ssafy.punpun.security.jwt.JwtTokenProvider;
import edu.ssafy.punpun.security.oauth2.OAuth2AuthenticationSuccessHandler;
import edu.ssafy.punpun.security.oauth2.PrincipalOAuth2UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final PrincipalOAuth2UserService principalOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        //임시로 처리
        http.authorizeRequests()
//                .antMatchers(HttpMethod.GET,
//                        "/api/h2-console/**", "/api/swagger-ui/**",
//                        "/api/user/oauth2/kakao", "/api/user/**", "/api/user**", "/api/user/oauth2/**")
//                .permitAll()
//                .antMatchers("/api/**").authenticated()
                .antMatchers(
                        "/h2-console**",
                        "/h2-console/**",
                        "/v2/api-docs/**",
                        "/v3/api-docs/**",
                        "/webjars/**",
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/swagger/**",
                        "/sign-api/exception/**")
                .permitAll()
//                .and()
//                //설정된 값 이외의 나머지 URL, 인증된 사용자, 로그인한 사용자만 볼 수 있음;
                .anyRequest().authenticated();

        http.formLogin().disable();
        http.httpBasic().disable();
        http.csrf().disable();
        http.cors().configurationSource(corsConfigurationSource());    // CORS는 HttpSecurity의 cors() 메소드로 설정

        http.headers()
                .frameOptions()
                .sameOrigin();

        // JWT 인증에는 기본적으로 session을 사용하지 않기 때문에 STATELESS
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.oauth2Login()
                .userInfoEndpoint()
                // 	userInfoEndpoint()로 가져온 사용자 정보를 처리할 때 사용
                .userService(principalOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler);
//                .failureHandler();

        http.exceptionHandling()
                // 권한을 확인하는 과정에서 통과하지 못하는 예외가 발생할 경우 예외를 전달
                .accessDeniedHandler(customAccessDeniedHandler)
                // 인증 과정에서 예외가 발생할 경우 예외 전달
                .authenticationEntryPoint(customAuthenticationEntryPoint);

        // JWT Filter 추가
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(principalOAuth2UserService, jwtTokenProvider);
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CorsConfigurationSource를 통해 CORS의 속성을 정의
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // setAllowedOrigins : A list of origins for which cross-origin requests are allowed.
        corsConfiguration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "https://j8d109.p.ssafy.io/"));
        // setAllowedMethods : Set the HTTP methods to allow
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "FETCH", "PUT", "DELETE"));
        // setAllowedHeaders : Set the list of headers that a pre-flight request can list as allowed for use during an actual request.
        corsConfiguration.setAllowedHeaders(List.of("Accept", "Accept-Language", "Authorization", "Content-Language", "Content-Type"));
        // setAllowedCredentials : Whether user credentials are supported.
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
