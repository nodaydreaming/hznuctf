package com.ctfplatform.hznuctf.controller;


import com.ctfplatform.hznuctf.entity.Admin;
import com.ctfplatform.hznuctf.entity.Information;
import com.ctfplatform.hznuctf.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/information")
public class InformationController {
    @Autowired
    private InformationService informationService;

    //添加公告
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(@RequestParam("informationTitle") String informationTitle,
                              @RequestParam("informationDetail") String informationDetail,
                              @RequestParam("informationSummary") String informationSummary,
                              HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String, Object>();
        Information information = new Information();
        Date informationCreatetime = new Date();
        HttpSession session = request.getSession();
        Admin loginAdmin = (Admin) session.getAttribute("admin");
        information.setInformationCreatetime(informationCreatetime);
        information.setInformationDetail(informationDetail);
        information.setInformationSummary(informationSummary);
        information.setInformationTitle(informationTitle);
        //不需要该字段了 通知不用区分赛事或常规
        information.setForCompetition(0);
        if(loginAdmin != null) {
            information.setAdminId(loginAdmin.getAdminId());
            Map<String, Object> returnMap = new HashMap<String, Object>();
            //插入添加公告
            returnMap = informationService.insert(information);
            if (returnMap.get("message") == null) {
                modelMap.put("status", "success");
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }else{
            modelMap.put("status","error");
            modelMap.put("message","用户未登录");
        }

        return modelMap;
    }

    //获取所有公告
    @RequestMapping(value = "/listInformation",method = RequestMethod.POST)
    private Map<String,Object> ListInformation(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
       List<Information> informationList = informationService.ListInformation();
        if(informationList.size()>0){
            modelMap.put("status","success");
            modelMap.put("informationList",informationList);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到任何信息");
        }
        return modelMap;
    }

    //删除公告
    @RequestMapping(value = "/deleteInformation", method = RequestMethod.POST)
    private Map<String,Object> deleteInformation(@RequestParam("informationId") int informationID){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = informationService.deleteInformation(informationID);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    //修改公告
    @RequestMapping(value = "/updateInformation", method = RequestMethod.POST)
    private Map<String,Object> updateInformation(Information information){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = informationService.updateInformation(information);

        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

}
