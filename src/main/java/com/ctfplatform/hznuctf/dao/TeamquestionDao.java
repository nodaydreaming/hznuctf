package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Teamquestion;

import java.util.List;

public interface TeamquestionDao {
    int insertTeamquestion(Teamquestion teamquestion);
    int updateTeamquestion(Teamquestion teamquestion);
    int deleteTeamquestion(Teamquestion teamquestion);
    Teamquestion queryByTeamIdAndCompetitionIdAndQuestionId(int teamId, int competitionId, int questionId);
    Teamquestion queryByQuestionResourceOrLink(String resLink);
    Teamquestion queryByQuestionAnswer(int questionId, String deFlag);
    List<Teamquestion> findAllTeamquestion();
}
