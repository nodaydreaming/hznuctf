package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.CompetitionquestionDao;
import com.ctfplatform.hznuctf.entity.Competitionquestion;
import com.ctfplatform.hznuctf.service.CompetitionquestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CompetitionquestionServiceImpl implements CompetitionquestionService {
    @Autowired
    private CompetitionquestionDao competitionquestionDao;

    @Override
    public List<Competitionquestion> listCompetitionquestion() {
        return competitionquestionDao.ListCompetitionquestion();
    }

    @Override
    public List<Competitionquestion> listCompetitionquestionById(int competitionId) {
        return competitionquestionDao.ListCompetitionquestionById(competitionId);
    }

    @Override
    public Map<String, Object> insertCompetitionquestion(int competitionId,int questionId) {
        Map<String,Object> modelMap = new HashMap<>();
        Competitionquestion competitionquestion = new Competitionquestion();
        competitionquestion.setCompetitionId(competitionId);
        competitionquestion.setQuestionId(questionId);
        competitionquestion.setIsUnlocked(0);
        int effectedNum = competitionquestionDao.insertCompetitionquestion(competitionquestion);
        if(effectedNum>0){

        }else{
            modelMap.put("message","增加失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> updateCompetitionquestion(Competitionquestion competitionquestion){
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = competitionquestionDao.updateCompetitionquestion(competitionquestion);
        if(effectedNum>0){

        }else{
            modelMap.put("message","更新失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> deleteCompetitionquestion(int competitionId,int questionId) {
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = competitionquestionDao.deleteCompetitionquestion(competitionId,questionId);
        if(effectedNum>0){

        }else{
            modelMap.put("message","删除失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> deleteCompetitionquestionByCompetitionId(int competitionId) {
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = competitionquestionDao.deleteCompetitionquestionByCompetitionId(competitionId);
        if(effectedNum>0){

        }else{
            modelMap.put("message","删除失败");
        }
        return modelMap;
    }
}
