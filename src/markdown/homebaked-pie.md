---
title: Raspberry Music for Penguins
published: 3/2026
tags: ubunutu raspberry-pi 
summary: A simple setup guide to local music streaming
thumbnail: '@images/static/raspberries.jpg'
thumbnailAlt: William Mason Brown (1828-1898) “Raspberries in a Wooded Landscape”. Oil on canvas.
author: valaxin
visible: true
---

## Base System Setup

1. On another computer, using `Raspberry Pi Imager` to install `Ubuntu Server 24.04.4 LTS (64-Bit)` [1.2GB] on a microSD card at least `32GB` in size.

2. During the `Customization` step set these
   - hostname: potato.local
   - user: jimbo
   - password: *******
   - shh-access: true

3. When complete the media may eject itself, however ensure this has happened then insert into the Raspberry Pi and power it on.

4. On another device presumed to be on the same network as our potato.local

   ```bash
   ping http://potato.local
   ```

5. take the `IPV4 Address` listed and issue, we use this identifer rather than domain resolution as it can work to create vectors for bad actors.

   ```bash
   ssh jimbo@<IPV4_Address>
   ```

6. once you've provided the user password and accepted the fingerprint you should be at a shell prompt and first things first.

   ```bash
   sudo -s           # create a sudo shell
   apt update        # update repsitories
   apt upgrade -y    # upgrade software
   ```

## Network Drive Access Setup

1. Install `samba` and create and edit it's config

   ```bash
   sudo apt install samba
   sudo nano /etc/samba/smb.conf
   ```

2. We need too add the following to the end of the config file then create the required user, directories before restarting the samba service.

   ```yaml
   # ... 
   
   [music]
   path = /srv/media/music
   browseable = yes
   read only = no
   guest ok = no
   create mask = 0755
   directory mask = 0755
   ```

   ```bash
   sudo mkdir -p /srv/media/music         # create directory
   sudo chown -R $USER:$USER /srv/media   # give curretly signed in user access over parent 
   sudo smbpasswd -a $USER                # create a samba user
   sudo systemctl restart smbd            # restart the samba service
   ```

3. the network store should exist to the local network and be accessable at `\\potato.local\music`

## Jellyfin

1. install some deps for `jellyfin` then the software itself.

   ```bash
   # prerequisiets
   sudo apt install apt-transport-https ca-certificates curl -y

   # set
   curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
   
   # to confirm install
   jellyvin --version
   ```

2. visit `http://potato.local:8096` to configure the application.

## Nginx Apps

1. let's get some tools for building and running web applications

   ```bash
   sudo apt update
   sudo apt install nginx nodejs npm
   ```

   Then a small sanitiy check

   ```bash
   node -v
   npm -v
   nginx -v
   ```

2. create new or clone existing express application

   ```bash
   git clone https://github.com/valaxin/alata
   ```

3. let's setup express app to keep running with `pm2`

   ```bash
   sudo npm install -g pm2

   # test
   cd alata
   npm install
   pm2 npm run start --name alata
   ```

   
