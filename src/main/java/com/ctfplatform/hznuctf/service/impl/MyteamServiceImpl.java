package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.MyteamDao;
import com.ctfplatform.hznuctf.dao.TeamcompetitorDao;
import com.ctfplatform.hznuctf.dao.UserDao;
import com.ctfplatform.hznuctf.entity.Myteam;
import com.ctfplatform.hznuctf.entity.Teamcompetitor;
import com.ctfplatform.hznuctf.service.MyteamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyteamServiceImpl implements MyteamService {
    @Autowired
    private MyteamDao myteamDao;
    @Autowired
    private TeamcompetitorDao teamcompetitorDao;
    @Autowired
    private UserDao userDao;
    @Override
    public Myteam queryMyteamByCompetitionIdAndUserId(int competitionId, int userId) {
        Myteam myteam = myteamDao.queryMyteamByCompetitionIdAndUserId(competitionId,userId);  //先找到该人队伍的队伍和队长信息
        int teamId = myteam.getTeamId();
        List<Teamcompetitor> list = teamcompetitorDao.queryTeamByTeamId(teamId);
        for(Teamcompetitor teamcompetitor : list){
            if(!teamcompetitor.getUserId().equals(myteam.getCaptainId())){      //填充队员信息
                if(myteam.getFirstMemberName() == null || "".equals(myteam.getFirstMemberName())){
                    myteam.setFirstMemberId(teamcompetitor.getUserId());
                    myteam.setFirstMemberName(userDao.queryUserByUserId(teamcompetitor.getUserId()).getUserName());
                }else{
                    myteam.setSecondMemberId(teamcompetitor.getUserId());
                    myteam.setSecondMemberName(userDao.queryUserByUserId(teamcompetitor.getUserId()).getUserName());
                }
            }
        }
        if(userId == myteam.getCaptainId()){
            myteam.setIsCaptain(1);
        }else{
            myteam.setIsCaptain(0);
        }
        return myteam;
    }
}
