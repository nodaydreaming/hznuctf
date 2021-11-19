package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Tips;

import java.util.List;

public interface TipsDao {
    List<Tips> queryTipsListByCompetitionId(int competitionId);
    int insertTips(Tips tips);
}
