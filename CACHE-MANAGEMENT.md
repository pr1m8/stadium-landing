# Cache Management Guide

This document explains how to prevent and fix cache corruption issues with Next.js and Turbopack.

## Quick Fixes

If you encounter errors like:

- `Cannot read properties of undefined (reading 'default')`
- `ENOENT: no such file or directory`
- `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`

Try these commands in order:

### 1. Quick Cache Clear

```bash
pnpm fix-cache
pnpm dev
```

### 2. Clean Development Start

```bash
pnpm dev:clean
```

### 3. Full Reset (if issues persist)

```bash
pnpm reset
```

### 4. Manual Reset (nuclear option)

```bash
./scripts/dev-reset.sh
```

## Available Scripts

| Command            | Description                           |
| ------------------ | ------------------------------------- |
| `pnpm clean`       | Clear Next.js, Turbo, and pnpm caches |
| `pnpm dev:clean`   | Clean caches and start dev server     |
| `pnpm build:clean` | Clean caches and build                |
| `pnpm fix-cache`   | Quick cache fix with instructions     |
| `pnpm reset`       | Full reset with dependency reinstall  |

## What Gets Cleaned

- `.next/` - Next.js build cache
- `.turbo/` - Turbopack cache
- `.swc/` - SWC compilation cache
- `node_modules/.cache/` - Various package caches
- `pnpm store` - pnpm package store cache

## Prevention Tips

1. **Regular Cleanup**: Run `pnpm clean` weekly
2. **Branch Switching**: Clean cache when switching branches with different dependencies
3. **Dependency Changes**: Clean cache after adding/removing packages
4. **Build Issues**: Always try cache clear before debugging

## Common Scenarios

### After Installing New Packages

```bash
pnpm add new-package
pnpm clean
pnpm dev
```

### After Git Branch Switch

```bash
git checkout main
pnpm clean
pnpm install  # if package.json changed
pnpm dev
```

### Production Build Issues

```bash
pnpm build:clean
```

## Automated Prevention

The project includes:

- Enhanced Next.js config for better cache handling
- Optimized webpack caching in development
- Proper .gitignore for cache directories
- Scripts for easy cache management

## Configuration Details

### Next.js Config Features

- Filesystem-based webpack caching
- Optimized package imports
- Turbopack performance improvements
- Better error handling

### Package.json Scripts

All scripts are optimized for pnpm and include pnpm-specific cache clearing.

## Troubleshooting

If cache issues persist after all cleanup attempts:

1. Check for corrupted `pnpm-lock.yaml`:

   ```bash
   rm pnpm-lock.yaml
   pnpm install
   ```

2. Clear pnpm cache completely:

   ```bash
   pnpm store prune
   ```

3. Check Node.js version compatibility with Next.js 15.3.1

4. Look for conflicting global packages

## Environment Files

Remember that `.env.local` and other environment files are not cleared by cache scripts. If you suspect environment issues, check these files manually.
