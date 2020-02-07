package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.controller.WebSocketController;
import com.ctfplatform.hznuctf.dao.CompetitionDao;
import com.ctfplatform.hznuctf.dao.TeamDao;
import com.ctfplatform.hznuctf.dao.TeamcompetitorDao;
import com.ctfplatform.hznuctf.entity.Team;
import com.ctfplatform.hznuctf.entity.Teamcompetitor;
import com.ctfplatform.hznuctf.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TeamServiceImpl implements TeamService {
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private TeamcompetitorDao teamcompetitorDao;
    @Autowired
    private CompetitionDao competitionDao;
    @Override
    public List<Team> ListTeam() {
        return teamDao.ListTeam();
    }

    @Override
    public List<Team> queryTeamByCompetitionId(int competitionId) {
        return teamDao.queryTeamByCompetitionId(competitionId);
    }

    @Override
    public List<Team> getTeamScoreListByCompetitionId(int competitionId) {
        return teamDao.getTeamScoreListByCompetitionId(competitionId);
    }

    @Override
    public Team queryTeamByTeamId(int teamId) {
        return teamDao.queryTeamByTeamId(teamId);
    }

    @Transactional
    @Override
    public Map<String, Object> insert(Team team,int captainId) {
        //流程：先创建队伍 再将添加队长和队伍表关联
        Map<String,Object> modelMap = new HashMap<String,Object>();
        if(competitionDao.queryCompetitionCanregister(team.getTeamCompetitionId()) == 1) {
            if(teamcompetitorDao.queryByCompetitionIdandUserId(team.getTeamCompetitionId(),captainId) == null) {
                if (teamDao.queryTeamByCompetitionIdAndTeamName(team.getTeamCompetitionId(), team.getTeamName()) == null) {
                    team.setTeamPoint(0.0);  //设置初始分值
                    team.setTeamState(0);    //设置队伍状态为正常
                    team.setTeamCaptain(captainId);  //设置队长id
                    SimpleDateFormat date = new SimpleDateFormat("yyyyMMdd");
                    SimpleDateFormat time = new SimpleDateFormat("HHmmss");
                    String invitationCode = null;
                    //随机生成邀请码并保证邀请码不和其他队伍重复
                    do {
                        String tradeDate = date.format(new Date());
                        String tradeTime = time.format(new Date());
                        //生成时间戳
                        String no = tradeDate + tradeTime;
                        //生成一个6位随机数
                        int radom = new Random().nextInt(999999);
                        if (radom < 100000) {
                            radom += 100000;
                        }
                        //邀请码拼接HZNU+比赛编号+时间戳和六伪随机数
                        invitationCode = "HZNU" + team.getTeamCompetitionId() + no + radom;
                    } while (teamDao.queryTeamByInvitationCode(invitationCode) != null);
                    team.setInvitationCode(invitationCode);      //设置该队伍邀请码
                    int effectedNum = teamDao.insertTeam(team);     //先创建队伍
                    if (effectedNum > 0) {
                        Teamcompetitor teamcompetitor = new Teamcompetitor();
                        teamcompetitor.setUserId(captainId);  //设置该队伍第一个选手id就是队长
                        teamcompetitor.setTeamId(teamDao.queryTeamByInvitationCode(invitationCode).getTeamId());     //设置队伍id
                        teamcompetitor.setUserState(0);       //设置该选手状态为正常
                        teamcompetitor.setScore(0.00);
                        int effectedNum2 = teamcompetitorDao.insertTeamcompetitor(teamcompetitor);
                        if (effectedNum2 > 0) {
                        } else {
                            modelMap.put("message", "创建队伍成功后参赛失败");
                        }
                        modelMap.put("invitationCode", team.getInvitationCode());
                    } else {
                        modelMap.put("message", "创建队伍失败");
                    }
                } else {
                    modelMap.put("message", "当前比赛中队名重复");
                }
            }else{
                modelMap.put("message","您已报名该场比赛，不可重复创建队伍");
            }
    }else{
        modelMap.put("message","当前比赛不可报名");
    }
    return modelMap;
    }

    @Override
    public Map<String, Object> update(Team team) throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = teamDao.updateTeam(team);
        if(effectedNum>0){
            Team team1 = teamDao.queryTeamByTeamId(team.getTeamId());
            int competitionId = team1.getTeamCompetitionId();
            int teamId = team.getTeamId();
            List<Teamcompetitor> list = teamcompetitorDao.queryTeamByTeamId(teamId);
            //对该队伍中每一个选手禁赛
            if(team.getTeamState() == 1) {
                for (Teamcompetitor teamcompetitor : list) {
                    WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "Banned", "true");
                }
            }else{
                for (Teamcompetitor teamcompetitor : list) {
                    WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "Banned", "false");
                }
            }
        }
        else{
            modelMap.put("message","更新队伍失败");
        }

        return modelMap;
    }

    @Override
    public Map<String, Object> delete(int temaId) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int effectedNum = teamDao.deleteTeam(temaId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除队伍失败");
        }

        return modelMap;
    }
}
