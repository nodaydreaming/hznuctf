package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Questiontype;

import java.util.List;

public interface QuestiontypeDao {
    List<Questiontype> ListQuestiontype();
    //竞赛端获得一场比赛题目类型
    List<Questiontype> ListQuestiontypeBycompetitionId(int competitionId);
    Questiontype queryQuestiontypeById(int questiontypeId);
    int insertQuestiontype(Questiontype questiontype);
    int deleteQuestiontype(int questiontypeId);
    int updateQuestiontype(Questiontype questiontype);
}
