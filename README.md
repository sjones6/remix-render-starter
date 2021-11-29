# Welcome to Remix + Render starter kit!

This repository contains a remix starter kit + deployment to [render](render.com).

- [Remix Docs](https://remix.run/docs)
- [Render Docs](https://render.com/docs)

This starter kit includes a full DB, user-registration, and authentication.

## Requirement

- node >=14
- docker and docker-compose

## Tech Choices

- framework: [remix](https://remix.run)
- deployment/hosting: [render](https://render.com/)
- DB: [postgres](https://www.postgresql.org/)
- ORM and migrations: [prisma](https://www.prisma.io/)
- styles: [tailwindcss](https://tailwindcss.com/)
- UI components: [daisy ui](https://daisyui.com)
- environment variables: [dotenv](https://github.com/motdotla/dotenv)
- local dependencies: [docker](https://www.docker.com/) + `docker-compose`

## Initial setup

Run `npm install`.

Copy `.env.example` to `.env`:

```
cp .env.example .env
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

This project uses an "Infrastructure as Code" approach, and the deployment configuration is defined in the `render.yaml` file at the root of the project.

See [Render's IaC documentation](https://render.com/docs/infrastructure-as-code) for more.

To deploy this app, follow the directions to connect your `render.yaml` to your render account:

1. Fork this repository
2. Optionally update the `name` of your service in the `render.yaml` file
3. Open the render dasbhoard, Click Blueprints in the navigation sidebar.
4. Click the New Blueprint Instance button.
5. Select your forked repository

Once selected, you’ll see a list of the changes that will be applied based on the contents of render.yaml. If there’s an issue with the file you’ll see an error message. If everything looks good, click Apply to create the resources defined in your file.

Both an application server and a database should be created.

Once the deployment is complete, you should be able to open up your application in the public URL provided by render.
