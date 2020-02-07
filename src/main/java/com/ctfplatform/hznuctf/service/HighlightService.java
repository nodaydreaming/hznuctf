package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Highlight;

import java.util.List;
import java.util.Map;

public interface HighlightService {
    List<Highlight> queryHighlightBycompetitionId(int competitionId);
    Map<String,Object> insert(Highlight highlight);
    Map<String,Object> delete(int competitionId);
    Map<String,Object> deleteOne(int highlightId);
}
