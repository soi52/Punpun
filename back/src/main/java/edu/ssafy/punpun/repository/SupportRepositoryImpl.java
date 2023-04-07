package edu.ssafy.punpun.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import edu.ssafy.punpun.dto.response.ShareResponseDTO;
import edu.ssafy.punpun.dto.response.SupportResponseDTO;
import edu.ssafy.punpun.entity.*;
import edu.ssafy.punpun.entity.enumurate.SupportState;
import edu.ssafy.punpun.entity.enumurate.SupportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

public class SupportRepositoryImpl implements  SupportCustomRepository {
    private final JPAQueryFactory queryFactory;
    private final QSupport support=QSupport.support;
    private final QStore store=QStore.store;
    private final QMenu menu= QMenu.menu;

    private static final int PAGE_SIZE = 10;

    public SupportRepositoryImpl(EntityManager em){this.queryFactory=new JPAQueryFactory(em);}

    @Override
    public List<SupportResponseDTO> findSupport(Member supporter){
        return queryFactory
                .select(Projections.constructor(SupportResponseDTO.class,
                        support.supportDate, store.id, menu.id.count(),
                        store.name, menu.id, menu.name, menu.price))
                .from(support)
                .join(support.store, store)
                .join(support.menu, menu)
                .where(support.supporter.eq(supporter), support.supportType.eq(SupportType.SUPPORT))
                .groupBy(support.supportDate, menu.id, store.id, store.name, menu.name, menu.price)
                .orderBy(support.supportDate.desc())
                .fetch();
    }


    @Override
    public Page<ShareResponseDTO> findShareList(Long storeId, SupportType supportType, int page, LocalDate date) {
        PageRequest pageRequest= PageRequest.of(page, PAGE_SIZE);

        List<ShareResponseDTO> supports = queryFactory
                .select(Projections.constructor(ShareResponseDTO.class, support.supportType, support.supportDate, menu.id, menu.name,
                        menu.id.count()))
                .from(support)
                .join(support.store, store)
                .join(support.menu, menu)
                .where(store.id.eq(storeId),
                        support.supportType.eq(supportType),
                        eqDate(date))
                .groupBy(support.supportDate, menu.id, support.supportType, menu.name)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(support.supportDate.desc())
                .fetch();

        for (int i=0; i<supports.size(); i++) {
            Long cnt = queryFactory
                    .select(support.supportState.count())
                    .from(support)
                    .join(support.store, store)
                    .join(support.menu, menu)
                    .where(store.id.eq(storeId),
                            support.supportType.eq(supportType),
                            support.supportState.eq(SupportState.END),
                            menu.id.eq(supports.get(i).getMenuId()),
                            eqDate(date))
                    .fetchOne();
            ShareResponseDTO shareResponseDTO=supports.get(i);
            shareResponseDTO.setUseCount(cnt);
            supports.set(i, shareResponseDTO);
        }
        return new PageImpl<>(supports, pageRequest, supports.size()) ;
    }

    private BooleanExpression eqDate(LocalDate date){
        if(date != null ){
            return support.supportDate.eq(date);
        }
        return null;
    }

}
