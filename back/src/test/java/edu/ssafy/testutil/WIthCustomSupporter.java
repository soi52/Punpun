package edu.ssafy.testutil;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomSupporterSecurityContextFactory.class)
public @interface WIthCustomSupporter {
    String name() default "name";
    long remainPoint() default 0L;
}
