package edu.ssafy.punpun.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Keyword extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "keyword_id")
    private Long id;
    private String content;
    @OneToMany(mappedBy = "keyword")
    @ToString.Exclude
    private List<ReviewKeyword> reviewKeywords;
}
