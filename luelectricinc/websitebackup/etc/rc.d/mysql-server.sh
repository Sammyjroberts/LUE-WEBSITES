#!/bin/sh

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

name="mysql"
rcvar=`set_rcvar`

load_rc_config $name

: ${mysql_enable="NO"}
: ${mysql_limits="NO"}
: ${mysql_dbdir="${HOME}/var/mysql"}
: ${mysql_args=""}

mysql_user="${USER}"
mysql_limits_args="-e -U ${mysql_user}"
pidfile="${mysql_dbdir}/`/bin/hostname`.pid"
command="/usr/local/mysql5/bin/mysqld_safe"
command_args="--defaults-extra-file=${mysql_dbdir}/my.cnf --user=${mysql_user} --datadir=${mysql_dbdir} --pid-file=${pidfile} ${mysql_args} > /dev/null &"
procname="/usr/local/mysql5/libexec/mysqld"
start_precmd="${name}_prestart"
mysql_install_db="/usr/local/mysql5/bin/mysql_install_db"
mysql_install_db_args="--user=${mysql_user} --ldata=${mysql_dbdir}"

mysql_create_auth_tables()
{
	eval $mysql_install_db $mysql_install_db_args >/dev/null
}

mysql_create_my_cnf()
{
	echo '[client]' >> ${mysql_dbdir}/my.cnf
	echo "user=${USER}" >> ${mysql_dbdir}/my.cnf
}

mysql_prestart()
{
	if [ ! -d "${mysql_dbdir}/mysql/." ]; then
		mysql_create_auth_tables || return 1
	fi
	if [ ! -e "${mysql_dbdir}/my.cnf" ]; then
		mysql_create_my_cnf
	fi
	if checkyesno mysql_limits; then
		eval `/usr/bin/limits ${mysql_limits_args}` 2>/dev/null
	else
		return 0
	fi
}

run_rc_command "$1"
