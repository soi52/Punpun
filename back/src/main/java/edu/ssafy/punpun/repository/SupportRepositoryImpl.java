package edu.ssafy.punpun.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.entity.QSupport;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class SupportRepositoryImpl implements  SupportCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final QSupport support=QSupport.support;
    private static final int PAGE_SIZE = 10;

    public SupportRepositoryImpl(EntityManager em){this.queryFactory=new JPAQueryFactory(em);}

    @Override
    public Page<ShareResponseDTO> findShareList(Long storeId, SupportType supportType, int page, LocalDate date) {
        PageRequest pageRequest= PageRequest.of(page, PAGE_SIZE);
        List<ShareResponseDTO> supports = queryFactory
                .select(Projections.constructor(ShareResponseDTO.class, support.supportType, support.createdDateTime, support.menu.id, support.menu.name,
                        support.menu.id.count()))
                .from(support)
                .where(support.store.id.eq(storeId),
                        support.supportType.eq(supportType),
                        betweenTime(date))
                .groupBy(support.createdDateTime, support.menu.id)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(support.createdDateTime.desc())
                .fetch();

        for (int i=0; i<supports.size(); i++) {
            Long cnt = queryFactory
                    .select(support.supportState.count())
                    .from(support)
                    .where(support.store.id.eq(storeId),
                            support.supportType.eq(supportType),
                            support.supportState.eq(SupportState.END),
                            support.menu.id.eq(supports.get(i).getMenuId()),
                            betweenTime(LocalDate.parse(supports.get(i).getSupportDate())))
                    .fetchOne();
            ShareResponseDTO shareResponseDTO=supports.get(i);
            shareResponseDTO.setUseCount(cnt);
            supports.set(i, shareResponseDTO);
        }
        return new PageImpl<>(supports, pageRequest, supports.size()) ;
    }

    private BooleanExpression betweenTime(LocalDate date){
        if(date != null ){
            LocalDateTime from= date.atStartOfDay();
            LocalDateTime to= date.atTime(LocalTime.MAX).withNano(0);
            return support.createdDateTime.between(from, to);
        }
        return null;
    }

}
