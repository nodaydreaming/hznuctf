package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.QuestionList;

import java.util.List;

public interface QuestionListService {
    List<QuestionList> queryQuestionList();
    List<QuestionList> listDoneQuestionList(int userId);
    List<QuestionList> FuzzyQuery(String text);
    List<QuestionList> listAllQuestionList();
    List<QuestionList> listQuestionForCompetition();
    List<QuestionList> listQuestionByCompetitionIdAndTypeId(int competitionId, int typeId);
    List<QuestionList> queryQuestionByCompetitionId(int competitionId);
}
