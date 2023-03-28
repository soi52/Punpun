package edu.ssafy.testutil;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.security.oauth2.OAuth2Attributes;
import edu.ssafy.punpun.security.oauth2.PrincipalChildDetail;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockCustomChildSecurityContextFactory implements WithSecurityContextFactory<WIthCustomChild> {
    @Override
    public SecurityContext createSecurityContext(WIthCustomChild annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Child child = Child.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.CHILD)
                .build();
        OAuth2Attributes attributes = OAuth2Attributes.builder()
                .name(child.getName())
                .email(child.getEmail())
                .build();
        PrincipalChildDetail principal = new PrincipalChildDetail(child, attributes);
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, principal.getPassword(), principal.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }
}
