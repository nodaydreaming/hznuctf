package com.ctfplatform.hznuctf.controller;


import com.ctfplatform.hznuctf.entity.QuestionList;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.QuestionListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/questionList")
public class QuestionListController {
    @Autowired
    private QuestionListService questionListService;
    //常规端
    @RequestMapping(value = "/queryQuestionList",method = RequestMethod.POST)
    private Map<String,Object> queryQuestionList(){
        Map<String,Object> modelMap = new HashMap<>();
        List<QuestionList> list = questionListService.queryQuestionList();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
//    赛事端添加赛事题目关联使用
    @RequestMapping(value = "/queryQuestionListForCompetition",method = RequestMethod.POST)
    private Map<String,Object> queryQuestionListForCompetition(){
        Map<String,Object> modelMap = new HashMap<>();
        List<QuestionList> list = questionListService.listQuestionForCompetition();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    //管理端赛事内赛题管理
    @RequestMapping(value = "/listQuestionByCompetitionId",method = RequestMethod.POST)
    private Map<String,Object> listQuestionByCompetitionId(int competitionId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<QuestionList> list = questionListService.queryQuestionByCompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }
    //赛事端赛事列表显示信息
    @RequestMapping(value = "/listAllQuestionList",method = RequestMethod.POST)
    private Map<String,Object> listAllQuestionList(){
        Map<String,Object> modelMap = new HashMap<>();
        List<QuestionList> list = questionListService.listAllQuestionList();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/listAcQuestionList",method = RequestMethod.POST)
    private Map<String,Object> listAcQuestionList(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        User user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            int userId = user.getUserId();
            List<QuestionList> list = questionListService.listDoneQuestionList(userId);
            if (list.size() > 0) {
                modelMap.put("status", "success");
                modelMap.put("AcquestionList", list);
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", "未找到信息");
            }
        }else{
            modelMap.put("status","error");
            modelMap.put("message","用户未登录");
        }
        return modelMap;
    }
    @RequestMapping(value = "/FuzzyQuery",method = RequestMethod.POST)
    private Map<String,Object> FuzzyQuery(String text){
        Map<String,Object> modelMap = new HashMap<>();
        List<QuestionList> list = questionListService.FuzzyQuery(text);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
}
