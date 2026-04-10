---
id: '002'
title: Raspberry Penguin Music
subtitle: 'Simple guide to locally hosting jellyfin on a raspberry pi 3 B+'
published: 3/2026
tags: tutorial linux raspberry-pi self-hosted ubuntu
summary: A simple setup guide to local music streaming
thumbnail: '@images/static/raspberries.jpg'
thumbnailAlt: William Mason Brown (1828-1898) “Raspberries in a Wooded Landscape”. Oil on canvas.
author: valaxin
visible: true
---

## Purpose

Streaming platforms centralize access, impose recurring cost, and depend on external infrastructure. A local media server removes those constraints. This build uses Jellyfin on a low-power Raspberry Pi 3 Model B+ to host and stream a personal music library over the local network. The system exposes:

- SSH access for administration
- SMB share for file ingestion
- Jellyfin web UI and API for playback

The result is a self-contained, no-subscription music system.

## Prerequisites

- Raspberry Pi 3 Model B+ (or newer)
- MicroSD card (≥ 64GB recommended)
- Ubuntu Server 24.04 image installed
- Network access (Ethernet preferred for stability)

Flash using Raspberry Pi Imager with:

- SSH enabled
- Username/password configured (e.g, tux)
- Hostname set (e.g, raspberry)

## First Boot

Connect:

```bash
ssh tux@raspberry.local
```

Update system:

```bash
sudo apt update
sudo apt upgrade -y
```

## SSH Hardening

Ubuntu Server uses `sshd_config`, for basic port changes.

Edit:

```bash
sudo nano /etc/ssh/sshd_config
```

Change or add these lines, and save the file:

```text
Port 42069
PermitRootLogin no
PasswordAuthentication yes
```

Restart SSH:

```bash
sudo systemctl enable ssh
sudo systemctl restart ssh
```

Reconnect:

```bash
ssh tux@raspberry.local -p 42069
```

## Firewall (UFW)

Install:

`ufw` is likely already installed.

```bash
sudo ufw status

# if not
sudo apt install ufw -y
```

Some basic rules

```bash
sudo ufw allow 42069/tcp
sudo ufw allow OpenSSH

sudo ufw enable
sudo ufw status
```

## SMB File Share (Samba)

Install:

```bash
sudo apt install samba -y
```

Set SMB password:

```bash
sudo smbpasswd -a username
```

Create storage:

```bash
sudo mkdir -p /srv/music
sudo chown username:username /srv/music
sudo chmod 750 /srv/music
```

Edit config:

```bash
sudo nano /etc/samba/smb.conf
```

Append:

```toml
[music]
   path = /srv/music
   browseable = yes
   read only = no
   guest ok = no
   valid users = username
   create mask = 0644
   directory mask = 0755
```

Validate + restart:

```bash
testparm
sudo systemctl restart smbd
sudo systemctl enable smbd
```

Access from another machine:

`\\hostname.local\music`

Allow through firewall:

```bash
sudo ufw allow samba
```

## Jellyfin Installation

Install dependencies and repository:

```bash
sudo apt install curl gnupg apt-transport-https ca-certificates -y
# remember, it's on you to read before run.
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```

Install Jellyfin:

```bash
sudo apt install jellyfin -y
```

Enable and start:

```bash
sudo systemctl enable jellyfin
sudo systemctl start jellyfin
```

Allow through firewall:

```bash
sudo ufw allow 8096/tcp
```

## Initial Setup (Web)

Open in browser:

`http://raspberry.local:8096` or `http://<DEVICE_IPv4>:8096`

Then:

- Create admin account
- Add media library:
- Type: Music
- Path: /srv/music
- Complete setup

Jellyfin scans metadata and builds the library index.

Directory Structure (Recommended)

Inside /srv/music:

```text
Artist/
  Album/
    01 - Track.mp3
    02 - Track.mp3
```

Consistent naming improves metadata detection.

Performance Constraints

### The Raspberry Pi 3 Model B+ has

Limited CPU; so no real-time transcoding
1GB RAM; small concurrent usage (1-2 users)
USB 2.0 bus; I/O bottleneck

### Mitigation

Use direct play formats (MP3, AAC)
Avoid FLAC transcoding over network
Prefer wired Ethernet
Result

System exposes:

- SSH: `hostname.local:42069`
- SMB: `\\hostname.local\music`
- Jellyfin: `http://hostname.local:8096`

No external dependency. No subscription. Local control over media ingestion, indexing, and playback.

## References

- Jellyfin Documentation: https://jellyfin.org/docs/
- Ubuntu Server Documentation: https://ubuntu.com/server/docs
- Samba Documentation: https://www.samba.org/samba/docs/
- Raspberry Pi Documentation: https://www.raspberrypi.com/documentation/

At this point you should hopfully be in the throws of copying you're collection into the device via the available network drive. Expansion would see `nginx` with a reverse proxy for `:8096` pointing to `:80` allowing us to drop the port from the URL, additionally we could use Let's Encrypt to enabled SSL on the connection.

Hope you found this useful.
