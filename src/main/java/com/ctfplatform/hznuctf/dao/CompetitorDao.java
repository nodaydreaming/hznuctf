package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Competitor;
import com.ctfplatform.hznuctf.entity.ExportCompetitorData;

import java.util.List;

public interface CompetitorDao {
    List<Competitor> listCompetitorByCompetitionId(int competitionId);
    Competitor login(String userAccount, String userPassword, String competitionNumber);
    // 导出选手队伍得分相关数据
    List<ExportCompetitorData> ListExportData(int competitionId);
}
