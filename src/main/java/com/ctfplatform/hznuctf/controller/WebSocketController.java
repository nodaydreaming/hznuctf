package com.ctfplatform.hznuctf.controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint(value = "/websocket/{userId}/{competitionId}/{teamId}")
@Component
public class WebSocketController {
    //设置controller为静态
    private static ContestController contestController;
    //为静态对象注入
    @Autowired
    public void setContestController(ContestController contestController){
        WebSocketController.contestController = contestController;
    }

    //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;
    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static ConcurrentHashMap<Integer,ConcurrentHashMap> CompetitionMapSet = new ConcurrentHashMap<>();
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    /**
     * 连接建立成功调用的方法*/
    @OnOpen
    public void onOpen(@PathParam(value = "userId") Integer userId,
                       @PathParam(value = "competitionId") Integer competitionId,
                       @PathParam(value = "teamId") Integer teamId,
                       Session session) {
        ConcurrentHashMap<Integer,WebSocketController> AccountSessionSet = CompetitionMapSet.get(competitionId);  //获得该场比赛用户Socket列表对象
        if(AccountSessionSet == null) {
            AccountSessionSet = new ConcurrentHashMap<>();
        }
        this.session = session;
        AccountSessionSet.put(userId,this);     //加入set中
        CompetitionMapSet.put(competitionId,AccountSessionSet);   //重新存入新的对象
        addOnlineCount();           //在线数加1
        System.out.println("第"+competitionId+"场比赛有一新连接加入！"+"用户id为"+userId+"当前在线人数为" + getOnlineCount());
        //发送相关数据
        //获得题目类型
        contestController.getQuestiontypeBycompetitionId(competitionId,userId);
        //获得题目列表
        contestController.getQuestionInOneCompetition(competitionId, teamId, userId);
        //获得通过的题目列表
        contestController.ListTeamAcQuestion(competitionId,userId,teamId);
        //本队答题记录
        contestController.getMyteamRecord(competitionId,userId,teamId);
        //所有队伍积分榜
        contestController.getTeamScoreList(competitionId,userId);
        //通知列表
        contestController.ListTipsByCompetitionId(competitionId,userId);
        //本队积分榜Echarts图
        contestController.getTeamScoreListByTeamId(competitionId,userId,teamId);
    }




    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(@PathParam(value = "competitionId") Integer competitionId) {
        ConcurrentHashMap<Integer,WebSocketController> AccountSessionSet = CompetitionMapSet.get(competitionId);
        if(AccountSessionSet != null){
            if(AccountSessionSet.size() > 0){
                AccountSessionSet.remove(this);  //从set中删除
                CompetitionMapSet.put(competitionId,AccountSessionSet);
                subOnlineCount();           //在线数减1
                System.out.println("第"+competitionId+"场比赛有一连接关闭！当前该场比赛在线人数为" + getOnlineCount());
            }
        }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息*/
    @OnMessage
    public void onMessage(String message,@PathParam(value = "userId") Integer userId,@PathParam(value = "teamId") Integer teamId){
        JSONObject jo = JSONObject.fromObject(message);
        if(jo.get("submit") != null){
            JSONObject submitText = JSONObject.fromObject(jo.get("submit"));
            int competitionId = (Integer) submitText.get("competitionId");
            int questionId = (Integer) submitText.get("questionId");
            String answer = (String) submitText.get("answer");
            contestController.judge(competitionId, questionId, answer, teamId, userId);
        }
        if(jo.get("getTeamScore") != null){
            JSONObject getTeamScoreText = JSONObject.fromObject(jo.get("getTeamScore"));
            int competitionId = (Integer) getTeamScoreText.get("competitionId");
            int queryTeamId = (Integer) getTeamScoreText.get("teamId");
            contestController.getTeamScoreListByTeamId(competitionId,userId,queryTeamId);
        }
    }

    /**
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }



    public void sendMessage(String message,Object datas) throws IOException {
        JSONObject result = new JSONObject();
        result.put("message", message);
        result.put("datas", datas);
        this.session.getBasicRemote().sendText(result.toString());
    }

    /**
     * 群发自定义消息
     * */
    public static void sendInfoToUsers(int competitionId,String message, Object datas) throws IOException {
        ConcurrentHashMap<Integer,WebSocketController> AccountSessionSet = CompetitionMapSet.get(competitionId);
        if(AccountSessionSet != null){
            for (Integer key : AccountSessionSet.keySet()) {
                //先判断用户是否在线 防止出现session
                if(AccountSessionSet.get(key).session.isOpen()) {
                    AccountSessionSet.get(key).sendMessage(message, datas);
                }
            }
        }
    }
    /**
     * 单发自定义消息
     * */
    public static void sendInfoToUser(int competitionId, int userId, String message, Object datas) throws IOException {
        ConcurrentHashMap<Integer,WebSocketController> AccountSessionSet = CompetitionMapSet.get(competitionId);
//        AccountSessionSet = CompetitionMapSet.get(competitionId);
        if(AccountSessionSet != null) {
            for (Integer key : AccountSessionSet.keySet()) {
                if (key.equals(userId)) {
                    if(AccountSessionSet.get(key).session.isOpen()) {
                        AccountSessionSet.get(key).sendMessage(message, datas);
                        break;
                    }
                }
            }
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketController.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketController.onlineCount--;
    }

}
