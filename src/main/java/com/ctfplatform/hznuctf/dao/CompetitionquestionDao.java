package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Competitionquestion;

import java.util.List;

public interface CompetitionquestionDao {
    List<Competitionquestion> ListCompetitionquestion();
    List<Competitionquestion> ListCompetitionquestionById(int competitionId);
    int insertCompetitionquestion(Competitionquestion competitionquestion);
    int updateCompetitionquestion(Competitionquestion competitionquestion);
    int deleteCompetitionquestion(int competitionId, int questionId);
    int deleteCompetitionquestionByCompetitionId(int competitionId);
}
