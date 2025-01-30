-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: 3axes_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','$2b$10$OADE0EshteJ30cmkVbgq9OaQrR/UQs9bQq5n2M4V54QleiyJOYDwe','2025-01-27 07:42:06');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `short_desc` text,
  `long_desc` text,
  `images` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Prosthetic Hand Project','3D printed prosthetic hands for children in need','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius nunc eu viverra lobortis. Proin condimentum leo hendrerit quam pharetra posuere id in diam. Nunc placerat ullamcorper metus sit amet lacinia. Donec ac commodo nunc. Donec auctor vehicula pulvinar. In et porttitor dui. Morbi id odio a turpis accumsan vehicula. Aliquam diam eros, ullamcorper congue hendrerit quis, rutrum porta nisi. Sed finibus lorem id blandit malesuada. Ut at ex in purus dignissim vestibulum. Pellentesque in dictum nibh. Etiam tempor sapien et vehicula semper. Vivamus ac diam neque. In eu magna a nunc mattis rutrum. Aenean aliquam pulvinar dui, vitae vehicula mauris ornare quis. Donec nec ultricies massa, sed dignissim est. Vivamus placerat, libero quis interdum tempus, nisi nisl finibus dui, sed rhoncus risus nunc eu turpis. Aenean sed velit ultrices, scelerisque tortor vel, tincidunt mi. Nulla sed nisi commodo, pulvinar nibh facilisis, accumsan eros.','[\"https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnV0dXJlfGVufDB8fDB8fHww\", \"https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1737024251796-dd751b4d9365%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D424%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fwordmark.png%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM3Nzc0MDQyfA%26ixlib%3Drb-4.0.3&blend-w=1&auto=format&fit=crop&q=60\"]'),(8,'Campus Innovation Hub','Creating a makerspace for engineering students','Maecenas vel pulvinar lorem, a tincidunt tellus. Praesent tortor enim, consequat vel lorem eget, varius placerat ipsum. Etiam tincidunt tincidunt consequat. Vivamus non tempor lectus, quis fermentum ante. Donec rutrum quis turpis nec tempus. Duis gravida arcu ipsum, at egestas lacus fringilla efficitur. In arcu velit, iaculis sit amet dapibus in, placerat ut ipsum. Vivamus quis ex a elit efficitur sollicitudin sed et turpis. Curabitur et interdum enim. Sed condimentum, ipsum vel euismod rutrum, nibh orci pulvinar lectus, id sagittis diam nulla at diam. Donec condimentum tristique egestas.','[\"https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww\", \"https://images.unsplash.com/photo-1508402476522-c77c2fa4479d?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3\"]'),(9,'Sustainable Housing','3D printed sustainable housing solutions','porttitor, egestas tempor dolor. Maecenas congue maximus iaculis. Mauris dapibus tempus sodales. Sed pharetra gravida lacus sed sollicitudin. Pellentesque magna ligula, posuere a elit ac, venenatis molestie dolor. Duis egestas rutrum cursus. Donec tincidunt dignissim aliquet. Vivamus hendrerit massa consequat metus gravida dignissim. Ut efficitur tortor eget lobortis ultrices. Maecenas vel pulvinar lorem, a tincidunt tellus. Praesent tortor enim, consequat vel lorem eget, varius placerat ipsum. Etiam tincidunt tincidunt consequat. Vivamus non tempor lectus, quis fermentum ante. Donec rutrum quis turpis nec tempus. Duis gravida arcu ipsum, at egestas lacus fringilla efficitur. In arcu velit, iaculis sit amet dapibus in, placerat ut ipsum. Vivamus quis ex a elit efficitur sollicitudin sed et turpis. Curabitur et interdum enim. Sed condimentum, ipsum vel euismod rutrum, nibh orci pulvinar lectus, id sagittis diam nulla at diam. Donec condimentum tristique egestas. Sed sed metus semper lorem tincidunt porttitor. Sed non aliquam risus. In cursus nulla nisl. Pellentesque suscipit ligula sapien. Sed iaculis in purus ut bibendum. Aenean eros augue, pretium eget leo eu, ornare semper orci. Phasellus suscipit, magna in placerat dapibus, nibh nibh','[\"https://images.unsplash.com/photo-1490730141103-6cac27aaab94?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D\", \"https://images.unsplash.com/photo-1480497490787-505ec076689f?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3\"]'),(27,'new post gvsoierkj hgnsoertkj gfgbacweiukf gaeriwu','fbaceirkjbf esrigk beri hfn aeiurkj dkjgbf aerijkg,vh nearojikbv erijkf,mgbaeri hNDFGMBVFNEORJKDFBGA','fvbeiu gfbveari skjgbdf avniwerkjgdbf avneirkmgbd nafierjkdg fnauwierksjdbgf vjesdrfnmg vaiwjekrsghfn vearijkdfbg narewkjgdb fnerkjadg bfnaierjkdgb fnaowielkhtfj apwmioelkg hjaenrouijgk basndou fjlkhearj oigujkbrn ijklahgn soidjfk awerihgnb enrojg nawerisdgb earnosdjkg fvhnwaroeujktf breijkgtd ,mbnqfwaoiresjdgb evihrjmndbg nvaowruskjdbg vneairkjm,dbgfn oacuwjkersmdbg nvjiedfs,mbgnf vcaowjekrmbg vjeaikrm,dsgnf cowajrek,mbg nvejarkmd,gbfnv caoeurjk,mgb nvjoaekrm,sgdnv jiekrnmfdvn aojerkgmd bvearihmnfbg vaoejrkmgdb vnaerijkdfgm,bfn vacwerjokgbfvn eorjg bvneorijkdav r dbg nvjiedfs,mbgnf vcaowjekrmbg vjeaikrm,dsgnf cowajrek,mbg nvejarkmd,gbfnv caoeurjk,mgb nvjoaekrm,sgdnv jiekrnmfdvn aojerkgmd bvearihmnfbg vaoejrkmgdb vnaerijkdfgm,bfn vacwerjokgbfvn eorjg bvneorijkdav r ijkdfgm,bfn vacwerjokgbfvn eorjg bvneorijkdav r dbg nvjiedfs,mbgnf vcaowjekrmbg vjeaikrm,dsgnf cowajrek,mbg nvejarkmd,gbfnv caoeurjk,mgb nvjoaekrm,sgdnv jiekrnmfdvn aojerkgmd bvearihmnfbg vaoejrkmgdb vnaerijkdfgm,bfn vacwerj','[\"/uploads/1738150378703-mahendra-putra-RAlXsqBaUsI-unsplash.jpg\", \"/uploads/1738150409259-michiel-annaert-4H5Y-3oxb0Q-unsplash.jpg\", \"/uploads/1738150409267-steve-johnson-vUGT5AEb1Os-unsplash.jpg\"]');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-30  0:57:05
