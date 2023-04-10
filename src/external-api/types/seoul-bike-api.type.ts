export const SEOUL_BIKE_API_RESULTS = {
  SUCCESS: [{ CODE: 'INFO-000', MESSAGE: '정상 처리되었습니다' }],
  FAIL: [
    { CODE: 'ERROR-300', MESSAGE: '필수 값이 누락되어 있습니다.' },
    { CODE: 'INFO-100', MESSAGE: '인증키가 유효하지 않습니다.' },
    {
      CODE: 'ERROR-301',
      MESSAGE: '파일타입 값이 누락 혹은 유효하지 않습니다.',
    },
    { CODE: 'ERROR-310', MESSAGE: '해당하는 서비스를 찾을 수 없습니다.' },
    { CODE: 'ERROR-331', MESSAGE: '요청시작위치 값을 확인하십시오.' },
    { CODE: 'ERROR-332', MESSAGE: '요청종료위치 값을 확인하십시오.' },
    { CODE: 'ERROR-333', MESSAGE: '요청위치 값의 타입이 유효하지 않습니다.' },
    {
      CODE: 'ERROR-334',
      MESSAGE: '요청종료위치 보다 요청시작위치가 더 큽니다.',
    },
    {
      CODE: 'ERROR-335',
      MESSAGE:
        '샘플데이터(샘플키:sample) 는 한번에 최대 5건을 넘을 수 없습니다.',
    },
    {
      CODE: 'ERROR-336',
      MESSAGE: '데이터요청은 한번에 최대 1000건을 넘을 수 없습니다.',
    },
    { CODE: 'ERROR-500', MESSAGE: '서버 오류입니다.' },
    { CODE: 'ERROR-600', MESSAGE: '데이터베이스 연결 오류입니다.' },
    { CODE: 'ERROR-601', MESSAGE: 'SQL 문장 오류 입니다.' },
    { CODE: 'INFO-200', MESSAGE: '해당하는 데이터가 없습니다.' },
  ],
} as const;

/**
 * @see https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#
 *
 * @property stationId - 대여소 고유 id
 * @property stationName - 대여소 이름
 * @property stationLatitude - 대여소 위도
 * @property stationLongitude - 대여소 경도
 * @property rackTotCnt - 거치대개수
 * @property parkingBikeTotCnt - 자전거주차총건수
 * @property shared - 거치율 = parkingBikeTotCnt / rackTotCnt
 */
export type SeoulBikeInfo = {
  stationId: string; // 'ST-4'
  stationName: string; // '102. 망원역 1번출구 앞'
  stationLatitude: string; // '37.55564880'
  stationLongitude: string; // '126.91062927'
  rackTotCnt: string; // 거치대개수
  parkingBikeTotCnt: string; // 자전거주차총건수
  shared: string; // 거치율 = parkingBikeTotCnt / rackTotCnt
};

export type SeoulBikeApiResponseSuccess = {
  RESULT: (typeof SEOUL_BIKE_API_RESULTS.SUCCESS)[number];
  list_total_count: number;
  row: SeoulBikeInfo[];
};
type SeoulBikeApiResponseFail = {
  RESULT: (typeof SEOUL_BIKE_API_RESULTS.FAIL)[number];
};
export type SeoulBikeApiResponse = {
  rentBikeStatus: SeoulBikeApiResponseSuccess | SeoulBikeApiResponseFail;
};
