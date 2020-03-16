package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.entity.Teamquestion;
import com.ctfplatform.hznuctf.service.TeamquestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/teamquestion")
public class TeamquestionController {
    @Autowired
    private TeamquestionService  teamquestionService;

    @RequestMapping(value = "/insertTeamquestion", method = RequestMethod.POST)
    private Map<String, Object> insertTeamquestion(Teamquestion teamquestion){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap = teamquestionService.insertTeamquestion(teamquestion);
        return resultMap;
    }

    @RequestMapping(value = "queryByTeamIdAndCompetitionIdAndQuestionId", method = RequestMethod.POST)
    private Map<String, Object> queryByTeamIdAndCompetitionIdAndQuestionId(int teamId, int competitionId, int questionId){
        Map<String, Object> resultMap = teamquestionService.queryByTeamIdAndCompetitionIdAndQuestionId(teamId, competitionId, questionId);
        return resultMap;
    }
}
