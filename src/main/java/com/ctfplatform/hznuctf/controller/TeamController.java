package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.dao.TeamDao;
import com.ctfplatform.hznuctf.dao.TeamcompetitorDao;
import com.ctfplatform.hznuctf.entity.Team;
import com.ctfplatform.hznuctf.entity.Teamcompetitor;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.TeamService;
import com.ctfplatform.hznuctf.service.TeamcompetitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Team")
public class TeamController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamcompetitorService teamcompetitorService;
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private TeamcompetitorDao teamcompetitorDao;
    @RequestMapping(value = "/ListTeam",method = RequestMethod.POST)
    private Map<String,Object> ListTeam(){
        Map<String,Object> modelMap = new HashMap<>();
        List<Team> list = teamService.ListTeam();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("teamList",list);
        }else{
            modelMap.put("status","success");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/queryTeamByCompetitionId",method = RequestMethod.POST)
    private Map<String,Object> queryTeamByCompetitionId(int competitionId){
        Map<String,Object> modelMap = new HashMap<>();
        List<Team> list = teamService.queryTeamByCompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("teamList",list);
        }else{
            modelMap.put("status","success");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    //导入队伍
    @RequestMapping(value = "/importTeam",method = RequestMethod.POST)
    private Map<String,Object> importTeam(int competitionId,String teamIdList){
        Map<String,Object> modelMap = new HashMap<>();
        String[] idList = teamIdList.split(",");
        for(String id : idList){
            int teamId = Integer.parseInt(id);  //原比赛队伍id
            Team t = teamService.queryTeamByTeamId(teamId);   //获得原队伍信息
            t.setTeamId(null);                          //重置队伍id
            t.setTeamPoint(0.0);                        //重置队伍分值
            t.setTeamCompetitionId(competitionId);      //赋值要导入比赛的id
            t.setTeamState(0);                          //重置队伍状态
            int effectedNum = teamDao.insertTeam(t);                      //创建队伍
            if(effectedNum > 0 ){
                int newTeamId = t.getTeamId();
                List<Teamcompetitor> teamCompetitiors = teamcompetitorDao.queryTeamByTeamId(teamId);
                for(Teamcompetitor teamcompetitor : teamCompetitiors){
                    teamcompetitor.setTeamId(newTeamId);    //更新该场比赛新队伍id
                    teamcompetitor.setScore(0.00);          //更新用户分值
                    teamcompetitor.setUserState(0);         //重置用户状态
                    int effectedNum2 = teamcompetitorDao.insertTeamcompetitor(teamcompetitor);
                    if(effectedNum2 > 0){
                        modelMap.put("status","success");
                    }else{
                        modelMap.put("status","error");
                        modelMap.put("message","导入队伍失败");
                    }
                }
            }else{
                modelMap.put("status","error");
                modelMap.put("message","导入队伍失败");
            }

        }
        return modelMap;
    }

    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Team team, HttpServletRequest request){
        Map<String, Object> modelMap = new HashMap<>();
        User user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            int captainId = user.getUserId();
            Map<String, Object> returnMap = new HashMap<>();
            returnMap = teamService.insert(team, captainId);
            if (returnMap.get("message") == null) {
                modelMap.put("status", "success");
                modelMap.put("message","创建队伍成功");
                modelMap.put("invitationCode",returnMap.get("invitationCode"));
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(Team team) throws IOException {
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = teamService.update(team);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message","操作失败");
        }
        return modelMap;
    }
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int teamId){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = teamService.delete(teamId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("message","成功解散队伍");
        }else{
            modelMap.put("status","error");
            modelMap.put("message","操作失败");
        }
        return modelMap;
    }
    @RequestMapping(value = "/dismissOrSignOut",method = RequestMethod.POST)
    private Map<String,Object> dismissOrSignOut(int teamId,HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        User user = (User)request.getSession().getAttribute("user");
        if(user != null) {
            Team team = teamService.queryTeamByTeamId(teamId);
            if(user.getUserId().equals(team.getTeamCaptain())){
                returnMap = teamService.delete(teamId);
                if (returnMap.get("message") == null) {
                    modelMap.put("status", "success");
                    modelMap.put("message", "成功解散队伍");
                } else {
                    modelMap.put("status", "error");
                    modelMap.put("message", "操作失败");
                }
            }else{
                Teamcompetitor teamcompetitor = new Teamcompetitor();
                teamcompetitor.setTeamId(teamId);
                teamcompetitor.setUserId(user.getUserId());
                returnMap = teamcompetitorService.delete(teamcompetitor);
                if (returnMap.get("message") == null) {
                    modelMap.put("status", "success");
                    modelMap.put("message", "成功退出队伍");
                } else {
                    modelMap.put("status", "error");
                    modelMap.put("message", "操作失败");
                }
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }

}
