package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Questiontype;
import com.ctfplatform.hznuctf.entity.ScoreList;
import com.ctfplatform.hznuctf.service.QuestiontypeService;
import com.ctfplatform.hznuctf.service.ScoreListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ScoreList")
public class ScoreListController {
    @Autowired
    private QuestiontypeService questiontypeService;
    @Autowired
    private ScoreListService scoreListService;
    @RequestMapping(value = "/queryTotalScore",method = RequestMethod.POST)
    private Map<String,Object> queryTotalScore(){
        Map<String,Object> modelMap = new HashMap<>();
        List<ScoreList> list=  scoreListService.queryTotalScore();
        modelMap.put("status","success");
        modelMap.put("ScoreList",list);
        return modelMap;
    }
    @RequestMapping(value = "/queryEverytypeList",method = RequestMethod.POST)
    private Map<String,Object> queryEvertyypeList(){
        Map<String,Object> modelMap = new HashMap<>();
        List<Questiontype> typeList = questiontypeService.ListQuestiontype();
        modelMap.put("status","success");
        for(Questiontype questiontype:typeList){
            List<ScoreList> list=  scoreListService.queryOnetypeList(questiontype.getTypeId());
            modelMap.put(questiontype.getQuestionType(),list);
        }
        return modelMap;
    }

}
