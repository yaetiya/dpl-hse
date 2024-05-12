bind = "0.0.0.0:8000"
workers = 1
accesslog = 'gunicorn.log'
errorlog = 'gunicorn.error.log'
capture_output = True