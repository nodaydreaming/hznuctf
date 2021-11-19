package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Questiontype;

import java.util.List;
import java.util.Map;

public interface QuestiontypeService {
    List<Questiontype> ListQuestiontype();
    List<Questiontype> ListQuestiontypeBycompetitionId(int competitionId);
    Questiontype queryQuestiontypeById(int questiontypeId);
    Map<String,Object> insert(Questiontype questiontype);
    Map<String,Object> update(Questiontype questiontype);
    Map<String,Object> delete(int questiontypeId);
}
