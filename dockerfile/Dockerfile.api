FROM php:8.0-fpm

RUN apt-get update
RUN apt-get -y install vim cron supervisor libpng-dev libzip-dev zlib1g-dev build-essential libssl-dev libjpeg-dev libfreetype6-dev libwebp-dev libicu-dev libpq-dev

# laravel tinker configuration
RUN mkdir -p /var/www/.config/psych
RUN chown www-data /var/www/.config
RUN chmod -R 755 /var/www/.config

# configure, install and enable all php packages
RUN set -eux; \
        docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp; \
        docker-php-ext-configure intl; \
        docker-php-ext-configure pdo; \
        docker-php-ext-configure pdo_pgsql; \
        docker-php-ext-configure zip; \
        docker-php-ext-install -j "$(nproc)" gd intl opcache pdo pdo_pgsql zip


# configure supervisor
COPY ./etc/supervisor/supervisord.conf /etc/supervisor
RUN mkdir /var/log/supervisord
RUN touch /var/log/supervisord/supervisord.log
RUN chgrp -R www-data /var/log
RUN chmod -R 775 /var/log

# configure cron
RUN chmod gu+rw /var/run
RUN chmod gu+s /usr/sbin/cron
RUN echo "* * * * * cd /var/www/app && /usr/local/bin/php artisan schedule:run >> /var/www/app/storage/logs/laravel-cron.log 2>&1\n" | crontab -u www-data -

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisor/supervisord.conf"]

USER www-data
WORKDIR /var/www/app
