package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Competitionquestion;
import com.ctfplatform.hznuctf.entity.QuestionList;
import com.ctfplatform.hznuctf.entity.Questiontype;
import com.ctfplatform.hznuctf.service.CompetitionquestionService;
import com.ctfplatform.hznuctf.service.QuestionListService;
import com.ctfplatform.hznuctf.service.QuestiontypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Competitionquestion")
public class CompetitionquestionController {
    @Autowired
    private CompetitionquestionService competitionquestionService;
    @Autowired
    private QuestiontypeService questiontypeService;
    @Autowired
    private QuestionListService questionListService;
    @RequestMapping(value = "/listCompetitionquestion",method = RequestMethod.POST)
    private Map<String,Object> listCompetitionquestion(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Competitionquestion> list = competitionquestionService.listCompetitionquestion();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("CompetitionquestionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/listCompetitionquestionById",method = RequestMethod.POST)
    private Map<String,Object> listCompetitionquestionById(int competitionId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Competitionquestion> list = competitionquestionService.listCompetitionquestionById(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("CompetitionquestionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    //增加
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(int competitionId,String questionIdList){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        competitionquestionService.deleteCompetitionquestionByCompetitionId(competitionId);
        String[] idList = questionIdList.split(",");
        for(int i = 0;i<idList.length;i++){
            returnMap = competitionquestionService.insertCompetitionquestion(competitionId,Integer.parseInt(idList[i]));
            if(returnMap.get("message") == null){
                modelMap.put("status","success");
            }else{
                modelMap.put("status","error");
                modelMap.put("message",returnMap.get("message"));
            }
        }
        return modelMap;
    }
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(Competitionquestion competitionquestion){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = competitionquestionService.updateCompetitionquestion(competitionquestion);
        if(returnMap.get("message") == null){
            int competitionId = competitionquestion.getCompetitionId();
            Map<String,Object> map = new HashMap<String,Object>();
            //获得该场比赛题目类型列表
            List<Questiontype> typeList = questiontypeService.ListQuestiontypeBycompetitionId(competitionId);
            //获得该场比赛该类型题目列表
            List<QuestionList> QuestionList = null;
            for(Questiontype questiontype : typeList){
                map.put(questiontype.getQuestionType(),questionListService.listQuestionByCompetitionIdAndTypeId(competitionId,questiontype.getTypeId()));
            }
            try {
                WebSocketController.sendInfoToUsers(competitionId,"questionList",map);
            } catch (IOException e) {
                System.out.println("发送单场比赛一种类型题目列表失败");
            }
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int competitionId,int questionId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = competitionquestionService.deleteCompetitionquestion(competitionId,questionId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
