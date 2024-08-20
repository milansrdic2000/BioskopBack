export class OracleError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'OracleError';
        // check why this is important
        Object.setPrototypeOf(this, OracleError.prototype);
    }
}
export function oracleErrorHandler(err, req, res, next) {
    if (err.code?.startsWith('ORA-')) {
        const oracleError = new OracleError(err.code, err.message);
        next(oracleError);
    }
    else {
        next(err);
    }
}
//# sourceMappingURL=oracle-error-handler.js.map