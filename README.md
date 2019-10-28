## Running https server

https://pwa.ng/

run `npm run start:prod`


1. start server
1. open site
1. unregister sw
1. reload on network tab, watch load time
1. reload again, cache used
1. inspect cache
1. install to desktop
1. load
1. kill server
1. load again - works offline
1. swap a picture filename around
1. run ng build --prod
1. reload - no change in picture. ngsw-config return different hash of file for next load
1. reload - picture changes
