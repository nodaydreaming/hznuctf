package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Team;

import java.util.List;

public interface TeamDao {
    List<Team> ListTeam();
    List<Team> queryTeamByCompetitionId(int competitionId);
    List<Team> getTeamScoreListByCompetitionId(int competitionId);
    Team queryTeamByCompetitionIdAndTeamName(int competitionId, String teamName);
    Team queryTeamByInvitationCode(String invitationCode);
    Team queryTeamByTeamId(int teamId);
    int insertTeam(Team team);
    int updateTeam(Team team);
    int deleteTeam(int teamId);
    int addTeamPoint(double point, int teamId);
}
