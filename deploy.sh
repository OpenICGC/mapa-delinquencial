
#!/bin/bash

rm -fr /home/tic/mapa-delinquencial
cp -r tmp /home/tic/mapa-delinquencial

mkdir -p /var/www/html/mapa-delinquencial
rm -fr /var/www/html/mapa-delinquencial/*
cp -r /home/tic/mapa-delinquencial/*  /var/www/html/mapa-delinquencial/



