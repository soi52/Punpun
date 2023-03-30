package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final MemberRepository memberRepository;

    @Override
    public void updateMemberInfo(Long memberId, String phoneNumber) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        member.changePhoneNumber(phoneNumber);
    }
}
