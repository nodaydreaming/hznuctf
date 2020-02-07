package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.HighlightDao;
import com.ctfplatform.hznuctf.entity.Highlight;
import com.ctfplatform.hznuctf.service.HighlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HighlightServiceImpl implements HighlightService {

    @Autowired
    private HighlightDao highlightDao;
    @Override
    public List<Highlight> queryHighlightBycompetitionId(int competitionId) {
        return highlightDao.queryHighlightByCompetitionId(competitionId);
    }
    @Transactional
    @Override
    public Map<String, Object> insert(Highlight highlight) {
        Map<String,Object> modelMap = new HashMap<>();
        if(highlight.getForGrade() == 1){    //获奖情况图片
            List<Highlight> list = highlightDao.queryGradeHighlightByCompetitionId(highlight.getCompetitionId());
            if(list.size()>= 1){
                modelMap.put("message","该场赛事精彩瞬间图片已有一张，不得添加");
            }else{
                int effectedNum = highlightDao.insert(highlight);
                if(effectedNum>0){}
                else{
                    modelMap.put("message","添加失败");
                }
            }
        }
        if(highlight.getForGrade() == 0){
            List<Highlight> list = highlightDao.queryOtherHighlightByCompetitionId(highlight.getCompetitionId());
            if(list.size()>= 8){
                modelMap.put("message","该场赛事精彩瞬间图片已有八张");
            }else{
                int effectedNum = highlightDao.insert(highlight);
                if(effectedNum>0){}
                else{
                    modelMap.put("message","添加失败");
                }
            }
        }
        return modelMap;

    }

    @Override
    public Map<String, Object> delete(int competitionId) {
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = highlightDao.delete(competitionId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除失败");
        }
        return modelMap;
    }

    @Override
    public Map<String, Object> deleteOne(int highlightId) {
        Map<String,Object> modelMap = new HashMap<>();
        int effectedNum = highlightDao.deleteOne(highlightId);
        if(effectedNum>0){}
        else{
            modelMap.put("message","删除失败");
        }
        return modelMap;
    }
}
