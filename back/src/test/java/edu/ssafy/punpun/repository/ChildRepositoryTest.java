package edu.ssafy.punpun.repository;

import edu.ssafy.punpun.entity.Child;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@DisplayName("학생 레포지토리 테스트")
public class ChildRepositoryTest {

    @Autowired
    private ChildRepository childRepository;

    @Test
    @DisplayName("학생 이메일로 찾기")
    void findByEmail() {
        //given
        Child child1 = Child.builder()
                .name("child1")
                .email("childTest1@gmail.com")
                .area("대구 수성구")
                .build();

        childRepository.save(child1);
        //when
        Optional<Child> result = childRepository.findByEmail("childTest1@gmail.com");
        //then
        Assertions.assertThat(result.get().getId()).isEqualTo(child1.getId());
        Assertions.assertThat(result.get().getName()).isEqualTo(child1.getName());
        Assertions.assertThat(result.get().getEmail()).isEqualTo(child1.getEmail());
        Assertions.assertThat(result.get().getArea()).isEqualTo(child1.getArea());
    }
}
