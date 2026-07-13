terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Hum Mumbai (India) region use kar rahe hain
provider "aws" {
  region = "ap-northeast-2" 
}