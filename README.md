# Netlify Build plugin pnpm-preinstaller - Plugin to install pnpm on netlify.

## Usage

1. Install plugin

```
yarn add netlify-plugin-pnpm-preinstaller
```

2. Add it as the **first** plugin in your netlify toml file

```
[[plugins]]
    package = "netlify-plugin-pnpm-preinstaller"
```

3. Done!

## SLA

This is not in active development, just something we made to use internally. If
you find bugs or issue you can make an issue and we might get to it, no
promises. Ideally just fork the repo and makes changes as needed
