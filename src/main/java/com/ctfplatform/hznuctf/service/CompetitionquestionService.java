package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Competitionquestion;

import java.util.List;
import java.util.Map;

public interface CompetitionquestionService {
    List<Competitionquestion> listCompetitionquestion();
    List<Competitionquestion> listCompetitionquestionById(int competitionId);
    Map<String,Object> insertCompetitionquestion(int competitionId, int questionId);
    Map<String,Object> updateCompetitionquestion(Competitionquestion competitionquestion);
    Map<String,Object> deleteCompetitionquestion(int competitionId, int questionId);
    Map<String,Object> deleteCompetitionquestionByCompetitionId(int competitionId);
}
