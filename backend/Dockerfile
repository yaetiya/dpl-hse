# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the local directory contents to the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV MODULE_NAME="main"
ENV VARIABLE_NAME="app"
ENV PORT="8000"
ENV GUNICORN_CONF="gunicorn_config.py"
ENV UVICORN_WORKER_CLASS="uvicorn.workers.UvicornWorker"

# Run gunicorn when the container launches
CMD gunicorn --config ${GUNICORN_CONF} --timeout 0 -k ${UVICORN_WORKER_CLASS} ${MODULE_NAME}:${VARIABLE_NAME}