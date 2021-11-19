package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.TeamquestionDao;
import com.ctfplatform.hznuctf.entity.Teamquestion;
import com.ctfplatform.hznuctf.service.TeamquestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TeamquestionServiceImpl implements TeamquestionService {
    @Autowired
    private TeamquestionDao teamquestionDao;

    @Override
    public Map<String, Object> insertTeamquestion(Teamquestion teamquestion) {
        Map<String, Object> resultMap = new HashMap<>();
        if(teamquestion.getTeamId() > 0 && teamquestion.getCompetitionId() > 0 && teamquestion.getQuestionId() > 0 ){
            int effectedNum = teamquestionDao.insertTeamquestion(teamquestion);
            if (effectedNum > 0) {
                Teamquestion newTeamquestion = teamquestionDao.queryByTeamIdAndCompetitionIdAndQuestionId(teamquestion.getTeamId(),
                                                teamquestion.getCompetitionId(), teamquestion.getQuestionId());
                resultMap.put("teamquestion", newTeamquestion);
            } else {
                resultMap.put("message", "添加队伍赛题失败");
            }
        }
        else{
            resultMap.put("message", "队伍赛题对象不完整，添加失败");
        }
        return resultMap;
    }

    @Override
    public Map<String, Object> updateTeamquestion(Teamquestion teamquestion) {
        Map<String, Object> resultMap = new HashMap<>();
        return resultMap;
    }

    @Override
    public Map<String, Object> deleteTeamquestion(Teamquestion teamquestion) {
        Map<String, Object> resultMap = new HashMap<>();
        int effectedNum = teamquestionDao.deleteTeamquestion(teamquestion);
        if(effectedNum>0){
        }
        else{
            resultMap.put("message","删除队伍赛题失败");
        }
        return resultMap;
    }

    @Override
    public Map<String, Object> queryByTeamIdAndCompetitionIdAndQuestionId(int teamId, int competitionId, int questionId) {
        Map<String, Object> resultMap = new HashMap<>();
        Teamquestion teamquestion = teamquestionDao.queryByTeamIdAndCompetitionIdAndQuestionId(teamId, competitionId, questionId);
        resultMap.put("teamquestion", teamquestion);
        return resultMap;
    }

    @Override
    public Teamquestion queryByQuestionResourceOrLink(String resLink) {
        return teamquestionDao.queryByQuestionResourceOrLink(resLink);
    }

    @Override
    public List<Teamquestion> findAllTeamquestion() {
        List<Teamquestion> list = teamquestionDao.findAllTeamquestion();
        return list;
    }
}
