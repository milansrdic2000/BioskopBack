import { DBBroker } from "../db/dbBroker.js";
export const buildApiResponse = function (data, success = true, code = 200) {
    return { data, success, code };
};
export const responseWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            const result = await fn(req, res, next);
            const { data, code, success } = result;
            if (code === 404) {
                console.log("rollbackujem");
                await DBBroker.getInstance().rollback();
                return res.status(code).json({ success: false, message: data });
            }
            await DBBroker.getInstance().commit();
            res.status(code || 200).json({ success: success ?? true, data });
        }
        catch (err) {
            console.log("rollbackujem");
            await DBBroker.getInstance().rollback();
            next(err);
        }
    };
};
const simulateWait = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 2000);
});
//# sourceMappingURL=api-response-util.js.map