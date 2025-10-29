variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "ami_id" {
  description = "Ubuntu AMI ID"
  default     = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
}

variable "key_name" {
  description = "SSH key name"
  type        = string
}