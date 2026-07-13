# EC2 Instance Creation
resource "aws_instance" "kind_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium" # K8s ke liye minimum safe specs (2 vCPU, 4GB RAM)
  
  # DHYAN DEIN: Yahan apne AWS account ki SSH key ka naam daalein
   key_name = "mizo" 

  vpc_security_group_ids = [aws_security_group.kind_sg.id]

  # Storage: 20 GB (Docker images aur K8s volumes ke liye)
  root_block_device {
    volume_size = 20 
    volume_type = "gp3"
  }

  # User Data: Server start hote hi yeh commands automatically chalengi
  user_data = <<-EOF
              #!/bin/bash
              # Update and install Docker
              apt-get update
              apt-get install -y docker.io curl
              systemctl enable --now docker
              usermod -aG docker ubuntu

              # Install kubectl
              curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
              chmod +x ./kubectl
              mv ./kubectl /usr/local/bin/kubectl

              # Install kind
              curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
              chmod +x ./kind
              mv ./kind /usr/local/bin/kind
              EOF

  tags = {
    Name = "Kind-Cluster-Server"
  }
}