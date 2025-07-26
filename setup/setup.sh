#!/bin/bash
# setup.sh - Script to set up development environment on Linux
# This script installs Git, Node.js (using NVS or NVM), pnpm, Docker, and checks virtualization support.
# Usage: Run this script as root or with sudo privileges.

# Check if running as root (administrator)
if [[ $EUID -ne 0 ]]; then
  echo "Please run this script as root (use sudo)."
  exit 1
fi

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Install Git if not installed
if command_exists git; then
  echo "Git is installed"
else
  echo "Git is not installed."
  echo "Installing Git using package manager..."
  # Assuming Debian-based system, adapt for other distros
  apt-get update && apt-get install -y git
fi

# Ask user for using NVS or NVM
read -p "Do you want to use NVS (Node Version Switcher) or NVM (Node Version Manager)? (nvs/nvm/no): " use_nvs
if [[ "$use_nvs" != "nvs" && "$use_nvs" != "nvm" && "$use_nvs" != "no" ]]; then
  echo "Invalid input. Please enter 'nvs', 'nvm', or 'no'."
  exit 1
fi

# Install NVM
install_nvm() {
  if command_exists nvm; then
    echo "NVM is installed"
  else
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    # Load nvm script for current shell
    export NVM_DIR="$HOME/.nvm"
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi
}

# Install NVS
install_nvs() {
  if command_exists nvs; then
    echo "NVS is installed"
  else
    echo "Installing NVS..."
    bash <(curl -s https://raw.githubusercontent.com/jasongin/nvs/v1.5.0/install.sh)
    # Load nvs environment setup for current shell
    export NVS_HOME="$HOME/.nvs"
    # shellcheck source=/dev/null
    [ -s "$NVS_HOME/nvs.sh" ] && \. "$NVS_HOME/nvs.sh"
  fi
}

if [[ "$use_nvs" == "nvm" ]]; then
  install_nvm
elif [[ "$use_nvs" == "nvs" ]]; then
  install_nvs
fi

# Install Node.js using selected version manager
if [[ "$use_nvs" == "nvs" ]]; then
  echo "Installing Node.js LTS version using NVS..."
  nvs add lts
  nvs use lts
elif [[ "$use_nvs" == "nvm" ]]; then
  echo "Installing Node.js LTS version using NVM..."
  nvm install --lts
  nvm use --lts
fi

# Check if Node.js is installed
if command_exists node; then
  echo "Node.js is installed"
  # Install pnpm
  if command_exists pnpm; then
    echo "pnpm is installed"
  else
    echo "Installing pnpm..."
    npm install -g pnpm
  fi
else
  echo "Node.js is not installed. Please install Node.js first."
  exit 1
fi

# Install needed packages using pnpm
echo "Installing needed packages using pnpm..."
pnpm install

# Check virtualization support (Linux equivalent)
if grep -E --color 'vmx|svm' /proc/cpuinfo > /dev/null; then
  echo "Virtualization is enabled on this machine."
else
  echo "Virtualization is not enabled. Please enable it in BIOS settings."
  echo "Without virtualization Docker may not work properly."
  exit 1
fi

# Check if Docker is installed
if command_exists docker; then
  echo "Docker is installed on this machine."
else
  echo "Docker is not installed."
  if [[ "$use_pkgmgr" == "yes" ]]; then
    echo "Installing Docker using package manager..."
    apt-get update && apt-get install -y docker.io
    systemctl enable --now docker
  else
    echo "Please install Docker manually."
    exit 1
  fi
fi

# Check if docker-compose is installed (now integrated in Docker as 'docker compose')
if docker compose version > /dev/null 2>&1; then
  echo "Docker Compose is installed."
else
  echo "Installing Docker Compose..."
  if [[ "$use_pkgmgr" == "yes" ]]; then
    apt-get install -y docker-compose
  else
    echo "Please install Docker Compose manually."
    exit 1
  fi
fi

# Enable docker user permissions (add current user to docker group)
if groups $SUDO_USER | grep &>/dev/null '\bdocker\b'; then
  echo "User $SUDO_USER already has docker group permission."
else
  echo "Adding user $SUDO_USER to docker group..."
  usermod -aG docker "$SUDO_USER"
  echo "Please logout and login again for group changes to take effect."
fi

# Pull latest Docker images for projects
echo "Pulling latest Docker images for running projects..."
docker pull node:latest
docker pull postgres:latest

echo "Setup completed successfully!"
