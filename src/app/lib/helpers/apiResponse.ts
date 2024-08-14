import { ApiDataAttributes } from "../types"

export const apiResponse = (data?: ApiDataAttributes, status?: number) => {
    return Response.json(data, { status })
}

