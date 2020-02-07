package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Myteam;

public interface MyteamDao {
    Myteam queryMyteamByCompetitionIdAndUserId(int competitionId, int userId);
}
