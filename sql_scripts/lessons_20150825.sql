/*
 Navicat MySQL Data Transfer

 Source Server         : 211 mysql
 Source Server Version : 50147
 Source Host           : 10.10.38.211
 Source Database       : vc

 Target Server Version : 50147
 File Encoding         : utf-8

 Date: 08/25/2015 18:13:08 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `lessons`
-- ----------------------------
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `description` text NOT NULL,
  `reason` text NOT NULL,
  `solution` text NOT NULL,
  `label` varchar(128) NOT NULL,
  `department` varchar(128) NOT NULL,
  `catalog` varchar(128) NOT NULL,
  `author` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `is_published` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `lessons`
-- ----------------------------
BEGIN;
INSERT INTO `lessons` VALUES ('25', '话费退款流程遗漏部分设计（2014/11/4）', '管理平台发起退款失败，返回正话单不存在。', '1. 退款流程设计不对，由于21（平台失败，银行成功）的差异不会有正话单，所以退款失败。\n2. 由于话费充值一卡通时，话费支付成功并且充值一卡通后台账户成功后，才会入正话单。但是支付成功，充值失败后不会入正话单，但是会发起解冻请求。\n3. 如果解冻失败，与话费平台对账之后，会有一笔21的差异，这种差异只能从管理平台发起退款。\n4. 如果是已经入了正话单，但是与商户对账发现有12的差异（平台成功，商户失败），解冻请求也不能满足给用户退款。', '1.针对21的差异，不需要校验正话单是否存在，直接发起解冻请求。\n2.针对12的差异，不需要发起解冻请求（原因是：已入正话单的话费不能被解冻），直接入负话单。\n', '', '移动应用事业部-开发组', '设计', '吴莎', '2015-08-25 08:16:22', '2015-08-25 08:16:22', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
