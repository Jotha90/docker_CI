FROM python:3.12-alpine

WORKDIR /app

COPY server.py .

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/health', timeout=2)"

CMD ["python", "server.py"]
