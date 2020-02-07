package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Highlight;

import java.util.List;

public interface HighlightDao {
    int insert(Highlight highlight);
    int delete(int competitionId);
    int deleteOne(int highlightId);
    List<Highlight> queryHighlightByCompetitionId(int competitionId);
    List<Highlight> queryGradeHighlightByCompetitionId(int competitionId);  //成绩类图片
    List<Highlight> queryOtherHighlightByCompetitionId(int competitionId);   //精彩瞬间类图片

}
