CREATE TABLE job_posting (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  job_description TEXT NOT NULL,
  about_lu TEXT NOT NULL,
  status ENUM("active", "inactive") DEFAULT "active",
  contract_type ENUM("Full-Time", "Part-Time"),
  additional_info TEXT,
  qualifications TEXT,
  locations TEXT,
  job_title TINYTEXT NOT NULL,
  application LONGBLOB,
  primary key(id)
)
