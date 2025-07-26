# assume this script is run in a PowerShell environmentç

# check if the script is running on a Linux system
if ($IsLinux) {
    Write-Host "This script is not designed to run on Linux systems. Please use the appropriate setup script for Linux located in the 'setup' directory."
    exit
}

# assume this script is run in a Windows environment
# check if PowerShell is running as administrator
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run this script as an administrator."
    exit
}

# ask user for using Chocolatey
$useChocolatey = Read-Host "Do you want to use Chocolatey for package management? [ yes(recomended) / no ]"
if ($useChocolatey -ne "yes" -and $useChocolatey -ne "no") {
    Write-Host "Invalid input. Please enter 'yes' or 'no'."
    exit
}
#if user wants to use Chocolatey, check if it's installed
if ($useChocolatey -eq "yes") {
    # check if Chocolatey is installed then install it
    if (Get-Command choco -ErrorAction SilentlyContinue) {
        Write-Host "Chocolatey is installed"
    }
    else {
        Write-Host "Chocolatey is not installed. Installing Chocolatey..."
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-WebRequest -Uri "https://community.chocolatey.org/install.ps1" -UseBasicParsing | Invoke-Expression
    }
}

# check if Git is installed
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "Git is installed"
}
else {
    Write-Host "Git is not installed. Installing Git..."
    # if user selected chocolatey, install git using chocolatey
    if ($useChocolatey -eq "yes") {
        choco install git -y
    }
    else {
        Invoke-WebRequest -Uri "https://git-scm.com/download/win" -OutFile "$env:TEMP\git-installer.exe"
        Start-Process -FilePath "$env:TEMP\git-installer.exe" -ArgumentList "/VERYSILENT" -Wait
    }
}

# ask user for using NVS (Node Version Switcher) or Nvm (Node Version Manager)
$useNVS = Read-Host "Do you want to use NVS (Node Version Switcher) or Nvm (Node Version Manager)? (nvs/nvm/no)"
if ($useNVS -ne "nvs" -and $useNVS -ne "nvm" -and $useNVS -ne "no") {
    Write-Host "Invalid input. Please enter 'nvs', 'nvm', or 'no'."
    exit
}

# if user wants to use nvm check if it's installed if no then install it
if ($useNVS -eq "nvm") {
    if (Get-Command nvm -ErrorAction SilentlyContinue) {
        Write-Host "NVM is installed"
    }
    else {
        # if user selected chocolatey, install nvm using chocolatey
        if ($useChocolatey -eq "yes") {
            Write-Host "Installing NVM using Chocolatey..."
            choco install nvm -y
        }
        else {
            Write-Host "NVM is not installed. Installing NVM..."
            Invoke-WebRequest -Uri "https://raw.githubusercontent.com/coreybutler/nvm-windows/master/install.ps1" -OutFile "$env:TEMP\nvm-install.ps1"
            & "$env:TEMP\nvm-install.ps1"
        }
    }
}
elseif ($useNVS -eq "nvs") {
    # is nvs installed?
    if (Get-Command nvs -ErrorAction SilentlyContinue) {
        Write-Host "NVS is installed"
    }
    else {
        # if user selected chocolatey, install nvs using chocolatey
        if ($useChocolatey -eq "yes") {
            Write-Host "Installing NVS..."
            choco install nvs -y
        }
        else {
            Write-Host "Installing NVS..."
            Invoke-WebRequest -Uri "https://raw.githubusercontent.com/jasongin/nvs/v1.5.0/install.ps1" -OutFile "$env:TEMP\nvs-install.ps1"
            & "$env:TEMP\nvs-install.ps1"
        }
    }
}

# install Node.js using NVS or NVM
if ($useNVS -eq "nvs") {
    Write-Host "Installing Node.js using NVS..."
    nvs add lts
    nvs use lts
}
elseif ($useNVS -eq "nvm") {
    Write-Host "Installing Node.js using NVM..."
    nvm install lts
    nvm use lts
}

# check if Node.js is installed then install pnpm and needed packages
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Node.js is installed"
    # install pnpm
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        Write-Host "pnpm is installed"
    }
    else {
        Write-Host "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm
    }
}
else {
    Write-Host "Node.js is not installed. Please install Node.js first."
    exit
}

# install needed packages using pnpm
Write-Host "Installing needed packages using pnpm..."
pnpm install

# check if machine has virtualization enabled
$virtualizationEnabled = (Get-WmiObject -Class Win32_ComputerSystem).HypervisorPresent
if ($null -eq $virtualizationEnabled) {
    Write-Host "Could not determine if virtualization is enabled. Please check your system settings."
    exit
}
if ($virtualizationEnabled -eq $false) {
    Write-Host "Virtualization is not enabled on this machine. Please enable it in the BIOS settings."
    Write-Host "Without virtualization, WSL and Docker cannot be installed."
    exit
}

Write-Host "Virtualization is enabled on this machine."
# if virtualization is enabled check if WSL is installed
$wslInstalled = Get-WmiObject -Class Win32_OperatingSystem | Where-Object { $_.Caption -like "*Windows Subsystem for Linux*" }
if ($wslInstalled) {
    Write-Host "WSL is installed on this machine."
}
else {
    Write-Host "WSL is not installed. Installing WSL..."
    wsl --install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install WSL. Please check your system settings."
        exit
    }
    # set WSL version to 2
    wsl --set-default-version 2
    Write-Host "Please restart your machine to complete the WSL installation."
}
# if virtualization is enabled, check if Docker is installed
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
if ($dockerInstalled) {
    Write-Host "Docker is installed on this machine."
}
else {
    # if user selected chocolatey, install docker using chocolatey
    if ($useChocolatey -eq "yes") {
        Write-Host "Installing Docker using Chocolatey..."
        choco install docker -y
    }
    else {
        # if Docker is not installed, install it
        Write-Host "Docker is not installed. Installing Docker..."
        Invoke-WebRequest -Uri "https://get.docker.com/" -OutFile "$env:TEMP\docker-install.sh"
        & "$env:TEMP\docker-install.sh"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to install Docker. Please check your system settings."
        }
        else {
            Write-Host "Docker installed successfully."
        }
    }
    # if docker is installed and user selected chocolatey, install docker-compose using chocolatey
    if ($dockerInstalled -and $useChocolatey -eq "yes") {
        Write-Host "Installing Docker Compose using Chocolatey..."
        choco install docker-compose -y
    }
    else {
        # if Docker Compose is not installed, install it
        Write-Host "Docker Compose is not installed. Installing Docker Compose..."
        Invoke-WebRequest -Uri "https://github.com/docker/compose/releases/latest/download/docker-compose-Windows-x86_64.exe" -OutFile "$env:TEMP\docker-compose.exe"
        Start-Process -FilePath "$env:TEMP\docker-compose.exe" -ArgumentList "/quiet" -Wait
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to install Docker Compose. Please check your system settings."
        }
        else {
            Write-Host "Docker Compose installed successfully."
        }
    }
}
# enable WSL integration for Docker
Write-Host "Enabling WSL integration for Docker..."
& docker --config "$env:USERPROFILE\.docker" run --rm -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker:/var/lib/docker docker/compose:latest up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to enable WSL integration for Docker. Please check your Docker settings."
}
else {
    Write-Host "WSL integration for Docker enabled successfully."
}
# ask user if want to install Docker Desktop
$installDockerDesktop = Read-Host "Do you want to install Docker Desktop? (yes/no)"
if ($installDockerDesktop -eq "yes") {
    Write-Host "Installing Docker Desktop..."

    # if user selected chocolatey, install docker desktop using chocolatey
    if ($useChocolatey -eq "yes") {
        choco install docker-desktop -y
    }
    else {
        # download and install Docker Desktop
        Write-Host "Downloading Docker Desktop..."
        Invoke-WebRequest -Uri "https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe" -OutFile "$env:TEMP\DockerDesktopInstaller.exe"
        Start-Process -FilePath "$env:TEMP\DockerDesktopInstaller.exe" -ArgumentList "/quiet" -Wait
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to install Docker Desktop. Please check your system settings."
            exit
        }
        Write-Host "Docker Desktop installed successfully."
    }
}
else {
    Write-Host "Skipping Docker Desktop installation."
}
Write-Host "Docker and WSL are set up successfully."
# pull lastest images for running projects
Write-Host "Pulling latest Docker images for running projects..."
docker pull node:latest
docker pull postgres:latest

Write-Host "Setup completed successfully!"