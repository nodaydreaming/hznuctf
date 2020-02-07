package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.CompetitionDao;
import com.ctfplatform.hznuctf.entity.Competition;
import com.ctfplatform.hznuctf.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CompetitionServiceImpl implements CompetitionService {
    @Autowired
    private CompetitionDao competitionDao;

    @Override
    public List<Competition> listCompetition() {
        return competitionDao.ListCompetition();
    }

    @Override
    public List<Competition> listjoinedCompetition(int userId) {
        return competitionDao.ListjoinedCompetition(userId);
    }

    @Override
    public Competition queryCompetitionById(int competitionId) {
        return competitionDao.queryCompetitionById(competitionId);
    }

    @Override
    public List<Competition> finishedCompetition() {
        return competitionDao.finishedCompetition();
    }

    @Override
    public List<Competition> notFinishedCompetition() {
        return competitionDao.notFinishedCompetition();
    }

    //添加赛事
    @Transactional
    @Override
    public Map<String,Object> insertCompetition(Competition competition){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String competitionTitle = competition.getCompetitionTitle();
        Date start = competition.getStart();
        Date end = competition.getEnd();
        Integer canregister = competition.getCanregister();
        Integer isteam = competition.getIsteam();
        String competitionNumber = competition.getCompetitionNumber();
        String holder = competition.getHolder();
        String intro = competition.getIntro();
        String image = competition.getImage();
        String target = competition.getTarget();
        String plan = competition.getPlan();
        String rule = competition.getRule();
        String reward = competition.getReward();
        String registration = competition.getRegistration();

        //判断必选项是否为空
        if (competitionTitle!=null && start!=null && end!=null && canregister!=null
                && isteam!=null && competitionNumber!=null && holder!=null && intro!=null &&
                image!=null && target!=null && plan!=null && rule!=null && reward!=null &&
                registration!=null){
            if(competitionDao.queryCompetitionByNumber(competitionNumber) == null) {
                int num = competitionDao.insertCompetition(competition);
                if (num > 0) {
                } else {
                    modelMap.put("message", "添加赛事失败失败");
                }
            }else{
                modelMap.put("message","赛事编号重复");
            }
        }else {
            modelMap.put("message", "必填信息项不能为空");
        }
        return modelMap;
    }

    //删除赛事
    @Override
    public Map<String,Object> deleteCompetition(int competitionId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int num = competitionDao.deleteCompetition(competitionId);
        if (num > 0){
        }else{
            modelMap.put("message","删除赛事失败");
        }
        return modelMap;
    }

    //更新赛事
    @Override
    public Map<String,Object> updateCompetition(Competition competition){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        if (competition.getCompetitionTitle()!=null && competition.getStart()!=null && competition.getEnd()!=null && competition.getCanregister()!=null
                && competition.getIsteam()!=null && competition.getCompetitionNumber()!=null && competition.getHolder()!=null && competition.getIntro()!=null &&
                competition.getImage()!=null && competition.getTarget()!=null && competition.getPlan()!=null && competition.getRule()!=null && competition.getReward()!=null &&
                competition.getRegistration()!=null){
            int num = competitionDao.updateCompetition(competition);
            if(num > 0){
            }else {
                modelMap.put("message","更新赛事失败");
            }
        }else{
            modelMap.put("message", "必填信息项不能为空");
        }
        return modelMap;
    }

    @Override
    public List<Competition> fuzzyQueryCompetition(String text) {
        return competitionDao.fuzzyQueryCompetition(text);
    }

    @Override
    public List<Competition> fuzzyQueryCompetitionByUserId(String text, int userId) {
        return competitionDao.fuzzyQueryCompetitionByUserId(text,userId);
    }
}
