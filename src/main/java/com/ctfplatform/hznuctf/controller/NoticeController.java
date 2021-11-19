package com.ctfplatform.hznuctf.controller;


import com.ctfplatform.hznuctf.entity.Notice;
import com.ctfplatform.hznuctf.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @RequestMapping(value = "/listNotice",method = RequestMethod.POST)
    private Map<String,Object> listNotice(){
        Map<String,Object> modelMap = new HashMap<>();
        List<Notice> list = noticeService.listNotice();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyy-MM-dd");
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("noticeList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
    @RequestMapping(value = "/FuzzyQuery",method = RequestMethod.POST)
    private Map<String,Object> FuzzyQuery(String text){
        Map<String,Object> modelMap = new HashMap<>();
        List<Notice> list = noticeService.FuzzyQueryNotice(text);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyy-MM-dd");
        if(list.size()>0){

            modelMap.put("status","success");
            modelMap.put("noticeList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }
}
