package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Teamquestion;

import java.util.List;
import java.util.Map;

public interface TeamquestionService {

    Map<String, Object> insertTeamquestion(Teamquestion teamquestion);
    Map<String, Object> updateTeamquestion(Teamquestion teamquestion);
    Map<String, Object> deleteTeamquestion(Teamquestion teamquestion);

    Map<String, Object> queryByTeamIdAndCompetitionIdAndQuestionId(int teamId, int competitionId, int questionId);
    Teamquestion queryByQuestionResourceOrLink(String resLink);

    List<Teamquestion> findAllTeamquestion();
}
