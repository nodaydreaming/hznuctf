package com.ctfplatform.hznuctf.controller;

import com.ctfplatform.hznuctf.dao.CompetitorDao;
import com.ctfplatform.hznuctf.dao.QuestionDao;
import com.ctfplatform.hznuctf.entity.*;
import com.ctfplatform.hznuctf.service.QuestionService;
import com.ctfplatform.hznuctf.service.TeamcompetitorService;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Teamcompetitor")
public class TeamcompetitorController {
    @Autowired
    private TeamcompetitorService teamcompetitorService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CompetitorDao competitorDao;
    @Autowired
    private QuestionDao questionDao;

    @RequestMapping(value = "/ListTeamcompetitor", method = RequestMethod.POST)
    private Map<String,Object> ListTeamcompetitor(){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Teamcompetitor> list = teamcompetitorService.ListTeamcompetitor();
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("Teamcompetitor",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    @RequestMapping(value = "/ListCompetitor",method = RequestMethod.POST)
    private Map<String,Object> ListCompetitor(int competitionId){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        List<Competitor> list = competitorDao.listCompetitorByCompetitionId(competitionId);
        if(list.size()>0){
            modelMap.put("status","success");
            modelMap.put("teamcompetitorList",list);
        }else{
            modelMap.put("status","error");
            modelMap.put("message","未找到信息");
        }
        return modelMap;
    }

    //增加
    @RequestMapping(value = "/insert",method = RequestMethod.POST)
    private Map<String,Object> insert(String invitationCode, HttpServletRequest request){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        User user = new User();
        user = (User) request.getSession().getAttribute("user");
        if(user != null) {
            int userId = user.getUserId();
            returnMap = teamcompetitorService.insert(userId, invitationCode);
            if (returnMap.get("message") == null) {
                modelMap.put("status", "success");
                modelMap.put("message","成功加入该队伍");
            } else {
                modelMap.put("status", "error");
                modelMap.put("message", returnMap.get("message"));
            }
        }else{
            modelMap.put("status", "error");
            modelMap.put("message", "用户未登录");
        }
        return modelMap;
    }

    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    private Map<String,Object> delete(Teamcompetitor teamcompetitor){
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = teamcompetitorService.delete(teamcompetitor);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
            modelMap.put("message","成功踢出该队员");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/update",method = RequestMethod.POST)
    private Map<String,Object> update(Teamcompetitor teamcompetitor) throws IOException {
        Map<String,Object> modelMap = new HashMap<String,Object>();
        Map<String,Object> returnMap = new HashMap<String,Object>();
        returnMap = teamcompetitorService.update(teamcompetitor);
        if(returnMap.get("message") == null){
            modelMap.put("status","success");
        }else{
            modelMap.put("status","error");
            modelMap.put("message",returnMap.get("message"));
        }
        return modelMap;
    }

    @RequestMapping(value = "/exportTranscript",method = RequestMethod.GET)
    private void exportTranscript(int competitionId, HttpServletResponse response) throws IOException {
        List<Question> questionList = questionService.ListQuestionByCompetitionId(competitionId);
        //设置表格表头
        List<String> header = new ArrayList<>();
        header.add("队名");
        header.add("选手姓名");
        header.add("选手分值");
        header.add("队伍分值");
        for(int i = 0; i < questionList.size(); i++){
            header.add(questionList.get(i).getQuestionTitle());
        }
        header.add("答题情况");
        // 声明一个工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        // 生成一个表格，设置表格名称为"成绩表"
        HSSFSheet sheet = workbook.createSheet("成绩表");
        // 设置表格列宽度为10个字节
        sheet.setDefaultColumnWidth(10);
        // 创建第一行表头
        HSSFRow headrow = sheet.createRow(0);
        // 填充表头
        for (int i = 0; i < header.size(); i++) {
            //创建一个单元格
            HSSFCell cell = headrow.createCell(i);
            //创建一个内容对象
            HSSFRichTextString text = new HSSFRichTextString(header.get(i));
            //将内容对象的文字内容写入到单元格中
            cell.setCellValue(text);
        }
        List<ExportCompetitorData> exportList = competitorDao.ListExportData(competitionId);
        for (int i = 0; i < exportList.size(); i++) {
            // 建立新的一行
            HSSFRow hssfRow = sheet.createRow(i+1);
            // 填充队名
            HSSFCell hssfCell = hssfRow.createCell(0);
            HSSFRichTextString text = new HSSFRichTextString(exportList.get(i).getTeamName());
            hssfCell.setCellValue(text);
            // 填充选手姓名
            hssfCell = hssfRow.createCell(1);
            text = new HSSFRichTextString(exportList.get(i).getUserName());
            hssfCell.setCellValue(text);
            // 填充选手分值
            hssfCell = hssfRow.createCell(2);
            text = new HSSFRichTextString(exportList.get(i).getScore().toString());
            hssfCell.setCellValue(text);
            // 填充队伍分值
            hssfCell = hssfRow.createCell(3);
            text = new HSSFRichTextString(exportList.get(i).getTeamPoint().toString());
            hssfCell.setCellValue(text);
            // 获得选手答题数
            List<AcQuestion> acQuestionList = questionDao.ListAcQuestionByUserIdAndCompetitionId(competitionId,exportList.get(i).getUserId());
            String acQuestionStr = "";
            for (int j = 0; j < questionList.size(); j++) {
                int flag = 0;
                for (int k = 0; k < acQuestionList.size(); k++){
                    // 如果列表内一题和做出的题目一样
                    if (acQuestionList.get(k).getQuestionId().equals(questionList.get(j).getQuestionId())) {
                        hssfCell = hssfRow.createCell(4+j);
                        text = new HSSFRichTextString(acQuestionList.get(k).getAnswerGetPoint().toString());
                        hssfCell.setCellValue(text);
                        acQuestionStr += acQuestionList.get(k).getQuestionTitle() + " ";
                        // 标志填充过
                        flag = 1;
                        break;
                    }
                }
                // 从未填充过,即选手未做过该题目
                if (flag == 0) {
                    hssfCell = hssfRow.createCell(4+j);
                    text = new HSSFRichTextString(null);
                    hssfCell.setCellValue(text);
                }
            }
            hssfCell = hssfRow.createCell(4+questionList.size());
            text = new HSSFRichTextString(acQuestionStr);
            hssfCell.setCellValue(text);
        }
        //准备将Excel的输出流通过response输出到页面下载
        //八进制输出流
        response.setContentType("application/octet-stream");

        //这后面可以设置导出Excel的名称，此例中名为student.xls
        response.setHeader("Content-disposition", "attachment;filename=grade.xls");

        //刷新缓冲
        response.flushBuffer();

        //workbook将Excel写入到response的输出流中，供页面下载
        workbook.write(response.getOutputStream());
    }
}
