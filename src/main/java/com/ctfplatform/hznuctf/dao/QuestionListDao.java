package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.QuestionList;

import java.util.List;

public interface QuestionListDao {
    List<QuestionList> listQuestionList();
    List<QuestionList> listAllQuestion();
    List<QuestionList> listAcQuestionList(int userId);
    List<QuestionList> getAcNumSubNumRate();
    List<QuestionList> FuzzyQuery(String text);
    List<QuestionList> listQuestionForCompetition();
    List<QuestionList> listQuestionByCompetitionIdAndTypeId(int competitionId, int typeId);
    List<QuestionList> listQuestionByCompetitionId(int competitionId);
}
