#!/bin/bash

# Development Reset Script
# Fixes common Next.js/Turbopack cache issues

echo "🧹 Starting development reset..."

# Kill any existing Next.js processes
echo "📴 Stopping existing Next.js processes..."
pkill -f "next dev" || true
pkill -f "turbopack" || true

# Wait a moment for processes to fully stop
sleep 2

# Clear all cache directories
echo "🗑️  Clearing cache directories..."
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
rm -rf .swc

# Clear pnpm specific caches
echo "🧹 Clearing pnpm caches..."
pnpm store prune || true

# Clear any leftover lock files
echo "🔓 Clearing lock files..."
rm -f .next/trace || true

# Reinstall dependencies if needed (optional, uncomment if issues persist)
# echo "📦 Reinstalling dependencies..."
# rm -rf node_modules
# pnpm install

echo "✅ Development reset complete!"
echo "🚀 You can now run 'pnpm dev' to start fresh"
echo ""
echo "Available commands:"
echo "  pnpm clean      - Clear caches only"
echo "  pnpm dev:clean  - Clean and start dev server"
echo "  pnpm fix-cache  - Quick cache fix"
echo "  pnpm reset      - Full reset with dependency reinstall"
