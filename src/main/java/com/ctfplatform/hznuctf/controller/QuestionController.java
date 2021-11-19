package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Question;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @RequestMapping(value = "/listQuestionForPub",method = RequestMethod.POST)
    private Map<String,Object> listQuestionForPub(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.ListQuestionForPub();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/listQuestionByCompetitionId",method = RequestMethod.POST)
    private Map<String,Object> listQuestionByCompetitionId(int competitionId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.ListQuestionByCompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/listQuestionForCompetition",method = RequestMethod.POST)
    private Map<String,Object> listQuestionForCompetition(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.ListQuestionForCompetition();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/FuzzyQuery",method = RequestMethod.POST)
    private Map<String,Object> FuzzyQuery(String text){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.FuzzyQuery(text);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",questionService.FuzzyQuery(text));
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/queryQuestionById",method = RequestMethod.POST)
    private Map<String,Object> queryQuestionById(int id){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        modelMap.put("status","success");
        modelMap.put("question",questionService.queryQuestionByQuestionId(id));
        return modelMap;
    }

    @RequestMapping(value = "/listQuestion",method = RequestMethod.POST)
    private Map<String,Object> listQuestion(){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.ListQuestion();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    //常规端练习 判题
    @RequestMapping(value = "/judge",method = RequestMethod.POST)
    private Map<String,Object> judge(int questionId,String answer,HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        synchronized (this) {
            User user = (User) request.getSession().getAttribute("user");
            if (user != null) {
                int userId = user.getUserId();
                Map<String, Object> returnMap = new HashMap<>();
                returnMap = questionService.judge(questionId, answer, userId);
                if (returnMap.get("message") == null) {
                    modelMap.put("status", "success");
                    modelMap.put("message", "答案正确");
                } else {
                    modelMap.put("status", "error");
                    modelMap.put("message", returnMap.get("message"));
                }
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", "用户未登录");
            }
        }
        return modelMap;
    }

    @RequestMapping(value = "/listDoneQuestion",method = RequestMethod.POST)
    private Map<String,Object> listDoneQuestion(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        User user = new User();
        user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            List<Question> list = questionService.ListDoneQuestion(user.getUserId());
            if (list.size() > 0) {
                modelMap.put("status", "success");
                modelMap.put("donequestionList", list);
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", "未找到任何题目信息");
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }

    @RequestMapping(value = "/queryQuestionBytypeId",method = RequestMethod.POST)
    private Map<String,Object> queryQuestionBytypeId(int typeId){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        List<Question> list = questionService.queryQuestionBytypeId(typeId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("questionList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何题目信息");
        }
        return modelMap;
    }

    //增加
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Question question){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questionService.insert(question);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(Question question){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questionService.update(question);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int questionId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questionService.delete(questionId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
