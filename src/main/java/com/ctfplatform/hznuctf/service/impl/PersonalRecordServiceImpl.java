package com.ctfplatform.hznuctf.service.impl;

import com.ctfplatform.hznuctf.dao.PersonalRecordDao;
import com.ctfplatform.hznuctf.dao.QuestionDao;
import com.ctfplatform.hznuctf.dao.QuestiontypeDao;
import com.ctfplatform.hznuctf.entity.PersonalRecord;
import com.ctfplatform.hznuctf.entity.Question;
import com.ctfplatform.hznuctf.entity.Questiontype;
import com.ctfplatform.hznuctf.service.PersonalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonalRecordServiceImpl implements PersonalRecordService {
    @Autowired
    private PersonalRecordDao personalRecordDao;
    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private QuestiontypeDao questiontypeDao;

    @Override
    public List<PersonalRecord> queryPersonalRecordByuserId(int userId) {
        List<Questiontype> QuestiontypeList = questiontypeDao.ListQuestiontype();   //搜索所有题目类型
        List<PersonalRecord> list = personalRecordDao.queryPersonalRecordByuserId(userId);  //搜索目前已有的个人信息记录
        List<PersonalRecord> GradeList = personalRecordDao.getGradeByuserId(userId);
        for (Questiontype questiontype : QuestiontypeList) {
            int flag = 0;  //标记是否有找到该类型题目个人信息
            for (PersonalRecord personalRecord : list) {
                if ((questiontype.getQuestionType()).equals(personalRecord.getQuestionType())) {  //找到
                    for(PersonalRecord gradePersonalList : GradeList){
                        if(gradePersonalList.getTypeId().equals(personalRecord.getTypeId())){      //单独找到通过数和得分 由于该两类需要去重 同一题通过重复提交不重复算
                            personalRecord.setAcNum(gradePersonalList.getAcNum());
                            personalRecord.setGrade(gradePersonalList.getGrade());
                        }
                    }
                    List<Question> list2 = questionDao.queryQuestionBytypeId(questiontype.getTypeId());
                    personalRecord.setThisTypeQuestionNum(list2.size());
                    personalRecord.setRate((double)Math.round(personalRecord.getAcNum()*1.0/list2.size()*100));
                    flag = 1;        //标记
                    break;
                }
            }
            if (flag == 0) {    //遍历了个人记录页都没有找到
                PersonalRecord personalRecord = new PersonalRecord();
                personalRecord.setQuestionType(questiontype.getQuestionType());
                List<Question> list2 = questionDao.queryQuestionBytypeId(questiontype.getTypeId());
                personalRecord.setThisTypeQuestionNum(list2.size());
                personalRecord.setRate(0.0);
                personalRecord.setAcNum(0);
                personalRecord.setSubNum(0);
                personalRecord.setGrade(0.0);
                personalRecord.setTypeId(questiontype.getTypeId());
                list.add(personalRecord);         //增加记录
            }
        }
        return list;
    }
}
