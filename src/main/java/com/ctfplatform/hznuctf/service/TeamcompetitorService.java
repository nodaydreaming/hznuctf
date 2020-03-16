package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.Teamcompetitor;

import java.util.List;
import java.util.Map;

public interface TeamcompetitorService {
    List<Teamcompetitor> ListTeamcompetitor();
    //选手加入队伍
    Map<String,Object> insert(int userId, String invitationCode);
    //踢出选手于队伍
    Map<String,Object> delete(Teamcompetitor teamcompetitor);

    //禁赛解禁选手
    Map<String,Object> update(Teamcompetitor teamcompetitorId);

    List<Teamcompetitor> queryTeamByTeamId(int teamId);
}
