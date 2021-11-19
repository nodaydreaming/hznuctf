package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Competition;

import java.util.List;
import java.util.Map;

public interface CompetitionService {
    List<Competition> listCompetition();
    List<Competition> listjoinedCompetition(int userId);
    Competition queryCompetitionById(int competitionId);
    List<Competition> finishedCompetition();
    List<Competition> notFinishedCompetition();
    //添加赛事
    Map<String,Object> insertCompetition(Competition competition);

    //删除赛事
    Map<String,Object> deleteCompetition(int competitionId);

    //更新赛事
    Map<String,Object> updateCompetition(Competition competition);
    //模糊查询比赛
    List<Competition> fuzzyQueryCompetition(String text);
    //模糊查询自己参加的比赛
    List<Competition> fuzzyQueryCompetitionByUserId(String text, int userId);
}
