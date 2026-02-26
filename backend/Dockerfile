# =========================
# Stage 1: Builder
# =========================
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .

# Install dependencies into a custom directory
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --target=/app/deps -r requirements.txt

COPY app ./app

# =========================
# Stage 2: Distroless Runtime
# =========================
FROM gcr.io/distroless/python3-debian12

WORKDIR /app

# Copy dependencies and app
COPY --from=builder /app /app

# Tell Python where dependencies live
ENV PYTHONPATH=/app/deps

USER nonroot:nonroot

EXPOSE 8000

CMD ["-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]