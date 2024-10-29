
# wait-for-it.sh
set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  echo "Esperando a que la base de datos PostgreSQL esté lista en el host $host y el puerto 5432..."
  sleep 1
done

exec $cmd
