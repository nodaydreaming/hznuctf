package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Team;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface TeamService {
    List<Team> ListTeam();
    List<Team> queryTeamByCompetitionId(int competitionId);
    List<Team> getTeamScoreListByCompetitionId(int competitionId);
    Team queryTeamByTeamId(int teamId);
    Map<String,Object> insert(Team team, int captainId);
    Map<String,Object> update(Team team) throws IOException;
    Map<String,Object> delete(int temaId);
}
