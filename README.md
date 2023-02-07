<p align="center">
  <a href="https://boostgrammar-io.pages.dev/" target="_blank">
    <img src="https://boostgrammar-io.pages.dev/panel.png" width="100%" alt="Banner" />
  </a>
</p>

# boostgrammar.io

Have issues with your grammar skills? Let boostgrammar.io help you out and say goodbye to your grammar confusions.

# Stack

- **Client Framework**: Astro + Preact
- **Server Framework**: [Fastify](https://www.fastify.io/)
- **Styles**: [TailwindCSS](https://tailwindcss.com/)
- **Database and authentication**: [Supabase](https://supabase.com/)
- **Deployment Web**: [Cloudfare Pages](https://pages.cloudflare.com/)
- **Deployment Server**: [Railway](https://railway.app/º)

# Setting up

## Supabase - API Keys

1. Sign In on Supabase.
2. Go to settings option on sidebar.
3. Select API option on project settings block.
4. Copy **anon public** and **URL**.

## RapidAPI - API Keys

1. Sign up on RapiAPI.
2. Subscribe to [Lenguage Tool API](https://rapidapi.com/dnaber/api/languagetool) and [Thesaurus API](https://rapidapi.com/apininjas/api/thesaurus-by-api-ninjas/).
3. Then, go to [Dashboard](https://rapidapi.com/developer/dashboard).
4. Finally, in the sidebar there will be security option and there you can copy your *Application key*.

## Cohere.ai - API Keys

1. Sign up on [Cohere.ai](https://cohere.ai/).
2. Go to [API Keys](https://dashboard.cohere.ai/api-keys).
3. Click on **New Trial Key** and copy your **Trial Key**.

# Inspiration

I took as a references this page [Parcel.io](https://parcel.io/) and [Scale](https://scale.com/) to build the design.

# Run locally

1. Clone this repo to a directory and then run `npm install`.
2. Set-up your environment variables for the client by renaming `.env.example` to `.env` and following **Supabase - Project API Keys**.
3. Set-up your environment variables for the server by renaming `api/.env.example` to `.env` and following **RapidAPI - API Keys** and **Cohere.ai - API Keys**.
4. Run `npm run dev` to start developing mode.
