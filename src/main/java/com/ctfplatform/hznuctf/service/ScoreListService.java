package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.ScoreList;

import java.util.List;

public interface ScoreListService {
    List<ScoreList> queryTotalScore();
    List<ScoreList> queryOnetypeList(int typeId);
    List<ScoreList> FuzzyQuery(String text);
}
