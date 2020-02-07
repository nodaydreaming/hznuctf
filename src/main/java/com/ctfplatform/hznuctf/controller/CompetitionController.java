package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Admin;
import com.ctfplatform.hznuctf.entity.Competition;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.AdminService;
import com.ctfplatform.hznuctf.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/competition")
public class CompetitionController {
    @Autowired
    private CompetitionService competitionService;
    @Autowired
    private AdminService adminService;
    @RequestMapping(value = "/queryCompetitionById",method = RequestMethod.POST)
    private Map<String,Object> queryCompetitionById(int competitionId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Competition  competition = competitionService.queryCompetitionById(competitionId);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(competition!=null){
            modelMap.put("status","success");
            modelMap.put("competition",competition);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/listCompetition",method = RequestMethod.POST)
    private Map<String,Object> listCompetition(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Competition> list = competitionService.listCompetition();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("competitionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/finishedCompetition",method = RequestMethod.POST)
    private Map<String,Object> finishedCompetition(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Competition> list = competitionService.finishedCompetition();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("competitionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/notFinishedCompetition",method = RequestMethod.POST)
    private Map<String,Object> notFinishedCompetition(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Competition> list = competitionService.notFinishedCompetition();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("competitionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/GeneralCompetition",method = RequestMethod.POST)
    private Map<String,Object> GeneralCompetition(){
        Map<String,Object> modelMap = new HashMap<>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Competition> finishedList = competitionService.finishedCompetition();   //找结束比赛信息
        modelMap.put("status","success");
        modelMap.put("finishedCompetitionList",finishedList);
        List<Competition> notFinishedCompetitionList = competitionService.notFinishedCompetition();
        modelMap.put("notFinishedCompetitionList",notFinishedCompetitionList);
        return modelMap;
    }
    @RequestMapping(value = "/listjoinedCompetition",method = RequestMethod.POST)
    private Map<String,Object> listjoinedCompetition(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        User user = new User();
        user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            List<Competition> list = competitionService.listjoinedCompetition(user.getUserId());
            if (list.size() > 0) {
                modelMap.put("status", "success");
                modelMap.put("joinedCompetitionList", list);
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", "未找到任何信息");
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }
    //根据赛事名称或形式查赛事
    @RequestMapping(value = "/fuzzyQueryCompetition", method = RequestMethod.POST)
    private Map<String,Object> fuzzyQueryCompetition(@RequestParam("text") String text){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Competition> list = competitionService.fuzzyQueryCompetition(text);
        if(list.size()>0){
            List<Competition> finishedCompetitionList = new ArrayList<>();
            List<Competition> notFinishedCompetitionList = new ArrayList<>();
            SimpleDateFormat f= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for(Competition competition : list){
                try {
                    //结束日期在今天之前
                    if(f.parse(f.format(competition.getEnd())).before(f.parse(f.format(new Date())))){
                        finishedCompetitionList.add(competition);
                    }else{
                        notFinishedCompetitionList.add(competition);
                    }
                } catch (ParseException e) {
                    modelMap.put("status","error");
                    modelMap.put("message","日期转换错误");
                }
            }
            modelMap.put("status","success");
            modelMap.put("finishedCompetitionList",finishedCompetitionList);
            modelMap.put("notFinishedCompetitionList",notFinishedCompetitionList);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }

    //添加赛事
    @RequestMapping(value = "/insertCompetition", method = RequestMethod.POST)
    private Map<String,Object> insertCompetition(@RequestParam("competitionTitle") String competitionTitle, @RequestParam("start") String start,
                                                 @RequestParam("end") String end,
                                                 @RequestParam("isteam") Integer isteam, @RequestParam("competitionNumber") String competitionNumber,
                                                 @RequestParam("holder") String holder, @RequestParam("intro") String intro,
                                                 @RequestParam("image") String image, @RequestParam("target") String target,
                                                 @RequestParam("plan") String plan, @RequestParam("rule") String rule,
                                                 @RequestParam("reward") String reward, @RequestParam("registration") String registration, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        Competition competition = new Competition();


        competition.setCompetitionTitle(competitionTitle);
        Date createTime = new Date();
        competition.setCreatetime(createTime);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date end1 = simpleDateFormat.parse(end);
            Date start1 = simpleDateFormat.parse(start);
            //结束时间晚于开始时间
            if(end1.after(start1)) {
                competition.setEnd(end1);
                competition.setStart(start1);
                //开始时间在当前时间之后 还不能注册
                if (start1.after(createTime)) {
                    competition.setCanregister(0);
                }
                //开始时间<当前时间<结束时间
                else if (start1.before(createTime) && end1.after(createTime)) {
                    competition.setCanregister(1);
                }
                //结束时间<创建时间
                else{
                    competition.setCanregister(0);
                }
                competition.setCompetitionNumber(competitionNumber);
                competition.setIntro(intro);
                competition.setTarget(target);
                competition.setRule(rule);
                competition.setRegistration(registration);
                competition.setIsteam(isteam);
                competition.setHolder(holder);
                competition.setImage(image);
                competition.setPlan(plan);
                competition.setReward(reward);
                HttpSession session = request.getSession();
                Admin loginAdmin = (Admin) session.getAttribute("admin");
                if (loginAdmin != null) {
                    String publisher = loginAdmin.getAdminNickname();
                    competition.setPublisher(publisher);

                    //插入赛事
                    returnMap = competitionService.insertCompetition(competition);
                    if (returnMap.get("message") == null) {
                        modelMap.put("status", "success");
                    } else {
                        modelMap.put("status", "error");
                        modelMap.put("message", returnMap.get("message"));
                    }
                } else {
                    modelMap.put("status", "error");
                    modelMap.put("message", "用户未登录");
                }
            }else{    //开始时间晚于结束时间
                modelMap.put("status", "error");
                modelMap.put("message", "您的结束时间早于开始时间");
            }
        } catch (ParseException e) {
            modelMap.put("status", "error");
            modelMap.put("message", "操作失败");
        }

        return  modelMap;
    }

    //删除赛事
    @RequestMapping(value = "/deleteCompetition", method = RequestMethod.POST)
    private Map<String,Object> deleteCompetition(int competitionId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = competitionService.deleteCompetition(competitionId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    //更新赛事
    @RequestMapping(value = "/updateCompetition", method = RequestMethod.POST)
    private Map<String,Object> updateCompetition(@RequestParam("competitionId") Integer competitionId,
                                                 @RequestParam("competitionTitle") String competitionTitle, @RequestParam("start") String start,
                                                 @RequestParam("end") String end,@RequestParam("canregister") Integer canregister,
                                                 @RequestParam("isteam") Integer isteam, @RequestParam("competitionNumber") String competitionNumber,
                                                 @RequestParam("holder") String holder, @RequestParam("intro") String intro,
                                                 @RequestParam("image") String image, @RequestParam("target") String target,
                                                 @RequestParam("plan") String plan, @RequestParam("rule") String rule,
                                                 @RequestParam("reward") String reward, @RequestParam("registration") String registration) throws ParseException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Competition competition = new Competition();
        competition.setCompetitionId(competitionId);
        competition.setCompetitionTitle(competitionTitle);
        competition.setStart(simpleDateFormat.parse(start));
        competition.setEnd(simpleDateFormat.parse(end));
        competition.setCanregister(canregister);
        competition.setIsteam(isteam);
        competition.setCompetitionNumber(competitionNumber);
        competition.setHolder(holder);
        competition.setIntro(intro);
        competition.setImage(image);
        competition.setTarget(target);
        competition.setPlan(plan);
        competition.setRule(rule);
        competition.setReward(reward);
        competition.setRegistration(registration);
        returnMap = competitionService.updateCompetition(competition);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
