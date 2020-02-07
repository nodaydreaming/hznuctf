package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Myteam;

public interface MyteamService {
    Myteam queryMyteamByCompetitionIdAndUserId(int competitionId, int userId);
}
