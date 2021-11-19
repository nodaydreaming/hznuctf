package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.dao.RecordDao;
import com.ctfplatform.hznuctf.dao.ScoreListDao;
import com.ctfplatform.hznuctf.entity.*;
import com.ctfplatform.hznuctf.service.*;
import org.apache.commons.lang.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/contest")
public class ContestController {
    @Autowired
    private CompetitorService competitorService;
    @Autowired
    private QuestiontypeService questiontypeService;
    @Autowired
    private QuestionListService questionListService;
    @Autowired
    private RecordDao recordDao;
    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamquestionService teamquestionService;
    @Autowired
    private ScoreListDao scoreListDao;
    @Autowired
    private TipsService tipsService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private TeamcompetitorService teamcompetitorService;
    @Autowired
    private CompetitionService competitionService;
    @Autowired
    private UserService userService;
    //用户退出
    @RequestMapping(value = "/back",method = RequestMethod.POST)
    private Map<String,Object> back(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        HttpSession session = request.getSession();
        session.removeAttribute("CompetitionUser");
        session.removeAttribute("banned");
        session.removeAttribute("isfinish");
        modelMap.put("status","success");
        return modelMap;
    }
    //获得用户登录状态
    @RequestMapping(value = "/getUserMap",method = RequestMethod.POST)
    private Map<String,Object> getUserMap(HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        HttpSession session = request.getSession();
        Competitor competitor = (Competitor) session.getAttribute("CompetitionUser");
        modelMap.put("loginUser", competitor);    //设置用户对象
        modelMap.put("banned", session.getAttribute("Banned"));
        modelMap.put("isfinish", session.getAttribute("isFinished"));
        return modelMap;
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    private Map<String,Object> login(String userAccount, String userPassword, String competitionNumber, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<>();
        Competitor competitor = competitorService.login(userAccount, userPassword, competitionNumber);
        if(competitor != null){
            if(new Date().before(competitor.getStart())){  //比赛还未开始
                modelMap.put("status","error");
                modelMap.put("message","比赛尚未开始");
            }else {
                request.getSession().setAttribute("CompetitionUser", competitor);
                if (competitor.getEnd().after(new Date())) { //在当前时间后结束
                    request.getSession().setAttribute("isFinished", 0);
                } else {
                    request.getSession().setAttribute("isFinished", 1);
                }
                if (competitor.getTeamState() == 0 && competitor.getUserState() == 0) {
                    request.getSession().setAttribute("Banned", 0);//队伍或选手都没被禁赛
                    modelMap.put("status", "success");
                    modelMap.put("loginUser", competitor);
                } else {
                    request.getSession().setAttribute("Banned", 1);
                    modelMap.put("status", "error");
                    modelMap.put("message", "您已被禁赛，相关事宜请联系管理员");
                }
                //单点登录 上一个登录的人被挤下线
                try {
                    WebSocketController.sendInfoToUser(competitor.getCompetitionId(),competitor.getUserId(),"BeSqueezed","true");
                } catch (IOException e) {
                }
            }
        }else{
            modelMap.put("status","error");
            modelMap.put("message","您的账号密码错误或未报名该场比赛");
        }
        return modelMap;
    }
    //发送单场比赛题目类型
    public void getQuestiontypeBycompetitionId(int competitionId,int userId){
        List<Questiontype> list = questiontypeService.ListQuestiontypeBycompetitionId(competitionId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"typeList",list);
        } catch (IOException e) {
            try {
                WebSocketController.sendInfoToUser(competitionId,userId,"hhaa","asd");
            } catch (IOException e1) {
            }
        }
    }
    //发送该场赛事题目
    public void getQuestionInOneCompetition(int competitionId, int teamId, int userId){
        Map<String,Object> map = new HashMap<String,Object>();
        //获得该场比赛题目类型列表
        List<Questiontype> typeList = questiontypeService.ListQuestiontypeBycompetitionId(competitionId);
        //获得此次比赛的所有题目
        List<QuestionList> questionList = questionListService.queryQuestionByCompetitionId(competitionId);
        Map<String, Object> tqMap;

        for (int num = 0; num < questionList.size(); ++num) {
            Question question = questionService.queryQuestionByQuestionId(questionList.get(num).getQuestionId());
            tqMap = teamquestionService.queryByTeamIdAndCompetitionIdAndQuestionId(teamId, competitionId, questionList.get(num).getQuestionId());
            if(tqMap.get("teamquestion") == null){
                Teamquestion tq = new Teamquestion();
                tq.setTeamId(teamId);
                tq.setCompetitionId(competitionId);
                tq.setQuestionId(questionList.get(num).getQuestionId());
                //找到未分配的资源地址或链接地址
                if(!questionList.get(num).getQuestionLinks().equals("")){
                    String[] links = questionList.get(num).getQuestionLinks().split(",");
                    //如果只有一个链接，则所有队伍使用同一链接
                    if(links.length > 1) {
                        Teamquestion teamquestion = null;
                        int i = -1;
                        do {
                            teamquestion = teamquestionService.queryByQuestionResourceOrLink(links[++i]);
                        } while (teamquestion != null);
                        questionList.get(num).setQuestionLinks(links[i]);

                        tq.setQuestionLink(links[i]);
                        tq.setQuestionAnswer(question.getQuestionAnswers().split(",")[i]);
                    }
                    else{
                        questionList.get(num).setQuestionLinks(links[0]);

                        tq.setQuestionLink(links[0]);
                        tq.setQuestionAnswer(question.getQuestionAnswers().split(",")[0]);
                    }
                }
                else{
                    String[] resources = questionList.get(num).getQuestionResources().split(",");
                    //如果只有一个附件，则所有队伍使用同一附件
                    if(resources.length > 1) {
                        Teamquestion teamquestion = null;
                        int i = -1;
                        do {
                            teamquestion = teamquestionService.queryByQuestionResourceOrLink(resources[++i]);
                        } while (teamquestion == null);
                        questionList.get(num).setQuestionResources(resources[i]);

                        tq.setQuestionSource(resources[i]);
                        tq.setQuestionAnswer(question.getQuestionAnswers().split(",")[0]);
                    }
                    else{
                        questionList.get(num).setQuestionResources(resources[0]);

                        tq.setQuestionSource(resources[0]);
                        tq.setQuestionAnswer(question.getQuestionAnswers().split(",")[0]);
                    }
                }
                teamquestionService.insertTeamquestion(tq);
            }
            else{
                Teamquestion tq = (Teamquestion) tqMap.get("teamquestion");
                questionList.get(num).setQuestionResources(tq.getQuestionSource());
                questionList.get(num).setQuestionAnswers(tq.getQuestionAnswer());
                questionList.get(num).setQuestionLinks(tq.getQuestionLink());
            }
        }

        //获得该场比赛该类型题目列表
        List<QuestionList> QuestionList = null;
        for(Questiontype questiontype : typeList) {
            for (QuestionList ques : questionList) {
                if(ques.getQuestionType().equals(questiontype.getQuestionType())){
                    if(map.containsKey(questiontype.getQuestionType())){
                        List<QuestionList> list = (List<QuestionList>)map.get(questiontype.getQuestionType());
                        list.add(ques);
                        map.put(questiontype.getQuestionType(), list);
                    }
                    else{
                        List<QuestionList> list = new LinkedList<>();
                        list.add(ques);
                        map.put(questiontype.getQuestionType(), list);
                    }
                }

            }
        }
        try {
            WebSocketController.sendInfoToUser(competitionId, userId,"questionList",map);
        } catch (IOException e) {
            System.out.println("发送单场比赛一种类型题目列表失败");
        }
    }
    //发送本队伍答题记录
    public void getMyteamRecord(int comppetitionId,int userId,int teamId){
        List<TeamRecord> list = recordDao.queryTeamRecordByTeamId(teamId);
        try {
            WebSocketController.sendInfoToUser(comppetitionId,userId,"submitRecord",list);
        } catch (IOException e) {
            System.out.println("发送队伍答题记录失败");
        }
    }
    //赛事页获得队伍排名
    public void getTeamScoreList(int competitionId,int userId){
        List<Team> list = teamService.getTeamScoreListByCompetitionId(competitionId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"teamList",list);
        } catch (IOException e) {
            System.out.println("发送队伍排名列表失败");
        }
    }
    //赛事页根据队伍id获得积分榜
    public void getTeamScoreListByTeamId(int competitionId,int userId,int teamId){
        List<TeamScoreList> list = scoreListDao.queryTeamScoreListByTeamId(teamId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"scoreList",list);
        } catch (IOException e) {
            System.out.println("根据队伍id查找队伍积分失败");
        }
    }
    //赛事通知websocket接口
    public void ListTipsByCompetitionId(int competitionId,int userId){
        List<Tips> list = tipsService.queryTipsListByCompetitionId(competitionId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"noticeList",list);
        } catch (IOException e) {
            System.out.println("发送该场比赛通知失败");
        }
    }
    //获得队伍答题通过情况
    public void ListTeamAcQuestion(int competitionId,int userId,int teamId){
        List<Record> list = recordDao.listAcQuestion(teamId);
        try {
            WebSocketController.sendInfoToUser(competitionId,userId,"acQuestionList",list);
        } catch (IOException e) {
            System.out.println("发送队伍通过题目情况失败");
        }
    }
    //判题
    public void judge(int competitionId,int questionId, String answer,int teamId,int userId){
        synchronized (this) {
            //如果比赛已经结束，则给所有人发送赛事结束通知 不能判题
            Competition competition = competitionService.queryCompetitionById(competitionId);
            if(competition.getEnd().after(new Date())) {
                Map<String, Object> returnMap = questionService.judgeForCompetition(questionId, answer, userId, teamId, competitionId);
                //答案正确
                if (returnMap.get("message") == "答案正确") {
                    //找到该队伍所有人
                    List<Teamcompetitor> teamCompetitorList = teamcompetitorService.queryTeamByTeamId(teamId);
                    //获取该队伍新的答题记录
                    List<TeamRecord> recordList = recordDao.queryTeamRecordByTeamId(teamId);
                    //获取该队伍新的通过题目数
                    List<Record> acQuestionList = recordDao.listAcQuestion(teamId);
                    //获取新的队伍总积分榜
                    List<Team> teamList = teamService.getTeamScoreListByCompetitionId(competitionId);
                    //该队伍各类型题目得分
                    List<TeamScoreList> scoreList = scoreListDao.queryTeamScoreListByTeamId(teamId);
                    for (Teamcompetitor teamcompetitor : teamCompetitorList) {
                        //向该队伍内的人发送新的答题记录
                        try {
                            //给该队伍成员发送提交记录
                            WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "submitRecord", recordList);
                            //给该队伍成员发送通过通过题目列表
                            WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "acQuestionList", acQuestionList);
                            //给该队伍成员发送该队各类型题目得分
                            WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "scoreList", scoreList);
                        } catch (IOException e) {
                            System.out.println("发送队伍答题记录失败");
                        }
                    }
                    //给该场比赛所有人发送新的队伍排名列表
                    try {
                        WebSocketController.sendInfoToUsers(competitionId, "teamList", teamList);
                    } catch (IOException e) {
                        System.out.println("发送队伍答题记录失败");
                    }
                }
                else {//答案错误
                    //找到该队伍所有人
                    List<Teamcompetitor> teamCompetitorList = teamcompetitorService.queryTeamByTeamId(teamId);
                    int teamCompetitiorId = teamCompetitorList.get(0).getTeamcompetitorId();
                    //获取该队伍新的答题记录
                    List<TeamRecord> list = recordDao.queryTeamRecordByTeamId(teamId);

                    for (Teamcompetitor teamcompetitor : teamCompetitorList) {
                        if(teamcompetitor.getUserId() == userId)
                            teamCompetitiorId = teamcompetitor.getTeamcompetitorId();
                        try {
                            //向该队伍内的人发送新的答题记录
                            WebSocketController.sendInfoToUser(competitionId, teamcompetitor.getUserId(), "submitRecord", list);
                        } catch (IOException e) {
                            System.out.println("发送队伍答题记录失败");
                        }
                    }
                    if(returnMap.get("message").toString().contains("封号")) {
                        //封号通知
                        Tips tips = new Tips();
                        tips.setCompetitionId(competitionId);
                        tips.setContent(returnMap.get("message").toString());
                        tips.setPublisher("admin");
                        tips.setTime(new Date());
                        tipsService.insertTips(tips);
                        //封号
                        //对抄袭选手进行封号
                        Teamcompetitor teamcompetitor = new Teamcompetitor();
                        teamcompetitor.setTeamcompetitorId(teamCompetitiorId);
                        teamcompetitor.setUserState(1);
                        teamcompetitorService.update(teamcompetitor);
                    }
                }
            }else{
                try {
                    WebSocketController.sendInfoToUsers(competition.getCompetitionId(),"finish","true");
                } catch (IOException e) {
                    System.out.println("发送比赛结束通知失败");
                }
            }
        }
    }
}
