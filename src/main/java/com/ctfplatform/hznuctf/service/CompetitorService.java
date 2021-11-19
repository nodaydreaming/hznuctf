package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Competitor;

//赛事端选手service
public interface CompetitorService {
    Competitor login(String userAccount, String userPassword, String competitionNumber);
}
