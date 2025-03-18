#!/bin/sh

# Start backend in background
cd /app/backend && pnpm start &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Start frontend
cd /app/frontend && pnpm start &
FRONTEND_PID=$!

# Function to forward signals to child processes
cleanup() {
  echo "Stopping services..."
  kill -TERM $BACKEND_PID $FRONTEND_PID 2>/dev/null
  wait $BACKEND_PID $FRONTEND_PID
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM

# Wait for any child process to exit
wait -n

# If we get here, one of the processes exited
cleanup
