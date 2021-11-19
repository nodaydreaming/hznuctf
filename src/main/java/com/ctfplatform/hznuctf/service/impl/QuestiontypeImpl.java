package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.QuestiontypeDao;
import com.ctfplatform.hznuctf.entity.Questiontype;
import com.ctfplatform.hznuctf.service.QuestiontypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuestiontypeImpl implements QuestiontypeService {
    @Autowired
    private QuestiontypeDao questiontypeDao;

    @Override
    public List<Questiontype> ListQuestiontype() {
        return questiontypeDao.ListQuestiontype();
    }

    @Override
    public List<Questiontype> ListQuestiontypeBycompetitionId(int competitionId) {
        return questiontypeDao.ListQuestiontypeBycompetitionId(competitionId);
    }

    @Override
    public Questiontype queryQuestiontypeById(int questiontypeId) {
        return questiontypeDao.queryQuestiontypeById(questiontypeId);
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Questiontype questiontype) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = questiontypeDao.insertQuestiontype(questiontype);
        if(effectedNum>0){}
        else{
            modelMap.put("message","增加题目类型失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> update(Questiontype questiontype) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = questiontypeDao.updateQuestiontype(questiontype);
        if(effectedNum>0){}
        else{
            modelMap.put("message","修改题目类型失败");
        }
        return modelMap;
    }


    @Override
    public Map<String, Object> delete(int questiontypeId) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = questiontypeDao.deleteQuestiontype(questiontypeId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除题目类型失败");
        }
        return modelMap;
    }
}
