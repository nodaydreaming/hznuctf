/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : hznuctf

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2020-03-17 00:29:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_account` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_tel` varchar(255) NOT NULL,
  `admin_image` varchar(255) DEFAULT NULL,
  `admin_nickname` varchar(255) DEFAULT NULL,
  `admin_state` int(3) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `admin_nickname` (`admin_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396567238', '/hznuctf/upload/adminPhoto/20200207161959619833中心服卡通人物.jpg', 'Admin', '0', '超级管理员');
INSERT INTO `admin` VALUES ('2', 'admin001', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '18737586075', '/hznuctf/upload/adminPhoto/20200315175308588832desktop_bg.jpeg', 'admin001', '1', '一般管理员');

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `carousel_id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `isSelected` int(3) NOT NULL,
  `intro` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`carousel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('69', '/hznuctf/upload/carousel/2020031422171981628722.png', '1', null);
INSERT INTO `carousel` VALUES ('70', '/hznuctf/upload/carousel/2020031422171983851411.png', '1', null);
INSERT INTO `carousel` VALUES ('71', '/hznuctf/upload/carousel/2020031422191442998820200207161311472087u=2120665580,1303044009&fm=26&gp=0.jpg', '1', null);

-- ----------------------------
-- Table structure for competition
-- ----------------------------
DROP TABLE IF EXISTS `competition`;
CREATE TABLE `competition` (
  `competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `createtime` datetime NOT NULL,
  `canregister` int(3) NOT NULL,
  `isteam` int(3) NOT NULL,
  `competition_number` varchar(255) NOT NULL,
  `holder` varchar(255) NOT NULL,
  `intro` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `target` text NOT NULL,
  `plan` text NOT NULL,
  `rule` text NOT NULL,
  `reward` text NOT NULL,
  `registration` text NOT NULL,
  `publisher` varchar(255) NOT NULL,
  PRIMARY KEY (`competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of competition
-- ----------------------------
INSERT INTO `competition` VALUES ('3', '10月09日比赛', '2019-10-09 14:00:00', '2019-10-09 17:00:00', '2019-10-08 19:19:53', '1', '1', 'HZNU_02', '信息安全实验室', '信息安全实验室', '', '信息安全实验室', '信息安全实验室', '1.决赛期间所用的电脑需要选手自带，相应的解题工具自备，可以携带参考资料。\n2.决赛参赛队员需携带学生证或身份证参赛，迟到30分钟将取消比赛资格。\n3.决赛期间，只提供内网，选手需通过内网进入比赛平台。\n4.决赛期间，禁止选手携带任何通讯设备，除队友外不准交头接耳，保证做题的独立性。\n5.赛场保证绝对安静整洁，若有大声喧哗，不服从工作人员管理，干扰他人比赛者，都将剥夺其比赛资格。\n6.决赛结束后，需要尽快提交自己的解题报告writeup。\n7.比赛期间，禁止任何对比赛平台的暴力破解和攻击，禁止使用扫描器等，违规者将取消比赛资格。', '信息安全实验室', '信息安全实验室', '昵称');
INSERT INTO `competition` VALUES ('5', '20191218网络安全实践考核', '2019-12-18 09:45:00', '2019-12-27 12:10:00', '2019-12-15 14:44:13', '1', '1', 'security_00', '刘雪娇老师', '2019年12月18日网络安全实践课程考核', '', '学生', '开始时间：2019年12月18日09:45\n结束时间：2019年12月18日12:10\n比赛网址：http://172.22.236.10:8080/hznuctf/competition/html/login.html', '1.决赛期间所用的电脑需要选手自带，相应的解题工具自备，可以携带参考资料。\n2.决赛期间，只提供内网，选手需通过内网进入比赛平台。\n3.决赛期间，除队友外不准交头接耳，保证做题的独立性。\n4.赛场保证绝对安静整洁，若有大声喧哗，不服从工作人员管理，干扰他人比赛者，都将剥夺其比赛资格。\n5.比赛期间，禁止任何对比赛平台的暴力破解和攻击，禁止使用扫描器等，违规者将取消比赛资格。', '无', '线上报名', '闻舟');
INSERT INTO `competition` VALUES ('6', '毕业设计系统演示比赛', '2020-03-15 00:00:00', '2020-05-31 23:59:59', '2020-03-15 16:01:35', '1', '1', 'HZNUCTF_GYJ', 'GYJ', '计算机科学与技术163班，郭亚杰，2016210402076\n该比赛仅供毕业设计系统演示使用！！！', '/hznuctf/upload/CompetitionImage/202003151601346102632020031422171983851411.png', '该比赛仅供毕业设计系统演示使用！！！', '该比赛仅供毕业设计系统演示使用！！！', '1.决赛期间所用的电脑需要选手自带，相应的解题工具自备，可以携带参考资料。\n2.决赛参赛队员需携带学生证或身份证参赛，迟到30分钟将取消比赛资格。\n3.决赛期间，只提供内网，选手需通过内网进入比赛平台。\n4.决赛期间，禁止选手携带任何通讯设备，除队友外不准交头接耳，保证做题的独立性。\n5.赛场保证绝对安静整洁，若有大声喧哗，不服从工作人员管理，干扰他人比赛者，都将剥夺其比赛资格。\n6.决赛结束后，需要尽快提交自己的解题报告writeup。\n7.比赛期间，禁止任何对比赛平台的暴力破解和攻击，禁止使用扫描器等，违规者将取消比赛资格。', '辣条一包，可乐一瓶！', '网站自主报名。', 'Admin');

-- ----------------------------
-- Table structure for competitionadmin
-- ----------------------------
DROP TABLE IF EXISTS `competitionadmin`;
CREATE TABLE `competitionadmin` (
  `competitionadmin_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`competitionadmin_id`),
  KEY `competitionadmin_ibfk_1` (`competition_id`),
  KEY `competitionadmin_ibfk_2` (`admin_id`),
  CONSTRAINT `competitionadmin_ibfk_1` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `competitionadmin_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of competitionadmin
-- ----------------------------

-- ----------------------------
-- Table structure for competitionquestion
-- ----------------------------
DROP TABLE IF EXISTS `competitionquestion`;
CREATE TABLE `competitionquestion` (
  `competitionquestion_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `is_unlocked` int(11) NOT NULL,
  PRIMARY KEY (`competitionquestion_id`),
  KEY `competitionquestion_ibfk_1` (`competition_id`),
  KEY `competitionquestion_ibfk_2` (`question_id`),
  CONSTRAINT `competitionquestion_ibfk_1` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `competitionquestion_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of competitionquestion
-- ----------------------------
INSERT INTO `competitionquestion` VALUES ('87', '6', '34', '1');
INSERT INTO `competitionquestion` VALUES ('88', '6', '35', '1');
INSERT INTO `competitionquestion` VALUES ('89', '6', '36', '1');
INSERT INTO `competitionquestion` VALUES ('90', '6', '37', '1');
INSERT INTO `competitionquestion` VALUES ('91', '6', '38', '1');

-- ----------------------------
-- Table structure for generalrecord
-- ----------------------------
DROP TABLE IF EXISTS `generalrecord`;
CREATE TABLE `generalrecord` (
  `generalRecord_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_time` datetime NOT NULL,
  `answer_body` varchar(255) NOT NULL,
  `answer_result` int(3) NOT NULL,
  `answer_get_point` double(11,2) NOT NULL,
  PRIMARY KEY (`generalRecord_id`),
  KEY `generalRecord_ibfk_1` (`user_id`),
  KEY `generalRecord_ibfk_2` (`question_id`),
  CONSTRAINT `generalRecord_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `generalRecord_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of generalrecord
-- ----------------------------
INSERT INTO `generalrecord` VALUES ('1', '11', '24', '2020-03-16 16:59:08', 'flag{hznuctf2019}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('3', '11', '25', '2020-03-16 16:59:45', 'flag{gakki}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('4', '11', '29', '2020-03-16 17:00:25', 'flag{NIASPSSWAAI}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('5', '11', '33', '2020-03-16 17:00:57', 'flag{Network_security_is_important}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('6', '11', '27', '2020-03-16 17:01:44', 'flag{hell0_w0rld}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('7', '113', '25', '2020-03-16 17:03:18', 'flag{gakki}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('8', '113', '33', '2020-03-16 17:03:42', 'flag{Network_security_is_important}', '1', '100.00');
INSERT INTO `generalrecord` VALUES ('9', '114', '25', '2020-03-16 17:41:26', 'flag{gakki}', '1', '100.00');

-- ----------------------------
-- Table structure for highlight
-- ----------------------------
DROP TABLE IF EXISTS `highlight`;
CREATE TABLE `highlight` (
  `highlight_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `highlight_intro` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `image_intro` varchar(255) NOT NULL,
  `forGrade` int(3) NOT NULL,
  PRIMARY KEY (`highlight_id`),
  KEY `highlight_ibfk_1` (`competition_id`),
  CONSTRAINT `highlight_ibfk_1` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of highlight
-- ----------------------------

-- ----------------------------
-- Table structure for information
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `information_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `information_title` varchar(255) NOT NULL,
  `information_detail` varchar(255) NOT NULL,
  `information_createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `information_summary` varchar(255) NOT NULL,
  `forCompetition` int(3) NOT NULL,
  PRIMARY KEY (`information_id`),
  KEY `information_ibfk_1` (`admin_id`),
  CONSTRAINT `information_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('10', '1', '2020.03.14公告', '系统演示数据准备，公告准备，系统轮播图，管理员账号，用户账号注册。', '2020-03-14 22:17:01', '系统演示数据准备', '0');
INSERT INTO `information` VALUES ('11', '1', '2020.03.15公告', '继续准备系统演示所需数据，准备公开题库的web题目访问链接，以及解题功能的测试和修改。', '2020-03-15 14:52:58', '系统演示数据准备', '0');

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_title` varchar(255) NOT NULL,
  `question_typeid` int(11) NOT NULL,
  `question_body` text,
  `question_resources` varchar(255) NOT NULL,
  `question_script` varchar(255) DEFAULT NULL,
  `question_links` varchar(255) DEFAULT NULL,
  `question_answers` text NOT NULL,
  `question_createtime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `question_author` varchar(255) DEFAULT NULL,
  `question_point` double(11,2) NOT NULL,
  `question_decrease` double(11,2) NOT NULL,
  `question_additional` double(11,2) NOT NULL,
  `question_level` int(11) DEFAULT NULL,
  `to_who` int(3) NOT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `question_ibfk_1` (`question_typeid`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`question_typeid`) REFERENCES `questiontype` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('24', '猪年吉祥', '4', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314231504432465猪年吉祥.png,', '', '', 'v5tWfHE3kDaSW2WS8orAnfUfppCKo4g8KdnLIlldyX0TTJbU+XmzGu4JdyGrqhkdk+0MTfrR8AqBMNJOu0kZXrgYv1U5M85FmEjUZNg4sKhTN4gndVdTSp+t5aRth9KI/2bxr4WDB2dsi0fgmZRxLGEuOn3TpCUrnJgS2LEsSOs=', '2020-03-14 23:15:06', 'admin', '100.00', '100.00', '500.00', '10', '0', '1');
INSERT INTO `question` VALUES ('25', 'goddess', '2', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314232414656887goddess.png,', '', '', 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=', '2020-03-14 23:24:25', 'admin', '100.00', '100.00', '500.00', '30', '0', '1');
INSERT INTO `question` VALUES ('26', '密集恐惧症', '2', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314232507824485密集恐惧症（暗号：4。8。11。15。16）.txt,', '', '', 'cEbWCj4PZNzRxzH93agTo9tptm6JZGDi/qtRs0kgvxFtcmauiM1qxtXQfFMa+HCp/0NpiJKJbsRPcfI3GdjL55PvOPBI7LYLaMv75H3D4mJn+RYlH6JVIKEyCg2gNkeGpUkRmDk+wcD/tKV4qZf8KNmJb8StnApr4q+W6B+a+ks=', '2020-03-16 17:35:42', 'admin', '100.00', '100.00', '500.00', '30', '0', '1');
INSERT INTO `question` VALUES ('27', '算法分析', '3', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314232708873347reverse.exe,', '', '', 'UUXafUIAwfHosrXQAUHVqwZmAG33IWZDuDGGHjcnh7jR8H+YUkyyuG4YncUcXvZi7r8bCo7v2x6fmTlc339+y79Dvb1jmCptMLsix/juq1zN9QWXY0+zTDwHSEfT7qMoLc/ZwQ6mjBXggNtmOc3e3j0QtohVFUW2fcaMgz8KGqQ=', '2020-03-14 23:27:19', 'admin', '100.00', '100.00', '500.00', '40', '0', '1');
INSERT INTO `question` VALUES ('28', '管理员密码', '4', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314232811933911管理员密码.txt,', '', '', 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=', '2020-03-14 23:28:22', 'admin', '100.00', '100.00', '500.00', '80', '0', '1');
INSERT INTO `question` VALUES ('29', '英语四级考试', '4', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314232902837583英语四级考试.txt,', '', '', 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=', '2020-03-14 23:29:11', 'admin', '100.00', '100.00', '500.00', '60', '0', '1');
INSERT INTO `question` VALUES ('30', '无法识别', '2', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314233125468592无法识别.zip,', '', '', 'H4A6TT/U48QPOeJNBcjf8VsjOAI8lI6NynhRsSRf5ucKUj9j7RcyVyqqftlcjZyyGC4A64tFsxX/zZBxouMxBZtG+rvxvEhEDup2lt2az/zFZkMEIepewTP3axXqQhSNzOgapVbBEOt17f9vJnqW8U7DG1A+gYNcnE/4YjPB0yc=', '2020-03-14 23:31:35', 'admin', '100.00', '100.00', '500.00', '80', '0', '1');
INSERT INTO `question` VALUES ('31', '解方程', '3', '杭州师范大学第一届CTF竞赛题目。', '/hznuctf/upload/problemResource/20200314233246852470Equations,', '', '', 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=', '2020-03-14 23:32:47', 'admin', '100.00', '100.00', '500.00', '60', '0', '1');
INSERT INTO `question` VALUES ('33', '简单的逆向题', '3', '2019.12.18 网络安全实践课程考核题目。', '/hznuctf/upload/problemResource/20200315174935317078easy_re.zip,', '', '', 'ruoQNmnYAsula7tmcEGoYVAduNYKHqU1reTQiF5uVdjQSsCOfqZUlF6yUpGAaULe/wDuMjKSUXoioTV9HCjG9+evB0NWG+NeOBfZh7pIE6XSX70q/QcHmuzq+tubhjdYlWFKC2hcjd81MGl+Pn3y4TskBbFMHz8X4vc70cVq5vU=', '2020-03-15 17:49:48', 'admin', '100.00', '100.00', '500.00', '30', '0', '1');
INSERT INTO `question` VALUES ('34', '能不能再快一点？', '1', '毕业设计系统演示web题目一', '', '', '192.168.99.102:10001/web0a125/index.php,192.168.99.102:10200/web0a125/index.php,192.168.99.102:10100/web0a125/index.php,192.168.99.102:10010/web0a125/index.php,192.168.99.102:10000/web0a125/index.php,', 'bhCegQZCimntsRVm6IhhpaZ+9pTKgwWovWGt8apet1DliVSJ3Erno+MD1dzXKVn7h77Eu6yud62DCRKUJ8r21gTwQU86p5gLo1731ekpbjJBRZpBfGqRRWvrOi6E/vG3WGuZe/8vjI0h4VRntfh31h3NBoWV6Z7NIf8MgiIqOYU=,dSKRlMCbONLTTHgi6/IKzRhWV1V3vf9boq5cNBIZmrSb4yKBZm1KOkrnvPUducT1WEe1WVqYNstoPKEhzktz9OGKJPrc4ikEj3uYpT12vi1kqYY+W/urc2GJbynHanh089AEnzwGC+vLEcTcTNTMySCL9k8RAoEH9cr3C7v1zb4=,LoDObhgOlJqKaWOsXAs2Z8/GJA10g3U6Zp1UsFCUXotgGjXKk04BzWqaqBYFlLE29iHbkWaLb+LGvMcPyrGe06DGmbb6BXqO5l9O8NTffubRqdCVZpFEkhvqG9xlbMOF39ooPy9bNEEGqjLHAcVC8TGuzAmtoch1yGcRhL+Bee8=,W5Nbj85JF3u6XfnLULEOpLTIABX1HMDEu48w+lFUrXnWP7IyhZgOtmxnCAWP6pHT9TcAgE9+WprfShWEp/diyAWXI36lf74EmSeG3GnVORf4O+Oihe8qyr0X3dQdndRD/NEjjL1znZ5Dc2Tggf2ycr/H33kYLU2YrnCqmjHkziA=,eXuklXXTJRjKGvdTklfAOqfxs5BpL/CuNcReOz6VT1BTF3y2i56UEwoWVQ7ZH6ck1a6/MoGpCzWhwiZY1JxTrsbLL3C4P5alANgs+51RpJYvTrLJ9n5EtUJnjOtcdfmpzX9WT8ayXcVS5ZtZu5m60OYIQ2Cps0lDOgyL3MPHcfA=', '2020-03-16 22:58:43', 'admin', '100.00', '100.00', '100.00', '30', '1', '5');
INSERT INTO `question` VALUES ('35', 'goddess', '2', '毕业设计系统演示题目。', '/hznuctf/upload/problemResource/20200315224218622966goddess.png,', '', '', 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=', '2020-03-16 20:20:18', 'admin', '100.00', '100.00', '100.00', '30', '1', '5');
INSERT INTO `question` VALUES ('36', '英语四级考试', '4', '毕业设计系统演示题目。', '/hznuctf/upload/problemResource/20200316193557127783英语四级考试.txt,', '', '', 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=', '2020-03-16 21:59:16', 'admin', '100.00', '100.00', '200.00', '30', '1', '4');
INSERT INTO `question` VALUES ('37', '解方程', '3', '毕业设计系统演示题目。', '/hznuctf/upload/problemResource/20200316193743342284Equations,', '', '', 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=', '2020-03-16 19:37:54', 'admin', '100.00', '100.00', '500.00', '60', '1', '1');
INSERT INTO `question` VALUES ('38', '管理员密码', '4', '毕业设计系统演示题目。', '/hznuctf/upload/problemResource/20200316193839529185管理员密码.txt,', '', '', 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=', '2020-03-16 19:52:47', 'admin', '100.00', '100.00', '400.00', '80', '1', '2');

-- ----------------------------
-- Table structure for questiontype
-- ----------------------------
DROP TABLE IF EXISTS `questiontype`;
CREATE TABLE `questiontype` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_type` varchar(255) NOT NULL,
  `type_intro` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of questiontype
-- ----------------------------
INSERT INTO `questiontype` VALUES ('1', 'Web', 'web类型，即题目会涉及到常见的Web漏洞，诸如注入、XSS、文件包含、代码执行等漏洞。');
INSERT INTO `questiontype` VALUES ('2', 'Misc', 'MiscMiscellaneous)类型，即安全杂项，题目或涉及流量分析、电子取证、人肉搜索、数据分析等。');
INSERT INTO `questiontype` VALUES ('3', '逆向', '逆向工程，题目涉及到软件逆向、破解技术。');
INSERT INTO `questiontype` VALUES ('4', '密码', '密码学，题目考察各种加解密技术，包括古典加密技术、现代加密技术甚至出题者自创加密技术。');
INSERT INTO `questiontype` VALUES ('5', 'sql注入', '跳过检验，执行SQL语句，获取对数据库的信息以及提权，发生SQL注入攻击。');
INSERT INTO `questiontype` VALUES ('6', 'pwn', 'PWN类型，PWN在黑客俚语中代表着攻破、取得权限，多为溢出类题目。');
INSERT INTO `questiontype` VALUES ('7', '文件上传', '越过其本身权限向服务器上上传可执行的动态脚本文件。');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `answer_time` datetime NOT NULL,
  `answer_body` varchar(255) NOT NULL,
  `answer_result` int(3) NOT NULL,
  `answer_get_point` double(11,2) NOT NULL,
  `record_body` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `record_ibfk_1` (`competition_id`),
  KEY `record_ibfk_2` (`question_id`),
  KEY `record_ibfk_3` (`team_id`),
  KEY `record_ibfk_4` (`user_id`),
  CONSTRAINT `record_ibfk_1` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_ibfk_3` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('1', '6', '35', '74', '114', '2020-03-16 15:49:37', 'flag{gakki}', '1', '600.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('3', '6', '35', '74', '114', '2020-03-16 15:54:35', 'flag{gakki}', '1', '100.00', '此题已经通过，队伍积分不再增加');
INSERT INTO `record` VALUES ('4', '6', '35', '74', '114', '2020-03-16 15:55:19', 'flag{gakki}', '1', '100.00', '此题已经通过，队伍积分不再增加');
INSERT INTO `record` VALUES ('5', '6', '34', '73', '113', '2020-03-16 15:57:48', 'flag{wr!teb_5cd5rip45t3_1s0ldve_prob1em}', '1', '600.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('8', '6', '35', '73', '113', '2020-03-16 17:06:07', 'flag{gakki}', '1', '500.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('9', '6', '36', '74', '114', '2020-03-16 19:51:43', 'flag{NIASPSSWAAI}', '1', '600.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('10', '6', '36', '75', '120', '2020-03-16 19:52:26', 'flag{NIASPSSWAAI}', '1', '500.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('11', '6', '38', '75', '120', '2020-03-16 19:52:47', 'flag{NASBJA4PMVPKZXCXKCTF}', '1', '600.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('12', '6', '35', '75', '120', '2020-03-16 19:53:00', 'flag{gakki}', '1', '400.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('13', '6', '34', '76', '117', '2020-03-16 20:18:11', 'flag{wr!teb_5cd5rip45t3_1s0ldve_prob1em}', '0', '0.00', '涉嫌抄袭其他队伍答案，答题选手已被封号！');
INSERT INTO `record` VALUES ('14', '6', '34', '76', '117', '2020-03-16 20:18:40', 'flag{wr!teb_5cd5rip45t3_1s0ldve_prob1em}', '0', '0.00', '涉嫌抄袭其他队伍答案，答题选手已被封号！');
INSERT INTO `record` VALUES ('15', '6', '35', '76', '117', '2020-03-16 20:20:19', 'flag{gakki}', '1', '300.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('16', '6', '36', '73', '116', '2020-03-16 21:59:16', 'flag{NIASPSSWAAI}', '1', '400.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('17', '6', '34', '76', '117', '2020-03-16 22:00:20', 'flag{wr!teb_5cd5rip45t3_1s0ldve_prob1em}', '0', '0.00', '涉嫌抄袭其他队伍答案，答题选手已被封号！');
INSERT INTO `record` VALUES ('19', '6', '34', '75', '120', '2020-03-16 22:46:14', 'flag{w6r!1tea_854cript_cs0l9ve9_prob1em}', '1', '500.00', '恭喜通过此题，继续加油吧！');
INSERT INTO `record` VALUES ('22', '6', '34', '74', '114', '2020-03-16 22:57:30', 'flag{w6r!1tea_854cript_cs0l9ve9_prob1em}', '0', '0.00', '涉嫌抄袭其他队伍答案，答题选手已被封号！');
INSERT INTO `record` VALUES ('23', '6', '34', '74', '114', '2020-03-16 22:58:43', 'flag{wr!te_5cri77p2t_s69c0lve_proebd1em}', '1', '300.00', '恭喜通过此题，继续加油吧！');

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  `team_competition_id` int(11) NOT NULL,
  `team_point` double NOT NULL,
  `team_state` int(3) NOT NULL,
  `team_captain` int(11) NOT NULL,
  `invitation_code` varchar(255) NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `team_ibfk_1` (`team_competition_id`),
  KEY `team_ibfk_2` (`team_captain`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`team_competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_ibfk_2` FOREIGN KEY (`team_captain`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of team
-- ----------------------------
INSERT INTO `team` VALUES ('20', 'Tfive', '3', '414', '0', '17', 'HZNU320191009125205102791');
INSERT INTO `team` VALUES ('21', 'Auu', '3', '765', '0', '12', 'HZNU320191009125206702651');
INSERT INTO `team` VALUES ('22', 'orangadd', '3', '0', '0', '22', 'HZNU320191009130114980253');
INSERT INTO `team` VALUES ('23', 'FZH213', '3', '880', '0', '23', 'HZNU320191009130720679287');
INSERT INTO `team` VALUES ('24', '2019', '3', '197', '0', '13', 'HZNU320191009131544807503');
INSERT INTO `team` VALUES ('25', 'jienigui', '3', '648', '0', '24', 'HZNU320191009132515178995');
INSERT INTO `team` VALUES ('26', 'ctrl+c', '3', '405', '0', '27', 'HZNU320191009132652620273');
INSERT INTO `team` VALUES ('27', '666123', '3', '891', '0', '26', 'HZNU320191009133406659295');
INSERT INTO `team` VALUES ('28', 'ddd', '3', '99', '0', '20', 'HZNU320191009133531447685');
INSERT INTO `team` VALUES ('30', '吨吨吨', '3', '195', '0', '36', 'HZNU320191009144059965043');
INSERT INTO `team` VALUES ('31', 'hznu_777', '3', '194', '0', '39', 'HZNU320191009155658910510');
INSERT INTO `team` VALUES ('35', '划水就队', '5', '100', '0', '44', 'HZNU520191217131005256939');
INSERT INTO `team` VALUES ('36', '试试就逝世', '5', '445', '0', '49', 'HZNU520191217153714871096');
INSERT INTO `team` VALUES ('37', 'guardians', '5', '400', '0', '51', 'HZNU520191217162240265160');
INSERT INTO `team` VALUES ('38', '全村骄傲第一支队', '5', '420', '0', '53', 'HZNU520191217185156198337');
INSERT INTO `team` VALUES ('39', '怡乾窝梅的旋但窝香做豪仁', '5', '440', '0', '54', 'HZNU520191217193134216484');
INSERT INTO `team` VALUES ('40', '唱跳Rap编程', '5', '415', '0', '55', 'HZNU520191217195314872179');
INSERT INTO `team` VALUES ('41', 'test', '5', '330', '0', '10', 'HZNU520191217195519194733');
INSERT INTO `team` VALUES ('42', 'what\'s our name?', '5', '445', '0', '12', 'HZNU520191217195650886215');
INSERT INTO `team` VALUES ('43', 'SAFE', '5', '445', '0', '59', 'HZNU520191217200349763997');
INSERT INTO `team` VALUES ('44', '文化人', '5', '300', '0', '64', 'HZNU520191217202545854427');
INSERT INTO `team` VALUES ('45', 'TZH稳稳稳', '5', '300', '0', '65', 'HZNU520191217204833150908');
INSERT INTO `team` VALUES ('46', '谢谢谢谢给大家拜年了', '5', '300', '0', '66', 'HZNU520191217204912747502');
INSERT INTO `team` VALUES ('48', '吴秋芸的舔狗们', '5', '320', '0', '77', 'HZNU520191217215356972911');
INSERT INTO `team` VALUES ('49', '给我康康', '5', '325', '0', '63', 'HZNU520191217215805161819');
INSERT INTO `team` VALUES ('50', '这个队伍明明弱的过分却过分会叫', '5', '200', '0', '80', 'HZNU520191217225117871675');
INSERT INTO `team` VALUES ('51', 'ych', '5', '355', '0', '81', 'HZNU520191217225429735169');
INSERT INTO `team` VALUES ('52', 'zfxgtxdy', '5', '370', '0', '47', 'HZNU520191217230718109607');
INSERT INTO `team` VALUES ('53', '保零争负队', '5', '105', '0', '84', 'HZNU520191218074642471594');
INSERT INTO `team` VALUES ('54', 'LSL', '5', '100', '0', '86', 'HZNU520191218080832804615');
INSERT INTO `team` VALUES ('55', 'lamdapie123', '5', '320', '0', '91', 'HZNU520191218082309623641');
INSERT INTO `team` VALUES ('56', '跪求及格', '5', '200', '0', '93', 'HZNU520191218082454244376');
INSERT INTO `team` VALUES ('57', '一起冲冲冲', '5', '400', '0', '94', 'HZNU520191218083051507294');
INSERT INTO `team` VALUES ('61', 'GG&WP||LMAO', '5', '200', '0', '98', 'HZNU520191218094138635882');
INSERT INTO `team` VALUES ('62', '郑江涛陈健向顺', '5', '300', '0', '100', 'HZNU520191218094438345057');
INSERT INTO `team` VALUES ('63', '小猪佩奇', '5', '200', '0', '102', 'HZNU520191218094647859731');
INSERT INTO `team` VALUES ('64', 'nst', '5', '200', '0', '82', 'HZNU520191218094910606559');
INSERT INTO `team` VALUES ('65', '王之泓小队', '5', '415', '0', '107', 'HZNU520191218095016380746');
INSERT INTO `team` VALUES ('66', '519', '5', '300', '0', '105', 'HZNU520191218095031629670');
INSERT INTO `team` VALUES ('72', '开题答辩测试', '5', '0', '0', '11', 'HZNU520191225141010561899');
INSERT INTO `team` VALUES ('73', '小明战队', '6', '1500', '0', '113', 'HZNU620200315181736832204');
INSERT INTO `team` VALUES ('74', '996是福报！', '6', '1500', '0', '114', 'HZNU620200315223747440519');
INSERT INTO `team` VALUES ('75', '冲冲冲！', '6', '2000', '0', '120', 'HZNU620200316163747887266');
INSERT INTO `team` VALUES ('76', '格子衫战队', '6', '300', '0', '117', 'HZNU620200316201428377031');

-- ----------------------------
-- Table structure for teamcompetitor
-- ----------------------------
DROP TABLE IF EXISTS `teamcompetitor`;
CREATE TABLE `teamcompetitor` (
  `teamcompetitor_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_state` int(3) NOT NULL,
  `score` double(11,2) NOT NULL,
  PRIMARY KEY (`teamcompetitor_id`),
  KEY `teamcompetitor_ibfk_1` (`team_id`),
  KEY `teamcompetitor_ibfk_2` (`user_id`),
  CONSTRAINT `teamcompetitor_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teamcompetitor_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teamcompetitor
-- ----------------------------
INSERT INTO `teamcompetitor` VALUES ('10', '20', '17', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('11', '21', '12', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('12', '20', '19', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('13', '21', '14', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('14', '22', '22', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('15', '23', '23', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('16', '24', '13', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('17', '24', '15', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('18', '23', '25', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('19', '25', '24', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('20', '26', '27', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('21', '27', '26', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('22', '28', '20', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('23', '27', '21', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('24', '21', '28', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('25', '23', '29', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('26', '27', '18', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('27', '25', '30', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('29', '26', '16', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('30', '20', '31', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('31', '25', '32', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('32', '28', '33', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('33', '28', '35', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('34', '30', '36', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('35', '30', '37', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('36', '30', '38', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('37', '31', '39', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('39', '35', '44', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('40', '35', '45', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('41', '35', '46', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('42', '36', '49', '0', '120.00');
INSERT INTO `teamcompetitor` VALUES ('43', '36', '48', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('44', '36', '50', '0', '125.00');
INSERT INTO `teamcompetitor` VALUES ('45', '37', '51', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('46', '37', '43', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('47', '37', '52', '0', '300.00');
INSERT INTO `teamcompetitor` VALUES ('48', '38', '53', '0', '420.00');
INSERT INTO `teamcompetitor` VALUES ('49', '39', '54', '0', '340.00');
INSERT INTO `teamcompetitor` VALUES ('50', '40', '55', '0', '210.00');
INSERT INTO `teamcompetitor` VALUES ('51', '41', '10', '0', '330.00');
INSERT INTO `teamcompetitor` VALUES ('52', '42', '12', '0', '445.00');
INSERT INTO `teamcompetitor` VALUES ('53', '42', '58', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('54', '40', '57', '0', '105.00');
INSERT INTO `teamcompetitor` VALUES ('55', '43', '59', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('56', '40', '60', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('57', '43', '56', '0', '445.00');
INSERT INTO `teamcompetitor` VALUES ('58', '39', '61', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('59', '44', '64', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('60', '38', '62', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('61', '45', '65', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('62', '46', '66', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('63', '45', '68', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('64', '46', '67', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('65', '44', '69', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('66', '44', '71', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('67', '46', '74', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('68', '48', '77', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('69', '48', '76', '0', '220.00');
INSERT INTO `teamcompetitor` VALUES ('70', '48', '75', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('71', '49', '63', '0', '225.00');
INSERT INTO `teamcompetitor` VALUES ('72', '49', '70', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('73', '49', '72', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('74', '45', '78', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('75', '50', '80', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('76', '50', '79', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('77', '50', '73', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('78', '51', '81', '0', '240.00');
INSERT INTO `teamcompetitor` VALUES ('79', '52', '47', '0', '130.00');
INSERT INTO `teamcompetitor` VALUES ('80', '52', '83', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('81', '53', '84', '0', '105.00');
INSERT INTO `teamcompetitor` VALUES ('82', '54', '86', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('83', '53', '85', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('84', '54', '87', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('85', '54', '88', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('86', '55', '91', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('87', '55', '89', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('88', '56', '93', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('89', '56', '90', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('90', '57', '94', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('92', '55', '95', '0', '120.00');
INSERT INTO `teamcompetitor` VALUES ('93', '51', '96', '0', '115.00');
INSERT INTO `teamcompetitor` VALUES ('94', '57', '97', '0', '300.00');
INSERT INTO `teamcompetitor` VALUES ('95', '61', '98', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('96', '61', '99', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('97', '62', '100', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('98', '52', '92', '0', '240.00');
INSERT INTO `teamcompetitor` VALUES ('99', '62', '101', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('100', '63', '102', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('101', '63', '104', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('102', '39', '103', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('103', '64', '82', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('104', '53', '106', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('105', '65', '107', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('106', '66', '105', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('107', '62', '109', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('108', '65', '110', '0', '315.00');
INSERT INTO `teamcompetitor` VALUES ('109', '63', '108', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('110', '66', '112', '0', '200.00');
INSERT INTO `teamcompetitor` VALUES ('111', '66', '111', '0', '100.00');
INSERT INTO `teamcompetitor` VALUES ('117', '72', '11', '0', '0.00');
INSERT INTO `teamcompetitor` VALUES ('118', '73', '113', '0', '1100.00');
INSERT INTO `teamcompetitor` VALUES ('119', '74', '114', '0', '1500.00');
INSERT INTO `teamcompetitor` VALUES ('120', '73', '116', '0', '400.00');
INSERT INTO `teamcompetitor` VALUES ('121', '75', '120', '0', '2000.00');
INSERT INTO `teamcompetitor` VALUES ('122', '76', '117', '1', '300.00');

-- ----------------------------
-- Table structure for teamquestion
-- ----------------------------
DROP TABLE IF EXISTS `teamquestion`;
CREATE TABLE `teamquestion` (
  `teamquestion_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_source` varchar(255) DEFAULT NULL,
  `question_link` varchar(255) DEFAULT NULL,
  `question_answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teamquestion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teamquestion
-- ----------------------------
INSERT INTO `teamquestion` VALUES ('1', '73', '6', '34', null, '192.168.99.102:10001/web0a125/index.php', 'bhCegQZCimntsRVm6IhhpaZ+9pTKgwWovWGt8apet1DliVSJ3Erno+MD1dzXKVn7h77Eu6yud62DCRKUJ8r21gTwQU86p5gLo1731ekpbjJBRZpBfGqRRWvrOi6E/vG3WGuZe/8vjI0h4VRntfh31h3NBoWV6Z7NIf8MgiIqOYU=');
INSERT INTO `teamquestion` VALUES ('2', '73', '6', '35', '/hznuctf/upload/problemResource/20200315224218622966goddess.png', '', 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=');
INSERT INTO `teamquestion` VALUES ('3', '74', '6', '34', null, '192.168.99.102:10200/web0a125/index.php', 'dSKRlMCbONLTTHgi6/IKzRhWV1V3vf9boq5cNBIZmrSb4yKBZm1KOkrnvPUducT1WEe1WVqYNstoPKEhzktz9OGKJPrc4ikEj3uYpT12vi1kqYY+W/urc2GJbynHanh089AEnzwGC+vLEcTcTNTMySCL9k8RAoEH9cr3C7v1zb4=');
INSERT INTO `teamquestion` VALUES ('4', '74', '6', '35', '/hznuctf/upload/problemResource/20200315224218622966goddess.png', null, 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=');
INSERT INTO `teamquestion` VALUES ('5', '75', '6', '34', null, '192.168.99.102:10100/web0a125/index.php', 'LoDObhgOlJqKaWOsXAs2Z8/GJA10g3U6Zp1UsFCUXotgGjXKk04BzWqaqBYFlLE29iHbkWaLb+LGvMcPyrGe06DGmbb6BXqO5l9O8NTffubRqdCVZpFEkhvqG9xlbMOF39ooPy9bNEEGqjLHAcVC8TGuzAmtoch1yGcRhL+Bee8=');
INSERT INTO `teamquestion` VALUES ('6', '75', '6', '35', '/hznuctf/upload/problemResource/20200315224218622966goddess.png', null, 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=');
INSERT INTO `teamquestion` VALUES ('7', '75', '6', '36', '/hznuctf/upload/problemResource/20200316193557127783英语四级考试.txt', null, 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=');
INSERT INTO `teamquestion` VALUES ('8', '75', '6', '37', '/hznuctf/upload/problemResource/20200316193743342284Equations', null, 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=');
INSERT INTO `teamquestion` VALUES ('9', '75', '6', '38', '/hznuctf/upload/problemResource/20200316193839529185管理员密码.txt', null, 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=');
INSERT INTO `teamquestion` VALUES ('10', '73', '6', '36', '/hznuctf/upload/problemResource/20200316193557127783英语四级考试.txt', null, 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=');
INSERT INTO `teamquestion` VALUES ('11', '73', '6', '37', '/hznuctf/upload/problemResource/20200316193743342284Equations', null, 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=');
INSERT INTO `teamquestion` VALUES ('12', '73', '6', '38', '/hznuctf/upload/problemResource/20200316193839529185管理员密码.txt', null, 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=');
INSERT INTO `teamquestion` VALUES ('13', '74', '6', '36', '/hznuctf/upload/problemResource/20200316193557127783英语四级考试.txt', null, 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=');
INSERT INTO `teamquestion` VALUES ('14', '74', '6', '37', '/hznuctf/upload/problemResource/20200316193743342284Equations', null, 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=');
INSERT INTO `teamquestion` VALUES ('15', '74', '6', '38', '/hznuctf/upload/problemResource/20200316193839529185管理员密码.txt', null, 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=');
INSERT INTO `teamquestion` VALUES ('16', '76', '6', '34', null, '192.168.99.102:10010/web0a125/index.php', 'W5Nbj85JF3u6XfnLULEOpLTIABX1HMDEu48w+lFUrXnWP7IyhZgOtmxnCAWP6pHT9TcAgE9+WprfShWEp/diyAWXI36lf74EmSeG3GnVORf4O+Oihe8qyr0X3dQdndRD/NEjjL1znZ5Dc2Tggf2ycr/H33kYLU2YrnCqmjHkziA=');
INSERT INTO `teamquestion` VALUES ('17', '76', '6', '35', '/hznuctf/upload/problemResource/20200315224218622966goddess.png', null, 'jFbQPB5O8ytnTHZv/9PlHoF2wch21wVV1gFUv4sh5uc6RCLmwXAhg1LggkxiZmj0e13RyI0NpIRI9PP9FW+vt4Ux6RPV04BiAw1EpZjISuzTB9kxUvcSs1rPS0GO4yhrHYwYTosNGumkAUV71IQD/cH/Tqt50dd5o9fNGcREAMc=');
INSERT INTO `teamquestion` VALUES ('18', '76', '6', '36', '/hznuctf/upload/problemResource/20200316193557127783英语四级考试.txt', null, 'hn1pcqFzcMo1hkZuKha0NgO2TELcxZVIpUjhyXoWDb8X0W0OW8R/Dl6utBqNJCIjgoTZIHlHvWy8XcQIOcF6CsKbym5cdbsl3TGP/D8kTk+4c55GnJaF88o97+p4BKJJ7OgSmoo/8v9pUaN+TRBOE3zySQe8OxmAS9H/em+BJU0=');
INSERT INTO `teamquestion` VALUES ('19', '76', '6', '37', '/hznuctf/upload/problemResource/20200316193743342284Equations', null, 'EJM1SEC1/+/UVuinHoZzra1Bn59ONlQEwaYCem36e2ZLYx18F15ScGW4XK//opTxLBh6k+zN8Za96dELFcICxcZO0aG1OBERYC+9TRH2m14Jjpiphm2mJTrfbgpcMiTloE+L0NDCtCNuqVIWHkmQxNJazhKzk+dHaBWrT+xma+Y=');
INSERT INTO `teamquestion` VALUES ('20', '76', '6', '38', '/hznuctf/upload/problemResource/20200316193839529185管理员密码.txt', null, 'kc665F6duaZUtKhZuJSqzKQfKT3cqNujwxOpRBI2g+Zx13jMIzE2SkvtxU/OIfKFeic6kJIDjFf+t3Q5il7XV6Pfg3ENhc2k2BYcIW3C+/2W6WI8HTFqCC31laEDHxpXGWsoWcOJqJkupKdYjxqof+9fFMSB1k6GaUIfTjOTFRI=');

-- ----------------------------
-- Table structure for tips
-- ----------------------------
DROP TABLE IF EXISTS `tips`;
CREATE TABLE `tips` (
  `tips_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`tips_id`),
  KEY `tips_ibfk_1` (`competition_id`),
  KEY `tips_ibfk_2` (`publisher`),
  CONSTRAINT `tips_ibfk_1` FOREIGN KEY (`competition_id`) REFERENCES `competition` (`competition_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tips_ibfk_2` FOREIGN KEY (`publisher`) REFERENCES `admin` (`admin_nickname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tips
-- ----------------------------
INSERT INTO `tips` VALUES ('1', '6', 'Admin', '2020-03-15 22:36:23', '2020.03.15比赛开始，测试公告！');
INSERT INTO `tips` VALUES ('2', '6', 'Admin', '2020-03-15 22:37:04', '第一道web题很简单，大家冲冲冲！');
INSERT INTO `tips` VALUES ('3', '6', 'Admin', '2020-03-16 15:51:25', '恭喜 996是福报！ 队伍成功通过了 题号为35的MISC题目！');
INSERT INTO `tips` VALUES ('4', '6', 'Admin', '2020-03-16 19:54:24', '恭喜 冲冲冲！ 队伍成功通过了 题号为36 的密码学题目！');
INSERT INTO `tips` VALUES ('5', '6', 'Admin', '2020-03-16 19:54:35', '恭喜 冲冲冲！ 队伍成功通过了 题号为38的密码学题目！');
INSERT INTO `tips` VALUES ('6', '6', 'admin', '2020-03-16 22:00:20', '队伍【格子衫战队】中成员【小鹏】涉嫌抄袭队伍【小明战队】的答案，抄袭选手已被封号！');
INSERT INTO `tips` VALUES ('7', '6', 'Admin', '2020-03-16 22:21:09', '目前，【小明战队】领先，大家继续加油呀！');
INSERT INTO `tips` VALUES ('8', '6', 'admin', '2020-03-16 22:57:30', '队伍【996是福报！】中成员【小美】涉嫌抄袭队伍【冲冲冲！】的答案，抄袭选手已被封号！');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_tel` varchar(255) NOT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_nickname` varchar(255) DEFAULT NULL,
  `user_academy` varchar(255) NOT NULL,
  `user_class` varchar(255) NOT NULL,
  `user_studentnumber` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_gender` int(3) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('6', 'user6', 'yfV7Mf13LpvdN0njO1FiEYoM0b4exk/3b1QcUUOxTcVqpTAbkdtOMyR/R/LUym90yTTSnc8jNQyvsRn4YyvNtLa+WC0QkZL+NL6kKua7UJh5nxlvmqBrAvKRnOEPCRd5IFWlj5kI55xNeKXrsC5grT/QZWeIChyI7Bp1q56VJNw=', '13858088457', null, '贾铁城', 'sadsad', '杭州国际服务工程学院', '爱仕达', '2017216548888', '249044756@qq.com1', '1');
INSERT INTO `user` VALUES ('7', 'user7', 'yfV7Mf13LpvdN0njO1FiEYoM0b4exk/3b1QcUUOxTcVqpTAbkdtOMyR/R/LUym90yTTSnc8jNQyvsRn4YyvNtLa+WC0QkZL+NL6kKua7UJh5nxlvmqBrAvKRnOEPCRd5IFWlj5kI55xNeKXrsC5grT/QZWeIChyI7Bp1q56VJNw=', '13858088451', null, '贾铁城', '123', '杭州国际服务工程学院', '爱仕达', '2017323215544', '249044756@qq.com2', '1');
INSERT INTO `user` VALUES ('8', 'user8', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13212312322', null, '爱仕达', 'asd2', '沈钧儒法学院', 'asd', '1231233431232', '1402699373@qq.com', '0');
INSERT INTO `user` VALUES ('9', '2017212212136', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '15990832293', null, '泮晨曦', '闻舟', '杭州国际服务工程学院', '计算机173', '2017212212136', '1608425104@qq.com', '1');
INSERT INTO `user` VALUES ('10', '123456', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '17376594108', null, '陈嘻嘻', 'litochaso\\\\\\\\\\', '杭州国际服务工程学院', '计算机173', '2017222222222', '1061767858@qq.com', '1');
INSERT INTO `user` VALUES ('11', 'nodaydreaming', 'kxDmqOYP1nv/W2O9uYpvJN1xVt0as9h/ac4DU8M7+VZKCLblERc7DcA85M+GHF3HBOzoGTVBWXPiM3usiAdBPy/q+woZ0GHVgW0cT+EJMz9PfV1L9a37rrDN/p8QvMqRrsPLlXF+4xCjACV+vZiE+qqJA29L79eYobRHYtUGVxc=', '13396567238', null, '郭亚杰', 'nodaydreaming', '杭州国际服务工程学院', '计算机163', '2016210402076', '1772780065@qq.com', '1');
INSERT INTO `user` VALUES ('12', '2017212212153', 'YYwbjf9GE+pDF8ti+1tgH8LwqwQmcqKc/d4AITzKF9hmAvFhWQD3R5TwvQGTcisJmk0li74Y+7YqgDyD5YY7HsPCo83fngrTGqpRfJm/QQYQ/dV2fSCsQ7XJp38Ciib9LQwWEkB3lPm8TlBEyRVYKO27tVh9jjZ5IS5gtJgWdoQ=', '18868733971', null, '李金阳', 'Au', '杭州国际服务工程学院', '软工172', '2017212212153', '1292679294@qq.com', '1');
INSERT INTO `user` VALUES ('13', 'hong2019', 'IpNAy0eiY+iJx2KbzpmRCBTM0If1mbdCz2nKFeUBaBYmtCbc9/H9V5oDRrXTGkLEAf8Sbh3PdRAYyzUBFlFkVall1yzMNnLMXc4aa3CDxj9gmfXOOidAMWVS97Zz9NIerrS8DrgHzSfx4q0yzaVu0orohpQoD+8PCCHkaCXNWbY=', '13732356598', null, '洪佳轩', 'Gogo', '杭州国际服务工程学院', '信工198', '2019212212314', '1257407638@qq.com', '1');
INSERT INTO `user` VALUES ('14', '2018212212023', 'Eii5C4OaxSYxm7Xh4MSGOw6rDoQmYRWfht0OvyHuht9S+YDoHj3d9zH7nVPUznaI2zIl9gYMRCvhtII6QmCmO/chyyEwp+qDR7sIl/Zkqlw5jDvdV0Z1uYSUhANuaCzP0UVuA96ohdH2S0k2h4mmZgh70SEACCWBOXfKBkUFpIE=', '15858294046', null, '黄译田', '。', '杭州国际服务工程学院', '计算机科学与技术184', '2018212212023', '15858294046@163.com', '1');
INSERT INTO `user` VALUES ('15', 'yzdsg', 'FKhie8QqcEwIQ6SuL2hgkV4fmRJ52pmV/JvULF7hjdCZ0I9OR3zAAhzBdxG0YuzDgPfLiTDbm94/IUFsMAEWsrt/Mmybso+DIB3PMJO8JFHm0vncRql0r2eaFQwLP4Lobi2lItR7XmBbYn+vNs7LbIPWeKpd43kbXv1/NivSXJs=', '13586233545', null, '尹凤娅', 'yzdsg', '杭州国际服务工程学院', '信工197', '2019212212281', '2785205583@qq.com', '1');
INSERT INTO `user` VALUES ('16', '2018212212130', 'Wnut/3jAkZPziSk64ZE2HN+cOQOI1ivgKRfyd/DKBu8DX1KXbABhjYGTtItdRreTXRsT0P9eWmoqUBEBBRtPsAqS2rhytnNgoAjbEsNdZEdfAhPLl9nuLLpLKPXLQcsKCl9w1b/8QVfJ7pvSzn2YKWx3jaC3wQ5+r/wLFwb9wnY=', '13386500568', null, '屈伸驰', 'GOLDRICK', '杭州国际服务工程学院', '计算机184班', '2018212212130', '137185323@qq.com', '1');
INSERT INTO `user` VALUES ('17', '15728032219', 'leA+gJM3YW3SkwRZt8O4uSVDEJruOm4c6/1gUnNzQhQCTDbjQsEUCvIzX2HjvCYSI9ln01HuxJy/puuZRwKJanibX5Nf8kPUZ0iTD3w8gl1auSsakMFMTAAkhO/jz85caB4qo2DmQYwgZWKC+8ot5p2lXA9wcEec9bovlGRYe64=', '15728032219', null, '龚新立', 'LEOGG', '杭州国际服务工程学院', '计算机182', '2018212212077', '675046224@qq.com', '1');
INSERT INTO `user` VALUES ('18', '123', 'yfV7Mf13LpvdN0njO1FiEYoM0b4exk/3b1QcUUOxTcVqpTAbkdtOMyR/R/LUym90yTTSnc8jNQyvsRn4YyvNtLa+WC0QkZL+NL6kKua7UJh5nxlvmqBrAvKRnOEPCRd5IFWlj5kI55xNeKXrsC5grT/QZWeIChyI7Bp1q56VJNw=', '15372090882', null, '熊志豪', 'litochaos', '杭州国际服务工程学院', '计科185', '2018212212067', '2541149049@qq.com', '1');
INSERT INTO `user` VALUES ('19', '2018212212167', 'XR4hH4lIf3o1cIKxD0oZRnZFW+k3ErWwBQGjYX+Vyg8aggsP9U+vk3xnxv3JwBBHmezADbC/btYMuf03bi6o4H+oiFZGlidgk6z6RijVCA6EaB67BfPDhIdaKpQRsgvIm4hTozgPJjg06PSyZaZsPkZoEs7nMU2tt+uCPUkRs+M=', '13386533938', null, '陈俊儒', '小白', '杭州国际服务工程学院', '计科183', '2018212212167', '601209387@qq.com', '1');
INSERT INTO `user` VALUES ('20', 'yjj2466811523', 'rXnkZM2p8pNWeKhec56BQynCtjbCjcKYUq2RYH7euOBQCfDffG48mAJaiKRNN7PWBYgPWks2bg4oTqBdQd65XfO4Md1P68/xgth2U7UavCZACgIJJQbRzxRBIdd0CGVdFqrY1Kgv3UH7MFG8RianShuZhCLrwHV0atwU1bR5NMY=', '19106857522', null, '颜俊杰', '杨家将', '杭州国际服务工程学院', '信工193', '2019212212103', '2466811523@qq.com', '1');
INSERT INTO `user` VALUES ('21', '2018212212149', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '15585992646', null, '卢宏', '丑嘟嘟', '杭州国际服务工程学院', '计科184', '2018212212149', '1978435821@qq.com', '1');
INSERT INTO `user` VALUES ('22', '2017212212230', 'ws4pTDBQeIBF7ASCUjKQh3RThg6RaZTeqMNGlnqwBQ7/f8A9/UC2zBUXjWYioiiqCEjzTkhpiQnOMiqyU2aNFDt35ZV27xed38braBBGSPo/u1TW/Y7Dwgy/BF19ylS7TMh2U9yl3zQ1EQjuVbaPMDhUA4ewOtvFip+rcGIsmqs=', '12345678915', null, '余成', 'yuch', '杭州国际服务工程学院', '计算机175', '2017212212230', '123@126.com', '1');
INSERT INTO `user` VALUES ('23', '13071823212', 'pQVfmW9cmhMaptUqg3bPhrM8oaGnkjjArcvjNp/qBMjvnYaoi+h0f1TG1N3mOtNw41vgQ06ekaeAl8BFSH/zlZAuKyw6EXRL3BB3e2E1N7tB9uhXvV1H0q1l+zvoGpH0vAersoFj5x4DY9ElTzd3j+Loj6NVwy0zVyt3/kiRw/4=', '13071823212', null, '鲍唐军', 'Suriel', '杭州国际服务工程学院', '计算机184', '2018212212024', '1304247327@qq.com', '1');
INSERT INTO `user` VALUES ('24', '19857187805', 'rtJcN23asI8F5hj65Hk9hq+Wht7z1BOeiO4tJUGaBkAuCA4Zz8j5YC0W8xWkohg8Pu1sEtfYUhu7O4oE+CfRgmXoTqi9lxqUaH4qKXmTDfMWgUccJoMDta7abABx8Z4Yo1LLl8N9k+9Ya46nlJanyiIlOAsLtaiyvdLD0o5WHgo=', '19857187805', null, '宋辰之', 'Pepsi_橙汁', '杭州国际服务工程学院', '计算机技术与科学184', '2018212212017', '1651928813@qq.com', '0');
INSERT INTO `user` VALUES ('25', '123456789', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '12345678989', null, '蛇与辰', '456789', '杭州国际服务工程学院', '计算机184', '2018212212020', '12345@qq.com', '1');
INSERT INTO `user` VALUES ('26', '2018212212128', 'eZWj6XBiL4g+mJzpN/QBBLT1GTOAtsmrosD7eHu5GaQc3yU3vmf3sxZ75nlFi3AwfGlCiHcIx/2dAioifR9ePy/4lry9VTR2NJVKd0H96fEYpuplVjqrvFKsp/mSz1GTLyEMl3Oy8y3HsHNTY+/aAuHv9b+aIUc42BaKTI04aP0=', '19857106066', null, '张子涵', '张子涵', '杭州国际服务工程学院', '计算机184', '2018212212128', '273263211@qq.com', '1');
INSERT INTO `user` VALUES ('27', '2018212212016', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '19857106089', null, '王玉杭', 'echo', '杭州国际服务工程学院', '计算机科学与技术184', '2018212212016', '1834782963@qq.com', '1');
INSERT INTO `user` VALUES ('28', '1234', 'C8SKHmLeMMv1ni6jZisVxU4Vo2+Re2o1fXq9b3gALjrmM/p5/h0lqD8nCuHifzcqic4Ot5Wh9gjl6tgSR/gHOc4262eakBbmMYDB6B0tLFqqLC6WAaRDBa2Gkzh6TI2owphl3qE4+lfncjDt6dcmpcAp9NKDOiQvlugAXXcmlbY=', '17857312655', null, '王晶晶', 'JARVIS', '杭州国际服务工程学院', '计算机185', '2018212212305', '2284048937@qq.com', '1');
INSERT INTO `user` VALUES ('29', '2018212212194', 'NTraHdrxFHcpEWTw5gwuOohdM1NdLXuCrNwwQHvON10rJdjZGoZGxgn33ZsW8DWKTVCfURdQ9GGEwfLEcBVWBe6TABmvn4gQKtf4S6m57+2mqwSmOp4Nb2EqweYgEksGapMK0J3VAhapAXWM/Rs+/VgkyEb7rqDru6f5pYkycgI=', '19906811006', null, '钱依婷', 'qyt', '杭州国际服务工程学院', '计科183', '2018212212194', '304097243@qq.com', '1');
INSERT INTO `user` VALUES ('30', 'asinose', 'cOf7mioLXGx/xhCTf70EHfSM/kSM1h1OppWIZ/o54RYAiqcXE25RM7gTRk8YXlQqXxhP/Aop8IYP/swxOmO3ucF5O49FdA2p4PwkgoeQvkBAMdxEALJqx09jnaGY5nwD87PkocVFEcjSdKmpvTRJiSzyNPwg/wwipeF0JLWV8HM=', '15858276554', null, '郭李渊', 'asionse', '杭州国际服务工程学院', '计算机183', '2018212212113', 'glyuan419@outlook.com', '1');
INSERT INTO `user` VALUES ('31', '2018212212290', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '19957822838', null, '章力博', '之旅 ', '杭州国际服务工程学院', '计科185', '2018212212290', '1839369618@qq.com', '1');
INSERT INTO `user` VALUES ('32', '2018212212187', 'lRaFbA+GAywdE215Fpeu98B5hf+T3fj3pZuOM7E1OvvrMqprLv+mxC1pjGGptujxVg7prp6TY2sxlJiiNJx/uGA4DBcsGH1rDLUIZrkZTmAq97Zf/V+1bkf4eT/8xDMPGxaECrbdhwWqYESQI76zQvbbQhzYQt8NeoPjyDD8Wr8=', '13386533022', null, '凌涛', '123456qwer', '杭州国际服务工程学院', '软工181', '2018212212187', '1812036559@qq.com', '1');
INSERT INTO `user` VALUES ('33', '3186531875', 'wwzT6iKffudsL1kCaZY2ru4Acq3x07WjJDd0IMaf7kuTyIHOlq2FHUEqwNO2dbBO3RFZ4EvAf7yDF7q1emLM89wqzMB+rrUmRwWEZDAOj1vMmxCplZo6t1TnV8LOkQPl4F/P0ZGEqqx8asUSca20e7n2cPqwrllHSsLvbY1JOB4=', '13506775496', null, '黄益州', '青瓜君', '杭州国际服务工程学院', '信工类194', '2019212212144', '3186531875@qq.com', '1');
INSERT INTO `user` VALUES ('34', '2019212212238', 'QXPQvXkA6K6b8MYktOnyi5VL3EltIMX740HhbwunJYXk59I8HuDVYjJXDPOdk/sOhjoX7a5WumYGNH10WtsH3yDZDZdOuY2/oOuZYcaj01kDudXmY+ciZIxfRttv/19VodAP8ZdQGA+DBz00qjRkEZm3C19ygKX2H79vvlgfUlM=', '19106856108', null, '赵晟', '读书太难了', '杭州国际服务工程学院', '信工196', '2019212212238', '1627927036@qq.com', '1');
INSERT INTO `user` VALUES ('35', 'Y2072916314', 'AkHWZrwhNm3G8q/yg0rRLpoIa4AsrfwrBLFZ9gyXfM/nJMvMlixpCxz/sEbZeN2fvaH67U1HY3BMocZZq8YLnuSzMQIcmokjoyBQ+mg68WR7NjLdwmZan+/yqyGZnhexxlWoq0OkpfYXZEiwWNlEpuT1+JELzHXDhhZLzZmik7w=', '19106859699', null, '杨悦', '小杨小杨从不张扬', '杭州国际服务工程学院', '信工195', '2019212212201', '2072916314@qq.com', '1');
INSERT INTO `user` VALUES ('36', '1609608667', 't9brRy6lYi3AcFM41GvOHrZuVaaphKXJn6JeHMU4pSFCHVKB0HwZ3U5jHk4fvFbLlojezB/XOwJlzUxCaKmCNsdoMgdLc7QSbwx8dtleQ7Ovj83uODkkEG0xqR4qqQsDtZxJbVAEOKZI4E8JLj9kJMDaDveKR6Ngvx9le4YTrqE=', '15355055115', null, '李春凝', '趴在桌上睡觉呀', '杭州国际服务工程学院', '195', '2019212212181', '1609608667@qq.com', '1');
INSERT INTO `user` VALUES ('37', '2019212212204', 'pA0q1FONruWCGiKqFsvv2/hMocQ11IT2s+n0lzbLHYSg+3tUvi2Af+YLHf+vvfiZohV+WtTGxxAoiduGPuwbfXAKj0zOO44mcsrGvZeIvkCsEjtPB7VUqmTaDr4eU022cMFY5QHOiskl2T85QBxFKl+q5xeIV16E2GjQKrvG34o=', '15355092002', null, '崔明珠', '小明', '杭州国际服务工程学院', '软件工程', '2019212212204', '1542203587@qq.com', '1');
INSERT INTO `user` VALUES ('38', 'tuhui0922', 'g3Y3l7j0dZIwpAa6NTqT0HATTAsIvFmGcDIl1o1QamEKuKlKEhpJv7ZKUZ1sqZgD9OYsEYVAYcl8nNvZEkZDb8CtAVFiMik6DEiavFDsz1Nlhu/RlvlNFZNVHY/+OK6ksMFKnWhtIhjtYaWlgv8EzzQZ4C+I/YeL3zrVMApmUFk=', '18557543506', null, '屠辉', 'Jasontutu', '杭州国际服务工程学院', '信工191', '2019212212019', '1550184338@qq.com', '1');
INSERT INTO `user` VALUES ('39', '1072872190', 'DpKojAp/i++tZ8fz+gWYFZJD4ybQlyJXRp5xcOzrgAW6JD8ewus7nCVjrl6maIGHUt9Ct1cEXGYdEVTO3hLBn4ACwEyJqGAmnQBsEuUwY8cUHcZY8iYfq+PQoso+IMvNckxoCWmuPf7P7ShiwEWLc+p/oqvy39cur8w8jdB+9+o=', '15355092699', null, '丁世博', 'Dave', '杭州国际服务工程学院', '信工194', '2019212212150', '1072872190@qq.com', '1');
INSERT INTO `user` VALUES ('40', 'SYDYS', 'SRbrI8hOJe/EzeiBCGAXo7CR8AA1hRgXIO2PugSfUytqHYqHsMwNSpEtRu4TCZhiQVPMXTL37k1917dfAMgoF0WUXPxuzFNinHPmMZKbqx6+WYohsSnN+jZrw2XVik+kJGbGXqtCVOERIWSOsy5nFiI2JDLsqdikjkO8X+OqVmk=', '15355430238', null, '杨大本事', '杨大树', '杭州国际服务工程学院', '计算估计174', '2017212212137', 'zjlxysyc0921@163.com', '1');
INSERT INTO `user` VALUES ('41', 'SYDYS47', 'AeRu1aP8INanDstxhESwE2lDdAiUqIyT++GDcORmuDEBnSJ1TUPJxB53+WYWqEaK0AMmyUvXssGT45jtZ4BObokhjZFNuLqXavlEU9nny5Ua942Lz8RmPCdgrrpyXK7y0KWL0GRaFnMLOujSInyg6Xm3+JpJqgBrpEkSthLDJI4=', '18257980280', null, '杨大树', '杨大树', '杭州国际服务工程学院', '计算机174', '1111111111111', 'zjlxysc0921@163.com', '1');
INSERT INTO `user` VALUES ('42', 'PLR47', 'SRbrI8hOJe/EzeiBCGAXo7CR8AA1hRgXIO2PugSfUytqHYqHsMwNSpEtRu4TCZhiQVPMXTL37k1917dfAMgoF0WUXPxuzFNinHPmMZKbqx6+WYohsSnN+jZrw2XVik+kJGbGXqtCVOERIWSOsy5nFiI2JDLsqdikjkO8X+OqVmk=', '11111111111', null, '杨大树', '杨大树', '杭州国际服务工程学院', '计算机174', '1111111111112', '2323524685@qq.com', '1');
INSERT INTO `user` VALUES ('43', '2017212212274', 'xJgBTVQ/+PRteS5ic8raXiNABLIA4tZY5odOeWNbicOSvYssHno/P7f6DpZ2Rt9/I0fsGYupOF+bW4DGFF/cdOhHVOz44EVo9aLXDbwR73beyTsjP3emVhmkymRbnV8pr5AT5anSM36aKWe8TWlbU2MS/6AZI6QIzcy4POG62zo=', '17376593449', null, '祁治霖', 'Chisekun', '杭州国际服务工程学院', '软工171', '2017212212274', '634072439@qq.com', '1');
INSERT INTO `user` VALUES ('44', '2017212212324', 'NI4WKbN56xlBflByi+FcJ9SL0bIFrnMoqReHkBeNsWeoFHifP/Ma1xBGDeWSx4SJlXk3mYhmouC0GFEbIw7/QHWNfQTnpe4bsIyDwrPc+hUO909lNC7ACOd4gr9LH7Yy/ozD9isaffW40/TJ0NY/uf/qFe2yGy+Ma0fgOmpSD7w=', '17376591577', null, '成梦怡', 'Ccc', '杭州国际服务工程学院', '软工172', '2017212212324', 'chengmmmy@outlook.com', '1');
INSERT INTO `user` VALUES ('45', '2017212212060', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '15355498568', null, '张立炎', 'abc', '杭州国际服务工程学院', '软工172', '2017212212060', 'zly990929@163.com', '1');
INSERT INTO `user` VALUES ('46', 'Volume3', 'bNGpiHf18EhuOLTRt5LQkVLWZpUECmDYBMp8Wbh1RdO3QooCbacyZt++9U7xPjCn2O7wkft8nq4NzfMShEqsha6xr9hwHHb/rDjQDkG1yWTHV4x3R3YwplGUPzJ+R2JbFZilC8TfQKdb2ftGp5JCxnD37Yxsh01suk47FScDWsg=', '17376590411', null, '蔡伊晨', 'Evans', '杭州国际服务工程学院', '软件工程172', '2017212212015', 'evansshaw@foxmail.com', '1');
INSERT INTO `user` VALUES ('47', 'Dup4', 'SRbrI8hOJe/EzeiBCGAXo7CR8AA1hRgXIO2PugSfUytqHYqHsMwNSpEtRu4TCZhiQVPMXTL37k1917dfAMgoF0WUXPxuzFNinHPmMZKbqx6+WYohsSnN+jZrw2XVik+kJGbGXqtCVOERIWSOsy5nFiI2JDLsqdikjkO8X+OqVmk=', '17376595398', null, '潘律旨', 'Dup4', '杭州国际服务工程学院', '软工172', '2017212212118', '494143072@qq.com', '1');
INSERT INTO `user` VALUES ('48', 'kongzn', 'sX3pzgdoRjb0N7/ch4id0HvRjh2KeWGiyAUKFYizM1kwFuaSak0AIkaKcxo358NNsjYLZwRSf1YFdE+hoKSZTyiGFOry5sKMP2P9RDdaaYuqMWJhBxN0zJ/BGkoOqM6WiVK5C9YFfWtFzJbLjXz2VF9oOP2KqC66G7XH8AqU+9I=', '18057174390', null, '孔周楠', '小可爱', '杭州国际服务工程学院', '软工171', '2017212212072', '3248560832@qq.com', '1');
INSERT INTO `user` VALUES ('49', 'shiqi', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '18868172616', null, '施琪', 'shiqi', '杭州国际服务工程学院', '软工171', '2017212212235', '1591535327@qq.com', '1');
INSERT INTO `user` VALUES ('50', '2017212212231', 'ZJlrjhzPaRVkdcusNZdhInLwpTNubjNkls3idlWsowZS0piqVor3ZdQy/ggrEytGFYvTMLdHws9ukKfeXAP805Xje3cdK/YdocbCRvu4esCAZTwRhjSei6+QOn6HfP9E7Nq9zJ3e14mWLmVA/S4GgzE97VpPMjYIv+ME7qk2Veo=', '18057174605', null, '章朝锦', 'irrevocable', '杭州国际服务工程学院', '软工171班', '2017212212231', '786911667@qq.com', '1');
INSERT INTO `user` VALUES ('51', 'ranran', 'iU3KlcKpOwRV1jXvy+Ksa7QyvvHaKRKhE4O7eB4x1IFSdx43JdmN7AhEla6hviCWHCfAL4LPn/OG7rgsvoR3FawYWIesVoBc790VX12wO+9Y/5QgxYCCqbQyzKdPPkZYreqfSpsNY4RXTMVrH/N+x0kNeF2M4ZA8otxJOLSXwAg=', '17376550708', null, '陆宇婷', '冉冉', '杭州国际服务工程学院', '软工171', '2017210218012', '514563417@qq.com', '1');
INSERT INTO `user` VALUES ('52', 'glp', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13588002106', null, '郭兰苹', 'glp', '杭州国际服务工程学院', '软工171', '2017210311041', '13588002106@163.com', '1');
INSERT INTO `user` VALUES ('53', '2017212212004', 'cOyPODBaKLlS1k5IsY2/lLLYoJ+qnBPr/Vv7/rnsdfy1mdfv3A+SYQO86EuvJu8a/rzXOJW62T5gXZpk5nVI2EEUeJilgFfnHCFi9zfqsGiss/gfWyV8qlE57cWQQFK2aLs4Za4fIuE0Tes/dzDDcTCDMC4ONGgkBNWqPEyuIV4=', '18058774935', null, '邱和顺', 'Treeschild', '杭州国际服务工程学院', '软工171', '2017212212004', '1542290334@qq.com', '1');
INSERT INTO `user` VALUES ('54', '2017211506045', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '17767143737', null, '刘天华', '会员付费观看', '杭州国际服务工程学院', '软工171', '2017211506045', '648930239@qq.com', '1');
INSERT INTO `user` VALUES ('55', '2017212212209', 'H3YTbKRE+6jcxS2n/UtKTJSFVEXlTE10dYzYO298LCIy8YMEHq7MqdWbXCH+Nu+K1vV8Lg4fbjlEsvU+MYn+JgSU1vZcRqFjqmtG3jtU8rdVHKmt54jIim1v6Al7QlNnf21RoyvsEa+BHkypvbuABF6qZkBo8kpErLwwMymlxqQ=', '15158181503', null, '谭洁', 'Tangent', '杭州国际服务工程学院', '软工171', '2017212212209', '605738695@qq.com', '1');
INSERT INTO `user` VALUES ('56', '2017212212145', 'YNTanIZ3pokvLFR0U4KYpqvehJ1s93XWAA2IoomwvqRaaDsaOqC3obPPPyyJjDJv3veXog8tlpiiAroUKeKTZJ63CLRT8kwVBuHpLd07xVgM1ukEq6iNPbUWMhAEkJ6TddzMZdiomg8Y5M4O0ACq7Y082+G+oEodmm4yrONJRTI=', '13586125261', null, '金峥卉', 'Jzzz', '杭州国际服务工程学院', '软工172', '2017212212145', '876834136@qq.com', '1');
INSERT INTO `user` VALUES ('57', 'Amove', 'H3YTbKRE+6jcxS2n/UtKTJSFVEXlTE10dYzYO298LCIy8YMEHq7MqdWbXCH+Nu+K1vV8Lg4fbjlEsvU+MYn+JgSU1vZcRqFjqmtG3jtU8rdVHKmt54jIim1v6Al7QlNnf21RoyvsEa+BHkypvbuABF6qZkBo8kpErLwwMymlxqQ=', '17376591025', null, '蔡林达', '\'random\';DROP TABLE student#', '杭州国际服务工程学院', '软工171', '2017212212208', 'jamumu@163.com', '1');
INSERT INTO `user` VALUES ('58', '2017212212124', 'YeBGnq6IsX6Q56XiWjki74nnrcIEWZVj/vbv1c1Xl6YzJ/4XRnT4NnOx8XPYId+74+oVGG3GxsHwsaVxuJP3Sn98RGfg5ZgMUFu0b9UwCLN9GrZXJd7fLImqS/uBRdwPBpRcN+hRptO0Z/Fl/0TcJS2anS9e2TOierHsQsJ7Qao=', '17376594648', null, '陈伊雯', '东风', '杭州国际服务工程学院', '软工172', '2017212212124', '1722447547@qq.com', '1');
INSERT INTO `user` VALUES ('59', '2017212212148', 'oqrI6wREKt3mB72He95+Y0MtGTQrd6OjKcDzfM6JgnU8MooiE9ZQ73P9O3BFvKOizx43U4N3cw5qiDrPNChVDy/Pbg2d1u9685wZJNahiZnpzsLuczEM/LbwHyijPLOUQaaId+GHdN8WdeTsJ9WCwTv2En8CrdRfZngzCKYr78E=', '18057174516', null, '彭敬畏', 'wei___', '杭州国际服务工程学院', '软工172', '2017212212148', '1036575190@qq.com', '1');
INSERT INTO `user` VALUES ('60', '2017212212207', 'gOjhrX77WrEvz49qUZpLEB8jWH0iS/jFz150pKrs39DRHd+9TO6SFda5zyvUkhmh2bKytkcENBH7CxLORqiOXI5qZO2JWc60kLHaSJV8cfr4CKadwOnrwyPOaldyvgYJN/oRbQZsXmkcg6sRGIjytpDe4RlPbOoktp9I+//OKl4=', '18768447781', null, '孙正阳', 'SZY', '杭州国际服务工程学院', '软工171', '2017212212207', '2534108037@qq.com', '1');
INSERT INTO `user` VALUES ('61', '2017211909169', 'pP/ijy4N0NIx7i9S9VMB9ID0NkA46fom7JR7Wv/ew41Rgg9wKkuEagUGdXHZoo112/rmtSh+2F0v1MCJ5s3EON6zasqcgcM4C0RJNszqin07bck/ic2QVnyb7Q2hTHjG3VnZKGnOvwKlQrsKt3ChQZX3Fne+1CSLUzncHSA6CvQ=', '17376591844', null, '殷琦耀', 'jerry', '杭州国际服务工程学院', '软工171', '2017211909169', '861911854@qq.com', '1');
INSERT INTO `user` VALUES ('62', 'ZiMu', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '17376598098', null, '李铠宇', 'ZiMu', '杭州国际服务工程学院', '软工171', '2017212212092', 'wmdhxfdlky@sina.com', '1');
INSERT INTO `user` VALUES ('63', 'anmolanjin', 'EUKXa31bgZwcpaLd/be8AIiMtrirmjofjZqUlHj6Q1hYE5DHeJE/ra9z43d036yA8/jvWaDb7DdC2lJnX/WdRQNsv1KOoYCREj+LKOq7mxrnKXAYqhZ+eovuO5FMThgaZCU25FeAHjJxq9Gwl1daMCzLm6MuJ178J51TIbppeRA=', '18868180541', null, '柯振英', '桉墨蓝槿', '杭州国际服务工程学院', '软件工程171班', '2017212212196', '1462340861@qq.com', '1');
INSERT INTO `user` VALUES ('64', '2017212212203', 'isk5SGmdveiXbEG0X468sbTn4+9IFkq/+ve4+jZSWwerLoC7AmDbLnmJ3Oit8HkIXt8k98JSrn12jbvsKDMLlc0PGgSO6YHuxdQ964erIqe9WlBxk4PK5dhzdmh7D1XZWPxtWZR07ZmT0qnqT6g1KWmP+rGHVxHSTwK7XPaaLxo=', '18868712815', null, '魏民', 'weizong', '杭州国际服务工程学院', '软件工程171班', '2017212212203', '2020846285@qq.com', '1');
INSERT INTO `user` VALUES ('65', '2017212212210', 'bjeOZikYN21OPnjKMz1w7F55fh366az4491JTs6ETg59cSKLpOdSETobTdDUkutKOdl5de62Ga0CgyCfChjO/oRzYUFy6FEpQeUIq6e6cefnLn7h5RThywszDXpu/FGi8CAuEWQzgDu9H/+y1/FHkDlmxc8zApo/ZS2QNc0/CQM=', '17826856884', null, '朱德勇', 'zdy', '杭州国际服务工程学院', '软工171', '2017212212210', '498997045@qq.com', '1');
INSERT INTO `user` VALUES ('66', '2017212212085', 'K45/7LrYPcoHw8GJmbLy3lipsZ1NdJnnP7OtAtRc/2RfosTEst0iO0dZ0Dy6WLDguOoS0yB3wVdkP3PNDogTgigT9dfjDijErGOIGox5vV28Lm8Voc/iikzml2LDggcPXKonCc9swuAbBnG6Pb/dvwo+VF1lUu83KIATp/D0cpg=', '13506875219', null, '项楚涵', '给您拜个早年吧', '杭州国际服务工程学院', '软工171', '2017212212085', '2962501542@qq.com', '1');
INSERT INTO `user` VALUES ('67', '2017212212086', 'AdFa0UJLXbsPb/dLm20DdVbSA3ySzhWsDsq3apRJjGUCpNac5hXzig7F4OA6N1AoNXjaE6TEL7c2MSJ9nfIdnsq9f7+bf3rZi96Nb5Tz2mfFFwwcu/sCNRUiQ7bZjwiKlqHJCtNrV5S1YsmHSmJv0uR2D0rwBzwjLWWA4hVaX/U=', '17376590567', null, '羊铮逸', '我不做人了', '杭州国际服务工程学院', '软工171', '2017212212086', '964667875@qq.com', '1');
INSERT INTO `user` VALUES ('68', '2017212212064', 'srY4BClS1hhuRxPLTSgBxZJvGDvIUHRoURqAzUPlXm06LXiIjnoHNAqqMdsZjmRpW+Z0isG6m04qQ3HJfxIJu8/PBT9hqagchTPbvtJ8yYpJQG4gOk9hVDEf1S+ZtLIsBLpZlTv0XHK2cwujrdRwExBB6G6tKB963rpuioFBp9Y=', '15888494633', null, '陶紫鑫', 'Tzx', '杭州国际服务工程学院', '软工171', '2017212212064', '1464077181@qq.com', '1');
INSERT INTO `user` VALUES ('69', '2017212212214', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13758168573', null, '王奕侃', '王奕侃', '杭州国际服务工程学院', '软件工程171班', '2017212212214', '1619876797@qq.com', '1');
INSERT INTO `user` VALUES ('70', 'Yuyuyuyuyu', 'DRRH4zc5ffltnRE/k2A21GYMMjR6hTZ3jRrxVy6xe8vklpzZCqm1Eevmag1EOfng/GaDGbhvvHwF+LYiJOjUQLabqqx1Yvn6rRnkUnUo3FVA4rVUCmPVErQV2w4hBQexpnrh56K8ew7gJ+ezTszKgVzlVfZJ+28owAHOK7JVuTk=', '17816613892', null, '段雨薇', 'Yuyuyuyuyu', '杭州国际服务工程学院', '软件工程171班', '2017212212195', '836164534@qq.com', '1');
INSERT INTO `user` VALUES ('71', 'gqyangyt', 'wP1WpLToJutwjHt1k+vulBWw1COP8RxtYMpZ1bVfN9q6pFFtjzYn3r4K4nl48D7dplU5GAWOJQkkF3D6FrApkHWI9QMm6U5zMbmhtEbFBb1jBoOde02jG1eDiKDMKgU9xzIspGa9rnjfgp/rHSeAEGSBU6jDOVeVa4E0IF+Ccns=', '18868179740', null, '杨宇婷', '杨宇婷', '杭州国际服务工程学院', '软件工程171班', '2017212212102', '571317719@qq.com', '1');
INSERT INTO `user` VALUES ('72', 'Wangsy', 'Hpkx+HYfc2RpmrRmyNbHu6wwiudNKkZSQbdKoHgx/WhO0ckwVvl5a5icUMFwD44nWAniXiS5twSGsDS/8w+aZyqrPgkVujYpD4VrmQRcafC4OCX+NWakjhg/GfUr9Xn6+m34EFeNfZvjoSEqE6RRyY1Vmb9JSGZ9DEMFIlHQTdc=', '17376597133', null, '王艳', 'Wangsy', '杭州国际服务工程学院', '软工171', '2017212212197', '2418419742@qq.com', '1');
INSERT INTO `user` VALUES ('73', '2017212212217', 'T+GWlCtkKCVEyNklh4c1mAehkGR5aGqZfrMlWmC7VBxMKsM6hflC3fY2iWjQNfO2iSyltEjW8JWV32ObO36iOIWdpZnnb6XYZe1m3SZYjDGEB8rMGn8/j8202oVCoRTh9lDl5mtynqoi1arkC1ldmaH2ZzjZ05MXTy2Z1M/1dq0=', '17376591745', null, '祝炜洁', '大仓鼠', '杭州国际服务工程学院', '软件工程171班', '2017212212217', '760297795@qq.com', '1');
INSERT INTO `user` VALUES ('74', '20172122122011', 'KDRh4W9lxqPrb/vT6p7nPp0g35V0uvBpgQ902vsG05wI8fk+404ogYBdOitY9ebL5C4tW2ogY1rElV/Di2PI1kho8xViDt8CdmPvdZoZLEB0ohDua4wRd98m8qqdNQItf3q9GkIbSnluHsEvxDfHXJT235sZlMiNW6ZGBaac5CU=', '18868180847', null, '赵洁', '白卿', '杭州国际服务工程学院', '软工171', '2017212212201', '1337425301@qq.com', '1');
INSERT INTO `user` VALUES ('75', '2017212212219', 'AaPINk45ZX8jUIeZo+UagLB8fLf5891AghT72JHTf2fSdBgzeQ8pCHgBp39EMQR9bj3LMxE+6ggL46X50eFvF6EmEqi7u8HrVUETQzqIcg4vC/AiRu/UviG0+omIy9zFALDGezmSV+7setDVVqWpAeO8691zPH3insku2uy8pXk=', '15867326086', null, '汪俊成', '吴秋芸的舔狗2', '杭州国际服务工程学院', '软件工程171班', '2017212212219', '765113968@qq.com', '1');
INSERT INTO `user` VALUES ('76', '2017212212224', 'tA0ey1wZTtAPKGg3N795CiLtIoEfrJQilEKlBf+2+VsmTM5YlUqkMDSjxthkAn+gZTKKLtlCbGh9QTI0rlBeNv7gwZIErF7ROzW7Ja7OdxF4QUpr9qo2b5kj2ThVUgF0NKUy/rXOQkxlutzkvGGL7QcHfaxzp25XZ107zfESIwA=', '18868172700', null, '冯特', '吴秋芸的舔狗1', '杭州国际服务工程学院', '软工171', '2017212212224', '895159697@qq.com', '1');
INSERT INTO `user` VALUES ('77', '2017212212063', 'svhnvPyTU+v0wXTAK5mmLwJ62AnC4BXwdyhHaaRVMTRbrz+W5/2b8d9EYi94bVI7sNLLrEeFt4USDHVBX8yRTJqCzvKcj0fr+qfC1wlTrWR3/MyXVbMnuwoS2QtlVWmVSNs6beQGO+cboS5h8bByohaijw+Q+nJG30BXFchnOCo=', '15355476058', null, '吴秋芸', '偷走萝莉裙哈哈哈', '杭州国际服务工程学院', '软工171', '2017212212063', '574288017@qq.com', '1');
INSERT INTO `user` VALUES ('78', '2016211903040', 'Hpez/FHT1eX7SJIubg7PddfiJALIh8iCkEjht+y+nscQE5nRx7pzpW43rQTGPelmsxQtRHoeMuqqAJ7piQTVQ90QpWPdQn1ctqor7raeWRUOto9vIZwEioztHk4Kp0gxxpcrTkTKq7eGcKE38iV8FHnXfZoXFv7D5YqVbReWIfU=', '18949832269', null, '胡浩泉', 'Hhq', '杭州国际服务工程学院', '软工171', '2016211903040', 'Againstmoon@qq.com', '1');
INSERT INTO `user` VALUES ('79', '1214057890', 'zhTMnLkcY4wa+0i8m2ZQQNfdK6pkH7IGQZ4gXQEnuSOx0Tlq66NOMEneQYgrBLEHs7Oygis4WbDs6SFnnqnKeiB8rsU7deH3/xT49wRxjiTKYTAG9LOK556wbA/DV6SQ1ucNPkzXLLL0EO9s5+plciaXU715S7DZ0KUnBfETPvo=', '13819163182', null, '王俊杰', 'june', '杭州国际服务工程学院', '软工171', '2017212212215', '1214057890@qq.com', '1');
INSERT INTO `user` VALUES ('80', '2017212212212', 'jEv8rrx1//rBqgmBhj3sjxjfttsx7pisA7AAW65xYNs0g33ysX8tbaYTON0vFXVbWulodxxz25sEcc4ZRwxayrzQRAdRYgNUV8sQjnG7PvaBoCIhE5g2me3KfK3dbnW364gEfwDUTwIHktobGjY1zLcTYDoP9fDxy7liy3cHjkc=', '15988863760', null, '赵佳锋', 'jaff', '杭州国际服务工程学院', '软工171', '2017212212212', '1021943408@qq.com', '1');
INSERT INTO `user` VALUES ('81', '2017212212155', 'dyG75tov7PraEM00orFLdQUa5lW8tdxoe7tJ4Cd9FR1E21NNuCVXhnTXJ/pdZgPn6z9Imnu1RyO2l5JNw0OJEV8fBxEx7MqCBmeo0oW1L11ZM9MLm3KqL6B8Lf1YtqE9iybmp2/C8QDVb64F4CeiqSKWMnPfqlnLzZhhMHLnscY=', '18057174575', null, '任飞', 'cap.ta.in', '杭州国际服务工程学院', '软件工程172', '2017212212155', '1227872593@qq.com', '1');
INSERT INTO `user` VALUES ('82', 'wyasha', 'FsXYyv0A2MFu3facMZnvid9aFHQ3jNO9RYwKENaEVJ87Z5/vbHtfMN1n5A5+OV26RqzGwp7zmui+IJ2kCI6wW2+CcFM/o22x6hai7MN8zQFuUqM7WmXlPukpSNswiDO3eYmI7YC0zq1romtWCKvpSU/uCe8ufhMGZoZyiF8TWkk=', '13276713551', null, '倪思涛', 'wyasha', '杭州国际服务工程学院', '软工171', '2017212212262', 'white_yasha@163.com', '1');
INSERT INTO `user` VALUES ('83', '2017212212292', 'bgEk7/HVxF9vzo09MITCyNcJEEp3VhNijTj5E6jlm2ANGSBFyiNNVMEbitsTramjhnuWDQgp0+Oy6/beYiGod2f1+Kk98ZhxlZV64ocV4nOBXno7Fqs8D2ooaRt9rTu/QjT0amsG4N7n3m41MKtYR5N5kRR4c6VLX30VG0eSL/A=', '17816131993', null, '施博彦', 'SBYQWDZNB', '杭州国际服务工程学院', '计算机174', '2017212212292', '910506129@qq.com', '1');
INSERT INTO `user` VALUES ('84', '736950061', 'r8/MPy+tWeTxYQBdbVUsnaWcfhHHPg+FMIveoRbUmQEsr1Ez/+uP008J7P9Vw7s2XlBy0P8r4DA/uLf1x3JvVNzz5J5uyTH8WLNNyfDrCM1uNB63lAY9mN4ACZmsIugbJTJsY7delp3bW920/CxuWLj7cEhS8rfKjqC2ADwDqk8=', '15355461128', null, '许天弘', 'Aive', '杭州国际服务工程学院', '软件工程172班', '2017212212130', '736950061@qq.com', '1');
INSERT INTO `user` VALUES ('85', 'lxt', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '17376594407', null, '郑文杰', 'lxt', '杭州国际服务工程学院', '软工172', '2017212212129', '1815239456@qq.com', '1');
INSERT INTO `user` VALUES ('86', '2017212212184', 'd4Qh1t8mchVyWie8Ppb7J/By2H2BX53nY6vZw0OujI3qlo3uOLjXFBgtEUFRVQE4Ee3Kmkmry9jJNHNN5Sl50HO45DCHSf/P7OpvRCWUcqtIHNfidjSZJbxnWA9v4fD4mN6/j1zS32gSipJgMlcdiTa37tzl0IvWPJyjMfWgJwc=', '17376592394', null, '邵琦', 'Cecilia', '杭州国际服务工程学院', '软工172', '2017212212184', '920852294@qq.com', '1');
INSERT INTO `user` VALUES ('87', '2017212212159', 'mifcD2Rly+ySNGRchtu8ER3E4tLzwF/19CGSE+/bp/op/Iqbu4tXKgoIoRvgyyOWbkOa+DVO/L5Ccc6aUd6hlhHt+ppuFvj6LxvHYA3+wo5xFjNegNDbtBJNS/bytszf66tpX7gL2RHc1h/45m2ktVzllWupVi5O60TXCsP4VYQ=', '18868180248', null, '廖一凡', 'liaoyifan', '杭州国际服务工程学院', '软工172', '2017212212159', '1548200903@qq.com', '1');
INSERT INTO `user` VALUES ('88', '2017212212046', 't9D4V70f6Nv70IwIwGr64ns3sKXJEzlN/LM/5yRTOqmlX7bKH/9rFwLOva5KXLPmz+n2qgKLG7mzd6oS0XCvTLU7CTGTJ0spuk5kIQzJlOuTQWBl7gQ0Q4wgXYzryI9r2CA4md76qO/F3YfOjJjQZRgLm2S+xqiKDrKol2AsrS8=', '17376598321', null, '李文欣', 'abc', '杭州国际服务工程学院', '软工172', '2017212212046', '793433456@qq.com', '1');
INSERT INTO `user` VALUES ('89', '2017212212185', 'LQUqsEwnQPKI2+Wh1wOLAEMcS2fqCgLemgYrj0iOK5orM9VlenOq0FWynWhzmb+8qD8gOCTKKdwM55TiqlOxe+F7kgX2pbga8erjUyV56jFDOTOckj6HsE/7uPtQXinK7oMBmPNKw7j8bb2dE1WHccoysvW3XYAdjKYg25xA4DU=', '17376595448', null, '卢靖凯', 'Amose', '杭州国际服务工程学院', '软工172', '2017212212185', '792936254@qq.com', '1');
INSERT INTO `user` VALUES ('90', 'HuLaHa', 'NOfZR0zjadyPuVoQJURlX880cOJ5xxFsYM4J6I15NRkLAiBkPhVQn77+eSNlS78jbiVIxkpNAo09V2rCLoyfpcuso+vUs6N6cq1Quw8qP6mqh+OLcwNOjoEmGuNY5H+KEzVakJTLc4eIU+pImWTUFkleBWiH/y4xAhZ2IA4VDBc=', '17774017725', null, '王灿金', 'MoYu', '杭州国际服务工程学院', '软工172', '2017212212005', '1738058764@qq.com', '1');
INSERT INTO `user` VALUES ('91', '2017212212188', 'HAgNSVu+Iy4sopWhzSf/46Ly+TEXbuO4RvuoRTAv5bVbVWW7NdjvlomYljCLXd4PYj+31XcXzSODOsrDLs9GrGpc3lXPP/PoGi35/YHJ1VvJQqaPTpKuOzsdaW6ssSNh6wXlCQxYSYRhNSOlyw2dcFdMdjb4f4kUV8cORFxEQ8w=', '15355485958', null, '何志杰', 'Anone', '杭州国际服务工程学院', '软工172', '2017212212188', '1520800291@qq.com', '1');
INSERT INTO `user` VALUES ('92', 'barbing', 'WnfeKgxLKPoyUin+MAQJjtEcRarnBPwtXGbc9E+m9lPYCOk8Plp3IDHARAfJUIO8oX5b7daWwwg/0+KY7YCIUm47N0n0E7fVjQ+QSU+EW4HNRvQeB30qp8QrPln/+RwPy42wbfppByMlG3lRmyA4+UWjQla1tedtSxT0ZhJ9fiI=', '15988863902', null, '章范兴国', '章范兴国', '杭州国际服务工程学院', '软工172', '2017212212319', '495001357@qq.com', '1');
INSERT INTO `user` VALUES ('93', '2017212212003', 'jV+r8sNv31Z4jJ7UJk6IBR1XRp32A1mu9XSwAVa1m80fs0NlMq9RM/0q7hctKgGc84+W4n1wiqQ/vk4x3lDa32onPE2Qf0S9cO+z9BrX8uPy+9h3HldB9fBwf7+lZnw9gDEXZCU0utpD44l1n/JUWN/EwEQANrsVWd++oTHb27U=', '18057174590', null, '曹健', 'Mr_Cao', '杭州国际服务工程学院', '软工172', '2017212212003', '996296679@qq.com', '1');
INSERT INTO `user` VALUES ('94', '2017212212199', 'pIDKSusf7CKi9UOqzSfNfVnZqTo9/erxfI0RZl8pV7TafEVlCAdywXS6dUsGsAlOXRnh9IUXalvnLFRC7Hmm/BEbEFuGgv0lv6/YsAXe8jaN86RKoC6c5/FG7zZ+eTYpzXieohYMVt4o4D/F+kLa/JJt9F/DRsNUo4Fg8uac2CY=', '18868178493', null, '胡毅杰', '赛纳蓝色的海', '杭州国际服务工程学院', '软件工程171', '2017212212199', '945019529@qq.com', '1');
INSERT INTO `user` VALUES ('95', '1748222189', 'yXuRXcNniWPGPb8RXVwELSD79sNH2IkvibPkLtmbXhyKBic1PqrXIA4Jbtu1fImDLsxtmOiXmOUbG3NItHvyXFZBIr5wivYYRBDGhIu6+M+GwP3gjIXubHy4kX4hrdeWmrOqRCHr1uFxVHBWU0NHjGj+4TxzHA17hyxPxx9frjo=', '18868175661', null, '石杲楠', 'QZ', '杭州国际服务工程学院', '软工172', '2017212212182', '1748222189@qq.com', '1');
INSERT INTO `user` VALUES ('96', '2017212212194', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '16023640115', null, '杨承翰', '杨承翰', '杭州国际服务工程学院', '计科174', '2017212212194', '2231587838@qq.com', '1');
INSERT INTO `user` VALUES ('97', '2017212212206', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '15355465848', null, '虞月', 'yuyue', '杭州国际服务工程学院', '软工171', '2017212212206', '736514237@qq.com', '1');
INSERT INTO `user` VALUES ('98', 'f1456237894', 'Kzg52UlJISbzqK+bNAPdymhOviI/FBl1hOMyEW4pIh0k6i5/OaCKfuuZrEz6yVCaELq5WgJv7akwaHjdlO1qYZcRCsVuu7NudiT0GBRuDNIldnCqNTWreJ9aPiPaz2KGY+8l55LH2sj1iG5sLxOFv44HERVS79f7fW0CXswb8Gc=', '17376593424', null, '顾方宇', '夜半雨城', '杭州国际服务工程学院', '软工172', '2017212212120', 'gfy2345@163.com', '1');
INSERT INTO `user` VALUES ('99', 'lxl19990520', 'Nac/X5j3V5+OqNqU1p/sZoLu+J0bCjRbbPR0VxzVZj1LB1N3giHJaLZin/o4Gwm4qDXeSKLgTol1WAqaVaSaaM1byLu6Ttu2IZOHIEKJqwrT7mWqExgFTCarpkT3igd7tGczh/8Tot5Fsg6dd18kZAE4nKMsG5SdA/pazqniCho=', '17816612520', null, '林相龙', '我永远喜欢加藤惠', '杭州国际服务工程学院', '软工172', '2017212212150', '949826078@qq.com', '1');
INSERT INTO `user` VALUES ('100', '2017212212191', 'prJq0Ylvqs36JReKDwibfp98H+yP8/hYVpKK9bu4kBOJNitssR/tJN4TFPH1oYBbtXb0C/0eP6gZzPToVmrIbg6mXB/OPNEdlkOh2r0ck+FX5qvb4x/9mxPvliiCFktA5GLPR39yl+jgWh95wz4+sgQJQX5ySny2Z58u1U2r/rw=', '18868182453', null, '陈健', 'cjcj', '杭州国际服务工程学院', '软件工程172', '2017212212191', '794705416@qq.com', '1');
INSERT INTO `user` VALUES ('101', '2265526363', 'THZPuSIh6rmzJPgoBDYFhJKsKE4HbQv9mEg69my60jDjqtO5vVS7mkpyKKe/2rDRMQ8LN4MBQCUyz86vFldlLUyKE4zGFx8lyHITF5bXGQFwJKK0D3j9Lkr6YLqgDhIKxMXGMqHl4xmV9RH1MElKop0VDJqXkTmpKqbNQa2wiTI=', '18868182467', null, '郑江涛', '秀秀秀', '杭州国际服务工程学院', '软工172', '2017212212190', '2265526363@qq.com', '1');
INSERT INTO `user` VALUES ('102', 'skye', 'KJ/w4P+DJsAJXOz8gm3CvzeK4tfKj3eZQ3jOOGjOpXNq7cEs7T5VPqiXHNUJpqIC/pX+rFbEwb94kuQwwndD+MPJMPCzBr+AaqMzLJFfDEd0QlEDCPqoiK+o3v1CHvFOAj+6iGjOfkEe0LpvEr/2PrxxAWiyeq3Xx2kwn3ChA3s=', '17376593078', null, '叶佳新', 'skye', '杭州国际服务工程学院', '软件工程 软工172', '2017212212151', '839994148@qq.com', '1');
INSERT INTO `user` VALUES ('103', '2017212212198', 'nZR1Mc2VmhkeaIVPcOHyx4wwlORbNlXitDDRjOwZgc8ZZOZ/2jZOyH+xtMgSAU2RArHBTRG6vDtpiqd4bTxN+UcREkrplOg6HkC2U6BStOXAMPIjdITIjKT8jMmXrNMhkAq1XxsKc83q2cKtq4JuHwQ5IFVExflwzQ+H/N5AOS0=', '17376590321', null, '尹泽林', 'lynn', '杭州国际服务工程学院', '软工171', '2017212212198', '1170912881@qq.com', '1');
INSERT INTO `user` VALUES ('104', '2017212212132', 'Du0lYwRFW2VrhoctsG3bty/rOX3H8HrcOONP+68vX7GROL1vzqqanM5wXF8fjxZGzRFEcryKel0coLjd6mQXlLzsxHpytdSPC3RVfScJflnsqimu/rVK01PkBDOsJIfkeuf4kYmyCCLxgpzuqlb+ExKnadH01E87hak3/t1S4bY=', '17305813681', null, '王一斐', '释语', '杭州国际服务工程学院', '软工172班', '2017212212132', '1005337475@qq.com', '0');
INSERT INTO `user` VALUES ('105', '15355478133', 'h1kUE3cKZzN6MaE+GHwse8ZTdj/AUdihUDMxivLedFJQiPcdxOKUjbCaaZWa5x0zxiQlBpQT/SaWDfHIdw8pG3UXh2D2bBYiEmI4Ge4WHVXNC6cCDPy0wUYUcEQP5pkVU1P/jTSvxeuYoWxrvw+aMU4xmXyQStsg9CwFo3DOr88=', '15355478133', null, '汤伊杰', '神鹰蛭石', '杭州国际服务工程学院', '软工172', '2017212212320', 'wowokkkkj@163.com', '1');
INSERT INTO `user` VALUES ('106', '499358612', 'eL0k7Y4NOtQPyILOwB8xUVuKxD1i4hIXfu9POOHPtQPGPb511JusASaYhhc/jVGrySEBnyjeT+5JPAVTI7rT7zb5DsW/FrRJJ0TzEMUNNSwlLZAqh7UmkhBxZF9Vvj05u1P9ZIGmdcEtuvT0duzjux7eJOIMM4r98KsxkbSlkhs=', '17816613869', null, '石孟可', '墨石', '杭州国际服务工程学院', '计算机（金融） 173班', '2017212212108', '499358612@qq.com', '1');
INSERT INTO `user` VALUES ('107', '2017212212105', 'EX6LzTikQ2U9HXuMGHrOdfEjmTTOvzCrH48zQPPMam5Z+gT4KIAXKVMTSbT7FjscGmWYxMPaLT4NrDGcbzwr1fzUUbwcbnq64zlPg3SzNkzbY6I987u88dw7QHkdr15pXbnoNwAUdsruXmpYxs8UFP+Yhet9xUFsBIkGJQpfRX8=', '17376592247', null, '潘天鸿', '潘天鸿', '杭州国际服务工程学院', '计算机173', '2017212212105', '957087222@qq.com', '1');
INSERT INTO `user` VALUES ('108', '1600346867', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '15988863827', null, '苏灵杰', 'susu', '杭州国际服务工程学院', '软工172', '2017212212147', '1600346867@qq.com', '1');
INSERT INTO `user` VALUES ('109', '2017212212168', 'g60Sr67GIFk4HrLNmRyX2BJrBOg8IUIzXIwWOqq99kz4UwPnJKK+RW3ZaeXGcNLoQ2Fw9On76DaFh73HKsr71mRScxgDy1Zs4rEiT4h8liO89jkuV/fV1ifRx5Oo4itbR3h1zG1eDXFwEFqOWim5au1fhK1wTApQ4jL0kZ1NNUg=', '18368160521', null, '向顺', 'xs', '杭州国际服务工程学院', '计算机173', '2017212212168', '2983738599@qq.com', '1');
INSERT INTO `user` VALUES ('110', '2017212212067', 'GTYEqBL0Wff1wdrmuB3JRJrC/lnITSCJ63T1QEMLxgIFtZNnLn/kM44whxEmi0JwxiuupCGPup/96+S60MrBX0cZDg+TDKrr5PFrbqua8YTy7fyW+uGslLKZUGLm3M4Wv2iipB582Mq4z8iFCj33NyN1/QBjwKkyYwJvcwmfYjk=', '17376597608', null, '王之泓', '王之泓', '杭州国际服务工程学院', '计算机金融173', '2017212212067', '1251994030@qq.com', '1');
INSERT INTO `user` VALUES ('111', '1554852304', 'X6DvvFbV1QPC2zyqEm6qe7RZMOYrz88UTOJCSpvcejOqNt451asdOVE3dk/IrgoTkBJEtGzz8LOjZ6G34zIHMWd7uSGgJNZpGPw0Uh4av1qx5Q0hIMBJDTyGmLwgM/pCi4ytkqHZr+UIukjZiPJSb4zZbrXrO/gzF/DNY2WzwA0=', '18057174552', null, '黄逸清', 'hyq', '杭州国际服务工程学院', '软件工程172', '2017212212303', '1554852304@qq.com', '1');
INSERT INTO `user` VALUES ('112', '2017212212301', 'eqNQjfEh/4xSgbWYwGm5ijLCW1k4/lBafrWt0FN/BCKKeDcwu01Id3tCRRxeUD/xf77dWMBpo4NyjfvIaKrQ1OU6O3Jk9ECnbCmrf4bDV3CjIkAW2yWc12/Tdiq1LUblRv6vOmPn2/tva3LuVvoRy/ymbAITgkdi5PvIF8R58Mw=', '15355496711', null, '王耀辉', 'Kabuto', '杭州国际服务工程学院', '软工172', '2017212212301', '282943394@qq.com', '1');
INSERT INTO `user` VALUES ('113', 'ceshi001', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560000', null, '小明', '演示员-小明', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210101010', '123456@qq.com', '1');
INSERT INTO `user` VALUES ('114', 'ceshi003', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560002', null, '小美', '演示员-小美', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210303030', '123458@qq.com', '0');
INSERT INTO `user` VALUES ('115', 'ceshi002', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560001', null, '小红', '演示员-小红', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210202020', '123457@qq.com', '0');
INSERT INTO `user` VALUES ('116', 'ceshi004', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560003', null, '小小', '演示员-小小', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210303031', '123459@qq.com', '0');
INSERT INTO `user` VALUES ('117', 'ceshi005', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560011', null, '小鹏', '演示员-小鹏', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210505050', '123451@qq.com', '1');
INSERT INTO `user` VALUES ('118', 'ceshi006', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560022', null, '小军', '演示员-小军', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210606060', '123452@qq.com', '1');
INSERT INTO `user` VALUES ('119', 'ceshi007', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560033', null, '小王', '演示员-小王', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210707070', '123453@qq.com', '1');
INSERT INTO `user` VALUES ('120', 'ceshi008', 'DnYMGfSHrl06Zjj9Q2a5lx3if7GQmZAHgrzxUCyVppOQqm2zAq/NKsEtjNw91t7ExbKhYy4AkGBYExxBLy8FtorD5oz9HQQe1asPSn+1r1FN5lpyyEeqmDhPNpi1bRMyRZ4RF+I1nlya9lFb+MwsLjyXttzBmBOry0RwAWeTXek=', '13396560088', null, '小丽', '演示员-小丽', '杭州国际服务工程学院', '计算机科学与技术163班', '2016210808080', '123455@qq.com', '0');
