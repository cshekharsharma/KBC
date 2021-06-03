-- MySQL dump 10.13  Distrib 8.0.23, for osx10.15 (x86_64)
--
-- Host: localhost    Database: kbc
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `contest_levels`
--

DROP TABLE IF EXISTS `contest_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contestLevel` int NOT NULL DEFAULT '0',
  `levelName` varchar(255) DEFAULT NULL,
  `correctAnswerMoney` int DEFAULT NULL,
  `incorrectAnswerMoney` int DEFAULT NULL,
  `walkAwayMoney` int DEFAULT NULL,
  `isMilestone` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `contestLevel` (`contestLevel`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_levels`
--

LOCK TABLES `contest_levels` WRITE;
/*!40000 ALTER TABLE `contest_levels` DISABLE KEYS */;
INSERT INTO `contest_levels` VALUES (1,1,'LEVEL-1',1000,0,0,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(2,2,'LEVEL-2',2000,0,1000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(3,3,'LEVEL-3',3000,0,2000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(4,4,'LEVEL-4',5000,0,3000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(5,5,'LEVEL-5',10000,0,5000,1,'2021-05-27 00:50:38','2021-06-03 12:18:22',0),(6,6,'LEVEL-6',20000,10000,10000,1,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(7,7,'LEVEL-7',40000,10000,20000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(8,8,'LEVEL-8',80000,10000,40000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(9,9,'LEVEL-9',160000,10000,80000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(10,10,'LEVEL-10',320000,10000,160000,1,'2021-05-27 00:50:38','2021-06-03 12:18:22',0),(11,11,'LEVEL-11',640000,320000,320000,1,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(12,12,'LEVEL-12',1250000,320000,640000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(13,13,'LEVEL-13',2500000,320000,1250000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(14,14,'LEVEL-14',5000000,320000,2500000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0),(15,15,'LEVEL-15',10000000,320000,5000000,0,'2021-05-27 00:50:38','2021-05-26 19:20:38',0);
/*!40000 ALTER TABLE `contest_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_question_mapping`
--

DROP TABLE IF EXISTS `contest_question_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest_question_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contestId` int NOT NULL,
  `questionId` int NOT NULL,
  `contestLevelId` int NOT NULL,
  `isSubmitted` int DEFAULT '0',
  `isCorrect` int DEFAULT '0',
  `isWalkAway` int DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_id_idx` (`questionId`),
  KEY `contest_id_idx` (`contestId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_question_mapping`
--

LOCK TABLES `contest_question_mapping` WRITE;
/*!40000 ALTER TABLE `contest_question_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `contest_question_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `categoryId` int DEFAULT NULL,
  `finalPrizeMoney` int DEFAULT '0',
  `finalContestLevel` int DEFAULT '0',
  `finalQuestionStatus` enum('correct','incorrect','walkaway') DEFAULT NULL,
  `status` enum('not_started','in_progress','completed') DEFAULT 'not_started',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_categories`
--

DROP TABLE IF EXISTS `question_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_categories`
--

LOCK TABLES `question_categories` WRITE;
/*!40000 ALTER TABLE `question_categories` DISABLE KEYS */;
INSERT INTO `question_categories` VALUES (1,'Sports','2021-05-29 22:39:05','2021-05-29 17:09:05',0),(2,'Entertainment','2021-05-29 22:39:12','2021-05-29 17:09:12',0),(3,'Science & Technology','2021-05-29 22:39:18','2021-06-03 11:18:58',0),(4,'History','2021-05-29 22:39:23','2021-05-29 17:09:23',0),(5,'Politics & Law','2021-05-29 22:39:31','2021-06-03 11:19:12',0),(6,'General Knowledge','2021-05-29 22:40:08','2021-05-29 17:10:08',0),(7,'Finance & Ecnonomics','2021-05-29 22:40:38','2021-05-29 17:10:38',0),(8,'Mythology','2021-06-03 16:38:02','2021-06-03 11:08:02',0);
/*!40000 ALTER TABLE `question_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contestLevel` int DEFAULT NULL,
  `questionStatement` text NOT NULL,
  `optionA` text,
  `optionB` text,
  `optionC` text,
  `optionD` text,
  `correctOption` int DEFAULT NULL,
  `questionCategory` int DEFAULT NULL,
  `questionMetadata` text,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,3,'When a batsman gets out without facing any delivery, what is he called?','Silver Duck','Golden Duck','Diamond Duck','Platinum Duck',3,1,NULL,'2021-06-03 01:48:41','2021-06-03 11:09:25',0),(2,8,'Which mountain has highest casualty rate in the world?','Nanga Parbat','K2','Kangchenjunga','Annapurna',4,6,NULL,'2021-06-03 01:48:41','2021-06-03 11:16:53',0),(3,7,'Who was the first foreigner muslim invader of India','Mahommad-Bin-Qasim','Muhammad Gauri','Mahmud of Ghazni','Muhammad-Bin-Tughlaq',1,4,NULL,'2021-06-03 01:48:41','2021-06-03 11:13:28',0),(4,6,'What body is the center of each galaxy in the universe?','Planetary Nebula','Black Hole','Giant Star','Dwarf Star',2,3,NULL,'2021-06-03 01:48:41','2021-06-03 11:18:27',0),(5,10,'Which of the following is not a systematic investment method?','High Yield Bonds','Invoice Discounting','RBI Taxable Bonds','Pradhan Mantri Vaya Vandana Yojana (PMVVY)',1,7,NULL,'2021-06-03 01:48:41','2021-06-03 11:17:51',0),(6,8,'Who amongst the following has never been appointed as defense minister of India?','Nirmala Sitharaman','Pramod Mahajan','Yashwant Sinha','Mulayam Singh Yadav',3,5,NULL,'2021-06-03 01:48:41','2021-06-03 11:15:25',0),(7,3,'Which bollywood actor debuted first amongst the following?','Shahrukh Khan','Ajay Devgn','Suniel Shetty','Akshay Kumar',4,2,NULL,'2021-06-03 01:48:41','2021-06-03 11:11:16',0),(8,9,'On which of the following rates Reserve Bank of India provides loan to scheduled commercial banks?','Repo Rate','Reverse Repo Rate','Credit Rate','Bank Rate',4,7,NULL,'2021-06-03 01:48:41','2021-06-03 11:17:51',0),(9,2,'What is the capital of New Zealand?','Aukland','Wallington','Christchurch','Hamilton',2,6,NULL,'2021-06-03 01:48:41','2021-06-03 11:16:53',0),(10,5,'Which of the following is not a German automobile brand?','Renault','BMW','Volkswagen','Daimler',1,6,NULL,'2021-06-03 01:48:42','2021-06-03 11:16:53',0),(11,4,'Who authored the poem \"कुछ सपनों के मर जाने से, जीवन नहीं मरा करता है।\"?','Sumitra Nandan Pant','Ramdhari Singh Dinkar','Gopal Das Neeraj','Harvansh Rai Bachchan',3,6,NULL,'2021-06-03 01:48:42','2021-06-03 11:16:53',0),(12,6,'How does a star die?','By collision with another star','When reaches black hole area','When all hydrogen is exhausted','When crosses galaxy range',3,3,NULL,'2021-06-03 01:48:42','2021-06-03 11:18:27',0),(13,5,'What was the name of Draupadi\'s brother in Mahabharata?','Ashwasthama','Dhrishtadyumna','Uluka','Vrishaketu',2,8,NULL,'2021-06-03 01:48:42','2021-06-03 11:10:28',0),(14,1,'What is name of first lover of Geet Dhillon in \"Jab We Met movie\"?','Anshuman','Ayushman','Armaan','Aditya',1,2,NULL,'2021-06-03 01:48:42','2021-06-03 11:11:16',0),(15,1,'How many zeros (0) are there in 10 trillian?','10','11','12','13',4,6,NULL,'2021-06-03 01:48:42','2021-06-03 11:16:53',0),(16,2,'What country Cristinao Ronaldo represents in international football?','France','Portugal','Brazil','Italy',2,1,NULL,'2021-06-03 01:48:42','2021-06-03 11:09:25',0),(17,4,'Which of the following cricketer does not have an IPL hattrick?','Yuvraj Singh','Rohit Sharma','Jasprit Bumrah','Shane Watson',3,1,NULL,'2021-06-03 01:48:42','2021-06-03 11:09:25',0),(18,9,'Who wrote the famous book \"Why I am a hindu\"?','Shashi Tharoor','Arundhati Roy','Atal Vihari Vajpayee','Ramchandra Guha',1,6,NULL,'2021-06-03 01:48:42','2021-06-03 11:16:53',0),(19,10,'Which of the following statement is correct about the NITI Aayog?','NITI Aayog was Formed 25 January 2016','NITI Aayog comes under the Ministry of Commerce and Industry','The full form of NITI Aayog is National institute for Transforming India','The NITI Aayog is a policy think tank of the Government of India',4,5,NULL,'2021-06-03 01:48:42','2021-06-03 11:15:25',0),(20,11,'Which animal mothers \"sing\" to their newborns?','Cuckoos','Pigs','Rabbits','Cats',2,6,NULL,'2021-06-03 01:48:42','2021-06-03 11:23:15',0),(21,14,'Who became the first chancellor of Aligarh Muslim University in 1920?','Sultan Jahan Bagum','Maulana Abul Kalam Azad','Sir Sayed Ahmed Khan','Mir Usman Ali Khan',1,4,NULL,'2021-06-03 01:49:59','2021-06-03 11:13:28',0),(22,14,'Where in Singapore did Netaji Subhash Chandra Bose make the first proclamation of an Azad Hind government?','Cathay Cinema Hall','Fort Canning Park','National University of Singapore','National Gallery of Singapore',1,4,NULL,'2021-06-03 01:50:15','2021-06-03 11:13:28',0),(23,13,'Which colonial power ended its involvement in India by selling the rights of the Nicobar Islands to the British on October 18, 1868?','Portugal','Italy','Denmark','France',3,4,NULL,'2021-06-03 01:50:32','2021-06-03 11:13:28',0),(24,13,'Which of the following judgement is considered to have saved Indian democracy?','KM Nanavati Case (1959)','AK Gopalan Case (1950)','Kesawanand Bharti Case (1973)','Indira Gandhi vs Raj Narain Case (1975)',3,5,NULL,'2021-06-03 01:50:52','2021-06-03 11:15:25',0),(25,15,'Kishore Kumar made this movie to evade taxes, hoping it would fail commercially, but it was extremely successful.','Chalti Ka Naam Gaadi','Padosan','Door Gagan Ki Chhav Me','Do Raste',1,2,NULL,'2021-06-03 01:51:06','2021-06-03 11:11:16',0),(26,12,'Which of the following is not a member of the vitamin B complex?','Riboflavin','Ascorbic Acid','Thiamine','Folic Acid',2,3,NULL,'2021-06-03 01:51:23','2021-06-03 11:18:27',0),(27,6,'Which statement describes the atmosphere of the planet correctly?','Venus is mostly carbon dioxide','Mercury is mostly nitrogen','Earth is mostly oxygen','Saturn is mostly helium',1,3,NULL,'2021-06-03 01:53:32','2021-06-03 11:18:27',0),(28,11,'What does \"Civil Equality\" implies?','Equality of opportunity','Equal distribution of wealth','Equal right to participate in state affairs','Equality before law',4,7,NULL,'2021-06-03 16:25:55','2021-06-03 11:17:51',0),(29,7,'Sage Pulastya\'s grandson, who went on to become a mighty king?','Janak','Bhishma','Dushyanta','Ravana',4,8,NULL,'2021-06-03 17:02:49','2021-06-03 14:46:03',0),(30,12,'Who is called \"Father of Biology\" for his biological classification thoeries?','Gregor Mendal','Charles Darwin','Aristotle','Euclid',3,3,NULL,'2021-06-03 17:18:46','2021-06-03 11:59:55',0),(31,15,'Which of these artist was principally entrusted with the task of \'illuminating\' the original document of Constitution of India?','Ramkinkar Baij','Binod Behari Mukherjee','Abanindranath Tagore','Nandlal Bose',4,6,NULL,'2021-06-03 17:28:35','2021-06-03 14:45:06',0),(32,5,'Which of the following athlete won individual Olympic madel for India?','P.T. Usha','Leander Paes','Milkha Singh','Anju Bobby George',2,1,NULL,'2021-06-03 20:25:50','2021-06-03 14:56:58',0),(33,7,'Which Indian physicist worked with Albert Einstein to discover \"God Particles\"?','S. Chandrasekhar','Satyendra Nath Bose','Meghnad Saha','CV Raman',2,5,NULL,'2021-06-03 21:33:38','2021-06-03 16:03:38',0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `emailId` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `gender` enum('male','female','other','NA') DEFAULT 'NA',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-03 21:39:24
