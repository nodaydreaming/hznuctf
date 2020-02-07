package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Competitionadmin;

import java.util.List;

public interface CompetitionadminDao {
    List<Competitionadmin> ListCompetitionadmin();
    int insertCompetitionadmin(Competitionadmin competitionadmin);
    int updateCompetitionadmin(Competitionadmin competitionadmin);
    int deleteCompetitionadmin(int competitionadminId);
}
