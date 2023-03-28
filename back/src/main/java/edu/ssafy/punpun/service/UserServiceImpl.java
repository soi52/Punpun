package edu.ssafy.punpun.service;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.repository.ChildRepository;
import edu.ssafy.punpun.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final ChildRepository childRepository;
    private final MemberRepository memberRepository;

    @Override
    public void updateMemberInfo(Long memberId, String phoneNumber) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        member.setPhoneNumber(phoneNumber);
        memberRepository.save(member);
    }
}
