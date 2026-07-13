# Server banne ke baad uska Public IP terminal par dikhane ke liye
output "public_ip" {
  description = "Aapke naye EC2 instance ka Public IP"
  value       = aws_instance.kind_server.public_ip
}