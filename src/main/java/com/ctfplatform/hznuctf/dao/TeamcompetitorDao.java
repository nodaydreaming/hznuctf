package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Teamcompetitor;

import java.util.List;

public interface TeamcompetitorDao {
    List<Teamcompetitor> ListTeamcompetitor();
    Teamcompetitor queryByTeamcompetitorId(int teamcompetitorId);
    List<Teamcompetitor> queryTeamByTeamId(int teamId);
    Teamcompetitor queryByCompetitionIdandUserId(int competitionId, int userId);
    int insertTeamcompetitor(Teamcompetitor teamcompetitor);
    int updateTeamcompetitor(Teamcompetitor teamcompetitor);
    int updateScore(Teamcompetitor teamcompetitor);
    int deleteTeamcompetitor(Teamcompetitor teamcompetitor);
    int signOutSelf(Teamcompetitor teamcompetitor);
}
