package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Highlight;
import com.ctfplatform.hznuctf.service.HighlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Highlight")
public class HighlightController {
    @Autowired
    private HighlightService highlightService;

    @RequestMapping(value = "/queryByCompetitionId",method = RequestMethod.POST)
    private Map<String,Object> queryByCompetitionId(int competitionId){
        Map<String,Object> modelMap = new HashMap<>();
        List<Highlight> list = highlightService.queryHighlightBycompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("highlightList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到相关信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(Highlight highlight){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = highlightService.insert(highlight);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
    //删除正常赛事的精彩瞬间
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(int competitionId){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = highlightService.delete(competitionId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
    //删除单个精彩瞬间图片
    @RequestMapping(value = "/deleteOne",method = RequestMethod.POST)
    private Map<String,Object> deleteOne(int highlightId){
        Map<String,Object> modelMap = new HashMap<>();
        Map<String,Object> returnMap = new HashMap<>();
        returnMap = highlightService.deleteOne(highlightId);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }
}
