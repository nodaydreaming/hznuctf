package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.ScoreList;
import com.ctfplatform.hznuctf.entity.TeamScoreList;

import java.util.List;

public interface ScoreListDao {
    List<ScoreList> queryTotalScore();
    List<ScoreList> queryOnetypeList(int typeId);
    List<ScoreList> FuzzyQueryScoreList(String text);

    //赛事端根据队伍id获得该队积分榜
    List<TeamScoreList> queryTeamScoreListByTeamId(int teamId);
}
