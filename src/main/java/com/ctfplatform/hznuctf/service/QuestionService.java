package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Question;

import java.util.List;
import java.util.Map;

public interface QuestionService {
    //给管理员的所有题目接口
    List<Question>  ListQuestion();
    //给常规端的显示公用题目接口
    List<Question> ListQuestionForPub();
    List<Question> ListQuestionForCompetition();
    List<Question> ListDoneQuestion(int userId);
    Question queryQuestionByQuestionId(int questionId);
    List<Question> ListQuestionByCompetitionId(int competitionid);
    //搜题目判题
    Map<String,Object> judge(int questionId, String flag, int userId);
    //比赛端判题
    Map<String, Object> judgeForCompetition(int questionId, String flag, int userId, int teamId, int competitionId);
    List<Question> FuzzyQuery(String text);
    List<Question> queryQuestionBytypeId(int typeId);
    Map<String,Object> insert(Question question);
    Map<String,Object> update(Question question);
    Map<String,Object> delete(int questionId);
}
