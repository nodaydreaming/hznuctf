package com.ctfplatform.hznuctf.service;

import com.ctfplatform.hznuctf.entity.PersonalRecord;

import java.util.List;

public interface PersonalRecordService {
    List<PersonalRecord> queryPersonalRecordByuserId(int userId);
}
