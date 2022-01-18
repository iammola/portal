import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";

import type { CreateClassData, CreateClassError, CreateClassRequestBody } from "types/api/classes";
import type { ApiInternal, ApiInternalResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Return = ApiInternalResponse<CreateClassData, CreateClassError>;

async function createClass(data: CreateClassRequestBody) {
    let [result, statusCode]: ApiInternal<CreateClassData, CreateClassError> = ["", 0];

    try {
        await connect();
        const { _id, createdAt } = await ClassModel.create(data);

        [result, statusCode] = [
            {
                success: true,
                data: { _id, createdAt },
                message: ReasonPhrases.OK,
            },
            StatusCodes.OK,
        ];
    } catch (error: any) {
        [result, statusCode] = [
            {
                success: false,
                message: ReasonPhrases.BAD_REQUEST,
                error: (error as { message: string }).message,
            },
            StatusCodes.BAD_REQUEST,
        ];
    }

    return [result, statusCode] as const;
}

export default async function handler(
    { method = "", body }: NextApiRequest,
    res: NextApiResponse<Return[0]>
) {
    const allow = ["POST"];
    let [result, statusCode]: Return = [
        {
            success: false,
            error: ReasonPhrases.METHOD_NOT_ALLOWED,
            message: ReasonPhrases.METHOD_NOT_ALLOWED,
        },
        StatusCodes.METHOD_NOT_ALLOWED,
    ];

    if (method === "POST" && typeof body === "string")
        [result, statusCode] = await createClass(JSON.parse(body) as CreateClassRequestBody);

    res.setHeader("Allow", allow).status(statusCode).json(result);
}
