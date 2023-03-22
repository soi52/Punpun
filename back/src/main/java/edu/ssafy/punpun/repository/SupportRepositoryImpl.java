package edu.ssafy.punpun.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SupportRepositoryImpl implements  SupportCustomRepository {
    private final JPAQueryFactory queryFactory;


}
