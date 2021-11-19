package com.ctfplatform.hznuctf.controller;


import com.ctfplatform.hznuctf.entity.PersonalRecord;
import com.ctfplatform.hznuctf.entity.User;
import com.ctfplatform.hznuctf.service.PersonalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/PersonalRecord")
public class PersonalRecordController {
    @Autowired
    private PersonalRecordService personalRecordService;

    @RequestMapping(value = "/queryPersonalRecordByuserId",method = RequestMethod.POST)
    private Map<String,Object> queryPersonalRecordByuserId(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        User user = (User)request.getSession().getAttribute("user");
        if(user != null) {
            int userId = user.getUserId();
            List<PersonalRecord> list = personalRecordService.queryPersonalRecordByuserId(userId);
            modelMap.put("status", "success");
            modelMap.put("PersonalRecordList", list);
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }
}
