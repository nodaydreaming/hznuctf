package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.AcQuestion;
import com.ctfplatform.hznuctf.entity.Question;

import java.util.List;

public interface QuestionDao {
    List<Question> ListQuestion();
    List<Question> ListQuestionForPub();
    List<Question> ListDoneQuestion(int userId);
    List<Question> queryQuestionBytypeId(int typeId);
    List<Question> ListQuestionForCompetition();
    List<Question> ListQuestionByCompetitionId(int competitionId);
    List<Question> FuzzyQuery(String text);
    // 导出功能获取选手答对的题目信息和得分
    List<AcQuestion> ListAcQuestionByUserIdAndCompetitionId(int competitionId, int userId);
    Question queryQuestionById(int questionId);
    int insertQuestion(Question question);
    int updateQuestion(Question question);
    int deleteQuestion(int questionId);
    int judgeRightUpdateQuestion(Question question);
    int judgeRightUpdateAdditionalAndDecrease(Question question);
}
