package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.ScoreListDao;
import com.ctfplatform.hznuctf.entity.ScoreList;
import com.ctfplatform.hznuctf.service.ScoreListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreListServiceImpl implements ScoreListService {
    @Autowired
    private ScoreListDao scoreListDao;
    @Override
    public List<ScoreList> queryTotalScore() {
        return scoreListDao.queryTotalScore();
    }

    @Override
    public List<ScoreList> queryOnetypeList(int typeId) {
        return scoreListDao.queryOnetypeList(typeId);
    }

    @Override
    public List<ScoreList> FuzzyQuery(String text) {
        return scoreListDao.FuzzyQueryScoreList(text);
    }
}
