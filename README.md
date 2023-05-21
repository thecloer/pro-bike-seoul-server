# Pro Bike Seoul Server

`프로따릉러`는 서울시 공공자전거 따릉이의 실시간 대여소 정보와 경로 탐색 기능을 제공하는 서비스입니다.

Service: [https://probikeseoul.thecloer.com](https://probikeseoul.thecloer.com)

## Using

- NestJS
- TypeORM
- PostGIS(Docker)
- Valhalla(Docker)

## Folder Structure

```
.
├── README.md
├── data-source.ts
├── docker-compose.yml
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
├── src
│   ├── main.ts
│   ├── app.module.ts
│   ├── external-api
│   │   ├── external-api.module.ts
│   │   ├── seoul-bike-api.service.ts
│   │   ├── types
│   │   │   ├── seoul-bike-api.type.ts
│   │   │   └── valhalla-api.type.ts
│   │   └── valhalla-api.service.ts
│   ├── stations
│   │   ├── dto
│   │   │   ├── getNearestStations-query.dto.ts
│   │   │   └── getStationsWithStatus-query.dto.ts
│   │   ├── entities
│   │   │   └── station.entity.ts
│   │   ├── repositories
│   │   │   └── stationRepository.ts
│   │   ├── stations.controller.ts
│   │   ├── stations.module.ts
│   │   ├── stations.service.ts
│   │   └── types
│   │       └── stations.type.ts
│   ├── routes
│   │   ├── dto
│   │   │   └── getDirections-body.dto.ts
│   │   ├── routes.controller.ts
│   │   ├── routes.module.ts
│   │   ├── routes.service.ts
│   │   └── types
│   │       └── routes.type.ts
│   ├── common
│   │   ├── dto
│   │   │   └── coordinates.dto.ts
│   │   ├── entities
│   │   │   └── geoPoint.entity.ts
│   │   ├── filters
│   │   │   └── http-exception.filter.ts
│   │   └── interceptors
│   │       └── success.interceptor.ts
│   ├── config
│   │   ├── defaultValues.ts
│   │   ├── settings.ts
│   │   └── typeorm.config.ts
│   ├── database
│   │   ├── seedData
│   │   │   └── bikeStations.data.ts
│   │   └── seeds
│   │       └── station.seed.ts
│   ├── lib
│   │   └── helpers.ts
│   └── types
└── valhalla_data
    ├── file_hashes.txt
    ├── seoul-osm.pbf
    ├── valhalla.json
    └── valhalla_tiles
```
