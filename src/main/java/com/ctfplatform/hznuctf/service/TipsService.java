package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Tips;

import java.util.List;
import java.util.Map;

public interface TipsService {
    List<Tips> queryTipsListByCompetitionId(int competitionId);
    Map<String,Object> insertTips(Tips tips);
}
