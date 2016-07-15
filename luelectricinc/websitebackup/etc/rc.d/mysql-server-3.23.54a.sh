#!/bin/sh
#
# $FreeBSD: ports/databases/mysql41-server/files/mysql-server.sh.in,v 1.3 2005/04/11 08:47:36 ale Exp $
#

# PROVIDE: mysql
# REQUIRE: NETWORKING SERVERS
# BEFORE: DAEMON
# KEYWORD: shutdown

#
# Add the following line to /etc/rc.conf to enable mysql:
# mysql_enable (bool):	Set to "NO" by default.
#			Set it to "YES" to enable MySQL.
# mysql_limits (bool):	Set to "NO" by default.
#			Set it to yes to run `limits -e -U mysql`
#			just before mysql starts.
# mysql_dbdir (str):	Default to "/var/db/mysql"
#			Base database directory.
# mysql_args (str):	Custom additional arguments to be passed
#			to mysqld_safe (default empty).
#

. ${HOME}/etc/defaults/rc.subr

name="mysql_old"
rcvar=`set_rcvar`

load_rc_config $name

: ${mysql_old_enable="NO"}
: ${mysql_old_limits="NO"}
: ${mysql_old_dbdir="${HOME}/var/mysql"}
: ${mysql_old_args=""}

mysql_user="${USER}"
mysql_limits_args="-e -U ${mysql_user}"
pidfile="${mysql_old_dbdir}/`/bin/hostname`.pid"
command="/usr/local/mysql-3.23.54a/bin/safe_mysqld"
command_args="--defaults-extra-file=${mysql_old_dbdir}/my.cnf --user=${mysql_user} --datadir=${mysql_old_dbdir} --pid-file=${pidfile} ${mysql_old_args} > /dev/null &"
procname="/usr/local/mysql-3.23.54a/libexec/mysqld"
start_precmd="${name}_prestart"
mysql_install_db="/usr/local/mysql-3.23.54a/bin/mysql_install_db"
mysql_install_db_args="--user=${mysql_user} --ldata=${mysql_old_dbdir}"

mysql_old_create_auth_tables()
{
	eval $mysql_install_db $mysql_install_db_args >/dev/null
}

mysql_old_create_my_cnf()
{
	echo '[client]' >> ${mysql_old_dbdir}/my.cnf
	echo "user=${USER}" >> ${mysql_old_dbdir}/my.cnf
}

mysql_old_prestart()
{
	if [ ! -d "${mysql_old_dbdir}/mysql/." ]; then
		mysql_old_create_auth_tables || return 1
	fi
	if [ ! -e "${mysql_old_dbdir}/my.cnf" ]; then
		mysql_old_create_my_cnf
	fi
	if checkyesno mysql_old_limits; then
		eval `/usr/bin/limits ${mysql_limits_args}` 2>/dev/null
	else
		return 0
	fi
}

run_rc_command "$1"
