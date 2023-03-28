package edu.ssafy.testutil;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomOwnerSecurityContextFactory.class)
public @interface WIthCustomOwner {
    String name() default "name";
}
