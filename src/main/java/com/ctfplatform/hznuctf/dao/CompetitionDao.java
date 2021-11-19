package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Competition;

import java.util.List;

public interface CompetitionDao {
    List<Competition> ListCompetition();
    List<Competition> ListjoinedCompetition(int userId);
    List<Competition> finishedCompetition();
    List<Competition> notFinishedCompetition();
    Competition queryCompetitionById(int competitionId);
    //查询比赛是否开放报名
    int queryCompetitionCanregister(int competitionId);
    Competition queryCompetitionByNumber(String competitionNumber);
    int insertCompetition(Competition competition);
    int updateCompetition(Competition competition);
    int deleteCompetition(int competitionId);
    //搜索赛事
    List<Competition> fuzzyQueryCompetition(String text);
    List<Competition> fuzzyQueryCompetitionByUserId(String text, int userId);
}
