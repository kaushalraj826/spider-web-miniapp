
CREATE DATABASE IF NOT EXISTS spider_web;

USE spider_web;


/* =========================
   USERS
========================= */

CREATE TABLE users (

  id BIGINT PRIMARY KEY,

  username VARCHAR(100),

  first_name VARCHAR(100),

  xp INT DEFAULT 0,

  stars INT DEFAULT 0,

  level INT DEFAULT 1,

  referral_code VARCHAR(32) UNIQUE,

  referred_by BIGINT NULL,

  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


/* =========================
   TASKS
========================= */

CREATE TABLE tasks (

  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255),

  description TEXT,

  reward_xp INT DEFAULT 0,

  reward_stars INT DEFAULT 0,

  type VARCHAR(50),

  link VARCHAR(500),

  active TINYINT DEFAULT 1,

  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


/* =========================
   TASK CLAIMS
========================= */

CREATE TABLE task_claims (

  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT,

  task_id INT,

  claimed_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY one_claim (
    user_id,
    task_id
  )

);


/* =========================
   TRANSACTIONS
========================= */

CREATE TABLE transactions (

  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT,

  type VARCHAR(50),

  amount INT,

  currency VARCHAR(20),

  note VARCHAR(255),

  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


/* =========================
   WITHDRAWALS
   Currently disabled in app
========================= */

CREATE TABLE withdrawals (

  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT,

  amount DECIMAL(18,2),

  currency VARCHAR(20),

  status VARCHAR(30)
    DEFAULT 'pending',

  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP

);


/* =========================
   SETTINGS
========================= */

CREATE TABLE settings (

  setting_key VARCHAR(100) PRIMARY KEY,

  setting_value TEXT

);
