package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Admin;
import com.ctfplatform.hznuctf.entity.Tips;
import com.ctfplatform.hznuctf.service.AdminService;
import com.ctfplatform.hznuctf.service.TipsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tips")
public class TipsController {
    @Autowired
    private TipsService tipsService;
    @Autowired
    private AdminService adminService;

    //赛事通知发布
    @RequestMapping(value = "/insertTips",method = RequestMethod.POST)
    public Map<String,Object> insertTips(@RequestParam("content") String content,
                                         @RequestParam("competitionId") Integer competitionId, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Tips tips = new Tips();
        HttpSession session = request.getSession();
        Admin loginAdmin = (Admin) session.getAttribute("admin");
        String publisher = loginAdmin.getAdminNickname();
        Date time = new Date();
        tips.setCompetitionId(competitionId);
        tips.setContent(content);
        tips.setPublisher(publisher);
        tips.setTime(time);

        //插入
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = tipsService.insertTips(tips);
        if(returnMap.get("message") == null){
            List<Tips> list = tipsService.queryTipsListByCompetitionId(competitionId);
            try {
                WebSocketController.sendInfoToUsers(competitionId,"noticeList", list);
            } catch (IOException e) {
                System.out.println("发送该场比赛通知失败");
            }
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    //赛事通知列表
    @RequestMapping(value = "/listTipsByCompetitionId",method = RequestMethod.POST)
    public Map<String,Object> queryTipsListByCompetitionId(int competitionId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Tips> list = tipsService.queryTipsListByCompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("tipsList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }
    //赛事通知websocket接口
    public void ListTipsByCompetitionId(int competitionId,int userId){
        List<Tips> list = tipsService.queryTipsListByCompetitionId(competitionId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"noticeList",list);
        } catch (IOException e) {
            System.out.println("发送该场比赛通知失败");
        }
    }
}
