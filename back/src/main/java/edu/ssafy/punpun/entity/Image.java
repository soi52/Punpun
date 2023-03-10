package edu.ssafy.punpun.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "image_id")
    private Long id;
    private String name;
    private String url;
}
