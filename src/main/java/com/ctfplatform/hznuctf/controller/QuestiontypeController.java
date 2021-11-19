package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Questiontype;
import com.ctfplatform.hznuctf.service.QuestiontypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Questiontype")
public class QuestiontypeController {
    @Autowired
    private QuestiontypeService questiontypeService;
    @RequestMapping(value = "/ListQuestiontype",method = RequestMethod.POST)
    private Map<String,Object> ListQuestiontype(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Questiontype> list = questiontypeService.ListQuestiontype();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("typeList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    //增加
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Questiontype questiontype){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questiontypeService.insert(questiontype);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
    //增加
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(Questiontype questiontype){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questiontypeService.update(questiontype);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int typeId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = questiontypeService.delete(typeId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
