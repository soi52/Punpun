package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.ChildResponseDTO;
import edu.ssafy.punpun.dto.response.MemberResponseDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.Member;

public interface UserService {
    ChildResponseDTO getChildDetail(Child child);
    MemberResponseDTO getMemberDetail(Member member);
    void updateMemberInfo(Long memberId, String name, String phoneNumber);
}
