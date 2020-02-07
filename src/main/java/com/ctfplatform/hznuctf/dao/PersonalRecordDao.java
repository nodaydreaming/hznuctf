package com.ctfplatform.hznuctf.dao;

import com.ctfplatform.hznuctf.entity.PersonalRecord;

import java.util.List;

public interface PersonalRecordDao {
    List<PersonalRecord> queryPersonalRecordByuserId(int userId);
    List<PersonalRecord> getGradeByuserId(int userId);
}
