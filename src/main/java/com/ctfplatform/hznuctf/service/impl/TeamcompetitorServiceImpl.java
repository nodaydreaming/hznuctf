package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.controller.WebSocketController;
import com.ctfplatform.hznuctf.dao.CompetitionDao;
import com.ctfplatform.hznuctf.dao.TeamDao;
import com.ctfplatform.hznuctf.dao.TeamcompetitorDao;
import com.ctfplatform.hznuctf.entity.Competition;
import com.ctfplatform.hznuctf.entity.Team;
import com.ctfplatform.hznuctf.entity.Teamcompetitor;
import com.ctfplatform.hznuctf.service.TeamcompetitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TeamcompetitorServiceImpl implements TeamcompetitorService {
    @Autowired
    private TeamcompetitorDao teamcompetitorDao;
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private CompetitionDao competitionDao;

    @Override
    public List<Teamcompetitor> ListTeamcompetitor() {
        return teamcompetitorDao.ListTeamcompetitor();
    }

    @Transactional
    @Override
    public Map<String, Object> insert(int userId,String invitationCode) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Team team = teamDao.queryTeamByInvitationCode(invitationCode);
        //先通过邀请码找队伍
        if(team != null){
            Competition competition = new Competition();
            competition = competitionDao.queryCompetitionById(team.getTeamCompetitionId());
            if(competition.getCanregister() == 1) {      //如果比赛可以加入
                if(teamcompetitorDao.queryByCompetitionIdandUserId(team.getTeamCompetitionId(),userId) == null) {
                    if (competition.getIsteam() == 1) {           //如果比赛是团队赛
                        if (teamcompetitorDao.queryTeamByTeamId(team.getTeamId()).size() < 3) {
                            Teamcompetitor teamcompetitor = new Teamcompetitor();
                            teamcompetitor.setUserState(0);
                            teamcompetitor.setTeamId(team.getTeamId());
                            teamcompetitor.setUserId(userId);
                            teamcompetitor.setScore(0.00);
                            int effectedNum = teamcompetitorDao.insertTeamcompetitor(teamcompetitor);
                            if (effectedNum > 0) {
                            } else {
                                modelMap.put("message", "加入队伍失败");
                            }
                        } else {
                            modelMap.put("message", "该队伍人数已满");
                        }
                    } else {       //个人赛 不能加入
                        modelMap.put("message", "该队伍人数已满");
                    }
                }else{
                    modelMap.put("message","您已有所属队伍");
                }
            }else{
                modelMap.put("message","当前比赛不可报名");
            }
        }else{
            modelMap.put("message","未找到队伍");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> delete(Teamcompetitor teamcompetitor) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = teamcompetitorDao.deleteTeamcompetitor(teamcompetitor);
        if(effectedNum>0){      //删除队伍选手关联成功
        }
        else{
            modelMap.put("message","踢出队伍失败");
        }
        return modelMap;
    }


    @Override
    public Map<String, Object> update(Teamcompetitor teamcompetitor) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = teamcompetitorDao.updateTeamcompetitor(teamcompetitor);
        if(effectedNum>0){
            //获得该条记录 用于提供选手id
            Teamcompetitor teamcompetitor1 = teamcompetitorDao.queryByTeamcompetitorId(teamcompetitor.getTeamcompetitorId());
            //获得队伍信息 用于提供赛事id
            Team team = teamDao.queryTeamByTeamId(teamcompetitor1.getTeamId());
            try {
                if(teamcompetitor.getUserState() == 1) {
                    WebSocketController.sendInfoToUser(team.getTeamCompetitionId(), teamcompetitor1.getUserId(), "Banned", "true");
                }else{
                    WebSocketController.sendInfoToUser(team.getTeamCompetitionId(), teamcompetitor1.getUserId(), "Banned", "false");
                }
            } catch (IOException e) {
                System.out.println("发送消息失败");
            }

        }
        else{
            if(teamcompetitor.getUserState() == 1) {
                modelMap.put("message", "封禁该选手失败");
            }else{
                modelMap.put("message","解禁该选手失败");
            }
        }
        return modelMap;
    }

    @Override
    public List<Teamcompetitor> queryTeamByTeamId(int teamId) {
        return teamcompetitorDao.queryTeamByTeamId(teamId);
    }
}
