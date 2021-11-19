package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Information;

import java.util.List;
import java.util.Map;

public interface InformationService {

    //添加公告
    Map<String,Object> insert(Information information);
    //获取公告列表
    List<Information> ListInformation();
    //删除公告
    Map<String,Object> deleteInformation(int informationId);
    //修改公告
    Map<String,Object> updateInformation(Information information);
}
