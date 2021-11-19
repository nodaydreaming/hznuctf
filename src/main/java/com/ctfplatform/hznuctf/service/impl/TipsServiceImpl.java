package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.controller.WebSocketController;
import com.ctfplatform.hznuctf.dao.TipsDao;
import com.ctfplatform.hznuctf.entity.Tips;
import com.ctfplatform.hznuctf.service.TipsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TipsServiceImpl implements TipsService {
    @Autowired
    private TipsDao tipsDao;

    @Override
    public Map<String,Object> insertTips(Tips tips){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        String content = tips.getContent();
        if (content!=null){
            int num = tipsDao.insertTips(tips);
            if (num >0){
                List<Tips> list = tipsDao.queryTipsListByCompetitionId(tips.getCompetitionId());
                try {
                    WebSocketController.sendInfoToUsers(tips.getCompetitionId(),"noticeList",list);
                } catch (IOException e) {
                    System.out.println("添加通知之后广播发送失败");
                }
            }else {
                modelMap.put("message", "发布赛事通知失败");
            }
        }else {
            modelMap.put("message", "必填信息项不能为空");
        }

        return modelMap;
    }

    @Override
    public List<Tips> queryTipsListByCompetitionId(int competitionId) {

        return tipsDao.queryTipsListByCompetitionId(competitionId);
    }
}
