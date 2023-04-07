package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.ChildResponseDTO;
import edu.ssafy.punpun.dto.response.MemberResponseDTO;
import edu.ssafy.punpun.entity.Child;
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
    private final ChildRepository childRepository;
    private final MemberRepository memberRepository;

    @Override
    public ChildResponseDTO getChildDetail(Child child) {
        child = childRepository.findById(child.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아동입니다."));

        return new ChildResponseDTO(child);
    }

    @Override
    public MemberResponseDTO getMemberDetail(Member member) {
        member = memberRepository.findById(member.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 멤버입니다."));

        return new MemberResponseDTO(member);
    }

    @Override
    public void updateMemberInfo(Long memberId, String name, String phoneNumber) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        member.updateMemberInfo(name, phoneNumber);
    }
}
