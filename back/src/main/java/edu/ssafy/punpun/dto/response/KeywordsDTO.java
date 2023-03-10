package edu.ssafy.punpun.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class KeywordsDTO {
    List<String> keywords;
}
