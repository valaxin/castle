---
title: Sailing The Digital Seas
published: 09/2025
tags: post content resources internet
summary: none
thumbnail: '@images/resources/abstract.jpg'
author: '@valaxin'
visible: true
---

I feel like being pretty short and sweet about this. Ideally you have a machine with a decent amount of storage, makes this more rewarding. It's not required to use a high end machine, generally my machine is considered to be old in twenty-twentyfive.

> - 3rd Generation Intel i7
> - 2GB AMD Descrete Graphics
> - 16GB DDR3 Memory
> - 5TB Storage
> - Ubunutu Server 24.04



Right, so... 'Operating Systems' pick what you want and are comfortable with, the stuff I'm talking about here is pretty cross-platform and it's likely more crutial to have familiaraity with the enviroment.

## Joining this "A/V Club"

Starting with the clients to use. these days there are a bunch, these are the best.

- [Transmission](https://transmissionbt.com/)
- [Deluge](https://deluge-torrent.org/)

While contibuting use a vpn, else ensure encryption and seed zero mindset. When you have media of somekind, Then [Jellyfin](https://jellyfin.org/). This isn't a tutoral you'll have to check the [documentation](https://jellyfin.org/docs/general/installation/) for the install process you'll have to take.

> [!WARNING]
> read the scripts before you run, I mean shit it's twenty-twentyfive ask a.i to ensure understanding.

Use the host here to run the aformentioned download client, for this you could pure cli, host a network instance of transmission[?](https://ubuntuhandbook.org/index.php/2023/08/set-up-transmission-daemon-ubuntu-2204/) but I use [xrdp](https://www.xrdp.org/) and [avahi](https://avahi.org/) and have a desktop available on the local wire

```bash
#ubtuntu 24.04
sudo systemctl start xrdp
```

## Tree

Our entry point is `/mnt/storage/media` from here create `movies/`, `series/`, `music/` or whatever then sub-directories should be...

- `movies` **>** `[resolution]` **>** `[(title)(release-year)(resolution)]` **/**
- `series` **>** `[(title)(release-year)(resolution)]` **>** `season?` **/**
- `music` **>** `[artist]` **>** `[(album)(release-year)]` **/**

More on naming conventions [here](https://jellyfin.org/docs/general/server/media/shows/) and [here](https://diymediaserver.com/post/how-proper-organization-helps-jellyfin-automatically-fetch-metadata-and-display-content-correctly/)

## Outcome

This machine (in my context) is basically a second machine existing as a 1280x800 rdp window on my main machines second monitor. when the desire hits, I visit an "smart" spy panel and request my content from `$host.local:8096` 

Easy street is samba, shared drives, place the following into `/etc/samba/smb.conf`, I don't know [look](https://ubuntu.com/tutorials/install-and-configure-samba) yourself.

```conf
# smb.conf
[media]
   path = /mnt/storage/media
   browsable = yes
   writable = yes
   guest ok = no
   valid users = user

```

Then on some other machine, you should be able to browse `$host.local/media` using the creds you assigned. Media here, Media there. sharing is caring. support the creators worthy of your time.

Is this useless, unsure, who cares? -later!
