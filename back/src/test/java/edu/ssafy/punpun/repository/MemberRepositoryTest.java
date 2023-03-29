package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@DisplayName("후원자, 사장 레포지토리 테스트")
public class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;
    @AfterEach
    void afterEach() { memberRepository.deleteAll(); }
    @Test
    @DisplayName("후원자, 사장 이메일로 찾기")
    void findByEmail() {
        //given
        Member member1 = Member.builder()
                .name("member1")
                .email("member1@gmail.com")
                .role(UserRole.SUPPORTER)
                .build();

        memberRepository.save(member1);

        // when
        Optional<Member> result = memberRepository.findByEmail("member1@gmail.com");

        //then
        Assertions.assertThat(result.get().getId()).isEqualTo(member1.getId());
        Assertions.assertThat(result.get().getName()).isEqualTo(member1.getName());
        Assertions.assertThat(result.get().getEmail()).isEqualTo(member1.getEmail());
        Assertions.assertThat(result.get().getRole()).isEqualTo(member1.getRole());
        Assertions.assertThat(result.get().getSupportedPoint()).isEqualTo(member1.getSupportedPoint());
        Assertions.assertThat(result.get().getSupportedPoint()).isEqualTo(0L);
        Assertions.assertThat(result.get().getRemainPoint()).isEqualTo(member1.getRemainPoint());
        Assertions.assertThat(result.get().getRemainPoint()).isEqualTo(0L);
    }
}
