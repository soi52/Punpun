package edu.ssafy.punpun.config;

import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket SwaggerAPI() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(ApiInfo())
                .securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정
                .securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정
                .ignoredParameterTypes(PrincipalMemberDetail.class)
                .ignoredParameterTypes(PrincipalChildDetail.class)
                .select()
                .apis(RequestHandlerSelectors.any()) // Swagger를 적용할 package명 작성
                .paths(PathSelectors.any()) // PathSelectors.any() 해당패키지 하위에 있는 모든 url에 적용, 특정 url만 선택 가능
                .build();
    }

    private ApiInfo ApiInfo() {
        return new ApiInfoBuilder().title("Spring API Documentation")
                .description("푼푼히 서버 API 설명을 위한 문서입니다.")
                .license("D109 PUNPUN")
                .licenseUrl("punpun-d109")
                .version("0.1")
                .build();

    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global",  "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }
}
