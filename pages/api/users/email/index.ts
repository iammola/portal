import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { StudentModel } from "db/models"; // Parents and Teacher Models will be used when created
import { formatApiError } from "utils/api";

import type { UsersEmailData, UsersEmailRequestBody } from "types/api/users/email";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<UsersEmailData>;

async function searchByEmail({ schoolMail, select }: UsersEmailRequestBody) {
    let [result, statusCode]: ApiInternal<UsersEmailData> = ["", 0];

    await connect();
    const data = /* userType === "student" ?  */ await StudentModel.findOne(
        { schoolMail },
        select
    ).lean();

    [result, statusCode] =
        data !== null
            ? [
                  {
                      data,
                      success: true,
                      message: ReasonPhrases.OK,
                  },
                  StatusCodes.OK,
              ]
            : [
                  {
                      success: false,
                      message: ReasonPhrases.NOT_FOUND,
                      error: { message: "User does not exist" },
                  },
                  StatusCodes.NOT_FOUND,
              ];

    return [result, statusCode] as const;
}

export default async function handler(
    { method = "", body }: NextApiRequest,
    res: NextApiResponse<Return[0]>
) {
    const allow = ["SEARCH"];
    let [result, statusCode]: Return = [
        {
            success: false,
            error: ReasonPhrases.METHOD_NOT_ALLOWED,
            message: ReasonPhrases.METHOD_NOT_ALLOWED,
        },
        StatusCodes.METHOD_NOT_ALLOWED,
    ];

    try {
        if (method === "SEARCH" && typeof body === "string")
            [result, statusCode] = await searchByEmail(JSON.parse(body) as UsersEmailRequestBody);
    } catch (error: any) {
        [result, statusCode] = [
            {
                success: false,
                error: formatApiError(error),
                message: ReasonPhrases.BAD_REQUEST,
            },
            StatusCodes.BAD_REQUEST,
        ];
    }

    res.setHeader("Allow", allow).status(statusCode).json(result);
}
