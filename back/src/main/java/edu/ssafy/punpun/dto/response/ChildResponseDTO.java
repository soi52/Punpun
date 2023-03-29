package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChildResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private UserRole role;
    private String area;

    public ChildResponseDTO(Child child) {
        this.id = child.getId();
        this.name = child.getName();
        this.email = child.getEmail();
        this.phoneNumber = child.getPhoneNumber();
        this.role = child.getRole();
        this.area = child.getArea();
    }
}
