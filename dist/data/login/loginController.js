import { DBBroker } from "../../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { AdministratorSchema } from "../administrator/administrator.js";
import { KorisnikSchema } from "../korisnik/korisnik.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const loginController = responseWrapper(async (req, res) => {
    let { email, sifra, isAdmin } = req.body;
    let id = 0;
    if (isAdmin === true) {
        const schema = new AdministratorSchema({ email });
        schema.columns.find((c) => c.name === "sifra").hide = false;
        const result = await DBBroker.getInstance().select(schema);
        if (result.length === 0)
            return buildApiResponse("Losi kredencijali", false, 403);
        isAdmin = true;
        id = result[0].id;
        try {
            if (!(await bcrypt.compare(sifra, result[0].sifra))) {
                return buildApiResponse("Losi kredencijali", false, 403);
            }
        }
        catch (e) {
            return buildApiResponse("Server error", false, 500);
        }
    }
    else {
        const schema = new KorisnikSchema({ email });
        schema.columns.find((c) => c.name === "sifra").hide = false;
        const result = await DBBroker.getInstance().select(schema);
        if (result.length === 0)
            return buildApiResponse("Losi kredencijali", false, 403);
        id = result[0].id;
        isAdmin = false;
        try {
            if (!(await bcrypt.compare(sifra, result[0].sifra))) {
                return buildApiResponse("Losi kredencijali", false, 403);
            }
        }
        catch (e) {
            return buildApiResponse("Server error", false, 500);
        }
    }
    const accessToken = jwt.sign({ user: { id, email, isAdmin } }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return buildApiResponse({ accessToken, isAdmin, user: { id, email } });
});
//# sourceMappingURL=loginController.js.map