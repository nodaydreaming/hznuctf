package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.InformationDao;
import com.ctfplatform.hznuctf.entity.Information;
import com.ctfplatform.hznuctf.service.InformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InformationServiceImpl implements InformationService {
    @Autowired
    private InformationDao informationDao;

    @Override
    public Map<String,Object> insert(Information information){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String title = information.getInformationTitle();
        String detail = information.getInformationDetail();
        String summary = information.getInformationSummary();

        //判断必填项是否为空
        if (title != null && detail != null && summary != null){
            int Num = informationDao.insertInformation(information);
            if (Num >0){
            }else {
                modelMap.put("message", "增加公告失败");
            }
        }else {
            modelMap.put("message", "必填信息项不能为空");
        }
        return modelMap;
    }

    @Override
    public List<Information> ListInformation() {
        return informationDao.ListInformation();
    }

    @Override
    public Map<String,Object> deleteInformation(int informationId) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        int Num = informationDao.deleteInformation(informationId);
        if (Num > 0){
        }else{
            modelMap.put("message","删除公告失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> updateInformation(Information information) {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        if (information.getInformationTitle() != null && information.getInformationDetail() != null && information.getInformationSummary() != null){
            int num = informationDao.updateInformation(information);
            if(num > 0){
            }else {
                modelMap.put("message","更新公告失败");
            }
        }else{
            modelMap.put("message", "必填信息项不能为空");
        }
        return modelMap;
    }
}
