package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Myteam;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.MyteamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/myTeam")
public class MyteamController {
    @Autowired
    private MyteamService myteamService;
    @RequestMapping(value = "queryMyteamByCompetitionId",method = RequestMethod.POST)
    private Map<String,Object> queryMyteamByCompetitionId(int competitionId, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        User user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            Myteam myteam = myteamService.queryMyteamByCompetitionIdAndUserId(competitionId,user.getUserId());
            if(myteam != null){
                modelMap.put("status","success");
                modelMap.put("myTeam",myteam);
            }else{
                modelMap.put("status","error");
                modelMap.put("message","未找到您的队伍信息");
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }
}
