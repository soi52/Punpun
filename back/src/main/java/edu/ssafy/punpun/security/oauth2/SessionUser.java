package edu.ssafy.punpun.security.oauth2;

import edu.ssafy.punpun.entity.Member;
import lombok.Getter;

@Getter
public class SessionUser {

    private String name;
    private String email;

    public SessionUser(Member user){
        this.name = user.getName();
        this.email = user.getEmail();
    }
}
