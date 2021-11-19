package com.ctfplatform.hznuctf.config;

import com.ctfplatform.hznuctf.controller.WebSocketController;
import com.ctfplatform.hznuctf.dao.CompetitionDao;
import com.ctfplatform.hznuctf.entity.Competition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Component
@Configuration  //标记配置类 兼备Component效果
@EnableScheduling //开启定时任务
public class StaticScheduleTask {
    @Autowired
    private CompetitionDao competitionDao;
    @Scheduled(cron = "0 2 22,23,0 * * ?")
    private void configureTasks(){
        //每天22，23，0点02分 给结束的比赛选手退出
        List<Competition> list = competitionDao.ListCompetition();
        for(Competition competition:list){
            if(new Date().after(competition.getEnd())){
                try {
                    WebSocketController.sendInfoToUsers(competition.getCompetitionId(),"finish","true");
                } catch (IOException e) {
                    System.out.println("发送比赛结束通知失败");
                }
            }
        }
    }
}
