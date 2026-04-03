---
title: RaceStake
subtitle: Motorsport Collectibles Platform
image: assets/images/racestake.png
url: https://racestake.co.uk/
order: 1
---

> Transforming passive broadcast telemetry into a highly-scalable, low-latency interactive platform.

**RaceStake** is a high-performance motorsport platform currently in development, engineered to create a new paradigm of real-time fan engagement. Our core objective is bridging the gap between massive, isolated on-track telemetry generating millions of events, and global audiences through interactive predictions.

## The Problem Space

Modern motorsport data ingestion is heavily fragmented. The primary engineering challenge lies not just in capturing vast quantities of real-time telemetry, but in normalising wildly disparate data streams, mitigating out-of-order packet delivery across networks, and ensuring deterministic, synchronous distribution to edge clients without perceptible lag.

## Architectural Strategy

To guarantee predictability during massive traffic spikes (such as race starts or safety car deployments), the system is built strictly on a decoupled, event-driven architecture. This posture ensures fault tolerance, strict data lineage, and autonomous scalability across domains.

### Core Systems Engineering

- **Event Orchestrator**: A specialized low-latency ingestion layer that aggressively parses, validates, and normalises upstream telemetry (e.g., OpenF1). This establishes a unified canonical data model, protecting downstream services from edge-case corruption.
- **Event Pipeline**: **Apache Kafka** acts as the central nervous system, heavily decoupling data ingestion from the business layer to prevent cascading failures. It enforces strict topic partitioning, ensuring event ordering and highly-durable replayability.
- **Core Platform**: A distributed **Spring Boot** system handling stateful predictions, orchestration logic, and administrative tooling. It guarantees transactional integrity across the user economy.
- **Rendering & Edge Node**: A dedicated rendering microservice pushes real-time graphical artifacts to an edge-cached **Next.js** frontend utilizing WebSockets, delivering sub-second state hydration globally.
- **Simulation Layer**: I engineered a deterministic time-series replay engine utilizing historic Kafka topics. This allows us to "mock" full Grand Prix sessions interactively locally, enabling rigorous load-testing and pipeline validation without relying on live weekend feeds.

## Execution & Strategic Impact

By abstracting the immense complexities of live motorsport telemetry into a resilient, unified event stream, we unlock the ability to iterate product features exponentially faster. RaceStake demonstrates that robust, scalable infrastructure acts as a business multiplier—creating new, interactive commercial avenues for leagues without disrupting legacy broadcast infrastructure.
