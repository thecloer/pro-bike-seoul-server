export declare const SEOUL_BIKE_API_RESULTS: {
    readonly SUCCESS: readonly [{
        readonly CODE: "INFO-000";
        readonly MESSAGE: "정상 처리되었습니다";
    }];
    readonly FAIL: readonly [{
        readonly CODE: "ERROR-300";
        readonly MESSAGE: "필수 값이 누락되어 있습니다.";
    }, {
        readonly CODE: "INFO-100";
        readonly MESSAGE: "인증키가 유효하지 않습니다.";
    }, {
        readonly CODE: "ERROR-301";
        readonly MESSAGE: "파일타입 값이 누락 혹은 유효하지 않습니다.";
    }, {
        readonly CODE: "ERROR-310";
        readonly MESSAGE: "해당하는 서비스를 찾을 수 없습니다.";
    }, {
        readonly CODE: "ERROR-331";
        readonly MESSAGE: "요청시작위치 값을 확인하십시오.";
    }, {
        readonly CODE: "ERROR-332";
        readonly MESSAGE: "요청종료위치 값을 확인하십시오.";
    }, {
        readonly CODE: "ERROR-333";
        readonly MESSAGE: "요청위치 값의 타입이 유효하지 않습니다.";
    }, {
        readonly CODE: "ERROR-334";
        readonly MESSAGE: "요청종료위치 보다 요청시작위치가 더 큽니다.";
    }, {
        readonly CODE: "ERROR-335";
        readonly MESSAGE: "샘플데이터(샘플키:sample) 는 한번에 최대 5건을 넘을 수 없습니다.";
    }, {
        readonly CODE: "ERROR-336";
        readonly MESSAGE: "데이터요청은 한번에 최대 1000건을 넘을 수 없습니다.";
    }, {
        readonly CODE: "ERROR-500";
        readonly MESSAGE: "서버 오류입니다.";
    }, {
        readonly CODE: "ERROR-600";
        readonly MESSAGE: "데이터베이스 연결 오류입니다.";
    }, {
        readonly CODE: "ERROR-601";
        readonly MESSAGE: "SQL 문장 오류 입니다.";
    }, {
        readonly CODE: "INFO-200";
        readonly MESSAGE: "해당하는 데이터가 없습니다.";
    }];
};
export type SeoulBikeInfo = {
    stationId: string;
    stationName: string;
    stationLatitude: string;
    stationLongitude: string;
    rackTotCnt: string;
    parkingBikeTotCnt: string;
    shared: string;
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
export {};
