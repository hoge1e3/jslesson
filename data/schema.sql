-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: bitarrow
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessToken`
--

DROP TABLE IF EXISTS `accessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessToken` (
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `token` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` text,
  `files` text,
  `criteria` text,
  `time` int DEFAULT NULL,
  `deadline` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bigdata`
--

DROP TABLE IF EXISTS `bigdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bigdata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int DEFAULT NULL,
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `device` varchar(32) DEFAULT NULL,
  `location` varchar(32) DEFAULT NULL,
  `address` varchar(32) DEFAULT NULL,
  `group` varchar(32) DEFAULT NULL,
  `practice` varchar(32) DEFAULT NULL,
  `str1` varchar(50) DEFAULT NULL,
  `num1` double DEFAULT NULL,
  `str2` varchar(50) DEFAULT NULL,
  `num2` double DEFAULT NULL,
  `str3` varchar(50) DEFAULT NULL,
  `num3` double DEFAULT NULL,
  `str4` varchar(50) DEFAULT NULL,
  `num4` double DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23314 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `options` text,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `errorSeq`
--

DROP TABLE IF EXISTS `errorSeq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `errorSeq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `head` int DEFAULT NULL,
  `tail` int DEFAULT NULL,
  `recovery` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6162 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `keyvalue`
--

DROP TABLE IF EXISTS `keyvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyvalue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `key` varchar(128) DEFAULT NULL,
  `value` mediumtext,
  `group` varchar(50) DEFAULT NULL,
  `time` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int DEFAULT NULL,
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `result` varchar(40) DEFAULT NULL,
  `detail` text,
  `raw` text,
  `errorType` varchar(255) DEFAULT NULL,
  `errorPos` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `log_by_class_time` (`class`,`time`),
  KEY `log_by_class_user_file` (`class`,`user`,`filename`)
) ENGINE=InnoDB AUTO_INCREMENT=9849436 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logtag`
--

DROP TABLE IF EXISTS `logtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logtag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `log` int DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `detection` text,
  `options` text,
  `detail` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=314094 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mailToken`
--

DROP TABLE IF EXISTS `mailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailToken` (
  `token` varchar(50) DEFAULT NULL,
  `mail` text,
  `class` varchar(50) DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL,
  `purpose` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mark`
--

DROP TABLE IF EXISTS `mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int DEFAULT NULL,
  `submission` int DEFAULT NULL,
  `result` varchar(32) DEFAULT NULL,
  `manual` int DEFAULT NULL,
  `read` int DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11046 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mysession`
--

DROP TABLE IF EXISTS `mysession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mysession` (
  `id` varchar(50) DEFAULT NULL,
  `time` int DEFAULT NULL,
  `data` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pub_class`
--

DROP TABLE IF EXISTS `pub_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pub_class` (
  `url` varchar(32) DEFAULT NULL,
  `class` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pub_user`
--

DROP TABLE IF EXISTS `pub_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pub_user` (
  `url` varchar(32) DEFAULT NULL,
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `project` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `published`
--

DROP TABLE IF EXISTS `published`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `published` (
  `url` varchar(32) DEFAULT NULL,
  `class` varchar(32) DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL,
  `project` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `user` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `options` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` int DEFAULT NULL,
  `assignment` int DEFAULT NULL,
  `user` varchar(32) DEFAULT NULL,
  `files` text,
  `source` varchar(32) DEFAULT NULL,
  `output` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11759 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `name` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `options` varchar(255) DEFAULT NULL,
  `shadow` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `class` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `options` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `class` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `options` text,
  `shadow` text,
  `passenc` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-26 11:01:38
