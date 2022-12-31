# ignis-api
API for ignis.


## Development
### To start a development instance:
1. Set your environment variables.
	- `SECURE` (true or false)
	- `NODE_ENV` (development)
	- `__LATEST_PRISMA_VERSION__`
	- `__YOUR_MANAGEMENT_API_SECRET__`
	- `__YOUR_PRISMA_SERVER_PORT__`
	- `__YOUR_DATABASE_CONNECTOR__`
	- `__YOUR_DATABASE_HOST__`
	- `__YOUR_DATABASE_PORT__`
	- `__YOUR_DATABASE_USER__`
	- `__YOUR_DATABASE_PASSWORD__`
	- `__YOUR_CONNECTION_LIMIT__`
	- `__YOUR_DATABASE_NAME__`
	- `DATABASE_URL`
	- `JWT_SECRET`
2. Start the database by running `docker-compose up -d`.
3. Start the server by running `yarn dev`.