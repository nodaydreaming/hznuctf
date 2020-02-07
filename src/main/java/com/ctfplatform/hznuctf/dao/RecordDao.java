package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.Record;
import com.ctfplatform.hznuctf.entity.TeamRecord;

import java.util.List;

public interface RecordDao {
    List<Record> ListRecord();
    List<Record> queryRecordByTeamId(int teamId);
    List<Record> queryRecordByUserId(int userId);
    List<TeamRecord> queryTeamRecordByTeamId(int teamId);
    //赛事端获得队伍ac题目列表
    List<Record> listAcQuestion(int teamId);
    int insert(Record record);
}
